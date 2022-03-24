import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import { useHistory } from "react-router-dom";
import cn from "classnames";
import styles from "./Item.module.sass";
import Users from "./Users";
import { Range, getTrackBackground } from "react-range";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import env from "react-dotenv";
import Slider from "react-slick";
import { ethers, utils } from "ethers";
import swal from 'sweetalert';
//import "slick-carousel/slick/slick.css";
//import "slick-carousel/slick/slick-theme.css";
//const ethers = require('ethers');

const contract = require("../../artifacts/101010art.json");
const contractAddress = "0x84FD15bfd538f3EA8c48d7433243CC82Df6E03e8";

const contractAbi = contract.abi;
const chainID = 1;

const collectionImage = {
  1: "QmWbMDa4N4nc6MXzTcXEHpCUoCL8NSH55etyzTjWRWA21Y",
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const galleryItems = [
  {
    gallery:
      "https://ipfs.io/ipfs/QmWAxX3T4JXt9LnHjuFRu96jSbfvmxGZBeryQ578GThhW5/Énergie-001.jpg",
  },
  {
    gallery:
      "https://ipfs.io/ipfs/QmWAxX3T4JXt9LnHjuFRu96jSbfvmxGZBeryQ578GThhW5/Énergie-082.jpg",
  },
  {
    gallery:
      "https://ipfs.io/ipfs/QmWAxX3T4JXt9LnHjuFRu96jSbfvmxGZBeryQ578GThhW5/Énergie-153.jpg",
  },
];

const Item = ({ nftName, nftAuthor, nftDescription, nftImgUrl }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [values, setValues] = useState([1]);
  const [contract, setContract] = useState("");
  const [mintedCnts, setMintedCnts] = useState(0);
  const [freemintavailable, setFreemintAvailable] = useState(false);
  const [totalCnts, setTotalCnts] = useState(0);
  const STEP = 1;
  const MIN = 1;
  const MAX = 20;
  const { id } = useParams();
  let history = useHistory();
  //console.log(collectionImage[id]);
  const { account, connector, activate, library, chainId } = useWeb3React();

  const mintNFT = async (counts) => {
    if (contract == "") return;
    let overrides = {
      value: ethers.utils.parseEther((counts * 0.01).toString()),
    };
    if(freemintavailable){
      if(counts>1) {
        swal({ title: "You can mint only 1 item for free cost.", icon: "error" })
        return
      }
      overrides.value = 0
    }
    

    try {
      let tx_checkWhitelist = await contract.isWhitelisted(account);
      let tx_pubstatus = await contract.isPaused();
      if(!tx_checkWhitelist&&tx_pubstatus){
        swal({ title: "Mint not started yet", icon: "error" })
        return
      }

      let tx = await contract.mint(counts, overrides);
      swal({ title: "Successfuly minted", icon: "success" })
    } catch (e) {
      swal({ title: e, icon: "error" })
    }
  };

  const mintProc = () => {
    if (!account) {
      swal({ title: "Please connect the wallet", icon: "error" })
      return
    }
    //setVisible(!visible);
    //setVisibleConnect(false);
    else {
      if (chainId != chainID) {
        swal({ title: "Wrong Network (Please connect with Ethereum)", icon: "error" })
        return;
      }

      mintNFT(values[0]);
    }
  };

  useEffect(async () => {
    try {
      let path = collectionImage[id];
      if (path) {
        const response = await fetch(`https://ipfs.io/ipfs/${path}`);
        if (response.ok) {
          let resData = await response.json();

          let url =
            "https://gateway.pinata.cloud/ipfs/" + resData.image.substr(7);

          setImgUrl(url);
        }
      } else {
        history.push("/");
      }

      if (chainId != chainID||!account) {
        if (chainId) swal({ title: "Wrong Network (Please connect with Ethereum)", icon: "error" })
        else swal({ title: "Please connect the wallet", icon: "error" })
        history.push("/");
        return;
      }
      let provider;
      window.ethereum
        .enable()
        .then((provider = new ethers.providers.Web3Provider(window.ethereum)));
      const signer = provider.getSigner();
      let nftContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      if (nftContract) {
        setContract(nftContract);
        let _totalCnts = await nftContract.MAX_SUPPLY();
        let _mintedCnts = await nftContract.totalSupply();
        let _freemintavailable = await nftContract.isFreemintWhitelisted(account);
        setMintedCnts(_mintedCnts);
        setTotalCnts(_totalCnts);
        setFreemintAvailable(_freemintavailable);
      }
    } catch (e) {
      swal({ title: e, icon: "error" })
    }
  }, [account]);
  return (
    <>
      <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
          <div className={styles.bg}>
            <Slider className="item-slider" {...settings}>
              {galleryItems.map((x, index) => (
                <div className={styles.preview} key={index}>
                  <img src={x.gallery} alt="Item" />
                </div>
              ))}
            </Slider>
          </div>
          <div className={styles.details}>
            <h1 className={cn("h3", styles.title)}>Énergie</h1>

            <div className={styles.counter}>Voltaine & Viktor</div>

            <div className={styles.btns}>
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
                <div className={styles.scale}>
                  <div className={styles.number}>1</div>
                  <div className={styles.number}>20</div>
                </div>
                <div className={styles.label}>Amount</div>
              </div>
              {mintedCnts != totalCnts ? (
                <button
                  className={cn("button", styles.button)}
                  onClick={mintProc}
                >
                  Mint
                </button>
              ) : (
                <div />
              )}
            </div>
            <div className={styles.mintCnts}>
              {mintedCnts + " of " + totalCnts + " unique artworks minted"}
            </div>
            <div className={styles.opensea}>
              <a
                href={
                  "https://testnets.opensea.io/collection/101010art-energie-v3"
                }
                target="_blank"
                className={styles.link}
              >
                View the collection on OpenSea
              </a>
            </div>
            <div className={styles.info}>
              <div className={styles.info}>
                Énergie is collection of artworks inspired by the movement of
                energy, paused in time. Each piece uses generative Perlin Noise
                coded using the javascript library 'Noise.js', combined with
                generatively reworked noise textures. A collection of 165 unique
                works by Voltaine & Viktor.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
