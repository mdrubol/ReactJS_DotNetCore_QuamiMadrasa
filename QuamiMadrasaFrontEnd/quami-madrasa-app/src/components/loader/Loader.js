import React from "react";
import "../loader/Loader.css";
const Loader = () => {
  return (
    <div className="text-center py-5">
      <div className="ui-text-loader text-blue">
        <div className="l-1 letter">L</div>
        <div className="l-2 letter">o</div>
        <div className="l-3 letter">a</div>
        <div className="l-4 letter">d</div>
        <div className="l-5 letter">i</div>
        <div className="l-6 letter">n</div>
        <div className="l-7 letter">g</div>
        <div className="l-8 letter">.</div>
        <div className="l-9 letter">.</div>
        <div className="l-10 letter">.</div>
      </div>
    </div>
  );
};

export default Loader;
