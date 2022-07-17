import React from "react";
import {View,Text} from "react-native";
import css from "./SectionView.style";
import ChampionshipView from "../../ChampionshipView/ChampionshipView";
import EliminationView from "./EliminationView/EliminationView";


export default function SectionView(props){
    const {data,isElimination}=props,{title}=data;
    console.log(data);
    return (
        <View style={css.sectionview} /* onLayout={props.onLayout} */>
            {title&&
                <Text style={css.title} onLayout={props.onHeaderLayout}>{title}</Text>
            }
            <EliminationView
                {...props}
                onLayout={props.onContentLayout}
                style={{backgroundColor:css.sectionview.backgroundColor}}
            />
            {/* {(isElimination?EliminationView:ChampionshipView)({
                ...props,
                onLayout:props.onContentLayout,
                style:{backgroundColor:css.sectionview.backgroundColor},
            })} */}
        </View>
    )
}
