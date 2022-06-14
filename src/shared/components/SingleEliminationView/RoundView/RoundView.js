/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import css from './RoundView.style';
import MatchView from './MatchView/MatchView';
import ConnectorView from './ConnectorView/ConnectorView';

export default function RoundView(props) {
  const { round, connected, connectorStyle, renderMatch } = props,
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
            <View style={css.section} key={`section${i}`}>
              {connected ? <ConnectorView {...connectorStyle} /> : <></>}
              {renderMatch({ match, onPlay: props.onPlayMatch })}
            </View>
          ))}
      </View>
    </View>
  );
}

RoundView.defaultProps = {
  renderMatch: MatchView,
};
