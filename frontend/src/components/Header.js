import React from "react";

import "./Header.css";
import Icons from "./icons.svg";

const Header = () => {
    return (
      <section className="site-header">
        <div className="site-header__title">
          <svg className="icon project__icon">
            <use xlinkHref={`${Icons}#icon--bill`} />
          </svg>
          <h1 className="site-header__text">
            New York State Bill Tracker
          </h1>
        </div>
        <div className="site-header__slogan">
          <p>
            Easily track the progress of New York State legistation packages.
          </p>
        </div>
        <a className="site-header__contact" href="mailto:team@astoria.digital">
          <svg className="icon callout__icon">
            <use xlinkHref={`${Icons}#icon--email`}/>
          </svg>
          <span className="callout__text">Contact Us</span>
        </a>
      </section>
    );
}
export default Header;