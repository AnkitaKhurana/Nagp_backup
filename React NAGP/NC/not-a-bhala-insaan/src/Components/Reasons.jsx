import React from "react";
import { Slide } from "react-slideshow-image";
import Gallery from './Gallery';

const slideImages = [
  "images/combined/1.jpg",
  "images/combined/2.jpg",
  "images/combined/3.jpg",
  "images/combined/4.jpg",
  "images/combined/5.jpg",
  "images/combined/6.jpg",
  "images/combined/7.jpg",
  "images/combined/8.jpg",
  "images/combined/9.jpg",
  "images/combined/10.jpg",
  "images/combined/11.jpg",
];

const properties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: true,
  indicators: true,
  arrows: true,
};

const Reasons = () => {
  return (
    <React.Fragment>
      <h1>Top 11 reasons we Hate NC</h1>

      <Slide {...properties}>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${slideImages[0]})`,
              "background-size": "contain",
              height: "auto",
              width: "auto",
              "background-repeat": "no-repeat",
              display: "inline-block",
            }}
          >
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <span> He keeps trying weird looks -_-</span>
          </div>
        </div>

        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${slideImages[2]})`,
              "background-size": "contain",
              height: "auto",
              width: "auto",
              "background-repeat": "no-repeat",
              display: "inline-block",
            }}
          >
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <span>He makes useless expression ^_^</span>
          </div>
        </div>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${slideImages[3]})`,
              "background-size": "contain",
              height: "auto",
              width: "auto",
              "background-repeat": "no-repeat",
              display: "inline-block",
            }}
          >
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <span>He is never ready for a photo -_-</span>
          </div>
        </div>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${slideImages[1]})`,
              "background-size": "contain",
              height: "auto",
              width: "auto",
              "background-repeat": "no-repeat",
              display: "inline-block",
            }}
          >
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <span>He makes me laugh :D</span>
          </div>
        </div>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${slideImages[4]})`,
              "background-size": "contain",
              height: "auto",
              width: "auto",
              "background-repeat": "no-repeat",
              display: "inline-block",
            }}
          >
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <span>He steals my thunder and my gogs! ZZ</span>
          </div>
        </div>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${slideImages[5]})`,
              "background-size": "contain",
              height: "auto",
              width: "auto",
              "background-repeat": "no-repeat",
              display: "inline-block",
            }}
          >
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <span>He fixes my code . 010010110</span>
          </div>
        </div>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${slideImages[6]})`,
              "background-size": "contain",
              height: "auto",
              width: "auto",
              "background-repeat": "no-repeat",
              display: "inline-block",
            }}
          >
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <span>He ignores me :(</span>
          </div>
        </div>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${slideImages[7]})`,
              "background-size": "contain",
              height: "auto",
              width: "auto",
              "background-repeat": "no-repeat",
              display: "inline-block",
            }}
          >
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <span>He never smiles in any selfie. :O</span>
          </div>
        </div>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${slideImages[8]})`,
              "background-size": "contain",
              height: "auto",
              width: "auto",
              "background-repeat": "no-repeat",
              display: "inline-block",
            }}
          >
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <span>He snores while sleeping..... khrr khrr...zzzz</span>
          </div>
        </div>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${slideImages[9]})`,
              "background-size": "contain",
              height: "auto",
              width: "auto",
              "background-repeat": "no-repeat",
              display: "inline-block",
            }}
          >
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <span>He is too stupid and cute :* </span>
          </div>
        </div>
        <div className="each-slide">
          <div
            style={{
              backgroundImage: `url(${slideImages[10]})`,
              "background-size": "contain",
              height: "auto",
              width: "auto",
              "background-repeat": "no-repeat",
              display: "inline-block",
            }}
          >
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <span>
              He appears bhand when he is not, and appears sober when he is
              bhand
            </span>
          </div>
        </div>
      </Slide>
    <Gallery/>
    </React.Fragment>
  );
};

export default Reasons;
