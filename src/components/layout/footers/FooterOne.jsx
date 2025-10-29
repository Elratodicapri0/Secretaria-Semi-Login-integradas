import React from "react";
import { Link } from "react-router-dom";

export default function FooterOne() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <footer className="footer -type-1 bg-dark-1 -green-links">
      <div className="container">
        <div className="footer-header">
          <div className="row y-gap-20 justify-between items-center">
            <div className="col-auto">
              <div className="footer-header__logo">
                <img src="/assets/img/footer/footer-logo.svg" alt="logo" />
              </div>
            </div>
            <div className="col-auto">
          
            </div>
          </div>
        </div>


        <div className="py-30 border-top-light-15">
          <div className="row justify-between items-center y-gap-20">
            <div className="col-auto">
              <div className="d-flex items-center h-100 text-white">
                © {new Date().getFullYear()} GekkoState. Todos os direitos reservados.
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex x-gap-20 y-gap-20 items-center flex-wrap">
                <div>
                  <div className="d-flex x-gap-15 text-white">
                  </div>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
