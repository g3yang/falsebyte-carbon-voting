import ContractManager from '../utils/ContractManager';
import Account from './account';
import ColoradoCoin from '../../build/contracts/ColoradoCoin.json'
import {observable} from 'mobx';

export default class TransferModel {
    @observable fromAddress;
    @observable toAddress;
    @observable amount;
    @observable addresses = [];
    @observable status;

    constructor(coloradoCoin, addresses){
        this.init();
    }

    async init(){
        this.coloradoCoin = await ContractManager.loadColoradoCoin();
        this.addresses = await ContractManager.loadAccounts();
        this.fromAddress = this.addresses[0];
        this.toAddress = this.addresses[1];
    }

    async transfer(){
        try{
            const receipt = await this.coloradoCoin.transfer(this.toAddress, this.amount, {from: this.fromAddress});
            this.status = 'Coin sent successfully';
        }catch(e){
             this.status = 'Transaction error';
        }
    }


    

}