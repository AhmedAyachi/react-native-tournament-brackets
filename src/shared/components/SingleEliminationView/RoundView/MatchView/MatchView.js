import React,{useEffect} from "react";
import {View,Text} from "react-native";
import css from "./MatchView.style";
import ParticipantView from "./ParticipantView/ParticipantView";


export default function MatchView(props){
    const {match,onPlay}=props,{participants}=match;
    useEffect(()=>{
        (match.status==="played")&&onPlay&&onPlay(match);
    },[]);
    return (
        <View style={[css.matchview,props.style]}>
            <View style={css.row0}>
                <Text style={css.date}>{match.date}</Text>
            </View>
            <View style={css.row1}>
                {participants.map((participant,i)=>(
                    <ParticipantView
                        style={{backgroundColor:participant.isWinner?"green":"red"}}
                        key={`participant${i+1}`}
                        participant={participant}
                    />
                ))}
            </View>
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
