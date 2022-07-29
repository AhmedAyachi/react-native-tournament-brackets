import {useMemo} from "react";
import {getChampionShipRounds,setRoundsMatches} from "../index";


export const useTournament=(data)=>useMemo(()=>{
    data.rounds=getChampionShipRounds(data);
    setRoundsMatches(data);
    return data;
},[data]);
