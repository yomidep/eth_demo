"use client";
import React, { useState, useEffect } from 'react';
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client } from '../client';
import { ethers } from 'ethers';

const ConnectWallet = () => {
    const account = useActiveAccount();
    const [balance, setBalance] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBalance = async () => {
            if (account?.address) {
                setIsLoading(true);
                setError(null);
                try {
                    const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
                    const balanceWei = await provider.getBalance(account.address);
                    setBalance(balanceWei);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchBalance();
    }, [account?.address]);

    const formatBalance = (balanceWei) => {
        if (!balanceWei) return "0";
        return parseFloat(ethers.formatEther(balanceWei)).toFixed(4);
    };

    const renderBalanceInfo = () => {
        if (isLoading) return <p className="text-sm text-gray-600 mt-2">Fetching balance...</p>;
        if (error) return <p className="text-sm text-red-500 mt-2">Error fetching balance: {error}</p>;
        if (!balance) return <p className="text-sm text-gray-600 mt-2">Balance information not available</p>;

        const formattedBalance = formatBalance(balance);
        return <p className="text-sm text-gray-600 mt-2">Wallet balance: {formattedBalance} ETH</p>;
    };

    return (
        <div className='border bg-white p-4 rounded-lg shadow-md'>
            <ConnectButton client={client} />
            {account ? (
                <div className="mt-4">
                    <p className="text-sm text-gray-600">Wallet address: <span className="font-mono">{account.address}</span></p>
                    {renderBalanceInfo()}
                </div>
            ) : (
                <p className="mt-4 text-sm text-gray-600">Connect your wallet to view details</p>
            )}
        </div>
    );
};

export default ConnectWallet;