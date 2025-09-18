import React from 'react';
import {
    ConnectButton,
    useCurrentAccount,
    useSignAndExecuteTransaction,
    useSuiClientQuery,
    useSuiClient
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { MIST_PER_SUI } from '@mysten/sui/utils';
import WalletInfo from './WalletInfo';
import TransactionDemo from './TransactionDemo';
import './MainApp.css';

const MainApp: React.FC = () => {
    const currentAccount = useCurrentAccount();

    return (
        <div className="main-app">
            <header className="app-header">
                <h1>🔷 Sui dApp with TypeScript</h1>
                <p>Built with Sui dApp Kit, React, and TypeScript</p>
                <div className="connect-section">
                    <ConnectButton />
                </div>
            </header>

            <main className="app-main">
                {currentAccount ? (
                    <div className="connected-content">
                        <WalletInfo />
                        <TransactionDemo />
                    </div>
                ) : (
                    <div className="not-connected">
                        <h2>Welcome to Sui dApp</h2>
                        <p>Please connect your wallet to get started</p>
                        <div className="features">
                            <div className="feature-card">
                                <h3>🔐 Wallet Connection</h3>
                                <p>Connect to any Sui-compatible wallet</p>
                            </div>
                            <div className="feature-card">
                                <h3>💰 Balance Checking</h3>
                                <p>View your SUI balance and owned objects</p>
                            </div>
                            <div className="feature-card">
                                <h3>📝 Transaction Execution</h3>
                                <p>Sign and execute transactions on the Sui network</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <footer className="app-footer">
                <p>Built with ❤️ using Sui dApp Kit</p>
            </footer>
        </div>
    );
};

export default MainApp;