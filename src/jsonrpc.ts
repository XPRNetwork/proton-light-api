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
  GET_TOKEN_HOLDER_COUNT
} from "./endpoints";
import { RpcError, RpcStatusError } from "./rpcerror";
import { GetAccount, GetBalances, GetKeyAccounts, GetNetworks, GetTopHolders, GetTopRam, GetTopStake, GetCodehash } from './types/api';

export type Fetch = (url: string | Request, init?: RequestInit) => Promise<Response>;
declare const global: any;

/**
 * JsonRpc
 *
 * @param {string} endpoint LIGHT API endpoint
 * @example
 *
 * const endpoint = "https://api.light.xeos.me"
 * const rpc = new JsonRpc(endpoint, { fetch, chain: "eos" })
 */
export class JsonRpc {
  public endpoint: string;
  public chain: string;
  public fetchBuiltin: Fetch;

    constructor(endpoint: string, args: { fetch?: Fetch, chain?: string } = {}) {
      this.endpoint = endpoint;
      this.chain = args.chain || 'eos';

      if (args.fetch) {
          this.fetchBuiltin = args.fetch;
      } else {
          this.fetchBuiltin = (global as any).fetch;
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
    public async get<T>(path: string): Promise<T> {
      let response;
      let json;
      const url = this.endpoint + path

      try {
        const f = this.fetchBuiltin;
        response = await f(url, {
          method: "GET",
        });

        if (response.status !== 200) {
          throw new RpcStatusError(response);
        }
        
        const text = await response.text()
        try {
          json = JSON.parse(text)
          if (json.processed && json.processed.except) {
            throw new RpcError(json);
          }
        } catch {
          json = text
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
      const url = `${GET_ACCOUNT}/${this.chain}/${accountName}`
      return this.get<GetAccount>(url);
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
      const url = `${GET_BALANCES}/${this.chain}/${accountName}`
      return this.get<GetBalances>(url);
    }

    /**
     * [GET /api/key]
     *
     * Retrieve all accounts in all known EOS networks dependent on a public key:
     *
     * @param {string} key public key
     * @returns {Promise<GetKeyAccounts>} accounts
     */
    public get_key_accounts(key: string) {
      const url = `${GET_KEY_ACCOUNTS}/${key}`
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
      const url = `${GET_SYNC_INFO}/${this.chain}`
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
      const url = `${GET_TOKEN_BALANCE}/${this.chain}/${account}/${contract}/${token}`
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
      const url = `${GET_TOPHOLDERS}/${this.chain}/${contract}/${token}/${num}`
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
      const url = `${GET_USERCOUNT}/${this.chain}`
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
      const url = `${GET_TOPRAM}/${this.chain}/${num}`
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
      const url = `${GET_TOPSTAKE}/${this.chain}/${num}`
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
      const url = `${GET_CODEHASH}/${hash}`
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
      const url = `${GET_TOKEN_HOLDER_COUNT}/${this.chain}/${contract}/${token}`
      return this.get<number>(url);
    }
}
