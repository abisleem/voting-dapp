import { candidatesData } from "../hard-coded/candidatesData"
import Candidate from "../models/Candidate"

export default class CandidatesService {

  static getCandidates(): Promise<Array<Candidate>> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(candidatesData);
      }, 500)
    });
  }

  static getCandidatesByParty(): Promise<Record<string, Array<Candidate>>> {
    // group by party
    const grouped: Record<string, Array<Candidate>> = candidatesData.reduce((acc, obj) => {
      const key = obj.party;
      if (!acc[key]) acc[key] = [];
      acc[key].push(obj)
      return acc
    }, {} as any);

    // sort by vote count
    Object.keys(grouped).forEach(key => {
      grouped[key] = grouped[key].sort((a, b) => b.voteCount - a.voteCount)
    })

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(grouped);
      }, 500)
    });
  }

  static voteForCandidate(id: string): Promise<null> {
    const c = candidatesData.find(c => c.id === id)
    if (c) c.voteCount++;
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(null);
      }, 300)
    })
  }

  static addCandidate(candidate: Candidate): Promise<null> {
    candidatesData.push(candidate);
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(null);
      }, 300)
    })
  }
}


