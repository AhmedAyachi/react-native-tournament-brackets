import React,{useEffect,useRef} from "react";
import {View,Text} from "react-native";
import css from "./MatchView.style";
import ParticipantView from "./ParticipantView/ParticipantView";


export default function MatchView(props){
    const {match,onPlay}=props,{participants,status}=match;
    const state=useRef({
        isPlayed:status==="played",
    }).current,{isPlayed}=state;
    useEffect(()=>{
        onPlay&&onPlay(match);
    },[]);
    return (
        <View style={[css.matchview,props.style]}>
            <View style={css.row0}>
                <Text style={css.date} numberOfLines={1} ellipsizeMode="clip">{match.date}</Text>
            </View>
            <View style={css.row1}>
                {participants.map((participant,i)=>(
                    <ParticipantView
                        style={{backgroundColor:isPlayed?(participant&&participant.isWinner?"green":"red"):"orangered"}}
                        key={`participant${i+1}`}
                        participant={participant||noparticipant}
                        label={isPlayed&&(participant&&participant.isWinner?"win":"loss")}
                    />
                ))}
                <Text style={css.status} numberOfLines={1}>{isPlayed?"":status}</Text>
            </View>
        </View>
    )
}

const noparticipant={
    name:"",
}

const getStatusColor=(status)=>{
    switch(status){
        case "played":return "orange";
        case "live":return "khaki";
        case "pending":return "dodgerblue";
        default:return "grey";
    }
}
