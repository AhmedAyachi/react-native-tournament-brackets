import React,{useRef,useState} from "react";
import {ScrollView,View} from "react-native";
import css from "./DoubleEliminationView.style";
import SectionView from "./SectionView/SectionView";
import RoundView from "../RoundView/RoundView";
import * as H from "./Hooks";


export default function DoubleEliminationView(props){
    const {onPlayMatch}=props;
    const {championship,elimination,finalround}=H.useData(props.data);
    const [grandfinalshown,setGrandFinalShown]=useState(false);
    const lastmatchYs=useRef([]).current;
    const refs={
        col1:useRef(null),
    };
    
    return (
        <ScrollView style={[css.doubleeliminationView,props.style]} contentContainerStyle={css.container}>
            <ScrollView contentContainerStyle={css.container} horizontal={true}>
                <View style={css.col0}>
                    {[championship,elimination].map((item,i)=>(
                        <SectionView {...props}
                            key={i} data={item}
                            onPlayMatch={onPlayMatch&&((params)=>{
                                params.round.isChampionship=!Boolean(i);
                                onPlayMatch(params);
                            })}
                            onHeaderLayout={i?null:((params)=>{
                                const col1El=refs.col1.current;
                                if(col1El){
                                    const {height}=params.nativeEvent.layout;
                                    col1El.setNativeProps({style:{paddingTop:height}});
                                }
                            })}
                            onRoundOffset={({pageYs})=>{
                                lastmatchYs.push(pageYs[0]);
                                (lastmatchYs.length===2)&&setGrandFinalShown(true);
                            }}
                        />
                    ))}
                </View>
                <View ref={refs.col1} style={css.col1}>
                    {grandfinalshown&&
                        <RoundView
                            round={finalround}
                            renderMatch={props.renderMatch}
                            connected={true}
                            connectorStyle={{
                                height:lastmatchYs[1]-lastmatchYs[0],
                                strokeWidth:(lastmatchYs[1]-lastmatchYs[0])*(0.15+props.strokeWidth*0.15)/824,
                                stroke:props.stroke,
                            }}
                            onPlayMatch={onPlayMatch&&((match)=>{
                                onPlayMatch({match,round:finalround});
                            })}
                        />
                    }
                </View>
            </ScrollView>
        </ScrollView>
    )
}

DoubleEliminationView.defaultProps={
    strokeWidth:2,
}

const sections=[

];
