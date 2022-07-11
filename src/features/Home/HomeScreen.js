// Packages
import React from "react";
// UI lib components
import {Button, Text} from "react-native-ui-lib";
// Local UI components
import ScreenContainer from "../../shared/components/organisms/ScreenContainer";
//Components:
import {SingleEliminationView,DoubleEliminationView,MatchTestView} from "components";
import {data} from "shared";

function HomeScreen({navigation}){
    return (
        <ScreenContainer>
            {/* <DoubleEliminationView
                data={data.double}
                stroke="orange"
                strokeWidth={2}
                //renderMatch={MatchTestView}
            /> */}
            <SingleEliminationView
                data={data.single}
                stroke="orange"
                strokeWidth={2}
                //
            />
        </ScreenContainer>
    );
}

export default HomeScreen;
