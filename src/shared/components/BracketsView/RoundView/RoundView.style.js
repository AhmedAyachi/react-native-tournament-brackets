import {StyleSheet} from "react-native";
import {border,rem} from "css";


const css=StyleSheet.create({
    roundview:{
        alignItems:"center",
        ...border(2,"solid","green"),
    },
    row0:{
        paddingVertical:1*rem,
    },
    row1:{

    },
    title:{
        textTransform:"capitalize",
        fontWeight:"700",
    },
});

export default css;
