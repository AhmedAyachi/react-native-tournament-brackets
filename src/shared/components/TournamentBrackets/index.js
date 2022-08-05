/* eslint-disable mdx/no-unused-expressions */
/* eslint-disable indent */
/* eslint-disable no-shadow */
export const useId = (startsWith) =>
  `${startsWith || ''}_${Math.random().toString(36).slice(2)}`;

export const getChampionShipRounds = (data) => {
  const { participants } = data;
  const rounds = new Array(
    Math.floor(Math.log2(participants && participants.length)),
  )
    .fill(null)
    .map(() => ({}));
  for (let i = 0; i < rounds.length; i++) {
    const round = rounds[i];
    let participantIds = null;
    if (i) {
      const { matches } = rounds[i - 1];
      participantIds = matches.map(
        ({ winnerId, participantIds }) =>
          winnerId && participantIds.find((id) => id === winnerId),
      );
    } else {
      participantIds = data.participants.map(({ id }) => id);
    }
    setRoundData(round, i, data);
    round.matches = getRoundMatches({
      participantIds,
      matchrefs: round.matches,
    });
  }
  return rounds;
};

export const setRoundData = (round, i, data) => {
  if (data) {
    const { rounds } = data;
    if (Array.isArray(rounds) && rounds.length) {
      const roundi = rounds[i];
      const roundref =
        roundi && roundi.index === undefined
          ? roundi
          : rounds.find(
              ({ index }) => typeof index === 'number' && i === index,
            );
      roundref && Object.assign(round, roundref);
    }
  }
  round.id = `r${i}`;
  round.index = i;
};

export const getRoundMatches = ({ participantIds, matchrefs }) => {
  const length = Math.round(participantIds.length / 2),
    matches = new Array(length).fill(null).map(() => ({
      id: useId('em'),
      participantIds: [],
    }));
  matchrefs =
    Array.isArray(matchrefs) &&
    matchrefs.length &&
    matchrefs.filter((matchref) => matchref && typeof matchref === 'object');
  // Set participantIds order using user data object
  matchrefs && sortParticipantIds(participantIds, matchrefs);
  // Set matches participantIds property
  participantIds.forEach((loserId, i) => {
    const match = matches[Math.floor(i / 2)],
      { participantIds } = match;
    if (participantIds.length < 2) {
      participantIds.push(loserId);
    }
  });
  // Set match extra data using user data object
  matchrefs &&
    matchrefs.forEach((matchref, i) => {
      const match = findTargetMatch(matchref, i, matches);
      if (match) {
        const { id, participantIds } = match;
        Object.assign(match, matchref);
        Object.assign(match, { id, participantIds });
      }
    });
  return matches;
};

const sortParticipantIds = (loserIds, matchrefs) => {
  const length = Math.round(loserIds.length / 2);
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
    }
  });
};

const findTargetMatch = (matchref, i, matches) => {
  let match;
  const { index } = matchref;
  if (index > -1 && index < matches.length) {
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
  if (!match && i > -1 && i < matches.length) {
    match = matches[i];
  }
  return match;
};

export const setRoundsMatches = (data) => {
  const { rounds } = data,
    max = rounds.length;
  rounds.forEach((round, i) => {
    if (round.title === undefined) {
      round.title = getRoundTitle(i, max);
    }
    const { matches } = round;
    matches &&
      matches.forEach((match) => {
        setMatchParticipants(match, data.participants);
      });
  });
};

const getRoundTitle = (index, length) => {
  const frac = length - 1 - index;
  switch (frac) {
    case 0:
      return 'final';
    case 1:
      return 'semi-Finals';
    case 2:
      return 'quarter-Finals';
    default:
      return `1/${2 ** frac}-Finals`;
  }
};

const setMatchParticipants = (matchdata, participants) => {
  const match = matchdata,
    { participantIds } = matchdata;
  match.participants = participantIds
    ? participantIds.map(
        (participantId) =>
          participantId && {
            ...participants.find(
              (participant) => participant.id === participantId,
            ),
          },
      )
    : [];
  if (participantIds && participantIds.length >= 2) {
    const { winnerId } = match;
    const winner =
      winnerId &&
      match.participants.find(
        (participant) => participant && participant.id === winnerId,
      );
    if (winner) {
      winner.isWinner = true;
      match.status = 'played';
    } else {
      match.status = 'pending';
    }
  } else {
    const { participants } = match;
    match.status = 'pending';
    while (participants.length < 2) {
      participants.push(null);
    }
  }
  delete match.winnerId;
  delete match.participantIds;
  return match;
};

export const areEqualArrays = (array0, array1) => {
  const { length } = array0;
  let areEqual = length === array1.length;
  if (areEqual) {
    let i = 0;
    while (areEqual && i < length) {
      if (!array1.includes(array0[i])) {
        areEqual = false;
      }
      i++;
    }
  }
  return areEqual;
};

// Can it be written in 2x2x2x....x2 format
export const isLog2 = (number) => {
  // it should be divided by 2 (number of participants per match) but as it's log2 division won't actually make a difference;
  const log2 = Math.log2(number /* devided by 2 */);
  return log2 === Math.floor(log2);
};
