import {StyleSheet} from "react-native";
import {rem,border} from "css";


const css=StyleSheet.create({
    doubleeiminationview:{
        width:"100%",
        height:"100%",
        //flexDirection:"column-reverse",
    },
    container:{
        justifyContent:"flex-start",
        alignItems:"flex-start",
    },
    col0:{
        height:"100%",
        paddingTop:1*rem,
    },
    col1:{
        width:5*rem,
        height:"100%",
        backgroundColor:"red",
    },
});

export default css;
