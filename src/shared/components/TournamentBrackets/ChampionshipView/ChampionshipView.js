import React from "react";
import {View} from "react-native";
import css from "./ChampionshipView.style";
import RoundView from "../RoundView/RoundView";


export default function ChampionshipView(props){
    const {rounds,onPlayMatch,untilRoundIndex}=props;
    let height=25;
    return (
        <View style={css.championshipview}>
            {rounds.map((round,i)=>{
                height*=2;
                return ((untilRoundIndex===undefined)||(i<=untilRoundIndex))?<RoundView
                    key={`round${i}`}
                    round={round}
                    connected={i>0}
                    renderMatch={props.renderMatch}
                    connectorStyle={{
                        height,strokeWidth:(props.strokeWidth||3)/i,
                        stroke:props.stroke,
                    }}
                    onPlayMatch={onPlayMatch&&((match)=>{
                        onPlayMatch({match,round});
                    })}
                />:<></>
            })}
        </View>
    )
}
