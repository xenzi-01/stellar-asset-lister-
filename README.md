# Stellar Asset Lister

A TypeScript command-line tool that lists every non-XLM asset held by a Stellar account, with the asset code, issuer and balance.

## What it shows
- Asset code
- Issuer account
- Balance
- Liquidity pool shares, if the account holds any

## Built with
- TypeScript
- Stellar SDK (`@stellar/stellar-sdk`)
- Horizon (testnet by default)

## How to run
Requires Node.js 18 or newer.

```
npm install
npm start -- <public-key>
```

To use mainnet, add it as a second argument:

```
npm start -- <public-key> mainnet
```

An account that only holds XLM will print "None". To test, add a trustline to an asset on a testnet account using Stellar Lab.

## Ideas for later
- Show the trustline limit for each asset
- Add a JSON output option
- Sort assets by balance

## Author
Abdullahi Lawal (xenzi-01)
