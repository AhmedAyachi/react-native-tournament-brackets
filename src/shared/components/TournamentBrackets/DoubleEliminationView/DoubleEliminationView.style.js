import {StyleSheet} from "react-native";
import {rem} from "../index.style";


const css=StyleSheet.create({
    doubleeliminationView:{
        width:"100%",
        height:"100%",
        backgroundColor:"rgba(0,0,0,0.05)",
    },
    container:{
        justifyContent:"flex-start",
        alignItems:"flex-start",
    },
    col0:{
        height:"100%",
        alignItems:"flex-end",
    },
    col1:{
        height:"115%",
        justifyContent:"flex-start",
        alignItems:"flex-start",
    },
    finalconnectorheight:0.65*rem,
    strokewidthfrac:1/(89*rem),
});

export default css;
