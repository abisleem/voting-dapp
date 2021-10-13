import { useEffect, useState } from 'react';
import Candidate from '../models/Candidate'
import CandidatesService from '../services/CandidatesService';

function Candidates() {
  const [candidates, setCandidates] = useState<Array<Candidate>>([]);

  useEffect(() => {
    CandidatesService.getCandidates().then(candidates => {
      setCandidates(candidates);
    })
  });

  const listItems = candidates.map(candidate =>
    <li key={candidate.id}>{candidate.name}</li>
  );

  return (
    <div>
      <ul>{listItems}</ul>
    </div>
  );
}

export default Candidates;