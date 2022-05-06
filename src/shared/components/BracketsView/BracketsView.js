import React,{useRef} from "react";
import {ScrollView} from "react-native";
import css from "./BracketsView.style";
import RoundView from "./RoundView/RoundView";


export default function BracketsView(props){
    const {data}=props;
    return (
        <ScrollView
            style={css.bracketsview}
            contentContainerStyle={css.container}
            horizontal={true}
        >
            {getRoundViews(data.matches)}
        </ScrollView>
    )
}

const getRoundViews=(initials)=>{
    const roundviews=[];
    let matches=initials,i=0;
    while(matches.length>1){
        if(i>0){
            matches=getNextRoundMatches(matches);
        }
        roundviews.push(<RoundView key={`r${i}`} round={{title:`round ${i+1}`}} matches={matches}/>);
        i++;
    }
    return roundviews;
}

const getNextRoundMatches=(prevs=[])=>{
    let matches=new Array(Math.floor(prevs.length/2)).fill(null).map(()=>[]);
    prevs.forEach((match,i)=>{
        matches[Math.floor(i/2)].push(match);
    });
    matches=matches.map(([first,second])=>({
        id:`${first.id||""}${second.id||""}`,
        participants:[
            first.participants.find(({isWinner})=>isWinner),
            second.participants.find(({isWinner})=>isWinner),
        ].map(participant=>({...participant,isWinner:true})),
    }));
    return matches;
}
