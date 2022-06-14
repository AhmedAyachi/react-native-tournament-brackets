import React from "react";
import {SingleEliminationView,MatchTestView} from "components";
import {storiesOf} from "@storybook/react-native";
import data from "data";


storiesOf("SingleEliminationBrackets",module).add("Custom",()=>(
    <SingleEliminationView
        data={data}
        stroke="orange"
        strokeWidth={2}
        renderMatch={MatchTestView}
    />
))
