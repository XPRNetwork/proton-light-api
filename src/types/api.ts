import { Balance, ChainInfo, DelegatedFrom, DelegatedTo, Linkauth, Permission, CodehashInfo } from "./common";

export interface GetAccount {
    account_name: string;
    balances: Balance[];
    chain: ChainInfo;
    delegated_from: DelegatedFrom[];
    delegated_to: DelegatedTo[];
    linkauth: Linkauth[];
}

export interface GetAccountInfo {
    account_name: string;
    chain: ChainInfo;
    delegated_from: DelegatedFrom[];
    delegated_to: DelegatedTo[];
    linkauth: Linkauth[];
}

export interface GetBalances {
    account_name: string;
    balances: Balance[];
    chain: ChainInfo;
}

export interface GetKeyAccounts {
    [key: string]: {
        chain: ChainInfo;
        accounts: {
            [key: string]: Permission[];
        }
    };
}

export type GetNetworks = ChainInfo[];
export type GetTopHolders = string[][];

export type GetTopRam = (string | number)[][];
export type GetTopStake = (string | number)[][];

export interface GetCodehash {
    [key: string]: {
        chain: ChainInfo;
        accounts: {
            [key: string]: CodehashInfo,
        }
    };
}
