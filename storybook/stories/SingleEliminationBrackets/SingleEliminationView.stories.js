import React from 'react';
import { SingleEliminationView } from 'components';
import { storiesOf } from '@storybook/react-native';
import data from 'data';

storiesOf('SingleEliminationBrackets', module).add(
  'SingleEliminationView',
  () => <SingleEliminationView data={data} />,
);
