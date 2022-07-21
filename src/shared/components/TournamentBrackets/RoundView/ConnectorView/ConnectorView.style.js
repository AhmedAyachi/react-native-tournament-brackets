import {StyleSheet} from "react-native";
import {rem,border} from "css";


const css=StyleSheet.create({
    connectorview:{
        flex:1,
        marginRight:0.3*rem,
        ...border(1,"solid","red"),
    },
});

export default css;
