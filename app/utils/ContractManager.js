import getWeb3 from './getWeb3';
import ColoradoCoin from '../../build/contracts/ColoradoCoin.json'
import ElectionSystem from '../../build/contracts/ElectionSystem.json'


const fixCompatibility = (contract) => {
    if (typeof contract.currentProvider.sendAsync !== "function") {
        contract.currentProvider.sendAsync = function() {
            return contract.currentProvider.send.apply(
                contract.currentProvider, arguments
            );
        };
    }
}

const createDeployedContract = async (jsonContract) =>{
    const {web3} = await getWeb3;
    const contract = require('truffle-contract');
    const contractInstance = contract(jsonContract);
    contractInstance.setProvider(web3.currentProvider);
    fixCompatibility(contractInstance);
    const deployed = await contractInstance.deployed();
    return deployed;
}


export default class ContractManager{

    static async loadColoradoCoin(){
        const coloradoCoin = await createDeployedContract(ColoradoCoin);
        return coloradoCoin;
    }

    static async loadElectionSystem(){
        const electionSystem = await createDeployedContract(ElectionSystem);
        return electionSystem;
    }

    static async loadAccounts(){
        const {web3} = await getWeb3;
        const accounts = await web3.eth.getAccounts();
        return accounts;
    }
}

/**
let contracts = new Promise(async (resolve, reject)=>{
    try{
        const coloradoCoin = await createDeployedContract(ColoradoCoin);
        const electionSystem = await createDeployedContract(ElectionSystem);
        resolve({
            coloradoCoin,
            electionSystem
        });
    }catch(e){
        reject(e);
    }
});


export default contracts;
*/