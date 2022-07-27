import React,{useState,useRef,useEffect} from "react";
import {View,Text} from "react-native";
import css from "./RoundView.style";
import MatchView from "./MatchView/MatchView";
import ConnectorView from "./ConnectorView/ConnectorView";


export default function RoundView(props){
    const {round}=props,{matches}=round;
    const refs=useRef({
        matchcontainers:matches.map(()=>useRef(null)),
    }).current;
    useEffect(()=>{
        const {onMatchOffset}=props;
        onMatchOffset&&useMatchOffset(refs,onMatchOffset);
    },[]);
    return (
        <View style={[css.roundview,props.style]}>
            <View style={css.row0}>
                <Text style={css.title} numberOfLines={1} ellipsizeMode="clip">{round.title}</Text>
            </View>
            <View style={css.row1}>
                {matches&&matches.map((match,i)=>(
                    <View style={css.section} key={`section${i}`}>
                        {props.connected?<ConnectorView {...props.connectorStyle}/>:<></>}
                        <View style={css.matchcontainer} ref={refs.matchcontainers[i]}>
                            {props.renderMatch({match,onPlay:props.onPlayMatch})}
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

const useMatchOffset=(refs,callback)=>{
    const {matchcontainers}=refs;
    new Promise(resolve=>{
        const pageYs=[];
        matchcontainers.forEach(({current},i)=>{
            current.measure((x,y,width,height,pageX,pageY)=>{
                pageYs.push(pageY);
                (pageYs.length===matchcontainers.length)&&resolve(pageYs);
            });
        });
    }).
    then(pageYs=>{
        const heights=[],{length}=pageYs;
        for(let i=1;i<length;i++){
            const pageY=pageYs[i];
            heights.push(pageY-pageYs[i-1]);
        }
        let average=0;
        if(length>1){
            average=heights.reduce(((sum,height)=>sum+height),0)/(length-1);
        }
        callback&&callback(average);
    });
}
