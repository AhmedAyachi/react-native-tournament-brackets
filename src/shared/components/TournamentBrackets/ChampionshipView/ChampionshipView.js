import React from "react";
import {View} from "react-native";
import css from "./ChampionshipView.style";
import RoundView from "../RoundView/RoundView";
import {getMatchData} from "../index";


export default function ChampionshipView(props){
    const {data,onPlayMatch}=props,rounds=getRounds(data);
    let height=25;
    return (
        <View style={[css.championshipview,props.style]}>
            {rounds.map((round,i)=>{
                height*=2;
                return <RoundView
                    key={`round${i}`}
                    round={round}
                    connected={i>0}
                    renderMatch={props.renderMatch}
                    connectorStyle={{
                        height,strokeWidth:(props.strokeWidth||3)/i,
                        stroke:props.stroke,
                    }}
                    onPlayMatch={onPlayMatch&&((match)=>{
                        onPlayMatch({match,round});
                    })}
                />
            })}
        </View>
    )
}

const getRounds=(data)=>{
    const roundrefs=getGenuineRounds(data.rounds);
    let opponentIds=null;
    return roundrefs.map((roundref,i)=>{
        let {matches}=roundref;
        if(opponentIds){
            matches=getSortedMatches(matches,opponentIds);
        }
        const round={
            id:`r${i}`,
            title:`round ${i+1}`,
            ...roundref,
            index:i,
            matches:matches.map((matchref,i)=>getMatchData(matchref,data,opponentIds&&opponentIds[i])),
        };
        if(round.matches.length>1){
            opponentIds=getNextRoundopponentIds(round.matches);
        }
        return round;
    });
};

const getGenuineRounds=(rounds)=>{
    let genuine;
    const roundlength=Array.isArray(rounds)&&rounds.length;
    if(roundlength){
        const first=rounds[0],{matches}=first;
        if(Array.isArray(matches)){
            const {length}=matches;
            let size=Math.floor(Math.log2(length))+1;
            genuine=roundlength===size?rounds:rounds.slice(0,size);
            size=2**(size-1);
            first.matches=length===size?matches:matches.slice(0,size);
        }
        
    }
    return genuine||[];
}

const getNextRoundopponentIds=(matches)=>{
    const nextRoundopponents=new Array(Math.round(matches.length/2)).fill(null).map(()=>[]);
    const excludedmatchIds=[];
    matches.forEach((match,i)=>{
        const winner=match.participants.find((participant)=>participant&&participant.isWinner);
        if(winner){
            nextRoundopponents[Math.floor(i/2)].push(winner.id);
        }
        else{
            excludedmatchIds.push(i+1);
        }
    });
    return nextRoundopponents;
}

const getSortedMatches=(matches=[],idpairs=[])=>{
    const sorted=idpairs.map((idpair,i)=>matches.find(match=>idpair.includes(match.winnerId))||matches[i]);
    return sorted;
}
