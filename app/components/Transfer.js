import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import { observer } from "mobx-react";
import { observable, action } from "mobx";

const styles = {
    dropDown: {
      width: 200,
    },
    button: {
      margin: 10  
    }
};



@observer
export default class Transfer extends Component {
    constructor(props){
        super(props);
    }

    @action
    handleAddressChange(event, index, value){
        event.preventDefault();
        this.props.model.toAddress = value;
    }

    @action
    handleAmountChange(event){
        event.preventDefault()
        this.props.model.amount = event.target.value;
    }

    sendCoin(){
        this.props.model.transfer();
    }

    render(){
        const model = this.props.model;

        if(!model){
            return undefined;
        }
       
        const menuItems = model.addresses.map((address)=>(
            <MenuItem value = {address} primaryText = {address}/>
        ));

        return (
            <div>
                <h2> Send ColoradoCoin </h2>
                <TextField value = {model.fromAddress} floatingLabelText = "From Address" disable = {true}/>
                <br/>

                <TextField value = {model.amount} 
                    floatingLabelText="Amount: "
                    hintText="e.g., 95"
                    onChange={this.handleAmountChange.bind(this)}
                />
                <br/>

                <SelectField value = {model.toAddress} floatingLabelText="To Address:"
                    onChange={this.handleAddressChange.bind(this)} autoWidth={true}>
                    {menuItems}
                </SelectField>

                <br/>
                <RaisedButton label="Send Coin" primary={true} style={styles.button} onClick={this.sendCoin.bind(this)} />
                <br/>
                {model.status}
                
            </div>
        );
        
    }

    
}