import {useState, useEffect} from 'react';
import {ethers} from 'ethers';
import Interactions from './Interactions'
import kartacacoin_abi from  "../contracts/kartacacoin_abi.json"
import MetamaskIcon from '../assets/images/metamask.png'

const Wallet = () =>
{
    const [hasProvider, setHasProvider] = useState(false)
    const [walletConnected, setWalletConnected] = useState(false)
    const [currentAccount, setCurrentAccount] = useState(null)
    const [balance , setBalance] = useState(null)
    const [ethBalance, setEthBalance] = useState(null)
    const [contractSymbol, setContractSymbol] = useState(null)

    const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS
    console.log(contractAddress)

    const [ethereumActors, setEthereumActors] = useState(null)
    
    useEffect(
        () =>
        {
            const updateBalance =  () =>
            {
                ethereumActors.contract.balanceOf(currentAccount).then(
                    async (res) => {
                        // let decimals =  await ethereumActors.contract.decimals();
                        let coinBalance = res.toString();
                        coinBalance = ethers.utils.formatEther(res)
                        setBalance(coinBalance)
                        

                    }
                ).catch(
                    (e) => {
                    }
                )
                ethereumActors.provider.getBalance(currentAccount).then(
                (res) =>{
                    setEthBalance(parseInt(res._hex,16)/(10**18 ))
                }
                )
            }
            if(ethereumActors && ethereumActors.contract && ethereumActors.contract != null)
            {
                updateBalance()
            }
        }, [ethereumActors, currentAccount]
    )
    useEffect(
        () => 
        {
            if(typeof web3 !== 'undefined')
            {
                setHasProvider(true);
            }
        },[]
    )
    

    const afterAccountChanges = () => {

        let provider = new ethers.providers.Web3Provider(window.ethereum)

        let signer =  provider.getSigner()

        let contract = new ethers.Contract(contractAddress, kartacacoin_abi, signer )
        
        setEthereumActors({
            'provider': provider,
            'signer': signer,
            'contract': contract,
        })
        contract.symbol().then((a) => {setContractSymbol(a)})
    }

    const accountListener = (address) => {
        setCurrentAccount(address)
        afterAccountChanges()
    }

    const connectWallet = ()  => {
        // check if there is metamask in window
        if(window.ethereum)
        {
            window.ethereum.request({
                method: 'eth_requestAccounts'
            }).then(
                (res) =>{
                    accountListener(res[0]);
                    setWalletConnected(true);
                }
            ).catch(
                (err)=> 
                {
                    // give error
                }
            )
        }
        else{
            // link to metamask
        }
    }


    return (<div className='content-container'>
        <div className='half-content lhs'>
            <h2>KartacaCoin ERC-20 Wallet</h2>

            {
            hasProvider && 
            <button onClick={connectWallet}>{ !walletConnected ? "Connect Wallet" : "Wallet Connected"}
                <img src={MetamaskIcon} alt="Metamask icon" />
            </button>
            }
            {
                !hasProvider && 
                <button>
                    Install metamask
                    <img src={MetamaskIcon} alt="Metamask icon" />
                </button>
            }
            <div>
                <h3>Adress</h3>
                <p>{currentAccount}</p>
            </div>
            
            <div>
                <h3>Balance</h3>
                <p>{balance} {contractSymbol} </p>
            </div>
            <div>
                <h3>ETH Balance</h3>
                <p>{ethBalance} </p>
            </div>
            
        </div>
        
        <div className='half-content rhs'>
            {
                ethereumActors && 
                <Interactions contract={ethereumActors.contract} /> 
            }
        </div>
    </div>);
}
export default Wallet