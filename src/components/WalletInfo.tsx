import React from 'react';
import {
    useCurrentAccount,
    useSuiClientQuery,
    useCurrentWallet
} from '@mysten/dapp-kit';
import { formatAddress } from '@mysten/sui/utils';
import { MIST_PER_SUI } from '@mysten/sui/utils';

const WalletInfo: React.FC = () => {
    const currentAccount = useCurrentAccount();
    const { currentWallet } = useCurrentWallet();

    // Get balance
    const { data: balance, isPending: balanceLoading, error: balanceError } = useSuiClientQuery(
        'getBalance',
        {
            owner: currentAccount?.address || '',
        },
        {
            enabled: !!currentAccount?.address,
        }
    );

    // Get owned objects
    const { data: ownedObjects, isPending: objectsLoading } = useSuiClientQuery(
        'getOwnedObjects',
        {
            owner: currentAccount?.address || '',
            options: {
                showType: true,
                showContent: true,
                showOwner: true,
            },
        },
        {
            enabled: !!currentAccount?.address,
        }
    );

    if (!currentAccount) return null;

    const formatBalance = (balance: string): string => {
        const balanceInSui = Number(balance) / Number(MIST_PER_SUI);
        return balanceInSui.toFixed(6);
    };

    return (
        <div className="wallet-info">
            <h2>💼 Wallet Information</h2>

            <div className="info-grid">
                <div className="info-card">
                    <h3>Connected Wallet</h3>
                    <p><strong>Name:</strong> {currentWallet?.name || 'Unknown'}</p>
                    <p><strong>Address:</strong> {formatAddress(currentAccount.address)}</p>
                </div>

                <div className="info-card">
                    <h3>Balance</h3>
                    {balanceLoading ? (
                        <p>Loading balance...</p>
                    ) : balanceError ? (
                        <p style={{ color: 'red' }}>Error loading balance</p>
                    ) : (
                        <div>
                            <p><strong>{formatBalance(balance?.totalBalance || '0')} SUI</strong></p>
                            <p className="small-text">{balance?.totalBalance || '0'} MIST</p>
                        </div>
                    )}
                </div>

                <div className="info-card">
                    <h3>Owned Objects</h3>
                    {objectsLoading ? (
                        <p>Loading objects...</p>
                    ) : (
                        <div>
                            <p><strong>Total Objects:</strong> {ownedObjects?.data?.length || 0}</p>
                            {ownedObjects?.data && ownedObjects.data.length > 0 && (
                                <div className="objects-list">
                                    <h4>Recent Objects:</h4>
                                    {ownedObjects.data.slice(0, 3).map((obj, index) => (
                                        <div key={index} className="object-item">
                                            <p className="small-text">
                                                <strong>ID:</strong> {formatAddress(obj.data?.objectId || '')}
                                            </p>
                                            <p className="small-text">
                                                <strong>Type:</strong> {obj.data?.type?.split('::').pop() || 'Unknown'}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WalletInfo;