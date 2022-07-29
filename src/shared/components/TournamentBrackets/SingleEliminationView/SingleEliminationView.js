import React from "react";
import {ScrollView} from "react-native";
import css from "./SingleEliminationView.style";
import TournamentView from "../TournamentView/TournamentView";
import {getChampionShipRounds,setRoundsMatches} from "../index";


export default function SingleEliminationView(props){
    const {data}=props;
    data.rounds=getChampionShipRounds(data);
    setRoundsMatches(data);
    return (
        <ScrollView style={[css.singleeliminationview,props.style]} contentContainerStyle={css.container}>
            <ScrollView contentContainerStyle={css.container} horizontal={true}>
                <TournamentView {...props}/>
            </ScrollView>
        </ScrollView>
    )
}
