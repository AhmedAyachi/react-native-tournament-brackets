import React from 'react';
import { View, Text } from 'react-native';
import css from './ParticipantView.style';

export default function ParticipantView(props) {
  const { participant, label } = props;
  return (
    <View style={[css.participantview, props.style]}>
      <View style={[css.col0, { alignItems: label ? 'flex-start' : 'center' }]}>
        <Text style={css.name} numberOfLines={1}>
          {participant.name}
        </Text>
      </View>
      {label && (
        <View style={css.col1}>
          <Text style={css.status} numberOfLines={1}>
            {label}
          </Text>
        </View>
      )}
    </View>
  );
}
