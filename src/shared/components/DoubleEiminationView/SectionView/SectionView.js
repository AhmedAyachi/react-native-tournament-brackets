import React from "react";
import {View,Text} from "react-native";
import css from "./SectionView.style";
import SingleEliminationView from "../../SingleEliminationView/SingleEliminationView";


export default function SectionView(props){
    const {data,isElimination,onPlayMatch}=props,{title}=data;
    return (
        <View style={css.sectionview}>
            {title&&
                <Text style={css.title}>{title}</Text>
            }
            <SingleEliminationView {...props}
                style={{backgroundColor:css.sectionview.backgroundColor}}
                //untilRoundIndex={isElimination&&0}
                data={data}
                onPlayMatch={onPlayMatch}
            />
        </View>
    )
}
