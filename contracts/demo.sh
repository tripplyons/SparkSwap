OUTPUT=$(forge script script/Demo.s.sol --fork-url http://localhost:8545 --broadcast)
ADDRESS=$(echo $OUTPUT | sed -n 's/.*Contract Address: \(0x[0-9a-fA-F]*\).*/\1/p')

echo "NEXT_PUBLIC_CONTRACT_ADDRESS=$ADDRESS" > ../frontend/.env.local

cp out/ClaimToken.sol/ClaimToken.json ../frontend/src/contracts/ClaimToken.json
cp out/TradeClaims.sol/TradeClaims.json ../frontend/src/contracts/TradeClaims.json
cp out/Auction.sol/Auction.json ../frontend/src/contracts/Auction.json
cp out/TokenIssuer.sol/TokenIssuer.json ../frontend/src/contracts/TokenIssuer.json
