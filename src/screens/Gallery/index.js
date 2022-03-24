import React, { useState } from "react";
import cn from "classnames";
import styles from "./Gallery.module.sass";
import Icon from "../../components/Icon";
import Mint from "./Mint";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useWeb3React } from "@web3-react/core";
import swal from 'sweetalert';
import SectionBG from '../../images/1_CoffeeShop_Interior.jpg'

const items = [
  {
    name: "Énergie",
    author: "Voltaine & Viktor",
    counter: "28",
    avatar: "/images/content/card-pic-7.jpg",
    pinhash: "/item/1",
    gallery: "/images/content/card-pic-4.jpg",
  },
  {
    name: "Collection",
    author: "Coming Soon",
    counter: "28",
    avatar: "/images/content/card-pic-5.jpg",
    pinhash: "/",
    gallery: "/images/content/card-pic-5.jpg",
  },
  {
    name: "Collection",
    author: "Coming Soon",
    counter: "28",
    avatar: "/images/content/card-pic-1.jpg",
    pinhash: "/",
    gallery: "/images/content/card-pic-1.jpg",
  },
  {
    name: "Collection",
    author: "Coming Soon",
    counter: "28",
    avatar: "/images/content/card-pic-2.jpg",
    pinhash: "/",
    gallery: "/images/content/card-pic-2.jpg",
  },
  {
    name: "Collection",
    author: "Coming Soon",
    counter: "28",
    avatar: "/images/content/card-pic-6.jpg",
    pinhash: "/",
    gallery: "/images/content/card-pic-6.jpg",
  },
];


const SlickArrow = ({ currentSlide, slideCount, children, ...props }) => (
  <button {...props}>{children}</button>
);



const Gallery = () => {

  const { account, connector, activate, library, chainId } = useWeb3React();
  
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: (
      <SlickArrow>
        <Icon name="arrow-next" size="16" fill="#c1c1c1" />
      </SlickArrow>
    ),
    prevArrow: (
      <SlickArrow>
        <Icon name="arrow-prev" size="16" fill="#c1c1c1" />
      </SlickArrow>
    ),
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className={cn("section-bg", styles.section)} id="#gallery" style={{ backgroundImage: `url(${SectionBG})` }}>
      <div className={cn("container", styles.container)}>
        <Mint className={styles.mintgallery}/>
        <div className={styles.top}>
          <div className={styles.heading}>
            <div className={styles.head}>
              <div className={cn("h3", styles.title)}>Gallery</div>
            </div>
          </div>
        </div>
        <div className={styles.wrapper}>
            <Slider className="popular-slider" {...settings}>
              {items.map((x, index) => (
                <div
                  className={styles.litem}
                  to={x.pinhash}
                  key={index}
                >
                  <div className={styles.gallery}>
                    <div className={styles.preview} key={index}>
                      <img src={x.gallery} alt="Collection" />
                    </div>
                  </div>
                  
                </div>
              ))}
            </Slider>
          </div>
      </div>
    </div>
  );
 
};

export default Gallery;
