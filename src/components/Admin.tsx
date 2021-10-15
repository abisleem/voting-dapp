import { useEffect, useState } from 'react';
import { Form, Button } from "react-bootstrap";
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract/types'
import { ELECTION_ABI, ELECTION_ADDRESS } from '../config';

function Admin() {
  const [accountId, setAccountId] = useState<string>("");
  const [contractABI, setContractABI] = useState<Contract>({} as Contract);

  useEffect(() => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    web3.eth.getAccounts().then(accounts => {
      setAccountId(accounts[0]);
    });
    const electionContract = new web3.eth.Contract(ELECTION_ABI as any, ELECTION_ADDRESS);
    setContractABI(electionContract);
  }, []);


  const handleSubmitOpenCloseTime = (e: any) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.currentTarget);
      const openTime = formData.get('openTime') as string;
      const closeTime = formData.get('closeTime') as string;
      
      contractABI.methods.setOpenAndCloseTimes(Number(openTime), Number(closeTime)).send({ from: accountId })
        .on('receipt', (receipt: any) => {
          console.log('receipt', receipt);
        })
        .on('error', function (error: any, receipt: any) {
          console.error('error', error);
          console.error('receipt', receipt);
        });
      
    } catch (e) {
      console.error(e);
    }
  }

  const handleAddCandidate = (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const candidateName = formData.get('name') as string;
      console.log('candidateName', candidateName);
      
      contractABI.methods.addOfficialCandidate(candidateName).send({ from: accountId })
        .on('receipt', (receipt: any) => {
          console.log('receipt', receipt);
          contractABI.methods.candidatesCount().call({ from: accountId }, (error: any, candidateCount: any) => {
            console.log('cadidate count: ', candidateCount);
          });
        })
        .on('error', function (error: any, receipt: any) {
          console.error('error', error);
          console.error('receipt', receipt);
        });      
    } catch (e) {
      console.error(e);
    }
    
  }

  return (
    <div className="container">
      <h4> Account Id: {accountId} </h4>

      <Form className="container" onSubmit={handleSubmitOpenCloseTime}>
        <Form.Group>
          <Form.Label>Open Time</Form.Label>
          <Form.Control name="openTime" className="form-control" placeholder="Open Time" />
        </Form.Group>
        <Form.Group>
          <Form.Label>Close Time </Form.Label>
          <Form.Control name="closeTime" className="form-control" placeholder="Close Time" />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Submit Open/Close Times
        </Button>
      </Form>

      <br></br>

      <Form className="container" onSubmit={handleAddCandidate}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control name="name" className="form-control" placeholder="Name" />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Add Official Candidate
        </Button>
      </Form>

    </div>
  );
}

export default Admin;