import React, { useRef } from 'react';
import { ScrollView, View } from 'react-native';
import css from './DoubleEliminationView.style';
import SectionView from './SectionView/SectionView';
import RoundView from '../RoundView/RoundView';
import * as H from './Hooks';

export default function DoubleEliminationView(props) {
  const { onPlayMatch } = props;
  const { championship, elimination, ready, finalround } = H.useData(
    props.data,
  );
  const refs = {
    col1: useRef(null),
  };

  return (
    <ScrollView
      style={[css.doubleeliminationView, props.style]}
      contentContainerStyle={css.container}
    >
      <ScrollView contentContainerStyle={css.container} horizontal={true}>
        <View style={css.col0}>
          <SectionView
            {...props}
            data={championship}
            onPlayMatch={(params) => {
              const { round } = params;
              if (ready && onPlayMatch) {
                round.isChampionship = true;
                onPlayMatch(params);
              }
            }}
            onHeaderLayout={(params) => {
              if (ready) {
                const col1El = refs.col1.current;
                if (col1El) {
                  const { height } = params.nativeEvent.layout;
                  col1El.setNativeProps({ style: { paddingTop: height } });
                }
              }
            }}
          />
          {ready && (
            <SectionView
              {...props}
              data={elimination}
              onPlayMatch={
                onPlayMatch &&
                ((params) => {
                  params.round.isChampionship = false;
                  onPlayMatch(params);
                })
              }
            />
          )}
        </View>
        <View ref={refs.col1} style={css.col1}>
          {ready && (
            <RoundView
              round={finalround}
              renderMatch={props.renderMatch}
              /* connected={true}
                            connectorStyle={{
                                height:37.75*(2**(4)),
                                strokeWidth:(props.strokeWidth||3)/4,
                                stroke:props.stroke,
                            }} */
              onPlayMatch={
                onPlayMatch &&
                ((match) => {
                  onPlayMatch({ match, round: finalround });
                })
              }
            />
          )}
        </View>
      </ScrollView>
    </ScrollView>
  );
}
