import {StyleSheet} from "react-native";
import {border} from "css";


const css=StyleSheet.create({
    singleeliminationview:{
        width:"100%",
        height:"100%",
        ...border(2,"solid","blue"),
    },
    container:{
        justifyContent:"flex-start",
        alignItems:"flex-start",
    },
});

export default css;
