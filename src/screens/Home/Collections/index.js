import React, { useState } from "react";
import cn from "classnames";
import Slider from "react-slick";
import { Link, useHistory } from "react-router-dom";
import styles from "./Collections.module.sass";
import Mint from "../../Gallery/Mint"
import Icon from "../../../components/Icon";
import { Range, getTrackBackground } from "react-range";
import LeftAsset from '../../../images/imgpsh_fullsize_anim1.png'
import MiddleAsset from '../../../images/imgpsh_fullsize_anim2.png'
import RightAsset from '../../../images/imgpsh_fullsize_anim3.png'
import AnimGif from '../../../images/imgpsh_fullsize_anim.gif'


const Collections = () => {

  return (
    <div className={cn("section-bg", styles.section)} id="#collection" style={{ backgroundImage: `url(${AnimGif})`,minHeight: "74vh"}}>
      <div className={cn("container", styles.container)}>
        <div className={styles.wrapper}>
          <div className={styles.heading}>
            <div className={styles.head}>
              {/* <div className={cn("h3", styles.title)}>Mint a NFT</div> */}
              <div className={styles.subtitle}></div>
            </div>
          </div>
          <div className={styles.cardview}>
            <div className={styles.preview1}>
              <img src={LeftAsset}></img>
            </div>
            <div className={styles.preview1}>
              <img src={MiddleAsset}></img>
            </div>
            <div className={styles.preview1}>
              <img src={RightAsset}></img>
            </div>
          </div>
          <Mint />

        </div>
      </div>
    </div>
  );
};

export default Collections;
