import React,{useRef,useState} from "react";
import {View} from "react-native";
import css from "./TournamentView.style";
import RoundView from "../RoundView/RoundView";
import {getMatchData,getRoundTitle} from "../index";


export default function TournamentView(props){
    const {data,onPlayMatch}=props,{rounds}=data;
    const [connected,setConnected]=useState(false);
    const offsets=useRef([]).current;
    setRoundMatches(data);
    let index=0;
    //console.log("render",rounds);
    return (
        <View style={[css.tournamentview,props.style]}>
            {rounds&&rounds.map((round,i)=>{
                const straight=i&&rounds[i-1].matches.length===round.matches.length;
                if(i&&(!straight)){
                    index++;
                }
                return (
                    <RoundView
                        key={i}
                        style={props.roundStyle}
                        round={round}
                        connected={i&&connected}
                        renderMatch={props.renderMatch}
                        onMatchOffset={(!straight)&&(offset=>{
                            offsets.push(offset);
                            (!connected)&&setConnected(offsets.length===rounds.length);
                            //setOffsets([...offsets,offset]);
                        })}
                        connectorStyle={{
                            straight,
                            //height:straight?undefined:css.height*(2**(index+1)),
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
