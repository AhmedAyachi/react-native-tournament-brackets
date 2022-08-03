import React from "react";
import {View,Text} from "react-native";
import css from "./SectionView.style";
import TournamentView from "../../TournamentView/TournamentView";


export default function SectionView(props){
    const {title}=props.data;
    return (
        <View style={css.sectionview}>
            <Text style={css.title} onLayout={props.onHeaderLayout}>{title}</Text>
            <TournamentView {...props} style={{backgroundColor:css.sectionview.backgroundColor}}/>
        </View>
    )
}
