// import React, { useState } from 'react';
// import {
//     useCurrentAccount,
//     useSignAndExecuteTransaction
// } from '@mysten/dapp-kit';
// import { Transaction } from '@mysten/sui/transactions';
// import { MIST_PER_SUI } from '@mysten/sui/utils';

// const TransactionDemo: React.FC = () => {
//     const currentAccount = useCurrentAccount();
//     const [recipient, setRecipient] = useState('');
//     const [amount, setAmount] = useState('');
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [txResult, setTxResult] = useState<string | null>(null);
//     const [txError, setTxError] = useState<string | null>(null);

//     const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction({
//         execute: async ({ bytes, signature }) =>
//             await suiClient.executeTransactionBlock({
//                 transactionBlock: bytes,
//                 signature,
//                 options: {
//                     showRawEffects: true,
//                     showEffects: true,
//                 },
//             }),
//     });

//     const handleSendTransaction = async () => {
//         if (!currentAccount || !recipient || !amount) {
//             setTxError('Please fill in all fields');
//             return;
//         }

//         try {
//             setIsProcessing(true);
//             setTxError(null);
//             setTxResult(null);

//             // Convert SUI to MIST
//             const amountInMist = Math.floor(Number(amount) * Number(MIST_PER_SUI));

//             // Create transaction
//             const txb = new Transaction();
//             const [coin] = txb.splitCoins(txb.gas, [amountInMist]);
//             txb.transferObjects([coin], recipient);

//             // Sign and execute transaction
//             signAndExecuteTransaction(
//                 {
//                     transaction: txb,
//                 },
//                 {
//                     onSuccess: (result) => {
//                         setTxResult(`Transaction successful! Digest: ${result.digest}`);
//                         setIsProcessing(false);
//                         setRecipient('');
//                         setAmount('');
//                     },
//                     onError: (error) => {
//                         setTxError(`Transaction failed: ${error.message}`);
//                         setIsProcessing(false);
//                     },
//                 }
//             );
//         } catch (error) {
//             setTxError(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
//             setIsProcessing(false);
//         }
//     };

//     const handleCreateObject = async () => {
//         if (!currentAccount) return;

//         try {
//             setIsProcessing(true);
//             setTxError(null);
//             setTxResult(null);

//             // Create a simple transaction that creates a new object
//             const txb = new Transaction();

//             // This is a simple example - you would typically call a Move function here
//             // For demonstration, we'll just make a transfer to self
//             const [coin] = txb.splitCoins(txb.gas, [1]);
//             txb.transferObjects([coin], currentAccount.address);

//             signAndExecuteTransaction(
//                 {
//                     transaction: txb,
//                 },
//                 {
//                     onSuccess: (result) => {
//                         setTxResult(`Object creation successful! Digest: ${result.digest}`);
//                         setIsProcessing(false);
//                     },
//                     onError: (error) => {
//                         setTxError(`Transaction failed: ${error.message}`);
//                         setIsProcessing(false);
//                     },
//                 }
//             );
//         } catch (error) {
//             setTxError(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
//             setIsProcessing(false);
//         }
//     };

//     if (!currentAccount) return null;

//     return (
//         <div className="transaction-demo">
//             <h2>🚀 Transaction Demo</h2>

//             <div className="transaction-sections">
//                 {/* Send SUI Section */}
//                 <div className="transaction-card">
//                     <h3>Send SUI</h3>
//                     <div className="form-group">
//                         <label htmlFor="recipient">Recipient Address:</label>
//                         <input
//                             id="recipient"
//                             type="text"
//                             value={recipient}
//                             onChange={(e) => setRecipient(e.target.value)}
//                             placeholder="0x..."
//                             className="form-input"
//                         />
//                     </div>
//                     <div className="form-group">
//                         <label htmlFor="amount">Amount (SUI):</label>
//                         <input
//                             id="amount"
//                             type="number"
//                             step="0.001"
//                             min="0"
//                             value={amount}
//                             onChange={(e) => setAmount(e.target.value)}
//                             placeholder="0.001"
//                             className="form-input"
//                         />
//                     </div>
//                     <button
//                         onClick={handleSendTransaction}
//                         disabled={isProcessing || !recipient || !amount}
//                         className="primary-button"
//                     >
//                         {isProcessing ? 'Processing...' : 'Send SUI'}
//                     </button>
//                 </div>

