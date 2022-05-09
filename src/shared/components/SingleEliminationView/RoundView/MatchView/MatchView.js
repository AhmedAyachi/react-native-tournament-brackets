/* eslint-disable prettier/prettier */
/* eslint-disable indent */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import css from './MatchView.style';

export default function MatchView(props) {
  const { match, onPlay, style } = props,
    { participants } = match;
  useEffect(() => {
    if (match.status === 'played' && onPlay) onPlay(match);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View
      style={[
        css.matchview,
        { backgroundColor: getStatusColor(match.status) },
        style,
      ]}
    >
      {participants.map((participant, i) => (
        <Text
          key={`p${i + 1}`}
          style={{ color: participant.isWinner ? 'green' : 'red' }}
        >
          {participant.name}
        </Text>
      ))}
    </View>
  );
}

const getStatusColor = (status) => {
  switch (status) {
    case 'played':
      return 'orange';
    case 'live':
      return 'khaki';
    case 'pending':
      return 'dodgerblue';
    default:
      return 'grey';
  }
};
