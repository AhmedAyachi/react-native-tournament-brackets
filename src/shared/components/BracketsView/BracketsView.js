import React from "react";
import {View,Text} from "react-native";
import css from "./BracketsView.style";


export default function BracketsView(props){
    return (
        <View style={css.bracketsview}>
            <Text>Message from BracketsView component</Text>
        </View>
    )
}
