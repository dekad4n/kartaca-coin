import { useState } from "react"

const Interactions = (props) =>
{
    const [txHash, setTxHash] = useState(null)
    const [error, setError] = useState("")
    const submitHandler = (event) => 
    {
        event.preventDefault()
        const [amount, address] = [event.target.amount.value, event.target.recAddress.value]

        props.contract.transfer(address, (amount * (10**18)).toLocaleString('fullwide', { useGrouping: false })).then(
            async (res)  =>
            {
                // let receipt = await res.wait()
                setTxHash(res.hash)
            }
        ).catch(
            (err)=>
            {
                console.log(err)
                setError(err.data.message)
            }
        )
    }
    return (
    <div>
        <form className='transfer-form' onSubmit={submitHandler}>
            <h2>Transfer KartacaCoin</h2>

            <p>Receiver Address</p>
            <input type="text" id="recAddress" />

            <p>Amount</p>
            <input type="number" id="amount" min='0' />

            <button type="submit">Transfer</button>
        </form>
        {
            txHash && 
            <span>Hash: {txHash}</span>
        }   
        <span style={{width:'300px', display: 'block'}}>{error}</span>
    </div>);
}
export default Interactions