//                 {/* Create Object Section */}
//                 <div className="transaction-card">
//                     <h3>Create Object</h3>
//                     <p>This will create a simple transaction object on the blockchain.</p>
//                     <button
//                         onClick={handleCreateObject}
//                         disabled={isProcessing}
//                         className="secondary-button"
//                     >
//                         {isProcessing ? 'Processing...' : 'Create Object'}
//                     </button>
//                 </div>
//             </div>

//             {/* Transaction Results */}
//             {txResult && (
//                 <div className="result success">
//                     <h4>✅ Success</h4>
//                     <p>{txResult}</p>
//                 </div>
//             )}

//             {txError && (
//                 <div className="result error">
//                     <h4>❌ Error</h4>
//                     <p>{txError}</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default TransactionDemo;




import React, { useState } from 'react';
import { useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';

const TransactionDemo: React.FC = () => {
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<string>('');

    const currentAccount = useCurrentAccount();
    const suiClient = useSuiClient(); // This should fix the 'suiClient' not found error

    // Use the simplified hook without custom execute function
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

    const handleTransfer = async () => {
        if (!currentAccount || !recipient || !amount) return;

        setIsLoading(true);
        try {
            // Convert amount to MIST (1 SUI = 1,000,000,000 MIST)
            const amountInMist = BigInt(Math.floor(parseFloat(amount) * 1_000_000_000));

            // Create transaction using the correct API
            const txb = new Transaction();

            // Use the correct splitCoins syntax - it expects a single amount, not an array
            const coin = txb.splitCoins(txb.gas, [amountInMist]);

            // Use transferObjects correctly
            txb.transferObjects([coin], txb.pure.address(recipient));

            // Sign and execute transaction
            signAndExecuteTransaction(
                {
                    transaction: txb,
                },
                {
                    onSuccess: (result) => {
                        console.log('Transaction successful:', result);
                        setResult(`Transaction successful: ${result.digest}`);
                        setIsLoading(false);
                    },
                    onError: (error) => {
                        console.error('Transaction failed:', error);
                        setResult(`Transaction failed: ${error.message}`);
                        setIsLoading(false);
                    },
                }
            );
        } catch (error) {
            console.error('Error creating transaction:', error);
            setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            setIsLoading(false);
        }
    };

    const handleMint = async () => {
        if (!currentAccount) return;

        setIsLoading(true);
        try {
            const txb = new Transaction();

            // Simple example - transfer 1 MIST to self
            const coin = txb.splitCoins(txb.gas, [BigInt(1)]);
            txb.transferObjects([coin], txb.pure.address(currentAccount.address));

            signAndExecuteTransaction(
                {
                    transaction: txb,
                },
                {
                    onSuccess: (result) => {
                        console.log('Mint successful:', result);
                        setResult(`Mint successful: ${result.digest}`);
                        setIsLoading(false);
                    },
                    onError: (error) => {
                        console.error('Mint failed:', error);
                        setResult(`Mint failed: ${error.message}`);
                        setIsLoading(false);
                    },
                }
            );
        } catch (error) {
            console.error('Error creating mint transaction:', error);
            setResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            setIsLoading(false);
        }
    };

    if (!currentAccount) {
        return (
            <div>
                <h2>Please connect your wallet</h2>
            </div>
        );
    }

    return (
        <div>
            <h2>Transaction Demo</h2>
            <p>Connected Account: {currentAccount.address}</p>

            <div>
                <h3>Transfer SUI</h3>
                <input
                    type="text"
                    placeholder="Recipient Address"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount (SUI)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button onClick={handleTransfer} disabled={isLoading || !recipient || !amount}>
                    {isLoading ? 'Processing...' : 'Transfer'}
                </button>
            </div>

            <div>
                <h3>Mint Example</h3>
                <button onClick={handleMint} disabled={isLoading}>
                    {isLoading ? 'Processing...' : 'Mint'}
                </button>
            </div>

            {result && (
                <div>
                    <h3>Result:</h3>
                    <p>{result}</p>
                </div>
            )}
        </div>
    );
};

export default TransactionDemo;