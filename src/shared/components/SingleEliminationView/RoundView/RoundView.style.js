import {StyleSheet} from "react-native";
import {border,rem} from "css";


const css=StyleSheet.create({
    roundview:{
        alignItems:"center",
        paddingHorizontal:2*rem,
        marginHorizontal:0.25*rem,
        backgroundColor:"rgba(0,0,0,0.05)",
    },
    row0:{
        width:"100%",
        paddingVertical:1*rem,
    },
    row1:{
        flex:1,
        justifyContent:"space-around",
    },
    header:{
        width:"100%",
        paddingVertical:0.5*rem,
        paddingHorizontal:1*rem,
        backgroundColor:"rgba(0,0,0,0.15)",
        borderRadius:0.2*rem,
    },
    title:{
        textTransform:"capitalize",
        fontWeight:"700",
        textAlign:"center",
    },
});

export default css;
