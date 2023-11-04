// SPDX-License-Identifier: MIT
pragma solidity =0.8.22;

import { Test, console2 } from "forge-std/Test.sol";
import { ClaimToken } from "../src/ClaimToken.sol";
import { TokenIssuer } from "../src/TokenIssuer.sol";
import { Auction } from "../src/Auction.sol";
import { TradeClaims } from "../src/TradeClaims.sol";

contract TradeClaimsTest is Test {
    TokenIssuer public tokenIssuer;
    ClaimToken public token;
    Auction public auction;
    TradeClaims public exchange;

    address public creator = address(0x100);
    address public user = address(0x101);
    address public user2 = address(0x102);

    function setUp() public {
        vm.prank(creator);
        tokenIssuer = new TokenIssuer();

        vm.prank(creator);
        tokenIssuer.issueToken("TEST", 1e18, "renewable", 1);

        token = ClaimToken(tokenIssuer.getToken(0));
        auction = Auction(tokenIssuer.getAuction(0));

        assertEq(token.balanceOf(address(auction)), 1e18);

        vm.deal(user, 1e19);
        vm.deal(user2, 1e19);

        vm.prank(user);
        auction.bid{value: 1e18}();

        vm.prank(creator);
        tokenIssuer.endRound(0);

        exchange = TradeClaims(tokenIssuer.getTradeClaims(0));
    }

    function testTradeClaims() public {
        vm.prank(user);
        vm.expectRevert();
        exchange.createSellOffer(0, 1e18, 1e17);

        vm.prank(user);
        token.approve(address(exchange), 1e18);

        vm.prank(user);
        exchange.createSellOffer(0, 1e18, 1e17);

        vm.prank(user2);
        vm.expectRevert();
        exchange.acceptSellOffer{
            value: 0
        }(
            0,
            user
        );

        vm.prank(user2);
        vm.expectRevert();
        exchange.acceptSellOffer{
            value: 2e18
        }(
            0,
            user
        );

        vm.prank(user2);
        exchange.acceptSellOffer{
            value: 1e17
        }(
            0,
            user
        );

        assertEq(token.balanceOf(user2), 1e18);
    }
}
