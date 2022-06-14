import React from "react";
import {View,Text} from "react-native";
import css from "./MatchTestView.style";


export default function MatchTestView(props){
    const {match}=props,{participants}=match;
    return (
        <View style={css.matchtestview}>
            {participants.map((participant,i)=>participant&&(
                <Text key={`participant${i}`} style={css.name}>{participant.name||""}</Text>
            ))}
        </View>
    )
}
