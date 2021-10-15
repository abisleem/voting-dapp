import { useEffect, useState } from "react";
import { Button, Form, FormCheck } from "react-bootstrap"
import Candidate from "../models/Candidate";
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { ELECTION_ABI, ELECTION_ADDRESS } from '../config';

function Vote() {
  const [accountId, setAccountId] = useState<string>("");
  const [contractABI, setContractABI] = useState<Contract>({} as Contract);
  
  const [candidates, setCandidates] = useState<Array<Candidate>>([]);
  
  const [checked, setChecked] = useState<number>(0);
  const [disabledInput, setDisabledInput] = useState<boolean>(true);

  useEffect(() => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    web3.eth.getAccounts().then(accounts => {
      setAccountId(accounts[0]);
    });
    const electionContract = new web3.eth.Contract(ELECTION_ABI as any, ELECTION_ADDRESS);
    setContractABI(electionContract);
    initializeCandidates(electionContract).then((candidates => { setCandidates(candidates); }));
  }, []);

  const initializeCandidates = (electionContract: Contract): Promise<Array<Candidate>> => {
    return new Promise(resolve => {
      const candidates: Array<Candidate> = [];
      electionContract.methods.candidatesCount().call({ from: accountId }).then((candidatesCount: number) => {
        for (var idx = 1; idx <= candidatesCount; idx++) {
          electionContract.methods.candidates(idx).call({ from: accountId }).then((candidate: any) => {
            candidates.push(candidate);
            if (candidate.id === candidatesCount) {
              resolve(candidates)
            }
          });
        }
      });
    })
  }

  const castVote = async (e: any) => {
    e.preventDefault();
    console.log(checked)
    if (checked !== 0) {
      if (checked === -1) {
        const formData = new FormData(e.currentTarget);
        const otherCandidate = formData.get('otherCandidate');
        console.log(otherCandidate);
        if (otherCandidate !== '') {
          contractABI.methods.voteForCandidateName(otherCandidate).send({ from: accountId })
          .on('receipt', (receipt: any) => {
            console.log('receipt', receipt);
          })
          .on('error', function (error: any, receipt: any) {
            console.error('error', error);
            console.error('receipt', receipt);
          });
        }
      }
      else {
        contractABI.methods.voteForOfficialCandidate(checked).send({ from: accountId })
        .on('receipt', (receipt: any) => {
          console.log('receipt', receipt);
        })
        .on('error', function (error: any, receipt: any) {
          console.error('error', error);
          console.error('receipt', receipt);
        });
      }
    }
  }

  return (
    <div className="container">
      <h4> Account Id: {accountId} </h4>
      <Form className="container" onSubmit={castVote}>
        <div>
          {candidates?.map((candidate) => (
            <FormCheck 
              key={candidate.id}
              value={candidate.id}
              type="radio"
              name="group1"
              label={candidate.name}
              onClick={() => {
                setChecked(Number(candidate.id));
                setDisabledInput(true);
              }}
            />
          ))}
          <FormCheck
              inline
              key={candidates.length + 1 + ""}
              type="radio"
              name="group1"
              label="Other"
              onClick={() => {
                setChecked(-1);
                setDisabledInput(false);
              }}
          />
          <Form.Control
            size="sm"
            type="text"
            name="otherCandidate"
            placeholder="Other"
            disabled={disabledInput}
          />
        </div>
        <Button variant="primary" type="submit" className="mt-3">
            Cast Vote
        </Button>
      </Form>
    </div>
 
  )
}

export default Vote;