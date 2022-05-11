import React from 'react';
import { View, Text } from 'react-native';
import css from './RoundView.style';
import MatchView from './MatchView/MatchView';

export default function RoundView(props) {
  const { round } = props,
    { matches } = round;
  return (
    <View style={css.roundview}>
      <View style={css.row0}>
        <View style={css.header}>
          <Text style={css.title}>{round.title}</Text>
        </View>
      </View>
      <View style={css.row1}>
        {matches &&
          matches.map((match, i) => (
            <MatchView key={`m${i}`} match={match} onPlay={props.onPlayMatch} />
          ))}
      </View>
    </View>
  );
}
