import React from "react";
import {View,Text} from "react-native";
import css from "./MatchView.style";


export default function MatchView(props){
    const {match:{participants}}=props;
    return (
        <View style={css.matchview}>
            {participants.map((participant,i)=>(
                <Text key={`p${i}`}>{participant.name}</Text>
            ))}
        </View>
    )
}
