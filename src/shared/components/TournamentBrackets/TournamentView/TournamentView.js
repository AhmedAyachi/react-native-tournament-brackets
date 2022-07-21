import React from "react";
import {View} from "react-native";
import css from "./TournamentView.style";
import RoundView from "../RoundView/RoundView";
import {getMatchData,getRoundTitle} from "../index";


export default function TournamentView(props){
    const {data,onPlayMatch}=props,{rounds}=data;
    setRoundMatches(data);
    let index=0;
    return (
        <View style={[css.tournamentview,props.style]}>
            {rounds&&rounds.map((round,i)=>{
                const straight=i&&rounds[i-1].matches.length===round.matches.length;
                if(i&&(!(straight))){
                    index++;
                }
                return (
                    <RoundView
                        key={i}
                        style={props.roundStyle}
                        round={round} connected={i}
                        renderMatch={props.renderMatch}
                        connectorStyle={{
                            straight,
                            height:straight?undefined:css.height*(2**(index+1)),
                            strokeWidth:(props.strokeWidth||3)/(straight?0.65:index),
                            stroke:props.stroke,
                        }}
                        onPlayMatch={onPlayMatch&&((match)=>{
                            onPlayMatch({match,round});
                        })}
                    />
                )
            })}
        </View>
    )
}

const setRoundMatches=(data)=>{
    const {rounds}=data,max=rounds.length;
    rounds.forEach((round,i)=>{
        if(round.title===undefined){
            round.title=getRoundTitle(i,max);
        }
        round.matches=(round.matches||[]).map(match=>getMatchData(match,data));
    });
};
