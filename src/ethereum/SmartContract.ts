import { ethers } from "ethers";
import EventContainer from "eventcontainer";
import Ethereum from "./Ethereum";

export default abstract class SmartContract extends EventContainer {

    protected contract!: ethers.Contract;
    protected web3Contract!: ethers.Contract;

    constructor(private address: string, private abi: any) {
        super();
    }

    public async init(eventNames: string[]) {
        this.contract = new ethers.Contract(this.address, this.abi, Ethereum.provider).connect(Ethereum.signer);
        this.web3Contract = new ethers.Contract(this.address, this.abi, Ethereum.web3Provider).connect(Ethereum.web3Signer);

        for (const eventName of eventNames) {
            this.contract.on(eventName, (...args) => {
                this.fireEvent(eventName, ...args);
            });
        }
    }
}