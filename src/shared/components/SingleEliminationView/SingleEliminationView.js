import React from "react";
import {ScrollView} from "react-native";
import css from "./SingleEliminationView.style";
import RoundView from "./RoundView/RoundView";


export default function SingleEliminationView(props){
    const {data,onPlayMatch}=props,rounds=getRounds(data);
    let height=25;
    return (
        <ScrollView style={css.singleeliminationview} contentContainerStyle={css.container}>
            <ScrollView contentContainerStyle={css.container} horizontal={true}>
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
                        onWinMatch={onPlayMatch&&((match)=>{
                            onPlayMatch({match,round});
                        })}
                    />
                })}
            </ScrollView>
        </ScrollView>
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
            title:`round ${i+1}`,
            ...roundref,
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
    const roundlength=rounds&&rounds.length;
    if(Array.isArray(rounds)&&roundlength){
        const first=rounds[0],{matches}=first;
        if(Array.isArray(matches)){
            const {length}=matches;
            let size=Math.floor((Math.log(length)/Math.log(2)))+1;
            genuine=roundlength===size?rounds:rounds.slice(0,size);
            size=2**(size-1);
            first.matches=length===size?matches:matches.slice(0,size);
        }
        
    }
    return genuine||[];
}

const getMatchData=(matchref,data,opponents)=>{
    const match={...matchref},participantIds=opponents?opponents:matchref.participantIds;
    match.participants=participantIds.map(participantId=>({...data.participants.find(participant=>participant.id===participantId)}));
    if(participantIds.length>=2){
        const winner=match.participants.find(({id})=>id===match.winnerId);
        if(winner){
            winner.isWinner=true;
            match.status="played";
        }
        else{
            match.status="pending";
        }
    }
    else{
        const {participants}=match;
        match.status="pending";
        while(participants.length<2){
            participants.push(null);
        }
    }
    delete match.winnerId;
    delete match.participantIds;
    return match;
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
