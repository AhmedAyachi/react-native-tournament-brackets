import React,{useRef,useEffect,useState} from "react";
import {ScrollView,View} from "react-native";
import css from "./DoubleEliminationView.style";
import SectionView from "./SectionView/SectionView";
import RoundView from "../RoundView/RoundView";
import {isLog2,getRoundTitle,getMatchData,setRoundData,getRoundMatches} from "../index";


export default function DoubleEliminationView(props){
    const {onPlayMatch,data}=props,{refs,elimrounds,finalround}=useRef({
        elimrounds:[],
        finalround:{matches:[{participants:[]}]},
        refs:{
            col1:useRef(null),
        },
    }).current;
    const [ready,setReady]=useState(false);
    useEffect(()=>{
        setElimRoundsMatches(elimrounds,data);
        setFinalRoundParticipants(finalround,elimrounds[elimrounds.length-1]);
        const {final}=data;
        final&&setFinalRound(finalround,final);
        setReady(true);
    },[]);
    return (
        <ScrollView style={[css.doubleeliminationView,props.style]} contentContainerStyle={css.container}>
            <ScrollView contentContainerStyle={css.container} horizontal={true}>
                <View style={css.col0}>
                    <SectionView {...props}
                        data={{title:"championship",...data.championship,participants:data.participants}}
                        onPlayMatch={(params)=>{
                            const {round}=params;
                            setElimRounds({elimrounds,params});
                            round.isLast&&setFinalRoundParticipants(finalround,round);
                            if(ready&&onPlayMatch){
                                params.round.isChampionship=true;
                                onPlayMatch(params);
                            }
                        }}
                        onHeaderLayout={(params)=>{
                            if(ready){
                                const col1El=refs.col1.current;
                                if(col1El){
                                    const {height}=params.nativeEvent.layout;
                                    col1El.setNativeProps({style:{paddingTop:height}});
                                }
                            }
                        }}
                        /* onContentLayout={(params)=>{
                            console.log(params.nativeEvent.layout);
                        }} */
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
                </View>
                <View ref={refs.col1} style={css.col1}>
                    {ready&&
                        <RoundView
                            round={finalround}
                            renderMatch={props.renderMatch}
                            /* connected={true}
                            connectorStyle={{
                                height:37.75*(2**(4)),
                                strokeWidth:(props.strokeWidth||3)/4,
                                stroke:props.stroke,
                            }} */
                            onPlayMatch={onPlayMatch&&((match)=>{
                                onPlayMatch({match,round:finalround});
                            })}
                        />
                    }
                </View>
            </ScrollView>
        </ScrollView>
    )
}

const setElimRoundsMatches=(elimrounds,data)=>{
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
        const {elimination}=data;
        setRoundData(elimround,i,elimination);
        elimround.matches=getRoundMatches({participantIds:loserIds,matchrefs:elimround.matches});
    }
    const max=elimrounds.length+1;
    elimrounds.forEach((elimround,i)=>{
        if(!elimround.title){
            elimround.title=getRoundTitle(i,max);
        }
        elimround.matches=elimround.matches.map(match=>getMatchData(match,data));
    });
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

const setFinalRoundParticipants=(finalround,round)=>{
    const {matches}=round;
    const fmatch=matches[0];
    finalround.matches[0].participants.push(fmatch.participants.find(participant=>participant&&participant.isWinner));
}

const setFinalRound=(finalround,final)=>{
    const {match}=final;
    ["participants","participantIds"].forEach(key=>{
        delete match[key];
    });
    Object.assign(finalround.matches[0],match);
    delete final.match;
    Object.assign(finalround,final);
    if(!finalround.title){
        finalround.title="final";
    }
    finalround.isFinal=true;
}
