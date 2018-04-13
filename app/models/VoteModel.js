import ContractManager from '../utils/ContractManager';
import {observable} from 'mobx';


function fixCompatibility(contract){
    if (typeof contract.currentProvider.sendAsync !== "function") {
        contract.currentProvider.sendAsync = function() {
            return contract.currentProvider.send.apply(
                contract.currentProvider, arguments
            );
        };
    }
}

export default class VoteModel{
    @observable fromAddress;
    @observable electionId;
    @observable addresses = [];
    @observable choice;
    @observable status;

    constructor(){
        this.init();
    }

    async init(){
        this.electionSystem =await ContractManager.loadElectionSystem();
        this.addresses = await ContractManager.loadAccounts();
        this.fromAddress = this.addresses[0];
    }

    async sendVote(){
        try{
            await this.electionSystem.sendVote(this.electionId, (this.choice=='yes'), {from: this.fromAddress});
            this.status = 'Vote Successfully';
        }catch(e){
            console.log('diu');
            console.log(e);
            this.status = 'Error in sending vote';
        }
    }
   
}