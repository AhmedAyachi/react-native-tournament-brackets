import React from "react";
import {View} from "react-native";
import css from "./EliminationView.style";
import RoundView from "../../../RoundView/RoundView";


export default function EliminationView(props){
    const {data}=props,{rounds}=data;
    let height=25;
    let index=0;
    return (
        <View style={[css.eliminationview,props.style]}>
            {rounds.map((round,i)=>{
                const straight=i&&rounds[i-1].matches.length===round.matches.length;
                if(!straight){
                    height*=2;
                    index++;
                }
                return (
                    <RoundView
                        key={i}
                        round={round} connected={i}
                        renderMatch={props.renderMatch}
                        connectorStyle={{
                            straight,
                            height:straight?100:height,
                            strokeWidth:(props.strokeWidth||3)/(straight?1:(index-1)),
                            stroke:props.stroke,
                        }}
                    />
                )
            })}
        </View>
    )
}
