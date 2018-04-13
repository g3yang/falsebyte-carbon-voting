import React, { Component } from 'react'
import TransferModel from './models/TransferModel';
import VoteModel from './models/VoteModel';
import Transfer from './components/Transfer';
import Vote from './components/Vote';


import {Tabs, Tab} from 'material-ui/Tabs';


const styles ={
    root:{
      margin: 'auto',
      width: '60%'
    }
}

let transferModel = new TransferModel();
let voteModel = new VoteModel();



class App extends Component{
    constructor(props){
        super(props);
        this.state ={
            tabIndex: 0
        };
    }

    handleTabChange = (value) => {
        this.setState({
          tabIndex:value
        });
    }

    
    
    render(){
       
        return (
            <div style={styles.root}>
                <h1> Carbon Voting Application </h1>
                <div>
                    <Tabs value={this.state.tabIndex} onChange={this.handleTabChange}>
                        <Tab label="Coin Transfer" value ={0}>
                            <Transfer model ={transferModel} />
                        </Tab>
                        <Tab label="Vote" value = {1}>
                            <Vote model={voteModel} />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }

}

export default App;