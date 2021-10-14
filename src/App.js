import './App.css';
import AppRouter from './components/AppRouter';
import Web3 from 'web3'
import { ELECTION_ABI, ELECTION_ADDRESS } from './config'

function App() {
  return (
    <AppRouter></AppRouter>
  );
}

async function loadBlockchainData() {
  console.log(Web3.givenProvider);
  const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
  const accounts = await web3.eth.getAccounts()
  // this.setState({ account: accounts[0] }) // TODO: view account id in page
  const electionContract = new web3.eth.Contract(ELECTION_ABI, ELECTION_ADDRESS);
  // this.setState({ electionContract });  // Add this to state
  console.log("electionContract", electionContract);
  const openTime = Math.floor(Date.now() / 1000);
  const closeTime = openTime + 180;

  const candidateCount = await electionContract.methods.candidatesCount().call();
  console.log(candidateCount);

}

export default App;