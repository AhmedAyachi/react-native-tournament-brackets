import {StyleSheet} from "react-native";
import {rem} from "../../index.style";


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
});

export default css;
