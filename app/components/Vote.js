import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = {
    dropDown: {
      width: 200,
    },
    button: {
      margin: 10  
    }
};


@observer
export default class Vote extends Component{
    constructor(props){
        super(props);
    }

    @action
    handleAccountChange(event, index, value){
        event.preventDefault();
        this.props.model.fromAddress = value;
    }

    @action
    handleElectionChange(event){
        event.preventDefault();
        this.props.model.electionId = event.target.value;
    }

    @action
    handleChoiceChange(event,value){
        event.preventDefault();
        this.props.model.choice=value;
    }

    @action
    submit(){
        this.props.model.sendVote();
    }

    render(){
        const model = this.props.model;

        if(!model.fromAddress || model.addresses.length == 0){
            return null;
        }

        const accountList = model.addresses.map((address)=>(
            <MenuItem value={address} primaryText={address} />
        ));

        return (
            <div>
                <SelectField value = {model.fromAddress} floatingLabelText="Select Account:"
                    onChange={this.handleAccountChange.bind(this)} autoWidth={true}>
                    {accountList}
                </SelectField>
                <br/>

                <TextField value = {model.electionId} 
                    floatingLabelText="Enter Election Id: "
                    onChange={this.handleElectionChange.bind(this)}
                />
                <br/>
                <br/>

                <p> Select your vote: </p>
                <RadioButtonGroup name="vote" onChange={this.handleChoiceChange.bind(this)}>
                    <RadioButton value="yes" label= "Yes" />
                    <RadioButton value="no" label="No" />
                </RadioButtonGroup>
                <br/>

                <RaisedButton label="Submit Vote" primary={true} style={styles.button} onClick={this.submit.bind(this)} />


            </div>
        )
    }
    
}