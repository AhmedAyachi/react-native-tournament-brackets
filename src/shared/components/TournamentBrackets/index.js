

export const useId=(startsWith)=>(startsWith||"")+"_"+Math.random().toString(36).slice(2);

export const setRoundData=(round,i,data)=>{
    if(data){
        const roundref=getRoundRef(i,data.rounds);
        roundref&&Object.assign(round,roundref);
    }
    delete round.loserIds;
    round.id=`r${i}`;
    round.index=i;
}

const getRoundRef=(i,roundrefs)=>{
    let roundref=null;
    if(Array.isArray(roundrefs)&&roundrefs.length){
        roundref=roundrefs.find(({index})=>(typeof(index)==="number")&&(i===index))||roundrefs[i];
    }
    return roundref;
}

export const getRoundMatches=({participantIds,matchrefs})=>{
    const length=Math.round(participantIds.length/2),matches=new Array(length).fill(null).map(()=>({
        id:useId("em"),
        participantIds:[],
    }));
    matchrefs=Array.isArray(matchrefs)&&matchrefs.length&&matchrefs.filter(matchref=>matchref&&(typeof(matchref)==="object"));
    //Set participantIds order using elimination object
    matchrefs&&sortParticipantIds(participantIds,matchrefs);
    //Set matches participantIds property
    participantIds.forEach((loserId,i)=>{
        const match=matches[Math.floor(i/2)],{participantIds}=match;
        if(participantIds.length<2){
            participantIds.push(loserId);
        }
    });
    //Set match extra data using user elimination object
    matchrefs&&matchrefs.forEach((matchref,i)=>{
        const match=findTargetMatch(matchref,i,matches);
        if(match){
            delete matchref.participantIds;
            Object.assign(match,matchref);
        }
    });
    return matches;
}

const sortParticipantIds=(loserIds,matchrefs)=>{
    const length=Math.round(loserIds.length/2);
    matchrefs.forEach(matchref=>{
        const {index}=matchref;
        if(index<length){
            const {participantIds}=matchref;
            if(Array.isArray(participantIds)&&participantIds.length){
                const {length}=loserIds;
                participantIds.forEach((participantId,i)=>{
                    let found=false,j=0;
                    while((!found)&&(j<length)){
                        if(loserIds[j]===participantId){
                            const k=(index*2+i)%loserIds.length;
                            [loserIds[j],loserIds[k]]=[loserIds[k],loserIds[j]];
                            found=true;
                        }
                        j++;
                    }
                });
            }
        }
    });
}

const findTargetMatch=(matchref,i,matches)=>{
    let match;
    const {index}=matchref;
    if((-1<index)&&(index<matches.length)){
        match=matches[index];
    }
    else{
        const {participantIds}=matchref;
        if(Array.isArray(participantIds)&&participantIds.length){
            match=matches.find(match=>participantIds.every(id=>match.participantIds.includes(id)));
        }
        if(!match){
            const {winnerId}=matchref;
            if(winnerId){
                match=matches.find(({participantIds})=>participantIds.includes(winnerId));
            }
        }
    }
    if((!match)&&((-1<i)&&(i<matches.length))){
        match=matches[i];
    }
    return match;
}

export const getRoundTitle=(index,length)=>{
    const frac=length-1-index;
    switch(frac){
        case 0:return "final";
        case 1:return "semi-Finals";
        case 2:return "quarter-Finals";
        default:return `1/${2**frac}-Finals`
    }
}

export const getMatchData=(matchref,data,opponents)=>{
    const match={...matchref},participantIds=opponents?opponents:matchref.participantIds;
    match.participants=participantIds.map(participantId=>participantId&&({...data.participants.find(participant=>participant.id===participantId)}));
    if(participantIds.length>=2){
        const {winnerId}=match;
        const winner=winnerId&&match.participants.find(participant=>participant&&(participant.id===winnerId));
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
