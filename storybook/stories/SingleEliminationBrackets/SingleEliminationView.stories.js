import React from "react";
import {SingleEliminationView} from "components";
import {storiesOf} from "@storybook/react-native";
import {data} from "shared";


storiesOf("SingleEliminationBrackets",module).add("Default",()=>(
    <SingleEliminationView data={data.single}/>
))
