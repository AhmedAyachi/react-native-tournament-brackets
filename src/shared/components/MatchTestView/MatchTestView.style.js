import {StyleSheet} from "react-native";
import {border,rem} from "css";


const css=StyleSheet.create({
    matchtestview:{
        width:10*rem,
        height:5*rem,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"dodgerblue",
        marginVertical:1*rem,
        ...border(1,"solid","black"),
    },
    name:{
        textAlign:"center",
        textTransform:"capitalize",
        color:"black"
    },
});

export default css;
