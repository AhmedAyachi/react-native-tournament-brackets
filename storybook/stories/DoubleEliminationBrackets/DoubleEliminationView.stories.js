import React from 'react';
import { DoubleEliminationView } from 'components';
import { storiesOf } from '@storybook/react-native';
import { data } from 'shared';

storiesOf('DoubleEliminationBrackets', module).add('Default', () => (
  <DoubleEliminationView data={data.double} />
));
