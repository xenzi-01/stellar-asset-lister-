import { Horizon } from "@stellar/stellar-sdk";

const publicKey = process.argv[2];
const network = process.argv[3] === "mainnet" ? "mainnet" : "testnet";

if (!publicKey) {
  console.error("Usage: npm start -- <public-key> [testnet|mainnet]");
  process.exit(1);
}

const url =
  network === "mainnet"
    ? "https://horizon.stellar.org"
    : "https://horizon-testnet.stellar.org";

const server = new Horizon.Server(url);

try {
  const account = await server.loadAccount(publicKey);

  console.log(`Network: ${network}`);
  console.log(`Account: ${account.accountId()}`);
  console.log("Non-XLM assets:");

  let found = 0;

  for (const b of account.balances) {
    if (b.asset_type === "native") continue;
    found++;

    if (b.asset_type === "liquidity_pool_shares") {
      console.log(`  Pool shares | pool ${b.liquidity_pool_id} | balance ${b.balance}`);
    } else {
      console.log(`  ${b.asset_code} | issuer ${b.asset_issuer} | balance ${b.balance}`);
    }
  }

  if (found === 0) {
    console.log("  None. This account only holds XLM.");
  }
} catch (err) {
  console.error("Could not load account:", (err as Error).message);
  process.exit(1);
}
