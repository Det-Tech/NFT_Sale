import React, { useState, useEffect } from "react";
import cn from "classnames";
import Slider from "react-slick";
import { Link, useHistory } from "react-router-dom";
import styles from "./Mint.module.sass";
import Icon from "../../../components/Icon";
import { Range, getTrackBackground } from "react-range";
import { useWeb3React } from "@web3-react/core";
import { ethers, utils } from "ethers";
import swal from 'sweetalert';
import { defaultProvider } from '../../../utils/web3React'
//import env from "react-dotenv";

const contractConst = require("../../../artifacts/contract_abi.json");
const contractAddress = process.env.REACT_APP_CONTRACT;

const Mint = (props) => {

  const contractAbi = contractConst.abi;
  const chainID = process.env.REACT_APP_CHAIN_ID;
  const history = useHistory();

  const { account, connector, activate, library, chainId, active, error } = useWeb3React();
  const [activeDrag, setActiveDrag] = useState({
    clientXonMouseDown: null,
    clientYonMouseDown: null,
  });

  const STEP = 1;
  const MIN = 1;
  const MAX = 5;
  const price = 0.01;
  const [totalCnts, setTotalCnts] = useState(1000);
  const [values, setValues] = useState([1]);
  const [contract, setContract] = useState("");
  const [mintedCnts, setMintedCnts] = useState(0);

  const mintProc = async () => {
    if (!account) {
      swal({ title: "Please connect the wallet", icon: "error" })
      return
    }
    else {
      if (chainId != chainID) {
        swal({ title: "Wrong Network (Please connect with Fantom)", icon: "error" })
        return;
      }
    }

    let overrides = {
      value: ethers.utils.parseEther((values[0] * price).toString()),
    };
    try {

      let tx = await contract.mint(values[0], overrides);
      swal({ title: "Successfuly minted", icon: "success" })
    } catch (e) {
      let error = JSON.parse(JSON.stringify(e));
      if(error.message){
        swal({ title: error.message, icon: "error" })
      } else {
        swal({ title: error?.error?.message, icon: "error" })
      }
    }
  };

  useEffect(async () => {
    try {
      
      let provider;
      provider = library
      
      if(provider==null) {
        // const address = "0x8ba1f109551bD432803012645Ac136ddd64DBA72"
        // const voidsigner = new ethers.VoidSigner(address, defaultProvider)
        // let voidnftContract = new ethers.Contract(
        //   contractAddress,
        //   contractAbi,
        //   voidsigner
        // );
        // console.log(voidnftContract)
        // let _voidmintedCnts = await voidnftContract.totalSupply();
        // setMintedCnts(_voidmintedCnts);
        return;
      };
      if (chainId != chainID||!account) {
        if (chainId) swal({ title: "Wrong Network (Please connect with Fantom)", icon: "error" })
        else {

        }
        return;
      }

      const signer = provider.getSigner(account);
      let nftContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      if (nftContract) {
        setContract(nftContract);
        // let _mintedCnts = await nftContract.totalSupply();
        // setMintedCnts(_mintedCnts);
      }
    } catch (e) {
      swal({ title: e, icon: "error" })
    }
  }, [account,active,chainId,library]);

  return (
   
      <div className={props.className}>
        <div className={styles.wrapper}>
          
          <div>
            <div className={styles.mintbtns}>
              <div className={styles.range}>
                <Range
                  values={values}
                  step={STEP}
                  min={MIN}
                  max={MAX}
                  onChange={(values) => setValues(values)}
                  renderTrack={({ props, children }) => (
                    <div
                      onMouseDown={props.onMouseDown}
                      onTouchStart={props.onTouchStart}
                      style={{
                        ...props.style,
                        height: "36px",
                        display: "flex",
                        width: "100%",
                      }}
                    >
                      <div
                        ref={props.ref}
                        style={{
                          height: "8px",
                          width: "100%",
                          borderRadius: "4px",
                          background: getTrackBackground({
                            values,
                            colors: ["#3772FF", "#E6E8EC"],
                            min: MIN,
                            max: MAX,
                          }),
                          alignSelf: "center",
                        }}
                      >
                        {children}
                      </div>
                    </div>
                  )}
                  renderThumb={({ props, isDragged }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: "24px",
                        width: "24px",
                        borderRadius: "50%",
                        backgroundColor: "#3772FF",
                        border: "4px solid #FCFCFD",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "-33px",
                          color: "#fff",
                          fontWeight: "600",
                          fontSize: "14px",
                          lineHeight: "18px",
                          fontFamily: "Poppins",
                          padding: "4px 8px",
                          borderRadius: "8px",
                          backgroundColor: "#141416",
                        }}
                      >
                        {values[0]}
                      </div>
                    </div>
                  )}
                />
                <div className={styles.label}>{"Total Price : " +(price * values[0]-0) + " FTM"} </div>
              </div>
              <button
                  className={cn("button", styles.button)}
                  onClick={mintProc}
                >
                  Mint
                </button>
            </div>
            <div className={styles.mintCnts}>
              {/* {mintedCnts + " of " + totalCnts + " unique kids minted"} */}
              <div className={styles.opensea}>
              <a
                href={
                  "https://opensea.io/collection/ghettokids"
                }
                target="_blank"
                className={styles.link}
              >
                View the collection on PaintSwap
              </a>
            </div>
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Mint;