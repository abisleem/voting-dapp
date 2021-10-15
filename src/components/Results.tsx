import { resolve } from 'path/posix';
import { useEffect, useState } from 'react';
import { Form, Button } from "react-bootstrap";
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { ELECTION_ABI, ELECTION_ADDRESS } from '../config';
import Candidate from '../models/Candidate';

function Results() {
  
  const [accountId, setAccountId] = useState<string>("");
  const [contractABI, setContractABI] = useState<Contract>({} as Contract);
  
  const [candidates, setCandidates] = useState<Array<Candidate>>([]);

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

  const renderedCandidates = candidates?.map((candidate) => {
    return (
      <li key={candidate.id}>
        {candidate.name} | {candidate.voteCount}
      </li>
    );
  });
  return (
    <div className="container">
      <h4> Account Id: {accountId} </h4>
        <ul>
          {renderedCandidates}
        </ul>
    </div>
  );
}

export default Results;