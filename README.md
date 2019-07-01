# LIGHT API HTTP Javascript library

## Installation

Using Yarn:

```bash
yarn add @eoscafe/light-api
```

or using NPM:

```bash
npm install --save @eoscafe/light-api
```

## Quick Start

**CommonJS**

```js
const { JsonRpc } = require("@eoscafe/light-api")
const fetch = require("isomorphic-fetch")

const endpoint = "https://api.light.xeos.me"
const rpc = new JsonRpc(endpoint, { fetch, chain: "eos" })
```

**TypeScript**

```ts
import { JsonRpc } from "@eoscafe/light-api"
import fetch from "isomorphic-fetch"

const endpoint = "https://api.light.xeos.me"
const rpc = new JsonRpc(endpoint, { fetch, chain: "eos" })
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [JsonRpc](#jsonrpc)
    -   [Parameters](#parameters)
    -   [Examples](#examples)
    -   [get_account](#get_account)
        -   [Parameters](#parameters-1)
    -   [get_balances](#get_balances)
        -   [Parameters](#parameters-2)
    -   [get_key_accounts](#get_key_accounts)
        -   [Parameters](#parameters-3)
    -   [get_networks](#get_networks)
    -   [get_sync_info](#get_sync_info)
    -   [get_token_balance](#get_token_balance)
        -   [Parameters](#parameters-4)
    -   [get_topholders](#get_topholders)
        -   [Parameters](#parameters-5)
    -   [get_usercount](#get_usercount)
    -   [get_topram](#get_topram)
        -   [Parameters](#parameters-6)
    -   [get_topstake](#get_topstake)
        -   [Parameters](#parameters-7)
    -   [get_codehash](#get_codehash)
        -   [Parameters](#parameters-8)
    -   [get_tokenholder_count](#get_tokenholder_count)
        -   [Parameters](#parameters-9)
-   [JsonRpc](#jsonrpc-1)
    -   [get_account](#get_account-1)
        -   [Parameters](#parameters-10)
    -   [get_balances](#get_balances-1)
        -   [Parameters](#parameters-11)
    -   [get_key_accounts](#get_key_accounts-1)
        -   [Parameters](#parameters-12)
    -   [get_networks](#get_networks-1)
    -   [get_sync_info](#get_sync_info-1)
    -   [get_token_balance](#get_token_balance-1)
        -   [Parameters](#parameters-13)
    -   [get_topholders](#get_topholders-1)
        -   [Parameters](#parameters-14)
    -   [get_usercount](#get_usercount-1)
    -   [get_topram](#get_topram-1)
        -   [Parameters](#parameters-15)
    -   [get_topstake](#get_topstake-1)
        -   [Parameters](#parameters-16)
    -   [get_codehash](#get_codehash-1)
        -   [Parameters](#parameters-17)
    -   [get_tokenholder_count](#get_tokenholder_count-1)
        -   [Parameters](#parameters-18)
-   [Error](#error)
-   [Error](#error-1)

### JsonRpc

JsonRpc

#### Parameters

-   `endpoint` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** LIGHT API endpoint

#### Examples

```javascript
const endpoint = "https://api.light.xeos.me"
const rpc = new JsonRpc(endpoint, { fetch, chain: "eos" })
```

#### get_account

[GET /api/account]

Retrieve all token balances, resources and authorization information for an account:

##### Parameters

-   `accountName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** name of account

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;GetAccount>** account

#### get_balances

[GET /api/balances]

Retrieve only token balances for an account

##### Parameters

