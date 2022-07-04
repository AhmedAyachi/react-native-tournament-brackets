import {StyleSheet} from "react-native";
import {rem,border} from "css";


const css=StyleSheet.create({
    sectionview:{
        width:"100%",
        flex:1,
        backgroundColor:"rgba(0,0,0,0.05)",
    },
    title:{
        fontSize:2*rem,
        fontWeight:"700",
        textTransform:"capitalize",
        margin:1*rem,
    },
});

export default css;
