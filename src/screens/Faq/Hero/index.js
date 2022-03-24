import React, { useState } from "react";
import cn from "classnames";
import styles from "./Hero.module.sass";
import Icon from "../../../components/Icon";



const Hero = () => {

  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.top}>
          <h3 className={cn("h3", styles.Gtitle)}>Meet the Team</h3>
          <div className={styles.info}>
            1,000 Secret Eggplant owners will recieve a free NFT from a mystery collection, a custom coffee mug of their unique NFT, Ethereum giveaways and access to events in the coffee house discord.
          </div>
          <h4 className={cn("h4", styles.title)}>The Founder</h4>
          <div className={styles.info}>
            <div className={styles.avatar}>
                <img src="/images/content/avatar-1.jpg" alt="Avatar" />
            </div>
            <div className={styles.faq}>
                1,000 Secret Eggplant owners will recieve a free NFT from a mystery collection, a custom coffee mug of their unique NFT, Ethereum giveaways and access to events in the coffee house discord.
            </div> 
          </div>
          <h4 className={cn("h4", styles.title)}>The Artist</h4>
          <div className={styles.info}>
            
            <div className={styles.faq}>
                1,000 Secret Eggplant owners will recieve a free NFT from a mystery collection, a custom coffee mug of their unique NFT, Ethereum giveaways and access to events in the coffee house discord.
            </div>
            <div className={styles.avatar}>
                <img src="/images/content/avatar-1.jpg" alt="Avatar" />
            </div>
          </div>
          <h4 className={cn("h4", styles.title)}>The Developer</h4>
          <div className={styles.info}>
            <div className={styles.avatar}>
                <img src="/images/content/avatar-1.jpg" alt="Avatar" />
            </div>
            <div className={styles.faq}>
                1,000 Secret Eggplant owners will recieve a free NFT from a mystery collection, a custom coffee mug of their unique NFT, Ethereum giveaways and access to events in the coffee house discord.
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
