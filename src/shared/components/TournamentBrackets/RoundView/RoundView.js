import React,{useState} from "react";
import {View,Text} from "react-native";
import css from "./RoundView.style";
import MatchView from "./MatchView/MatchView";
import ConnectorView from "./ConnectorView/ConnectorView";


export default function RoundView(props){
    const {round,connected,connectorStyle,renderMatch}=props,{matches}=round;
    const [height,setHeight]=useState(null);
    return (
        <View style={[css.roundview,props.style]}>
            <View style={css.row0}>
                <Text style={css.title} numberOfLines={1} ellipsizeMode="clip">{round.title}</Text>
            </View>
            <View style={css.row1}>
                {matches&&matches.map((match,i)=>(
                    <View style={css.section} key={`section${i}`}>
                        {connected&&height?<ConnectorView {...connectorStyle} height={height}/>:<></>}
                        <View style={css.matchcontainer} onLayout={({nativeEvent})=>{
                            if(height===null){
                                const {layout}=nativeEvent;
                                setHeight(layout.height+css.matchcontainer.marginVertical);
                            }
                        }}>
                            {renderMatch({match,onPlay:props.onPlayMatch})}
                        </View>
                    </View>
                ))}
            </View>
        </View>
    )
}

RoundView.defaultProps={
    renderMatch:MatchView,
}
