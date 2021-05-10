import { ethers } from "ethers";
import DefantasyContract from "./DefantasyContract";

class Ethereum {

    public provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");

    private ethereum = (window as any).ethereum;
    public get existsWeb3Provider() { return this.ethereum !== undefined; }
    public web3Provider!: ethers.providers.Web3Provider;

    public playerAddress!: string;

    constructor() {
        if (this.existsWeb3Provider === true) {
            this.web3Provider = new ethers.providers.Web3Provider(this.ethereum);
        }
    }

    public async getNetwork() {
        return await this.provider.getNetwork();
    }

    public async connected() {
        this.playerAddress = (await this.web3Provider.listAccounts())[0];
        DefantasyContract.init();
        return this.playerAddress !== undefined;
    }

    public async connect() {
        await this.ethereum.request({ method: "eth_requestAccounts" });
    }
}

export default new Ethereum();
