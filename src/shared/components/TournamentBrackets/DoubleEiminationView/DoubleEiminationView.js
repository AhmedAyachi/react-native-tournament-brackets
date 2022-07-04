import React,{useRef,useEffect,useState} from "react";
import {ScrollView} from "react-native";
import css from "./DoubleEiminationView.style";
import SectionView from "./SectionView/SectionView";
import {useId,isLog2,getRoundTitle,getMatchData} from "../index";//length


export default function DoubleEiminationView(props){
    const {onPlayMatch,data}=props,elimrounds=useRef([]).current;
    const [ready,setReady]=useState(false);
    useEffect(()=>{
        setElimRoundsMatches(elimrounds,data);
        //setReady(true);
    },[]);
    return (
        <ScrollView style={[css.doubleeiminationview,props.style]} contentContainerStyle={css.container}>
            <SectionView {...props}
                data={{title:"championship",...data.championship,participants:data.participants}}
                onPlayMatch={(params)=>{
                    setElimRounds({elimrounds,params});
                    if(ready&&onPlayMatch){
                        params.round.isChampionship=true;
                        onPlayMatch(params);
                    }
                }}
            />
            {ready&&
                <SectionView {...props}
                    isElimination={true}
                    data={{title:"elimination",rounds:elimrounds,participants:data.participants}}
                    onPlayMatch={onPlayMatch&&((params)=>{
                        params.round.isChampionship=false;
                        onPlayMatch(params);
                    })}
                />
            }
        </ScrollView>
    )
}

const setElimRoundsMatches=(elimrounds,data)=>{
    for(let i=0;i<elimrounds.length;i++){
        let elimround=elimrounds[i],{loserIds}=elimround;
        if(i){
            const {matches}=elimrounds[i-1];
            const prevloserIds=matches.map(({winnerId,participantIds})=>winnerId&&participantIds.find(id=>id===winnerId));
            if(isLog2(matches.length+loserIds.length)){
                prevloserIds.forEach((prevloserId,i)=>{
                    loserIds.splice(2*i+1,0,prevloserId);
                });
            }
            else{
                elimround={id:`b${elimround.id}`,matches:null};
                loserIds=prevloserIds;
                elimrounds.splice(i,0,elimround);
            }
        }
        const {elimination}=data;
        setElimRound(elimround,i,elimination);
        elimround.matches=getElimRoundMatches({loserIds,matchrefs:elimround.matches});
    }
    const max=elimrounds.length+1;
    elimrounds.forEach((elimround,i)=>{
        if(!elimround.title){
            elimround.title=getRoundTitle(i,max);
        }
        elimround.matches=elimround.matches.map(match=>getMatchData(match,data));
        console.log(elimround);
    });
}

const setElimRound=(elimround,i,elimination)=>{
    if(elimination){
        const roundrefs=elimination.rounds;
        if(Array.isArray(roundrefs)&&roundrefs.length){
            const roundref=roundrefs.find(({index})=>(typeof(index)==="number")&&(i===index))||roundrefs[i];
            roundref&&Object.assign(elimround,roundref);
        }
    }
    delete elimround.loserIds;
    elimround.id=`e${elimround.id}`;
}

const getElimRoundMatches=({loserIds,matchrefs})=>{
    const length=Math.round(loserIds.length/2),matches=new Array(length).fill(null).map(()=>({
        id:useId("em"),
        participantIds:[],
    }));
    matchrefs=Array.isArray(matchrefs)&&matchrefs.length&&matchrefs.filter(matchref=>matchref&&(typeof(matchref)==="object"));
    //Set loserIds order using elimination object
    matchrefs&&sortLoserIds(loserIds,matchrefs);
    //Set matches participantIds property
    loserIds.forEach((loserId,i)=>{
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

const sortLoserIds=(loserIds,matchrefs)=>{
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
//Search for a match by index then participantIds then winnerId
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
    if((!match)&&((-1<i)&&(i<matchref.length))){
        match=matches[i];
    }
    return match;
}

const setElimRounds=({elimrounds,params})=>{
    const {match:{participants},round}=params,{id}=round,elimround=elimrounds.find(round=>round.id===id);
    const matchPlayed=participants.some(participant=>participant&&participant.isWinner);
    const loser=matchPlayed&&participants.find(participant=>participant&&!participant.isWinner);
    const loserId=loser&&loser.id;
    if(elimround){
        elimround.loserIds.push(loserId);
    }
    else{
        const elimround={id,loserIds:[loserId]};
        elimrounds.push(elimround);
    }
}
