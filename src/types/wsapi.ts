export interface BalanceRow {
    account: string;
    amount: number;
}

export interface AccountPermRow {
    account_name: string;
    perm: string;
    weight: number;
    pubkey: string;
}