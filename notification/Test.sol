pragma solidity ^0.8.7;

// contract address already deployed on Mumbai is 0x548249958BccCb55493cE8B22b1E721F3475B857
// see & execute https://mumbai.polygonscan.com/address/0x548249958bcccb55493ce8b22b1e721f3475b857
contract donationExample {

    address payable owner;

    constructor() {
         owner = payable(msg.sender);
     }

     event Donate (
        address from,
        uint256 amount
     );

    function newDonation() public payable{
        (bool success,) = owner.call{value: msg.value}("");
        require(success, "Failed to send money");
        emit Donate(
            msg.sender,
            msg.value / 1000000000000000000
        );
    } 

}