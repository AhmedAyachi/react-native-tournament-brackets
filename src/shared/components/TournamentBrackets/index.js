

export const useId=(startsWith)=>(startsWith||"")+"_"+Math.random().toString(36).slice(2);

export const getMatchData=(matchref,data,opponents)=>{
    const match={...matchref},participantIds=opponents?opponents:matchref.participantIds;
    match.participants=participantIds.map(participantId=>participantId&&({...data.participants.find(participant=>participant.id===participantId)}));
    if(participantIds.length>=2){
        const {winnerId}=match;
        const winner=winnerId&&match.participants.find(({id})=>id===winnerId);
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

export const areEqualArrays=(array0,array1)=>{
    let areEqual=true;
    const {length}=array0;
    if(length===array1.length){
        let i=0;
        while(areEqual&&(i<length)){
            if(!array1.includes(array0[i])){
                areEqual=false;
            }
            i++;
        }
    }
    else{
        areEqual=false;
    }
    return areEqual;
}

//Can it be written in 2x2x2x....x2 format 
export const isLog2=(number)=>{
    //it should be divided by 2 (number of participants per match) but as it's log2 division won't actually make a difference;
    const log2=Math.log2(number /* devided by 2 */);
    return log2===Math.floor(log2);
}
