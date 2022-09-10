import React from "react";
import Carousel from "react-bootstrap/Carousel";
import BanerImage1 from "../../assets/banner-images/banner-img1.jpg";
import BanerImage2 from "../../assets/banner-images/banner-img2.jpg";
import BanerImage3 from "../../assets/banner-images/banner-img3.jpg";
import "../banner/Banner.css";

export default function Banner() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img className="d-block w-100" src={BanerImage2} alt="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={BanerImage3} alt="Second slide" />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={BanerImage1} alt="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
