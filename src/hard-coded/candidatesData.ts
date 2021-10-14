import Candidate from "../models/Candidate";
import * as uuid from "uuid";

export const candidatesData: Array<Candidate> = [
  {
    id: uuid.v4(),
    name: 'Lefty Left',
    party: 'l',
    voteCount: 100
  },
  {
    id: uuid.v4(),
    name: 'Lefty Second',
    party: 'l',
    voteCount: 25
  },
  {
    id: uuid.v4(),
    name: 'Lefty Loser',
    party: 'l',
    voteCount: 0
  },
  {
    id: uuid.v4(),
    name: 'Righty Right',
    party: 'r',
    voteCount: 100
  },
  {
    id: uuid.v4(),
    name: 'Righty Second',
    party: 'r',
    voteCount: 25
  },
  {
    id: uuid.v4(),
    name: 'Righty Loser',
    party: 'r',
    voteCount: 0
  },
  {
    id: uuid.v4(),
    name: 'Indy Independent',
    party: 'i',
    voteCount: 100
  },
  {
    id: uuid.v4(),
    name: 'Indy Second',
    party: 'i',
    voteCount: 25
  },
  {
    id: uuid.v4(),
    name: 'Indy Loser',
    party: 'i',
    voteCount: 0
  }
]