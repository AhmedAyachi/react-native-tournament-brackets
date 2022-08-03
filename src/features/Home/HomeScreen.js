// Packages
import React from 'react';
// UI lib components
import { Button, Text } from 'react-native-ui-lib';
// Local UI components
// Components:
import {
  SingleEliminationView,
  DoubleEliminationView,
  MatchTestView,
} from 'components';
import { data } from 'shared';
import ScreenContainer from '../../shared/components/organisms/ScreenContainer';

function HomeScreen({ navigation }) {
  return (
    <ScreenContainer>
      {/* <DoubleEliminationView
                data={data.double}
                //stroke="#f067a0"
                //strokeWidth={1}
                //renderMatch={MatchTestView}
            /> */}
      <SingleEliminationView
        data={data.single}
        stroke="black"
        strokeWidth={2}
      />
    </ScreenContainer>
  );
}

export default HomeScreen;
