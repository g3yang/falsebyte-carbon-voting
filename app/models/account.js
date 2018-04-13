import {observable} from 'mobx';

export default class Account{
    @observable balance;

    constructor(address, balance){
        this.address = address;
        this.balance = balance;
    }

    toString(){
        return `${this.address}: ${this.balance}`;
    }
    
}