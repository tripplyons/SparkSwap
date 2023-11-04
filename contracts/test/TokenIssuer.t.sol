// SPDX-License-Identifier: MIT
pragma solidity =0.8.22;

import { Test, console2 } from "forge-std/Test.sol";
import { ClaimToken } from "../src/ClaimToken.sol";
import { TokenIssuer } from "../src/TokenIssuer.sol";
import { Auction } from "../src/Auction.sol";

contract TokenIssuerTest is Test {
    TokenIssuer public tokenIssuer;
    address public creator = address(0x100);
    address public user = address(0x101);

    function setUp() public {
        vm.prank(creator);
        tokenIssuer = new TokenIssuer();
    }

    function testIssueToken() public {
        vm.prank(user);
        vm.expectRevert();
        tokenIssuer.issueToken("TEST", 1e18, "renewable", 1);

        vm.prank(creator);
        tokenIssuer.issueToken("TEST", 1e18, "renewable", 1);

        ClaimToken token = ClaimToken(tokenIssuer.getToken(0));
        Auction auction = Auction(tokenIssuer.getAuction(0));

        assertEq(token.balanceOf(address(auction)), 1e18);

        vm.deal(user, 1e19);
        vm.prank(user);
        auction.bid{value: 1e18}();

        // they need to outbid, same bid doesn't work
        vm.prank(user);
        vm.expectRevert();
        auction.bid{value: 1e18}();

        // they need to outbid, lower bid doesn't work
        vm.prank(user);
        vm.expectRevert();
        auction.bid{value: 5e17}();

        // if they outbid, they will get refunded
        vm.prank(user);
        auction.bid{value: 2e18}();

        assertGt(user.balance, 75e17);
        assertLt(user.balance, 85e17);

        vm.prank(user);
        vm.expectRevert();
        tokenIssuer.endRound(0);

        vm.prank(creator);
        tokenIssuer.endRound(0);

        vm.prank(creator);
        vm.expectRevert();
        tokenIssuer.endRound(0);
    }
}
