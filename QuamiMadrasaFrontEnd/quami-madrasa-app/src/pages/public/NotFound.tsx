import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="text-center py-5 mt-5">
      <div className="display-5">SORRY</div>
      <p className="lead">We couldn't find that page.</p>
      <p>
        Try searcing or <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
