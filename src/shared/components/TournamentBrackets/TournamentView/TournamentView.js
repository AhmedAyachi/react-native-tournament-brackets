/* eslint-disable mdx/no-unused-expressions */
import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import css from './TournamentView.style';
import RoundView from '../RoundView/RoundView';

export default function TournamentView(props) {
  const { data, onPlayMatch } = props,
    { rounds } = data;
  const [connected, setConnected] = useState(false);
  const offsets = useRef([]).current;
  let index = 0;
  return (
    <View style={[css.tournamentview, props.style]}>
      {rounds &&
        rounds.map((round, i) => {
          const straight =
            i && rounds[i - 1].matches.length === round.matches.length;
          if (i && !straight) {
            index++;
          }
          return (
            <RoundView
              key={i}
              style={css.roundview}
              round={round}
              connected={i && connected}
              renderMatch={props.renderMatch}
              onMatchOffset={
                !connected &&
                ((offset) => {
                  offsets.push(offset.average);
                  i + 1 === rounds.length && setConnected(true);
                  if (i + 1 === rounds.length) {
                    const { onRoundOffset } = props;
                    onRoundOffset && onRoundOffset(offset);
                  }
                })
              }
              connectorStyle={
                connected && {
                  straight,
                  height: straight || !i ? undefined : offsets[i - 1],
                  strokeWidth: props.strokeWidth / (straight ? 0.65 : index),
                  stroke: props.stroke,
                }
              }
              onPlayMatch={
                onPlayMatch &&
                ((match) => {
                  onPlayMatch({ match, round });
                })
              }
            />
          );
        })}
    </View>
  );
}

TournamentView.defaultProps = {
  strokeWidth: 2,
};