-   `accountName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** name of account

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;GetBalances>** balances

#### get_key_accounts

[GET /api/key]

Retrieve all accounts in all known EOS networks dependent on a public key:

##### Parameters

-   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** public key

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;GetKeyAccounts>** accounts

#### get_networks

[GET /api/networks]

Retrieve all accounts in all known EOS networks dependent on a public key:

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;GetNetworks>** accounts

#### get_sync_info

[GET /api/sync]

returns a plain text with delay in seconds that this server's blockchain database is behind the real time, and a status: OK if the delay is within 180 seconds, or 'OUT_OF_SYNC' otherwise.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** get sync

#### get_token_balance

[GET /api/tokenbalance]

 returns a plain text with numeric output indicating the token balance. Zero is returned if the token is not present or does not exist.

##### Parameters

-   `account` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** owner of token
-   `contract` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** token contract
-   `token` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** token symbol

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** token balance

#### get_topholders

[GET /api/topholders]

returns top NUM holders of a specified token in a JSON array containing arrays of (account, amount) pairs. NUM must not be less than 10 or more than 1000.

##### Parameters

-   `contract` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** token contract
-   `token` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** token symbol
-   `num` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** number of top holders (min 10, max 1000)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** token balance

#### get_usercount

[GET /api/usercount]

returns a plain text with total number of accounts in the network.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** token balance

#### get_topram

[GET /api/topram]

returns top NUM RAM buyers in a JSON array containing arrays of (account, bytes) pairs. NUM must not be less than 10 or more than 1000.

##### Parameters

-   `num` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** number of top holders (min 10, max 1000)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;GetTopRam>** top ram holders

#### get_topstake

[GET /api/topstake]

returns top NUM RAM buyers in a JSON array containing arrays of (account, bytes) pairs. NUM must not be less than 10 or more than 1000.

##### Parameters

-   `num` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** returns top NUM stake holders by sum of CPU and Net stakes, in a JSON array containing arrays of (account, cpu_weight, net_weight) tuples. NUM must not be less than 10 or more than 1000.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;GetTopStake>** top stake holders

#### get_codehash

[GET /api/codehash]

retrieves all accounts in all known EOS networks by contract hash.

##### Parameters

-   `hash`  
-   `num` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** returns top NUM stake holders by sum of CPU and Net stakes, in a JSON array containing arrays of (account, cpu_weight, net_weight) tuples. NUM must not be less than 10 or more than 1000.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;GetCodehash>** accounts

#### get_tokenholder_count

[GET /api/holdercount]

returns a plaintext integer indicating the number of accounts with positive balance for a specified token.

##### Parameters

-   `contract` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** token contract
-   `token` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** token symbol

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>** count

### JsonRpc

#### get_account

[GET /api/account]

Retrieve all token balances, resources and authorization information for an account:

##### Parameters

-   `accountName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** name of account

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;GetAccount>** account

#### get_balances

[GET /api/balances]

Retrieve only token balances for an account

##### Parameters

-   `accountName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** name of account

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;GetBalances>** balances

#### get_key_accounts

[GET /api/key]

Retrieve all accounts in all known EOS networks dependent on a public key:

##### Parameters

-   `key` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** public key

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;GetKeyAccounts>** accounts

#### get_networks

[GET /api/networks]

Retrieve all accounts in all known EOS networks dependent on a public key:

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;GetNetworks>** accounts

#### get_sync_info

[GET /api/sync]

returns a plain text with delay in seconds that this server's blockchain database is behind the real time, and a status: OK if the delay is within 180 seconds, or 'OUT_OF_SYNC' otherwise.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** get sync

#### get_token_balance

[GET /api/tokenbalance]

 returns a plain text with numeric output indicating the token balance. Zero is returned if the token is not present or does not exist.

##### Parameters

-   `account` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** owner of token
-   `contract` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** token contract
-   `token` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** token symbol

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** token balance

#### get_topholders

[GET /api/topholders]

returns top NUM holders of a specified token in a JSON array containing arrays of (account, amount) pairs. NUM must not be less than 10 or more than 1000.

##### Parameters

-   `contract` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** token contract
-   `token` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** token symbol
-   `num` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** number of top holders (min 10, max 1000)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** token balance

#### get_usercount

[GET /api/usercount]

returns a plain text with total number of accounts in the network.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>** token balance

#### get_topram

[GET /api/topram]

returns top NUM RAM buyers in a JSON array containing arrays of (account, bytes) pairs. NUM must not be less than 10 or more than 1000.

##### Parameters

-   `num` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** number of top holders (min 10, max 1000)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;GetTopRam>** top ram holders

#### get_topstake

[GET /api/topstake]

returns top NUM RAM buyers in a JSON array containing arrays of (account, bytes) pairs. NUM must not be less than 10 or more than 1000.

##### Parameters

-   `num` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** returns top NUM stake holders by sum of CPU and Net stakes, in a JSON array containing arrays of (account, cpu_weight, net_weight) tuples. NUM must not be less than 10 or more than 1000.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;GetTopStake>** top stake holders

#### get_codehash

[GET /api/codehash]

retrieves all accounts in all known EOS networks by contract hash.

##### Parameters

-   `hash`  
-   `num` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** returns top NUM stake holders by sum of CPU and Net stakes, in a JSON array containing arrays of (account, cpu_weight, net_weight) tuples. NUM must not be less than 10 or more than 1000.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;GetCodehash>** accounts

#### get_tokenholder_count

[GET /api/holdercount]

returns a plaintext integer indicating the number of accounts with positive balance for a specified token.

##### Parameters

-   `contract` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** token contract
-   `token` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** token symbol

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)&lt;[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)>** count

### Error

### Error
