/* eslint-disable no-multi-assign */
import { useEffect, useState, useMemo } from 'react';
import {
  isLog2,
  getChampionShipRounds,
  setRoundData,
  getRoundMatches,
} from '../index';

export const useData = (data) => {
  const championship = JSON.parse(
    useMemo(() => JSON.stringify(getChampionshipData(data)), [data]),
  );
  const [ready, setReady] = useState(false),
    state = useMemo(
      () => ({
        elimrounds: getElimRounds(championship),
        finalround: getFinalRound(championship, data),
      }),
      [data],
    ),
    { elimrounds, finalround } = state;
  useEffect(() => {
    setElimRoundsMatches(elimrounds, data);
    setFinalRoundParticipants(finalround, elimrounds, data.participants);
    setReady(true);
  }, []);
  return {
    ...state,
    ready,
    championship,
    elimination: {
      title: 'elimination',
      rounds: elimrounds,
      participants: data.participants,
    },
  };
};

const getChampionshipData = (data) => {
  const championship = {
    title: 'championship',
    ...data.championship,
    participants: data.participants,
  };
  const rounds = (championship.rounds = getChampionShipRounds(championship));
  const lasti = rounds.length - 1;
  rounds.forEach((round, i) => {
    if (round.title === undefined) {
      round.title = i === lasti ? 'championship final' : `Round ${i + 1}`;
    }
  });
  return championship;
};

const getElimRounds = (championship) => {
  const { rounds } = championship;
  const elimrounds = rounds.map((round) => ({
    id: `e${round.id}`,
    loserIds: [],
  }));
  rounds.forEach((round, i) => {
    const elimround = elimrounds[i];
    round.matches.forEach((match) => {
      const { winnerId, participantIds } = match,
        matchPlayed = participantIds.some((id) => winnerId === id);
      const loserId =
        matchPlayed && participantIds.find((id) => winnerId !== id);
      elimround.loserIds.push(loserId);
    });
  });

  return elimrounds;
};

const setElimRoundsMatches = (elimrounds, data) => {
  for (let i = 0; i < elimrounds.length; i++) {
    let elimround = elimrounds[i],
      { loserIds } = elimround;
    if (i) {
      const { matches } = elimrounds[i - 1];
      const prevwinnerIds = matches.map(
        ({ winnerId, participantIds }) =>
          winnerId && participantIds.find((id) => id === winnerId),
      );
      if (isLog2(matches.length + loserIds.length)) {
        prevwinnerIds.forEach((prevloserId, i) => {
          loserIds.splice(2 * i + 1, 0, prevloserId);
        });
      } else {
        elimround = { id: `b${elimround.id}`, matches: null };
        loserIds = prevwinnerIds;
        elimrounds.splice(i, 0, elimround);
      }
    }
    const { elimination } = data;
    setRoundData(elimround, i, elimination);
    elimround.matches = getRoundMatches({
      participantIds: loserIds,
      matchrefs: elimround.matches,
    });
  }
  const lasti = elimrounds.length - 1;
  elimrounds.forEach((elimround, i) => {
    if (elimround.title === undefined) {
      elimround.title = i === lasti ? 'elimination final' : `Round ${i + 1}`;
    }
    delete elimround.loserIds;
  });
};

const getFinalRound = (championship, data) => {
  const finalref = data.final;
  const matchref = finalref && finalref.match;
  const round = { matches: [{ ...(matchref || {}), participants: [] }] },
    { rounds } = championship;
  setFinalRoundParticipants(round, rounds, data.participants);
  round.isFinal = true;
  if (!round.title) {
    round.title = 'grand final';
  }
  return round;
};

const setFinalRoundParticipants = (finalround, rounds, participants) => {
  const championfinal = rounds[rounds.length - 1].matches[0];
  const winnerId = championfinal.participantIds.find(
    (id) => id === championfinal.winnerId,
  );
  const participant = participants.find(({ id }) => id === winnerId);
  finalround.matches[0].participants.push(participant);
};
