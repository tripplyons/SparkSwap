// SPDX-License-Identifier: MIT
pragma solidity =0.8.22;

import {ClaimToken} from "./ClaimToken.sol";

contract TradeClaims {
    ClaimToken public token;

    struct Offer {
        uint256 tokenAmount;
        uint256 etherAmount;
    }

    struct OfferIndex {
        address owner;
        uint256 id;
    }

    mapping(address => mapping(uint256 => Offer)) public buyOffers;
    mapping(address => mapping(uint256 => Offer)) public sellOffers;

    OfferIndex[] public buyOfferIndex;
    OfferIndex[] public sellOfferIndex;

    constructor(address tokenAddress) {
        token = ClaimToken(tokenAddress);
    }

    function removeBuyOffer(address owner, uint256 id) internal {
        for (uint256 i = 0; i < buyOfferIndex.length; i++) {
            if (buyOfferIndex[i].owner == owner && buyOfferIndex[i].id == id) {
                buyOfferIndex[i] = buyOfferIndex[buyOfferIndex.length - 1];
                buyOfferIndex.pop();
                break;
            }
        }
    }

    function removeSellOffer(address owner, uint256 id) internal {
        for (uint256 i = 0; i < sellOfferIndex.length; i++) {
            if (sellOfferIndex[i].owner == owner && sellOfferIndex[i].id == id) {
                sellOfferIndex[i] = sellOfferIndex[sellOfferIndex.length - 1];
                sellOfferIndex.pop();
                break;
            }
        }
    }

    function createBuyOffer(uint256 id, uint256 tokenAmount) public payable {
        require(msg.value > 0, "TradeClaims: no ether sent");
        require(tokenAmount > 0, "TradeClaims: no token amount specified");
        require(buyOffers[msg.sender][id].etherAmount == 0, "TradeClaims: offer already exists");

        buyOffers[msg.sender][id] = Offer(tokenAmount, msg.value);

        buyOfferIndex.push(OfferIndex(msg.sender, id));
    }

    function createSellOffer(uint256 id, uint256 tokenAmount, uint256 etherAmount) public {
        require(tokenAmount > 0, "TradeClaims: no token amount specified");
        require(etherAmount > 0, "TradeClaims: no ether amount specified");
        require(sellOffers[msg.sender][id].tokenAmount == 0, "TradeClaims: offer already exists");

        // transfer tokens
        require(token.transferFrom(msg.sender, address(this), tokenAmount), "TradeClaims: transfer failed");

        sellOffers[msg.sender][id] = Offer(tokenAmount, etherAmount);

        sellOfferIndex.push(OfferIndex(msg.sender, id));
    }

    function cancelBuyOffer(uint256 id) public {
        require(buyOffers[msg.sender][id].etherAmount > 0, "TradeClaims: no offer exists");

        payable(msg.sender).transfer(buyOffers[msg.sender][id].etherAmount);

        delete buyOffers[msg.sender][id];

        removeBuyOffer(msg.sender, id);
    }

    function cancelSellOffer(uint256 id) public {
        require(sellOffers[msg.sender][id].tokenAmount > 0, "TradeClaims: no offer exists");

        require(token.transfer(msg.sender, sellOffers[msg.sender][id].tokenAmount), "TradeClaims: transfer failed");

        delete sellOffers[msg.sender][id];

        removeSellOffer(msg.sender, id);
    }

    function acceptBuyOffer(uint256 id, address buyer) public {
        require(buyOffers[buyer][id].etherAmount > 0, "TradeClaims: no offer exists");

        // transfer tokens
        require(token.transferFrom(msg.sender, buyer, buyOffers[buyer][id].tokenAmount), "TradeClaims: transfer failed");

        // transfer ether
        payable(msg.sender).transfer(buyOffers[buyer][id].etherAmount);

        // clear offers
        delete buyOffers[buyer][id];

        removeBuyOffer(buyer, id);
    }

    function acceptSellOffer(uint256 id, address seller) public payable {
        require(sellOffers[seller][id].tokenAmount > 0, "TradeClaims: no offer exists");
        require(msg.value == sellOffers[seller][id].etherAmount, "TradeClaims: wrong ether amount");

        // transfer tokens
        require(token.transfer(msg.sender, sellOffers[seller][id].tokenAmount), "TradeClaims: transfer failed");

        // transfer ether
        payable(seller).transfer(msg.value);

        // clear offers
        delete sellOffers[seller][id];

        removeSellOffer(seller, id);
    }
}
