// Packages
import React from 'react';
// UI lib components
import { Button, Text } from 'react-native-ui-lib';
// Local UI components
// Components:
import {
  SingleEliminationView,
  DoubleEiminationView,
  MatchTestView,
} from 'components';
import { data } from 'shared';
import ScreenContainer from '../../shared/components/organisms/ScreenContainer';

function HomeScreen({ navigation }) {
  return (
    <ScreenContainer>
      <DoubleEiminationView data={data.double} />
      {/* <SingleEliminationView
                data={data.single}
                stroke="orange"
                strokeWidth={2}
                //renderMatch={MatchTestView}
            /> */}
    </ScreenContainer>
  );
}

export default HomeScreen;
