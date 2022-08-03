import React from 'react';
import { ScrollView } from 'react-native';
import css from './SingleEliminationView.style';
import TournamentView from '../TournamentView/TournamentView';
import * as H from './Hooks';

export default function SingleEliminationView(props) {
  const tournament = H.useTournament({ ...props.data });
  return (
    <ScrollView
      style={[css.singleeliminationview, props.style]}
      contentContainerStyle={css.container}
    >
      <ScrollView contentContainerStyle={css.container} horizontal={true}>
        <TournamentView {...props} data={tournament} />
      </ScrollView>
    </ScrollView>
  );
}
