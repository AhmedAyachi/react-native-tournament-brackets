import React from "react";
import {ScrollView} from "react-native";
import css from "./BracketsView.style";
import RoundView from "./RoundView/RoundView";


export default function BracketsView(props){
    const {data,onPlayMatch}=props,rounds=getRounds(data);
    let spacing=75;
    return (
        <ScrollView
            style={css.bracketsview}
            contentContainerStyle={css.container}
            horizontal={true}
        >
            {rounds.map((round,i)=>{
                spacing=(spacing+50*(i-1));
                return (
                    <RoundView
                        spacing={i?spacing:0}
                        key={`round${i}`}
                        round={round}
                        onWinMatch={onPlayMatch&&((match)=>{
                            onPlayMatch({match,round});
                        })}
                    />
                )
            })}
        </ScrollView>
    )
}
const getRounds=(data)=>{
    const roundrefs=data.rounds;
    let opponentIds=null;
    return roundrefs.map((roundref,i)=>{
        let {matches}=roundref;
        if(opponentIds){
            matches=getSortMatches(matches,opponentIds);
        }
        const round={
            title:`round ${i+1}`,
            ...roundref,
            matches:matches.map((matchref,i)=>matchref&&getMatchData(matchref,data,opponentIds&&opponentIds[i])),
        };
        if(round.matches.length>1){
            opponentIds=getNextRoundopponentIds(round.matches);
        }
        return round;
    });
};

const getMatchData=(matchref,data,opponents)=>{
    const match={...matchref},participantIds=opponents||matchref.participantIds;
    match.participants=participantIds.map(participantId=>({...data.participants.find(participant=>participant.id===participantId)}));
    const winner=match.participants.find(({id})=>id===match.winnerId);
    if(winner){
        winner.isWinner=true;
        match.status="played";
    }
    else if(!match.status){
        match.status="pending";
    }
    delete match.winnerId;
    delete match.participantIds;
    return match;
}

const getNextRoundopponentIds=(matches)=>{
    const nextRoundopponents=new Array(Math.round(matches.length/2)).fill(null).map(()=>[]);
    const excludedmatchIds=[];
    matches.forEach((match,i)=>{
        if(match&&(!excludedmatchIds.includes(i))){
            const winner=match.participants.find(({isWinner})=>isWinner);
            if(winner){
                nextRoundopponents[Math.floor(i/2)].push(winner.id);
            }
            else{
                excludedmatchIds.push(i+1);
            }
        }
    });
    return nextRoundopponents;
}

const getSortMatches=(matches=[],idpairs=[])=>{
    const sorted=idpairs.map(idpair=>matches.find(match=>idpair.includes(match.winnerId)));
    return sorted;
}
