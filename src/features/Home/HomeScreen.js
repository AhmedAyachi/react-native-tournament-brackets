// Packages
import React from 'react';
// UI lib components
import { Button, Text } from 'react-native-ui-lib';
// Local UI components
// Components:
import { SingleEliminationView } from 'components';
import data from 'data';
import ScreenContainer from '../../shared/components/organisms/ScreenContainer';

function HomeScreen({ navigation }) {
  return (
    <ScreenContainer>
      <SingleEliminationView data={data} />
    </ScreenContainer>
  );
}

export default HomeScreen;
