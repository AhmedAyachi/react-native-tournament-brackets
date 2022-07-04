import React from "react";
import {View,Text} from "react-native";
import css from "./SectionView.style";
import ChampionshipView from "../../ChampionshipView/ChampionshipView";
import EliminationView from "./EliminationView/EliminationView";


export default function SectionView(props){
    const {data,isElimination}=props,{title}=data;
    return (
        <View style={css.sectionview}>
            {title&&
                <Text style={css.title}>{title}</Text>
            }
            {(isElimination?EliminationView:ChampionshipView)({
                ...props,
                rounds:data.rounds,
                style:{backgroundColor:css.sectionview.backgroundColor},
            })}
        </View>
    )
}
