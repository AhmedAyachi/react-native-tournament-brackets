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
    return (
        <ScrollView style={css.eliminationview} contentContainerStyle={css.container} horizontal={true}>
            {rounds.map((round,i)=>(
                <RoundView
                    key={i}
                    round={round}
                    //connected={i}
                />
            ))}
        </ScrollView>
    )
}
