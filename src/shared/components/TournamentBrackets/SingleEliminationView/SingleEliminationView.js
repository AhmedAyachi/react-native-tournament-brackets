import React from "react";
import {ScrollView} from "react-native";
import css from "./SingleEliminationView.style";
import ChampionshipView from "../ChampionshipView/ChampionshipView";


export default function SingleEliminationView(props){
    return (
        <ScrollView style={[css.singleeliminationview,props.style]} contentContainerStyle={css.container}>
            <ScrollView contentContainerStyle={css.container} horizontal={true}>
                <ChampionshipView {...props}/>
            </ScrollView>
        </ScrollView>
    )
}
