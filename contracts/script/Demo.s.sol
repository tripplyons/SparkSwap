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

        // uint256 buyerPrivateKey = vm.envUint("ANVIL_2");
        // address buyerAddress = vm.addr(buyerPrivateKey);

        vm.startBroadcast(sellerPrivateKey);
        TokenIssuer tokenIssuer = new TokenIssuer();
        tokenIssuer.issueToken("Troy NY, 2023-11-07", 1000e18, "Solar", 1);
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



        vm.startBroadcast(sellerPrivateKey);
        tokenIssuer.issueToken("Troy NY, 2023-11-07", 1000e18, "Wind", 1);
        vm.stopBroadcast();

        Auction auction2 = Auction(tokenIssuer.getAuction(1));
        ClaimToken token2 = ClaimToken(tokenIssuer.getToken(1));
        TradeClaims tradeClaims2 = TradeClaims(tokenIssuer.getTradeClaims(1));

        vm.startBroadcast(traderPrivateKey);
        auction2.bid{value: 2000e18}();
        vm.stopBroadcast();

        vm.startBroadcast(sellerPrivateKey);
        tokenIssuer.endRound(1);
        vm.stopBroadcast();

        vm.startBroadcast(traderPrivateKey);
        token2.approve(address(tradeClaims2), 1000e18);
        tradeClaims2.createSellOffer(1, 1e18, 2e18);
        tradeClaims2.createSellOffer(2, 1e18, 3e18);
        vm.stopBroadcast();

        vm.startBroadcast(sellerPrivateKey);
        tokenIssuer.issueToken("Troy NY, 2023-11-07", 1000e18, "Coal", 1);
        vm.stopBroadcast();

        Auction auction3 = Auction(tokenIssuer.getAuction(2));
        ClaimToken token3 = ClaimToken(tokenIssuer.getToken(2));
        TradeClaims tradeClaims3 = TradeClaims(tokenIssuer.getTradeClaims(2));

        vm.startBroadcast(traderPrivateKey);
        auction3.bid{value: 500e18}();
        vm.stopBroadcast();

        vm.startBroadcast(sellerPrivateKey);
        tokenIssuer.endRound(2);
        vm.stopBroadcast();

        vm.startBroadcast(traderPrivateKey);
        token3.approve(address(tradeClaims3), 1000e18);
        tradeClaims3.createSellOffer(1, 1e18, 5e17);
        tradeClaims3.createSellOffer(2, 1e18, 7e17);
        vm.stopBroadcast();
    }
}
