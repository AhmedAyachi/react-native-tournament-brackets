import React,{useEffect} from "react";
import {View,Text} from "react-native";
import css from "./MatchView.style";


export default function MatchView(props){
    const {match,onPlay}=props,{participants}=match;
    useEffect(()=>{
        onPlay&&onPlay({
            winner:participants.find(({isWinner})=>isWinner),
            loser:participants.find(({isWinner})=>!isWinner),
        });
    },[]);
    return (
        <View style={[css.matchview,{backgroundColor:getStatusColor(match.status)}]}>
            {participants.map((participant,i)=>(
                <Text key={`p${i}`} style={{color:participant.isWinner?"green":"red"}}>{participant.name}</Text>
            ))}
        </View>
    )
}

const getStatusColor=(status)=>{
    switch(status){
        case "played":return "orange";
        case "live":return "khaki";
        case "pending":return "dodgerblue";
        default:return "grey";
    }
}
