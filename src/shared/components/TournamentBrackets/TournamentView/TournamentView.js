import React from "react";
import {View} from "react-native";
import css from "./TournamentView.style";
import RoundView from "../RoundView/RoundView";
import {getMatchData,getRoundTitle} from "../index";


export default function TournamentView(props){
    const {data,onPlayMatch}=props,{rounds}=data;
    setRoundMatches(data);
    let index=0;
    const lastindex=rounds.length-1;
    return (
        <View style={[css.tournamentview,props.style]}>
            {rounds&&rounds.map((round,i)=>{
                const straight=i&&rounds[i-1].matches.length===round.matches.length;
                if(i&&(!(straight))){
                    index++;
                }
                const isLast=round.isLast=(i===lastindex);
                return (
                    <RoundView
                        style={isLast&&({flex:1})}
                        key={i}
                        round={round} connected={i}
                        renderMatch={props.renderMatch}
                        connectorStyle={{
                            //width:isLast?0:undefined,
                            //style:{flex:1},
                            straight,
                            height:straight?undefined:30*(2**(index+1)),
                            strokeWidth:(props.strokeWidth||3)/(straight?1:(index)),
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
