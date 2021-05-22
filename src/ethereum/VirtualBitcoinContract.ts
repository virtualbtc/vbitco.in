import { BigNumber } from "@ethersproject/bignumber";
import Config from "../Config";
import SmartContract from "./SmartContract";

export interface PizzaStruct {
    owner: string;
    power: BigNumber;
    minedBlock: BigNumber;
    accSubsidy: BigNumber;
}

class VirtualBitcoinContract extends SmartContract {

    public name = "Virtual Bitcoin";
    public symbol = "VBTC";
    public decimals = 8;

    constructor() {
        super(
            Config.VBTC_ADDRESS,
            require("./VirtualBitcoinContractABI.json"),
        );
    }

    public async init() {
        await super.init([
            "Transfer",
            "Approval",
            "BuyPizza",
            "ChangePizza",
            "SellPizza",
            "Mine",
        ]);
    }

    public async getTotalSupply(): Promise<BigNumber> { return await this.contract.totalSupply(); }

    public async balanceOf(owner: string): Promise<BigNumber> {
        return await this.contract.balanceOf(owner);
    }

    public async transfer(to: string, amount: BigNumber): Promise<boolean> {
        return await this.web3Contract.transfer(to, amount);
    }

    public async transferFrom(from: string, to: string, amount: BigNumber): Promise<boolean> {
        return await this.web3Contract.transferFrom(from, to, amount);
    }

    public async approve(spender: string, amount: BigNumber): Promise<boolean> {
        return await this.web3Contract.approve(spender, amount);
    }

    public async allowance(owner: string, spender: string): Promise<BigNumber> {
        return await this.web3Contract.allowance(owner, spender);
    }

    public async getPizzaPrice(power: BigNumber): Promise<BigNumber> { return await this.contract.pizzaPrice(power); }
    public async getPizzaCount(): Promise<BigNumber> { return await this.contract.pizzaCount(); }
    public async getPizza(pizzaId: BigNumber): Promise<PizzaStruct> { return await this.contract.pizzas(pizzaId); }

    public async buyPizza(power: BigNumber): Promise<BigNumber> {
        return await this.web3Contract.buyPizza(power);
    }

    public async sellPizza(pizzaId: BigNumber): Promise<void> {
        return await this.web3Contract.sellPizza(pizzaId);
    }

    public async changePizza(pizzaId: BigNumber, power: BigNumber): Promise<void> {
        return await this.web3Contract.changePizza(pizzaId, power);
    }

    public async powerOf(pizzaId: BigNumber): Promise<BigNumber> { return await this.contract.powerOf(pizzaId); }
    public async subsidyOf(pizzaId: BigNumber): Promise<BigNumber> { return await this.contract.subsidyOf(pizzaId); }

    public async mine(pizzaId: BigNumber): Promise<void> {
        return await this.web3Contract.mine(pizzaId);
    }
}

export default new VirtualBitcoinContract();
