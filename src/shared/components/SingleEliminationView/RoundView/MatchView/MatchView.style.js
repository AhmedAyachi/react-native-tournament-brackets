import {StyleSheet} from "react-native";
import {border,rem} from "css";


const css=StyleSheet.create({
    matchview:{
        justifyContent:"center",
        alignItems:"center",
        marginVertical:1*rem,
        overflow:"hidden",
    },
    row0:{
        width:"100%",
    },
    row1:{
        width:"100%",
    },
    date:{
        fontWeight:"700",
    },
    status:{
        fontWeight:"700",
        textTransform:"capitalize",
        color:"orangered",
    },
});

export default css;
