// SPDX-License-Identifier: MIT
pragma solidity =0.8.22;

import { ClaimToken } from "./ClaimToken.sol";
import { Auction } from "./Auction.sol";
import { TradeClaims } from "./TradeClaims.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenIssuer is Ownable {
    struct TokenMetadata {
        string energyType;
        ClaimToken token;
        Auction auction;
        TradeClaims tradeClaims;
    }

    constructor() Ownable(msg.sender) {
    }

    TokenMetadata[] public tokens;

    function issueToken(string memory name, uint256 supply, string memory energyType, uint256 rounds) public onlyOwner {
        ClaimToken token = new ClaimToken(name, supply);
        Auction auction = new Auction(address(token), supply, rounds);
        TradeClaims tradeClaims = new TradeClaims(address(token));

        tokens.push(TokenMetadata(energyType, token, auction, tradeClaims));

        require(token.transfer(address(auction), supply), "TokenIssuer: transfer failed");
    }

    function getNumberOfTokens() public view returns (uint256) {
        return tokens.length;
    }

    function getToken(uint256 index) public view returns (address) {
        return address(tokens[index].token);
    }

    function getAuction(uint256 index) public view returns (address) {
        return address(tokens[index].auction);
    }

    function getTradeClaims(uint256 index) public view returns (address) {
        return address(tokens[index].tradeClaims);
    }

    function getEnergyType(uint256 index) public view returns (string memory) {
        return tokens[index].energyType;
    }

    function endRound(uint256 index) public onlyOwner {
        tokens[index].auction.endRound();
    }
}
