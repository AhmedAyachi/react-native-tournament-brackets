import {StyleSheet} from "react-native";
import {rem} from "css";


const css=StyleSheet.create({
    sectionview:{
        width:"100%",
        flex:1,
    },
    title:{
        fontSize:2*rem,
        fontWeight:"700",
        textTransform:"capitalize",
        padding:1*rem,
    },
    round:{
        marginHorizontal:0.2*rem,
    }
});

export default css;
