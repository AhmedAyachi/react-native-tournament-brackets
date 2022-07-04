import {StyleSheet} from "react-native";
import {border,rem} from "css";


const css=StyleSheet.create({
    roundview:{
        alignItems:"center",
        paddingHorizontal:0.2*rem,
    },
    row0:{
        width:"100%",
        paddingVertical:1*rem,
    },
    row1:{
        flex:1,
        justifyContent:"space-around",
        alignItems:"center",
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
    section:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    },
});

export default css;
