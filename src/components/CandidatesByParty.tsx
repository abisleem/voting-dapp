import Candidate from "../models/Candidate"

interface CandidatesByPartyProps {
  candidates: Array<Candidate>,
  partyName: string,
  colorClass: string,
  imageUri: string
}

function CandidatesByParty(props: CandidatesByPartyProps) {
  const candidatesList = props.candidates?.map((candidate, i) => {
    if (i === 0) {
      return (
        <li key={candidate.id}>
          <div className="card">
            <img className="card-img-top" src={props.imageUri} alt="Card cap" />
            <div className="card-body">
              <h5 className={"card-title " + "text-" + props.colorClass}>{candidate.name}</h5>
              <p className="card-text">{candidate.voteCount} Votes</p>
            </div>
          </div>
        </li>
      );
    }
    return <li key={candidate.id}>{candidate.name} | {candidate.voteCount} Votes</li>
  });

  return (
    <div className="col-4">
      <h1>{props.partyName}</h1>
      <ul>
        {candidatesList}
      </ul>
    </div>
  );
}

export default CandidatesByParty