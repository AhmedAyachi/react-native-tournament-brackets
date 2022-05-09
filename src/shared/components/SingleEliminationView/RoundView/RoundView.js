import React from 'react';
import { View, Text } from 'react-native';
import css from './RoundView.style';
import MatchView from './MatchView/MatchView';

export default function RoundView(props) {
  const { round, onPlayMatch, spacing } = props,
    { matches } = round;
  return (
    <View style={css.roundview}>
      <View style={css.row0}>
        <Text style={css.title}>{round.title}</Text>
      </View>
      <View style={css.row1}>
        {matches &&
          matches.map((match, i) =>
            match ? (
              <MatchView
                style={getSpacingStyle(spacing)}
                key={`m${i + 1}`}
                match={match}
                onPlay={onPlayMatch}
              />
            ) : (
              <Text style={[css.space, getSpacingStyle(spacing)]}>
                Empty space
              </Text>
            ),
          )}
      </View>
    </View>
  );
}

const getSpacingStyle = (initial) => ({ marginVertical: initial });
