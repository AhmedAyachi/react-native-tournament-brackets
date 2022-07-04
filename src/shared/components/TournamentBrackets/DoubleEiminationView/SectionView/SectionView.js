import React from "react";
import {View,Text} from "react-native";
import css from "./SectionView.style";
import SingleEliminationView from "../../SingleEliminationView/SingleEliminationView";
import EliminationView from "./EliminationView/EliminationView";


export default function SectionView(props){
    const {data,isElimination,onPlayMatch}=props,{title}=data;
    return (
        <View style={css.sectionview}>
            {title&&
                <Text style={css.title}>{title}</Text>
            }
            {(isElimination?EliminationView:SingleEliminationView)({
                ...props,data,onPlayMatch,
                style:{backgroundColor:css.sectionview.backgroundColor},
            })}
        </View>
    )
}
