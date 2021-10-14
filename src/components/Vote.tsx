import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap"
import Candidate from "../models/Candidate";
import CandidatesService from "../services/CandidatesService";

function Vote() {
  const [options, setOptions] = useState<Array<Candidate>>([]);
  useEffect(() => {
    let subscribed = true;
    CandidatesService.getCandidates().then(candidates => {
      if (subscribed) setOptions(candidates);
    })
    return () => { subscribed = false };
  }, []);

  const castVote = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = formData.get('candidate')?.toString() || '';
    CandidatesService.voteForCandidate(id);
  }

  const selectOptions = options.map(option => (
    <option key={option.id} value={option.id}>{option.name}</option>
  )); 

  return (
      <Form className="container" onSubmit={castVote}>
        <Form.Select name="candidate" className="custom-select">
          {selectOptions}
        </Form.Select>
        <Button variant="primary" type="submit">
          Submit Vote
        </Button>
      </Form>
  )
}

export default Vote;