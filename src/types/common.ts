
export interface Balance {
    amount: string;
    block_num: string;
    block_time: string;
    contract: string;
    currency: string;
    decimals: string;
}

export interface ChainInfo {
    chainid: string;
    production: number;
    description: string;
    sync: number;
    decimals: string;
    systoken: string;
    rex_enabled: number;
    block_num: number;
    network: string;
    block_time: string;
}

export interface DelegatedFrom {
    del_from: string;
    block_num: number;
    block_time: string;
    cpu_weight: number;
    net_weight: number;
}
export interface DelegatedTo {
    account_name: string;
    block_num: number;
    block_time: string;
    cpu_weight: number;
    net_weight: number;
}

export interface Linkauth {
    block_num: number;
    block_time: string;
    code: string;
    requirement: string;
    type: string;
}

export interface Permission {
    block_num: number;
    block_time: string;
    auth: Authority;
    perm: string;
    threshold: number;
}

export interface Authority {
    accounts: AuthorityAccount[];
    keys: AuthorityKey[];
}

export interface AuthorityAccount {
    actor: string;
    permission: string;
    weight: number;
}
export interface AuthorityKey {
    pubkey: string;
    public_key: string;
    weight: number;
}

export interface Resourcces {
    pubkey: string;
    public_key: string;
    weight: number;
}

export interface CodehashInfo {
    account_name: string;
    block_num: number;
    block_time: string;
    code_hash: string;
    network: string;
}
