import React,{useRef,useEffect,useState,useMemo} from "react";
import {ScrollView,View} from "react-native";
import css from "./DoubleEliminationView.style";
import SectionView from "./SectionView/SectionView";
import RoundView from "../RoundView/RoundView";
import {isLog2,getChampionShipRounds,setRoundData,getRoundMatches,getRoundTitle} from "../index";


export default function DoubleEliminationView(props){
    const {onPlayMatch,data}=props;
    const championship=JSON.parse(useMemo(()=>JSON.stringify(getChampionshipData(data)),[data]));
    const [ready,setReady]=useState(false),state=useRef({
        elimrounds:[],
        finalround:{matches:[{participants:[]}]},
        refs:{
            col1:useRef(null),
        },
    }).current,{refs,elimrounds,finalround}=state;

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
                        data={championship}
                        onPlayMatch={(params)=>{
                            const {round}=params;
                            setElimRounds({elimrounds,params});
                            round.isLast&&setFinalRoundParticipants(finalround,round);
                            if(ready&&onPlayMatch){
                                round.isChampionship=true;
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
                    />
                    {ready&&
                        <SectionView {...props}
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

const getChampionshipData=(data)=>{
    const championship={title:"championship",...data.championship,participants:data.participants};
    const rounds=championship.rounds=getChampionShipRounds(championship);
    const lasti=rounds.length-1;
    rounds.forEach((round,i)=>{
        if(round.title===undefined){
            round.title=i===lasti?"championship final":`Round ${i+1}`;
        }
    });
    return championship;
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
    const lasti=elimrounds.length-1;
    elimrounds.forEach((elimround,i)=>{
        if(elimround.title===undefined){
            elimround.title=i===lasti?"elimination final":`Round ${i+1}`;
        }
        delete elimround.loserIds;
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
    const finalmatch=finalround.matches[0];

    finalmatch.participants.push(fmatch.participants?
        fmatch.participants.find(participant=>participant&&participant.isWinner):
        fmatch.participantIds.find(id=>id===fmatch.winnerId)
    );
}

const setFinalRound=(finalround,final)=>{
    const {match}=final;
    ["participants","participantIds"].forEach(key=>{
        delete match[key];
    });
    Object.assign(finalround.matches[0],match);
    delete final.match;
    Object.assign(finalround,final);
    if(finalround.title===undefined){
        finalround.title="grand final";
    }
    finalround.isFinal=true;
}
