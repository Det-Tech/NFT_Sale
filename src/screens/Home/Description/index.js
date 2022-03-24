import React from "react";
import cn from "classnames";
import { Link } from "react-router-dom";
import styles from "./Description.module.sass";
import Image from "../../../components/Image";

const Description = () => {
  const scrollToTop = () =>{
    window.scrollTo({
      top: 100, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  return (
    <div className={styles.section}>
      <div className={cn("container", styles.container)}>
        <div className={styles.wrap}>
          <div className={styles.stage}>Enjoy your time with coffee mugs</div>
          <h1 className={cn("h1", styles.title)}>
            Earn crypto with Secret Eggplants
          </h1>
          <div className={styles.text}>
            1,000 Secret Eggplant owners will recieve a free NFT from a mystery collection, a custom coffee mug of their unique NFT, Ethereum giveaways and access to events in the coffee house discord. Can you guess what these eggplants are keeping secret?
          </div>
          <div className={styles.btns}>
            <a className={cn("button", styles.button)} href="#" onClick={scrollToTop}>
              Go to Mint
            </a>
          </div>
        </div>
        <div className={styles.gallery}>
          <div className={styles.preview}>
            <Image
              srcSet="/images/content/cubes@2x.png 2x"
              srcSetDark="/images/content/cubes-dark@2x.png 2x"
              src="/images/content/cubes.png"
              srcDark="/images/content/cubes-dark.png"
              alt="Cubes"
            />
          </div>
          <div className={styles.preview}>
            <Image
              srcSet="/images/content/cube@2x.png 2x"
              srcSetDark="/images/content/cube-dark@2x.png 2x"
              src="/images/content/cube.png"
              srcDark="/images/content/cube-dark.png"
              alt="Cube"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
