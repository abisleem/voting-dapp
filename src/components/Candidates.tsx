import { useEffect, useState } from 'react';
import Candidate from '../models/Candidate'
import CandidatesService from '../services/CandidatesService';
import CandidatesByParty from './CandidatesByParty';

function Candidates() {
  const [leftCandidates, setLeftCandidates] = useState<Array<Candidate>>([]);
  const [rightCandidates, setRightCandidates] = useState<Array<Candidate>>([]);
  const [indyCandidates, setIndyCandidates] = useState<Array<Candidate>>([]);

  useEffect(() => {
    let subscribed = true;
    CandidatesService.getCandidatesByParty().then(map => {
      if (subscribed) initiaizeCandidates(map);
    })
    return () => { subscribed = false };
  }, []);

  const initiaizeCandidates = (candidatesMap: Record<string, Array<Candidate>>) => {
    setLeftCandidates(candidatesMap['l']);
    setRightCandidates(candidatesMap['r']);
    setIndyCandidates(candidatesMap['i']);
  }


  return (
    <div className="container">

      <div className="row">
        <CandidatesByParty candidates={leftCandidates} partyName="Left Party" colorClass="danger" imageUri="https://spng.subpng.com/20180820/ggw/kisspng-elephants-decal-clip-art-silhouette-lion-soylent-red-elephant-icon-free-soylent-red-anima-5b7b618382a503.0284379415348125475351.jpg"/>
        <CandidatesByParty candidates={rightCandidates} partyName="Right Party" colorClass="primary" imageUri="https://spng.subpng.com/20190715/cg/kisspng-democratic-party-clip-art-republican-party-politic-issues-rothe-for-highlands-ranch-5d2c4666d46081.5285912915631826948699.jpg"/>
        <CandidatesByParty candidates={indyCandidates} partyName="Indy Party" colorClass="success" imageUri="https://spng.subpng.com/20191005/pto/transparent-plane-5d98b5e4cea757.1292515515702891248465.jpg"/>
      </div>
    </div>
  );
}

export default Candidates;