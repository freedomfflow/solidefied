import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import ConnectWalletImg from '../assets/ConnectWalletLogo.svg'
import {connectionAction} from '../actions/connectionAction'
import { useEthers } from '@usedapp/core'
import MakeQuerablePromise from '../utils/querable-promise'

const ConnectWallet = () => {
  const { account, chainId, deactivate, activateBrowserWallet } = useEthers()
  const { error } = useEthers()
  const isConnected = useSelector((state) => state.connectionReducer)
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      // show error to user if user denied connection request
      dispatch(connectionAction(false))
    }
  }, [error])



  const activateWallet = async () => {
    const activateBrowserWalletPromise = MakeQuerablePromise(activateBrowserWallet())
    activateBrowserWalletPromise.then(
        function() {
          if(activateBrowserWalletPromise.isFulfilled()){
            dispatch(connectionAction(true))
          }
        },
        function() {
          /* code if some error */
          dispatch(connectionAction(false))
        }
    );
  }

  const deactivateWallet = () => {
    deactivate()
    dispatch(connectionAction(false))
  }


  return (
      <div className="connectWallet">
        <div className = "main">
          <div className="card-element">
            <div className="card-content">
              {!isConnected && <p>Connect wallet</p>}
              {!isConnected && <p>Connect wallet to interact with dapp</p>}
              {isConnected && <p>Disconnect wallet</p>}
              {isConnected && <p>Select product from navigation to interact with dapp</p>}
              {!isConnected && <button onClick={activateWallet}><img src={ConnectWalletImg} alt=""/> Connect wallet</button>}
              {isConnected && <button onClick={deactivateWallet}><img src={ConnectWalletImg} alt=""/> Disconnect wallet</button>}
            </div>
          </div>
        </div>
      </div>
  )
}

export default ConnectWallet;