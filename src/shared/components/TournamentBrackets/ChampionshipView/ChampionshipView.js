import React from "react";
import {View} from "react-native";
import css from "./ChampionshipView.style";
import RoundView from "../RoundView/RoundView";
import {getMatchData,getRoundTitle,setRoundData,getRoundMatches} from "../index";


export default function ChampionshipView(props){
    const {data,onPlayMatch}=props,rounds=getRounds(data);
    const lastindex=rounds.length-1;
    return (
        <View style={[css.championshipview,props.style]} onLayout={props.onLayout}>
            {rounds.map((round,i)=>{
                const isLast=round.isLast=(i===lastindex);
                return <RoundView
                    style={isLast&&({flex:1})}
                    key={`round${i}`}
                    round={round}
                    connected={i}
                    renderMatch={props.renderMatch}
                    connectorStyle={{
                        width:isLast?0:undefined,
                        style:{flex:1},
                        height:25*(2**(i+1)),
                        strokeWidth:(props.strokeWidth||3)/i,
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
    const {participants}=data;
    const rounds=new Array(Math.floor(Math.log2(participants&&participants.length))).fill(null).map(()=>({}));
    for(let i=0;i<rounds.length;i++){
        const round=rounds[i];
        let participantIds=null;
        if(i){
            const {matches}=rounds[i-1];
            participantIds=matches.map(({winnerId,participantIds})=>winnerId&&participantIds.find(id=>id===winnerId));
        }
        else{
            participantIds=data.participants.map(({id})=>id);
        }
        setRoundData(round,i,data);
        round.matches=getRoundMatches({participantIds,matchrefs:round.matches});
    }
    const max=rounds.length;
    rounds.forEach((round,i)=>{
        if(!round.title){
            round.title=getRoundTitle(i,max);
        }
        round.matches=round.matches.map(match=>getMatchData(match,data));
    });
    return rounds;
};

/* const getGenuineRounds=(rounds)=>{
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
} */
