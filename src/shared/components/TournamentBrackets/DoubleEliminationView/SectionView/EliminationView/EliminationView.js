import React from "react";
import {View} from "react-native";
import css from "./EliminationView.style";
import RoundView from "../../../RoundView/RoundView";


export default function EliminationView(props){
    const {data,onPlayMatch}=props,{rounds}=data;
    let height=25,index=0;
    const lastindex=rounds.length-1;
    return (
        <View style={[css.eliminationview,props.style]}>
            {rounds.map((round,i)=>{
                const straight=i&&rounds[i-1].matches.length===round.matches.length;
                if(!straight){
                    height*=2;
                    index++;
                }
                const isFinal=round.isFinal=i===lastindex;
                return (
                    <RoundView
                        style={isFinal&&({flex:1})}
                        key={i}
                        round={round} connected={i}
                        renderMatch={props.renderMatch}
                        connectorStyle={{
                            width:isFinal?0:undefined,
                            //style:{flex:1},
                            straight,
                            height:straight?undefined:height,
                            strokeWidth:(props.strokeWidth||3)/(straight?1:(index-1)),
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
