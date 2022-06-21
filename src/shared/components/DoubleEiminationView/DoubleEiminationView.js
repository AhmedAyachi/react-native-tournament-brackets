/* eslint-disable mdx/no-unused-expressions */
import React, { useRef, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useId } from 'shared';
import css from './DoubleEiminationView.style';
import SingleEliminationView from '../SingleEliminationView/SingleEliminationView';

export default function DoubleEiminationView(props) {
  const { onPlayMatch, data } = props,
    elimrounds = useRef([]).current;
  const [ready, setReady] = useState(false);
  useEffect(() => {
    elimrounds.forEach(setElimRound);
    console.log(elimrounds);
    setReady(true);
  }, []);
  return (
    <ScrollView
      style={css.doubleeiminationview}
      contentContainerStyle={css.container}
    >
      <SingleEliminationView
        {...props}
        data={{ ...data.championship, participants: data.participants }}
        onPlayMatch={(params) => {
          setElimRounds({ elimrounds, params, data });
          if (ready && onPlayMatch) {
            params.round.isChampionship = true;
            onPlayMatch(params);
          }
        }}
      />
      {ready && (
        <SingleEliminationView
          {...props}
          data={{
            title: 'elimination',
            rounds: elimrounds,
            participants: data.participants,
          }}
          onPlayMatch={
            onPlayMatch &&
            ((params) => {
              params.round.isChampionship = true;
              onPlayMatch(params);
            })
          }
        />
      )}
    </ScrollView>
  );
}

const setElimRound = (elimround, i) => {
  const { loserIds } = elimround,
    matchrefs = elimround.matches;
  elimround.matches = i ? [] : getElimRoundMatches({ loserIds, matchrefs });
  delete elimround.loserIds;
  elimround.id = `e${elimround.id}`;
};

const getElimRoundMatches = ({ loserIds, matchrefs }) => {
  const length = Math.round(loserIds.length / 2),
    matches = new Array(length).fill(null).map(() => ({
      id: useId('em'),
      participantIds: [],
    }));
  matchrefs =
    Array.isArray(matchrefs) &&
    matchrefs.length &&
    matchrefs.filter((matchref) => matchref && typeof matchref === 'object');
  // Set loserIds order using elimination object

  matchrefs &&
    matchrefs.forEach((matchref) => {
      const { index } = matchref;
      if (index < length) {
        const { participantIds } = matchref;
        if (Array.isArray(participantIds) && participantIds.length) {
          const { length } = loserIds;
          participantIds.forEach((participantId, i) => {
            let found = false,
              j = 0;
            while (!found && j < length) {
              if (loserIds[j] === participantId) {
                const k = (index * 2 + i) % loserIds.length;
                [loserIds[j], loserIds[k]] = [loserIds[k], loserIds[j]];
                found = true;
              }
              j++;
            }
          });
        }
        delete matchref.participantIds;
      }
    });
  // Set matches participantIds property
  loserIds.forEach((loserId, i) => {
    const match = matches[Math.floor(i / 2)],
      { participantIds } = match;
    if (participantIds.length < 2) {
      participantIds.push(loserId || loserIds[(i + 3) % loserIds.length]);
    }
  });
  // Set match extra data using elimination object
  // Search for a match by index then participantIds then winnerId
  matchrefs &&
    matchrefs.forEach((matchref, i) => {
      let match;
      const { index } = matchref;
      if (index > -1 && index < length) {
        match = matches[index];
      } else {
        const { participantIds } = matchref;
        if (Array.isArray(participantIds) && participantIds.length) {
          match = matches.find((match) =>
            participantIds.every((id) => match.participantIds.includes(id)),
          );
        }
        if (!match) {
          const { winnerId } = matchref;
          if (winnerId) {
            match = matches.find(({ participantIds }) =>
              participantIds.includes(winnerId),
            );
          }
        }
      }
      if (!match && i > -1 && i < matchref.length) {
        match = matches[i];
      }
      match && Object.assign(match, matchref);
    });
  return matches;
};

const setElimRounds = ({ elimrounds, params, data }) => {
  const {
      match: { participants },
      round,
    } = params,
    { id } = round,
    elimround = elimrounds.find((round) => round.id === id);
  const loser = participants.find(
    (participant) => participant && !participant.isWinner,
  );
  const loserId = loser && loser.id;
  if (elimround) {
    elimround.loserIds.push(loserId);
  } else {
    const elimround = { id, title: round.title, loserIds: [loserId] },
      { elimination } = data;
    if (elimination) {
      const refrounds = elimination.rounds;
      if (Array.isArray(refrounds) && refrounds.length) {
        const roundi = round.index;
        const refround =
          refrounds.find(({ index }) => roundi === index) || refrounds[roundi];
        const datai = refround && refround.index;
        if (datai === roundi || !datai) {
          refround;
          Object.assign(elimround, refround);
        }
      }
    }
    elimrounds.push(elimround);
  }
};
