pragma solidity >=0.4.22 <0.9.0;
  
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
  
/**  
* @title KartacaCoin is basic ERC20 Token
*/  
contract KartacaCoin is ERC20{  
  
  string public name = "KartacaCoin";  
  string public symbol = "KTC";  
  
 
  /**  
 * @dev :Random total supply */  constructor() ERC20() public {  
  _mint(msg.sender, 1000000 * (10**18));
 }
  
 
 }