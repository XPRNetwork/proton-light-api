import {
  GET_ACCOUNT,
  GET_BALANCES,
  GET_KEY_ACCOUNTS,
  GET_NETWORKS ,
  GET_SYNC_INFO,
  GET_TOKEN_BALANCE,
  GET_TOPHOLDERS,
  GET_USERCOUNT,
  GET_TOPRAM,
  GET_TOPSTAKE,
  GET_CODEHASH,
  GET_TOKEN_HOLDER_COUNT,
  GET_ACCOUNT_INFO,
  GET_TOKEN_HOLDERS,
  GET_ACCOUNTS_FROM_KEYS,
} from "./endpoints";
import { RpcError, RpcStatusError } from "./rpcerror";
import { GetAccount, GetBalances, GetKeyAccounts, GetNetworks, GetTopHolders, GetTopRam, GetTopStake, GetCodehash, GetAccountInfo } from "./types/api";
import { AccountPermRow, BalanceRow } from "./types/wsapi"
import fetch from "cross-fetch";
import { Client } from 'jsonrpc2-ws';

interface StringTMap<T> { [key: string]: T; }
const chainToEndpoint: StringTMap<string> = {
  eos: "https://eos.light-api.net",
  telos: "https://telos.light-api.net",

  jungle: "https://lightapi.eosgeneva.io",

  bos: "https://lightapi.eosamsterdam.net",
  instar: "https://lightapi.eosamsterdam.net",
  proton: "https://proton.light-api.net",
  wax: "https://lightapi.eosamsterdam.net",
  worbli: "https://lightapi.eosamsterdam.net",
  xec: "https://lightapi.eosamsterdam.net",

  protontest: "https://testnet-lightapi.eosams.xeos.me",
  telostest: "https://testnet-lightapi.eosams.xeos.me",
  waxtest: "https://testnet-lightapi.eosams.xeos.me",

  coffe: "https://hyperion.coffe.io",
};

async function fetchWithTimeout(resource: string, options: { [key: string]: any, timeout: number }) {
  const { timeout } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(resource, {
    ...(options || {}),
    signal: controller.signal,
  });
  clearTimeout(id);
  return response;
}

/**
 * JsonRpc
 *
 * @param {string} endpoint LIGHT API endpoint
 * @example
 *
 * const rpc = new JsonRpc("proton")
 */
export class JsonRpc {
  public endpoint: string;
  public chain: string;
  public timeout: number = 5000;
  public wsClient: Client;
  public wsRequestId: number = 100;

  constructor(chain: string, args: { endpoint?: string, timeout?: number } = {}) {
    this.chain = chain;
    this.endpoint = args.endpoint || chainToEndpoint[chain];
    this.wsClient = new Client(this.endpoint.replace('https:', 'wss:') + '/wsapi')

    if (!this.endpoint) {
      throw new Error(`Chain ${chain} does not have a default endpoint, provide one in args`);
    }

    if (args.timeout) {
      this.timeout = args.timeout;
    }
  }

  /**
   * get
   *
   * GET `params` to `endpoint + path`.
   * Throws detailed error information in `RpcError` when available.
   *
   * @private
   */
  public async get<T>(path: string, endpoint: string = this.endpoint): Promise<T> {
    let response;
    let json;
    const url = endpoint + path;

    try {
      response = await fetchWithTimeout(url, {
        method: "GET",
        timeout: this.timeout,
      });

      if (response.status !== 200) {
        throw new RpcStatusError(response);
      }

      const text = await response.text();
      try {
        json = JSON.parse(text);
        if (json.processed && json.processed.except) {
          throw new RpcError(json);
        }
      } catch {
        json = text;
      }
    } catch (e) {
      e.isFetchError = true;
      throw e;
    }
    if (!response.ok) {
      throw new RpcError(json);
    }
    return json;
  }

  /**
   * [GET /api/account]
   *
   * Retrieve all token balances, resources and authorization information for an account:
   *
   * @param {string} accountName name of account
   * @returns {Promise<GetAccount>} account
   */
  public get_account(accountName: string) {
    const url = `${GET_ACCOUNT}/${this.chain}/${accountName}`;
    return this.get<GetAccount>(url);
  }

