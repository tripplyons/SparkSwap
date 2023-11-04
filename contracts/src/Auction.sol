// SPDX-License-Identifier: MIT
pragma solidity =0.8.22;

import {ClaimToken} from "./ClaimToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Auction is Ownable {
    ClaimToken public token;
    uint256 public start;
    uint256 public rounds;
    uint256 public supplyPerRound;
    uint256 public currentRound;
    address public highestBidder;
    uint256 public highestBid;

    constructor(address tokenAddress, uint256 supply, uint256 _rounds) Ownable(msg.sender) {
        token = ClaimToken(tokenAddress);

        start = block.timestamp;
        rounds = _rounds;
        supplyPerRound = supply / _rounds;
    }

    function endRound() public onlyOwner {
        require(currentRound < rounds, "Auction: all rounds ended");
        currentRound += 1;
        if (highestBidder != address(0)) {
            require(token.transfer(highestBidder, supplyPerRound), "Auction: transfer failed");
            highestBidder = address(0);
            highestBid = 0;
        }
    }

    function bid() public payable {
        require(currentRound < rounds, "Auction: all rounds ended");
        require(msg.value > highestBid, "Auction: bid too low");

        if (highestBidder != address(0)) {
            payable(highestBidder).transfer(highestBid);
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
    }
}
