import {StyleSheet} from "react-native";
import {rem,border} from "css";


const css=StyleSheet.create({
    roundview:{
        justifyContent:"flex-start",
        alignItems:"center",
        marginHorizontal:0.3*rem,
        //...border(1,"solid","red"),
    },
    row0:{
        width:"100%",
        justifyContent:"center",
        alignItems:"center",
        paddingVertical:0.5*rem,
        borderRadius:0.2*rem,
        backgroundColor:"rgba(0,0,0,0.15)",
        overflow:"hidden",
    },
    row1:{
        width:"100%",
        flex:1,
        justifyContent:"space-around",
        alignItems:"flex-start",
        overflow:"hidden",
    },
    title:{
        textTransform:"capitalize",
        fontWeight:"700",
        textAlign:"center",
        marginHorizontal:1*rem,
    },
    section:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        overflow:"hidden",
    },
    matchcontainer:{
        justifyContent:"center",
        alignItems:"center",
        marginVertical:1*rem,
    },
});

export default css;
