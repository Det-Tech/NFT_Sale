import React, { useState } from "react";
import cn from "classnames";
import styles from "./Roadmap.module.sass";
import Icon from "../../components/Icon";

const Roadmap = () => {

  return (
    <div className={cn("section", styles.section)}>
      <div className={cn("container", styles.container)}>
        <div className={styles.top}>
          <h3 className={cn("h3", styles.Gtitle)}>Roadmap</h3>
          <div className={styles.info}>
            1,000 Secret Eggplant 
          </div>
          <h4 className={cn("h4", styles.title)}></h4>
          <div className={styles.info}>
            <div className={styles.avatar}>
                <img src="/images/content/card-pic-2.jpg" alt="Avatar" />
            </div>
            <div className={styles.faq}>
                1,000 Secret Eggplant owners will recieve a free NFT from a mystery collection, a custom coffee mug of their unique NFT, Ethereum giveaways and access to events in the coffee house discord.
            </div> 
          </div>
          <div className={styles.bottomline} ></div>
          <h4 className={cn("h4", styles.title)}></h4>
          <div className={styles.info}>
            
            <div className={styles.faq}>
                1,000 Secret Eggplant owners will recieve a free NFT from a mystery collection, a custom coffee mug of their unique NFT, Ethereum giveaways and access to events in the coffee house discord.
            </div>
            <div className={styles.avatar}>
                <img src="/images/content/card-pic-7.jpg" alt="Avatar" />
            </div>
          </div>
          <div className={styles.bottomline} ></div>
          <h4 className={cn("h4", styles.title)}></h4>
          <div className={styles.info}>
            <div className={styles.avatar}>
                <img src="/images/content/card-pic-4.jpg" alt="Avatar" />
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

export default Roadmap;
