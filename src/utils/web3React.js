import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { ethers } from "ethers";
import env from "react-dotenv";

const RPC_URLS = {
  1: "https://mainnet.infura.io/v3/b54cce4b8d564b0b9f9e84e0cdd8efa2",
  4: "https://rinkeby.infura.io/v3/b54cce4b8d564b0b9f9e84e0cdd8efa2",
  250: 'https://rpc.ftm.tools/'
};
const POLLING_INTERVAL = 12000;
const rpcUrl = RPC_URLS[250];//getNodeUrl();
const chainId = parseInt(250, 10);

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 250] });

const walletconnect = new WalletConnectConnector({
  rpc: { [chainId]: rpcUrl },
  qrcode: true,
  bridge: "https://bridge.walletconnect.org",
  pollingInterval: POLLING_INTERVAL,
});

export const resetWalletConnector = (connector) => {
    //console.log(connector)
    if (
      connector &&
      connector instanceof WalletConnectConnector 
    ) {
      connector.walletConnectProvider = undefined
    }
  }

export const connectorsByName = {
    Injected: injected,
    WalletConnect: walletconnect
};

export const getLibrary = (provider) => {
  
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

export const signMessage = async (provider, account, message) => {
    if (window.BinanceChain) {
      const { signature } = await window.BinanceChain.bnbSign(account, message)
      return signature
    }
  
    /**
     * Wallet Connect does not sign the message correctly unless you use their method
     * @see https://github.com/WalletConnect/walletconnect-monorepo/issues/462
     */
    if (provider.provider?.wc) {
      const wcMessage = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message))
      const signature = await provider.provider?.wc.signPersonalMessage([wcMessage, account])
      return signature
    }
  
    return provider.getSigner(account).signMessage(message)
  }

export const defaultProvider = ()=>{
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  return provider
}