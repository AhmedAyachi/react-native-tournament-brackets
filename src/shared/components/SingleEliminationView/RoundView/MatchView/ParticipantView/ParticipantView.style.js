import {StyleSheet} from "react-native";
import {rem,border} from "css";


const css=StyleSheet.create({
    participantview:{
        width:"100%",
        flexDirection:"row",
        borderRadius:0.25*rem,
        marginVertical:0.25*rem,
        overflow:"hidden",
    },
    col0:{
        flex:1,maxWidth:10*rem,
        justifyContent:"center",
        alignItems:"flex-start",
        paddingVertical:0.5*rem,
        paddingLeft:0.5*rem,
        overflow:"hidden",
    },
    col1:{
        width:4*rem,
        paddingVertical:0.5*rem,
        paddingHorizontal:0.5*rem,
        overflow:"hidden",
    },
    name:{
        textTransform:"capitalize",
        textAlign:"left",
        color:"white",
        
    },
    status:{
        textTransform:"capitalize",
        textAlign:"right",
        color:"white",
    },
});

export default css;
