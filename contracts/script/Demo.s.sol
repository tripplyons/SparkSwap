// SPDX-License-Identifier: MIT
pragma solidity =0.8.22;

import "forge-std/Script.sol";
import "../src/TokenIssuer.sol";
import "../src/Auction.sol";
import "../src/ClaimToken.sol";
import "../src/TradeClaims.sol";

contract Demo is Script {
    function run() external {
        uint256 sellerPrivateKey = vm.envUint("ANVIL_0");
        address sellerAddress = vm.addr(sellerPrivateKey);

        uint256 traderPrivateKey = vm.envUint("ANVIL_1");
        address traderAddress = vm.addr(traderPrivateKey);

        uint256 buyerPrivateKey = vm.envUint("ANVIL_2");
        address buyerAddress = vm.addr(buyerPrivateKey);

        vm.startBroadcast(sellerPrivateKey);
        TokenIssuer tokenIssuer = new TokenIssuer();
        tokenIssuer.issueToken("LOCATION, TIME", 1000e18, "Solar", 1);
        vm.stopBroadcast();

        Auction auction = Auction(tokenIssuer.getAuction(0));
        ClaimToken token = ClaimToken(tokenIssuer.getToken(0));
        TradeClaims tradeClaims = TradeClaims(tokenIssuer.getTradeClaims(0));

        vm.startBroadcast(traderPrivateKey);
        auction.bid{value: 1000e18}();
        vm.stopBroadcast();

        vm.startBroadcast(sellerPrivateKey);
        tokenIssuer.endRound(0);
        vm.stopBroadcast();

        vm.startBroadcast(traderPrivateKey);
        token.approve(address(tradeClaims), 1000e18);
        tradeClaims.createSellOffer(1, 1e18, 1e18);
        tradeClaims.createSellOffer(2, 1e18, 2e18);
        vm.stopBroadcast();
    }
}
