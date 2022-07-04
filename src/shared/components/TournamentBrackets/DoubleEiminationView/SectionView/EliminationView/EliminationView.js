import React from "react";
import {ScrollView,Text} from "react-native";
import css from "./EliminationView.style";
import RoundView from "../../../RoundView/RoundView";
import {getMatchData} from "../../../index";


export default function EliminationView(props){
    const {data}=props,{rounds}=data;
    rounds.forEach(round=>{
        round.matches=round.matches.map(match=>getMatchData(match,data));
    });
    console.log(rounds);
    let height=25;
    let index=0;
    return (
        <ScrollView style={css.eliminationview} contentContainerStyle={css.container} horizontal={true}>
            {rounds.map((round,i)=>{
                const straight=i&&rounds[i-1].matches.length===round.matches.length;
                if(!straight){
                    height*=2;
                    index++;
                }
                return (
                    <RoundView
                        key={i}
                        round={round}
                        connectorStyle={{
                            straight,
                            height:straight?100:height,
                            strokeWidth:(props.strokeWidth||3)/(straight?1:(index-1)),
                            stroke:props.stroke,
                        }}
                        connected={i}
                    />
                )
            })}
        </ScrollView>
    )
}
