// SPDX-License-Identifier: MIT
pragma solidity =0.8.22;

import {Test, console2} from "forge-std/Test.sol";
import {ClaimToken} from "../src/ClaimToken.sol";

contract ClaimTokenTest is Test {
    ClaimToken public token;
    address public creator = address(0x100);
    address public user = address(0x101);

    function setUp() public {
        vm.prank(creator);
        token = new ClaimToken("TEST", 1e18);
    }

    function testBalance() public {
        assertEq(token.balanceOf(creator), 1e18);
        assertEq(token.balanceOf(user), 0);
    }
}
