import { ethers } from "ethers";
import Config from "../Config";
import VirtualBitcoinContract from "./VirtualBitcoinContract";

class Ethereum {

    public provider = new ethers.providers.WebSocketProvider(Config.PROVIDER_URL);

    private ethereum = (window as any).ethereum;
    public get existsWeb3Provider() { return this.ethereum !== undefined; }
    public web3Provider!: ethers.providers.Web3Provider;

    public accountAddress!: string;
    public signer!: ethers.providers.JsonRpcSigner;
    public web3Signer!: ethers.providers.JsonRpcSigner;

    constructor() {
        if (this.existsWeb3Provider === true) {
            this.web3Provider = new ethers.providers.Web3Provider(this.ethereum);
        }
    }

    public async getNetwork() {
        return await this.provider.getNetwork();
    }

    public async connected() {

        this.accountAddress = (await this.web3Provider.listAccounts())[0];
        if (this.accountAddress !== undefined) {

            this.signer = this.provider.getSigner(this.accountAddress);
            this.web3Signer = this.web3Provider.getSigner();

            VirtualBitcoinContract.init();

            return true;
        }
        return false;
    }

    public async connect() {
        await this.ethereum.request({ method: "eth_requestAccounts" });
    }
}

export default new Ethereum();
