import React, { useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import Link from "next/link";
import {
  Slide1,
  Slide2,
  Slide3,
  BannerArrow,
  BannerRetangule,
  BannerText,
} from "./CarouselElements";
import { FaAngleRight } from "react-icons/fa";
import { WrapContent } from "../../ReusedComponents/WrapContent";

const Caurosel = () => {
  const [index, setIndex] = React.useState(0);

  const handleChangeIndex = (index) => {
    setIndex(index);
  };

  const handleNextSlide = () => {
    if (index === 2) {
      setIndex(0); // Retorna ao início quando todos os slides forem percorridos
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [index]);

  return (
    <>
      <SwipeableViews
        index={index}
        onChangeIndex={handleChangeIndex}
        enableMouseEvents={false}
      >
        <Slide1>
          <WrapContent>
            <BannerRetangule>
              <Link
                href={`/product/${encodeURIComponent("Crow Windbreaker")}`}
                legacyBehavior
              >
                <a>
                <BannerText>Crow Windbreaker</BannerText>
                </a>
              </Link>
              <BannerArrow onClick={handleNextSlide}>
                <FaAngleRight />{" "}
              </BannerArrow>
            </BannerRetangule>
          </WrapContent>
        </Slide1>
        <Slide2>
          <WrapContent>
            <BannerRetangule>
              <Link
                href={`/product/${encodeURIComponent(
                  "Camiseta Básica"
                )}`}
                legacyBehavior
              >
                <a>
                <BannerText>Camisesta Básica</BannerText>
                </a>
              </Link>
              <BannerArrow onClick={handleNextSlide}>
                <FaAngleRight />{" "}
              </BannerArrow>
            </BannerRetangule>
          </WrapContent>
        </Slide2>
        <Slide3>
          <WrapContent>
            <BannerRetangule>
              <Link
                href={`/product/${encodeURIComponent(
                  "Jaqueta Acolchoada Crow"
                )}`}
                legacyBehavior
              >
                <a>
                <BannerText>Conjunto Outono</BannerText>
                </a>
              </Link>
              <BannerArrow onClick={handleNextSlide}>
                <FaAngleRight />{" "}
              </BannerArrow>
            </BannerRetangule>
          </WrapContent>
        </Slide3>
      </SwipeableViews>
      <WrapContent></WrapContent>
    </>
  );
};

export default Caurosel;
