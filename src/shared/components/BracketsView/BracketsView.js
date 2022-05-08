import React from "react";
import {ScrollView} from "react-native";
import css from "./BracketsView.style";
import RoundView from "./RoundView/RoundView";
import {areEqualArrays} from "shared";


export default function BracketsView(props){
    const {data}=props;
    return (
        <ScrollView
            style={css.bracketsview}
            contentContainerStyle={css.container}
            horizontal={true}
        >
            {getRounds(data).map((round,i)=>(
                <RoundView key={`round${i}`} round={round}/>
            ))}
        </ScrollView>
    )
}
const getRounds=(data)=>{
    const roundrefs=data.rounds;
    let nextopponents=null;
    return roundrefs.map((roundref,i)=>{
        let matches=roundref.matchIds.map(matchId=>data.matches.find(({id})=>id===matchId));
        if(nextopponents){
            console.log("nextopponents:",nextopponents);
            matches=getSortMatches(matches,nextopponents);
            console.log("matches:",matches);
        }
        matches=matches.map(({id})=>getMatchFromId(id,data));
        const round={
            title:`round ${i+1}`,
            ...roundref,matches,
        };
        nextopponents=getNextRoundopponents(matches);
        return round;
    });
};

const getMatchFromId=(matchId,data)=>{
    let match=data.matches.find(match=>match.id===matchId);
    if(match){
        match={
            ...match,
            participants:match.participantIds.map(participantId=>({...data.participants.find(participant=>participant.id===participantId)})),
        };
        const winner=match.participants.find(({id})=>id===match.winnerId);
        if(winner){
            winner.isWinner=true;
        }
        delete match.winnerId;
        delete match.participantIds;
    }
    return match;
}

const getNextRoundopponents=(matches)=>{
    const nextRoundopponents=new Array(Math.round(matches.length/2)).fill(null).map(()=>[]);
    matches.forEach((match,i)=>{
        nextRoundopponents[Math.floor(i/2)].push(match.participants.find(({isWinner})=>isWinner).id);
    });
    return nextRoundopponents;
}

const getSortMatches=(matches=[],idpairss=[])=>{
    const sorted=idpairss.map(idpair=>matches.find(match=>areEqualArrays(idpair,match.participantIds)));
    return sorted;
}
