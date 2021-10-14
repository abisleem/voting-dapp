import { Form, Button } from "react-bootstrap";
import Candidate from "../models/Candidate";
import CandidatesService from "../services/CandidatesService";
import * as uuid from "uuid";

function NewCandidate() {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const candidate: Candidate = {
      id: uuid.v4(),
      name: `${formData.get('firstName')} ${formData.get('lastName')}`,
      voteCount: 0,
      party: formData.get('party')?.toString() || 'l'
    }
    CandidatesService.addCandidate(candidate)
  }

  return (
    <Form className="container" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control name="firstName" className="form-control" placeholder="First Name" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Control name="lastName" className="form-control" placeholder="Last Name" />
      </Form.Group>
      <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Select name="party" className="custom-select">
          <option value="l">Left</option>
          <option value="r">Right</option>
          <option value="i">Indy</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Add Candidate
      </Button>
    </Form>
  );
}

export default NewCandidate;