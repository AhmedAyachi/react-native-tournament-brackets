import {useMemo} from "react";
import {isLog2,getChampionShipRounds,setRoundData,getRoundMatches,setRoundsMatches} from "../index";


export const useData=(data)=>{
    const state=useMemo(()=>{
        const championship=getChampionshipData(data);
        const elimrounds=getElimRounds(championship,data.elimination);
        const finalround=getFinalRound(championship,elimrounds,data);
        return {championship,elimrounds,finalround};
    },[data]);

    return {
        ...state,
        elimination:{title:"elimination",rounds:state.elimrounds,participants:data.participants},
    };
}

const getChampionshipData=(data)=>{
    const championship={title:"championship",...data.championship,participants:data.participants};
    const rounds=championship.rounds=getChampionShipRounds(championship);
    const lasti=rounds.length-1;
    setRoundsMatches({rounds,participants:data.participants});
    rounds.forEach((round,i)=>{
        if(round.title===undefined){
            round.title=i===lasti?"championship final":`Round ${i+1}`;
        }
    });
    return championship;
}

const getElimRounds=(championship,elimination)=>{
    const {rounds}=championship;
    const elimrounds=rounds.map(round=>({id:`e${round.id}`,loserIds:[]}));
    rounds.forEach((round,i)=>{
        const elimround=elimrounds[i];
        round.matches.forEach(match=>{
            const {participants}=match,matchPlayed=participants.some(participant=>participant&&participant.isWinner);
            const loser=matchPlayed&&participants.find(participant=>participant&&!participant.isWinner);
            elimround.loserIds.push(loser&&loser.id);
        });
    });
    setElimRoundsMatches(elimrounds,elimination);
    setRoundsMatches({rounds:elimrounds,participants:championship.participants});
    return elimrounds;
}

const setElimRoundsMatches=(elimrounds,elimination)=>{
    for(let i=0;i<elimrounds.length;i++){
        let elimround=elimrounds[i],{loserIds}=elimround;
        if(i){
            const {matches}=elimrounds[i-1];
            const prevwinnerIds=matches.map(({winnerId,participantIds})=>winnerId&&participantIds.find(id=>id===winnerId));
            if(isLog2(matches.length+loserIds.length)){
                prevwinnerIds.forEach((prevloserId,i)=>{
                    loserIds.splice(2*i+1,0,prevloserId);
                });
            }
            else{
                elimround={id:`b${elimround.id}`,matches:null};
                loserIds=prevwinnerIds;
                elimrounds.splice(i,0,elimround);
            }
        }
        setRoundData(elimround,i,elimination);
        elimround.matches=getRoundMatches({participantIds:loserIds,matchrefs:elimround.matches});
    }
    const lasti=elimrounds.length-1;
    elimrounds.forEach((elimround,i)=>{
        if(elimround.title===undefined){
            elimround.title=i===lasti?"elimination final":`Round ${i+1}`;
        }
        delete elimround.loserIds;
    });
}

const getFinalRound=(championship,elimrounds,data)=>{
    const finalref=data.final;
    let matchref=finalref&&finalref.match;
    const round={matches:[{...(matchref||{}),participants:[]}]};
    setFinalRoundParticipants(round,championship.rounds,data.participants);
    setFinalRoundParticipants(round,elimrounds,data.participants);
    round.isFinal=true;
    if(!round.title){
        round.title="grand final";
    }
    return round;
}

const setFinalRoundParticipants=(finalround,rounds,participants)=>{
    const championfinal=rounds[rounds.length-1].matches[0];
    const championshipwinner=championfinal.participants.find(participant=>participant&&participant.isWinner);
    const participant={...championshipwinner&&participants.find(participant=>participant.id===championshipwinner.id)};
    finalround.matches[0].participants.push(participant);
}
