import {StyleSheet} from "react-native";
import {border} from "css";


const css=StyleSheet.create({
    matchview:{
        height:50,
        justifyContent:"center",
        alignItems:"center",
        ...border(2,"solid","red"),
    },
});

export default css;
