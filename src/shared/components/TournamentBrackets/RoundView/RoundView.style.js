import {StyleSheet} from "react-native";
import {rem} from "css";


const css=StyleSheet.create({
    roundview:{
        alignItems:"center",
        paddingHorizontal:0.2*rem,
    },
    row0:{
        width:"100%",
    },
    row1:{
        width:"100%",
        flex:1,
        justifyContent:"space-around",
        alignItems:"flex-start",
    },
    title:{
        width:"100%",
        textTransform:"capitalize",
        fontWeight:"700",
        textAlign:"center",
        paddingVertical:0.5*rem,
        paddingHorizontal:1*rem,
        borderRadius:0.2*rem,
        backgroundColor:"rgba(0,0,0,0.15)",
    },
    section:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    },
});

export default css;
