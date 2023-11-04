// SPDX-License-Identifier: MIT
pragma solidity =0.8.22;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ClaimToken is ERC20 {
    constructor(string memory name, uint supply) ERC20(name, name) {
        _mint(msg.sender, supply);
    }
}
