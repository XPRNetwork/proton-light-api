import { JsonRpc } from "../";

const rpc = new JsonRpc("proton");

test("jsonrpc.get_account", async () => {
    const response = await rpc.get_account("cafe");
    expect(!!response).toBeTruthy();
});

test("jsonrpc.get_account_info", async () => {
    const response = await rpc.get_account_info("cafe");
    expect(!!response).toBeTruthy();
});

test("jsonrpc.get_balances", async () => {
    const response = await rpc.get_balances("cafe");
    expect(!!response).toBeTruthy();
});

test("jsonrpc.get_key_accounts", async () => {
    const response = await rpc.get_key_accounts("PUB_K1_83HZEdUFuB5krCYLHSosMUuguxYh7QhwbHZDYBwsLAyuhxjDpr");
    expect(!!response).toBeTruthy();
});

test("jsonrpc.get_networks", async () => {
    const response = await rpc.get_networks();
    expect(!!response).toBeTruthy();
});

test("jsonrpc.get_sync_info", async () => {
    const response = await rpc.get_sync_info();
    expect(!!response).toBeTruthy();
});

test("jsonrpc.get_token_balance", async () => {
    const response = await rpc.get_token_balance("cafe", "eosio.token", "XPR");
    expect(!!response).toBeTruthy();
});

test("jsonrpc.get_topholders", async () => {
    const response = await rpc.get_topholders("xtokens", "XUSDC", 100);
    expect(!!response).toBeTruthy();
});

test("jsonrpc.get_usercount", async () => {
    const response = await rpc.get_usercount();
    expect(!!response).toBeTruthy();
});

test("jsonrpc.get_topram", async () => {
    const response = await rpc.get_topram(100);
    expect(!!response).toBeTruthy();
});

test("jsonrpc.get_topstake", async () => {
    const response = await rpc.get_topstake(100);
    expect(!!response).toBeTruthy();
});

test("jsonrpc.get_codehash", async () => {
    const response = await rpc.get_codehash("9210637cb6abf6ac8e887cb43c75ca3f86713c9b3b668b0ec63b6e39183b54fd");
    expect(!!response).toBeTruthy();
});

test("jsonrpc.get_tokenholder_count", async () => {
    const response = await rpc.get_tokenholder_count("eosio.token", "XPR");
    expect(!!response).toBeTruthy();
});

test("jsonrpc.get_token_holders", async () => {
    jest.setTimeout(30000);

    const response = await rpc.get_token_holders("xtokens", "XMT");
    expect(response.length).toBeTruthy();
});

test("jsonrpc.get_accounts_from_keys", async () => {
    jest.setTimeout(30000);

    const response = await rpc.get_accounts_from_keys(["PUB_K1_7E8WQukJcKnvaRaTJYnd69T1Fg3daChpAjMGi2CZNE3vczGNei"]);
    expect(response.length).toBeTruthy();

    rpc.wsClient.disconnect()
});