  /**
   * [GET /api/accinfo]
   *
   * Retrieve all resources and authorization information for an account:
   *
   * @param {string} accountName name of account
   * @returns {Promise<GetAccountInfo>} account
   */
  public get_account_info(accountName: string) {
    const url = `${GET_ACCOUNT_INFO}/${this.chain}/${accountName}`;
    return this.get<GetAccountInfo>(url);
  }

  /**
   * [GET /api/balances]
   *
   * Retrieve only token balances for an account
   *
   * @param {string} accountName name of account
   * @returns {Promise<GetBalances>} balances
   */
  public get_balances(accountName: string) {
    const url = `${GET_BALANCES}/${this.chain}/${accountName}`;
    return this.get<GetBalances>(url);
  }

  /**
   * [GET /api/key]
   *
   * Retrieve all accounts in all known EOS networks dependent on a public key:
   *
   * @param {string} key public key
   * @returns {Promise<GetKeyAccounts[]>} accounts per network
   */
  public async get_all_key_accounts(key: string): Promise<GetKeyAccounts[]> {
    const promises = [...new Set(Object.values(chainToEndpoint))].map((endpoint) => {
      const url = `${GET_KEY_ACCOUNTS}/${key}`;
      return this.get<GetKeyAccounts>(url, endpoint);
    });
    return await Promise.all(promises);
  }

  /**
   * [GET /api/key]
   *
   * Retrieve all accounts in network
   *
   * @param {string} key public key
   * @returns {Promise<GetKeyAccounts>} accounts
   */
  public async get_key_accounts(key: string): Promise<GetKeyAccounts> {
    const url = `${GET_KEY_ACCOUNTS}/${key}`;
    return this.get<GetKeyAccounts>(url);
  }

  /**
   * [GET /api/networks]
   *
   * Retrieve all accounts in all known EOS networks dependent on a public key:
   *
   * @returns {Promise<GetNetworks>} accounts
   */
  public get_networks() {
    return this.get<GetNetworks>(GET_NETWORKS);
  }

  /**
   * [GET /api/sync]
   *
   * returns a plain text with delay in seconds that this server's blockchain database is behind the real time, and a status: OK if the delay is within 180 seconds, or 'OUT_OF_SYNC' otherwise.
   *
   * @returns {Promise<string>} get sync
   */
  public get_sync_info() {
    const url = `${GET_SYNC_INFO}/${this.chain}`;
    return this.get<string>(url);
  }

  /**
   * [GET /api/tokenbalance]
   *
   *  returns a plain text with numeric output indicating the token balance. Zero is returned if the token is not present or does not exist.
   *
   * @param {string} account owner of token
   * @param {string} contract token contract
   * @param {string} token token symbol
   * @returns {Promise<string>} token balance
   */
  public get_token_balance(account: string, contract: string, token: string) {
    const url = `${GET_TOKEN_BALANCE}/${this.chain}/${account}/${contract}/${token}`;
    return this.get<string>(url);
  }

  /**
   * [GET /api/topholders]
   *
   * returns top NUM holders of a specified token in a JSON array containing arrays of (account, amount) pairs. NUM must not be less than 10 or more than 1000.
   *
   * @param {string} contract token contract
   * @param {string} token token symbol
   * @param {string} num number of top holders (min 10, max 1000)
   *
   * @returns {Promise<string>} token balance
   */
  public get_topholders(contract: string, token: string, num: number) {
    const url = `${GET_TOPHOLDERS}/${this.chain}/${contract}/${token}/${num}`;
    return this.get<GetTopHolders>(url);
  }

  /**
   * [GET /api/usercount]
   *
   * returns a plain text with total number of accounts in the network.
   *
   * @returns {Promise<string>} token balance
   */
  public get_usercount() {
    const url = `${GET_USERCOUNT}/${this.chain}`;
    return this.get<string>(url);
  }

