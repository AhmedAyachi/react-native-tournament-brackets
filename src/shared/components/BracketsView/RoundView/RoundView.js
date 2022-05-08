import React,{useEffect} from "react";
import {View,Text} from "react-native";
import css from "./RoundView.style";
import MatchView from "./MatchView/MatchView";


export default function RoundView(props){
    const {round}=props,{matches}=round;
    return (
        <View style={css.roundview}>
            <View style={css.row0}>
                <Text style={css.title}>{round.title}</Text>
            </View>
            <View style={css.row1}>
                {matches&&matches.map((match,i)=>(
                    <MatchView key={`m${i}`} match={match}/>
                ))}
            </View>
        </View>
    )
}
