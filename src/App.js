import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import { ELECTION_ABI, ELECTION_ADDRESS } from './config'
// import TodoList from './TodoList'

class App extends Component {

  componentWillMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    console.log(Web3.givenProvider);
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const electionContract = new web3.eth.Contract(ELECTION_ABI, ELECTION_ADDRESS);
    this.setState({ electionContract });
    console.log("electionContract", electionContract);
    const openTime = Math.floor(Date.now() / 1000);
    const closeTime = openTime + 180;

    const candidateCount = await electionContract.methods.candidatesCount().call();
    console.log(candidateCount);

    // this.setState({ taskCount })
    // for (var i = 1; i <= taskCount; i++) {
    //   const task = await todoList.methods.tasks(i).call()
    //   this.setState({
    //     tasks: [...this.state.tasks, task]
    //   })
    // }
    // this.setState({ loading: false })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: ''
    }

  }

  render() {
    return (
      <div>
        <h1> Hello World </h1>
        <p>Account: {this.state.account}</p>
      </div>
    );
  }
}

export default App;