  /**
   * [GET /api/topram]
   *
   * returns top NUM RAM buyers in a JSON array containing arrays of (account, bytes) pairs. NUM must not be less than 10 or more than 1000.
   *
   * @param {string} num number of top holders (min 10, max 1000)
   *
   * @returns {Promise<GetTopRam>} top ram holders
   */
  public get_topram(num: number) {
    const url = `${GET_TOPRAM}/${this.chain}/${num}`;
    return this.get<GetTopRam>(url);
  }

  /**
   * [GET /api/topstake]
   *
   * returns top NUM RAM buyers in a JSON array containing arrays of (account, bytes) pairs. NUM must not be less than 10 or more than 1000.
   *
   * @param {string} num returns top NUM stake holders by sum of CPU and Net stakes, in a JSON array containing arrays of (account, cpu_weight, net_weight) tuples. NUM must not be less than 10 or more than 1000.
   *
   * @returns {Promise<GetTopStake>} top stake holders
   */
  public get_topstake(num: number) {
    const url = `${GET_TOPSTAKE}/${this.chain}/${num}`;
    return this.get<GetTopStake>(url);
  }

  /**
   * [GET /api/codehash]
   *
   * retrieves all accounts in all known EOS networks by contract hash.
   *
   * @param {string} num returns top NUM stake holders by sum of CPU and Net stakes, in a JSON array containing arrays of (account, cpu_weight, net_weight) tuples. NUM must not be less than 10 or more than 1000.
   *
   * @returns {Promise<GetCodehash>} accounts
   */
  public get_codehash(hash: string) {
    const url = `${GET_CODEHASH}/${hash}`;
    return this.get<GetCodehash>(url);
  }

  /**
   * [GET /api/holdercount]
   *
   * returns a plaintext integer indicating the number of accounts with positive balance for a specified token.
   *
   * @param {string} contract token contract
   * @param {string} token token symbol
   *
   * @returns {Promise<number>} count
   */
  public get_tokenholder_count(contract: string, token: string) {
    const url = `${GET_TOKEN_HOLDER_COUNT}/${this.chain}/${contract}/${token}`;
    return this.get<number>(url);
  }

  /**
   * [WS get_token_holders]
   *
   * Get all token holders of a contract and symbol
   *
   * @param contract token contract
   * @param token token symbol
   * @returns
   */
  public get_token_holders(
    contract: string,
    token: string
  ): Promise<BalanceRow[]> {
    const reqId = ++this.wsRequestId
    const balances: BalanceRow[] = [];

    return new Promise((resolve, reject) => {
      this.wsClient.on('error', (err) => reject(err))

      this.wsClient.methods.set('reqdata', (_: any, params: { end: boolean, data: { account: string; amount: string; }}) => {
        if (params.end) {
          resolve(balances);
        }

        balances.push({
          account: params.data.account,
          amount: +params.data.amount,
        });
      });

      try {
        this.wsClient.call(GET_TOKEN_HOLDERS, {
          reqid: reqId,
          network: this.chain,
          contract,
          currency: token,
        });
      } catch (err) {
        reject(err)
        return;
      }
    });
  }

  /**
   * [WS get_accounts_from_keys]
   *
   * Get all token holders of a contract and symbol
   *
   * @param keys[] array of keys
   * @returns
   */
   public get_accounts_from_keys(
    keys: string[],
  ): Promise<AccountPermRow[]> {
    const reqId = ++this.wsRequestId
    const accounts: AccountPermRow[] = [];

    return new Promise((resolve, reject) => {
      this.wsClient.on('error', (err) => reject(err))

      this.wsClient.methods.set('reqdata', (_: any, params: { end: boolean, data: { account_name: string; perm: string; weight: string; pubkey: string }}) => {
        if (params.end) {
          resolve(accounts);
        }

        accounts.push({
          account_name: params.data.account_name,
          perm: params.data.perm,
          weight: +params.data.weight,
          pubkey: params.data.pubkey,
        });
      });

      try {
        this.wsClient.call(GET_ACCOUNTS_FROM_KEYS, {
          reqid: reqId,
          network: this.chain,
          keys,
        });
      } catch (err) {
        reject(err)
        return;
      }
    });
  }
}
