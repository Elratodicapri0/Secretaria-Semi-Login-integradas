import gsap from "gsap";
import React, { useEffect } from "react";

export default function AuthImageMove() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    const parallaxIt = () => {
      const target = document.querySelectorAll(".js-mouse-move-container");

      target.forEach((container) => {
        const targets = container.querySelectorAll(".js-mouse-move");

        targets.forEach((el) => {
          const movement = el.getAttribute("data-move");

          document.addEventListener("mousemove", (e) => {
            const relX = e.pageX - container.offsetLeft;
            const relY = e.pageY - container.offsetTop;

            gsap.to(el, {
              x:
                ((relX - container.offsetWidth / 2) / container.offsetWidth) *
                Number(movement),
              y:
                ((relY - container.offsetHeight / 2) / container.offsetHeight) *
                Number(movement),
              duration: 0.2,
            });
          });
        });
      });
    };

    parallaxIt();
  }, []);
  return (
    <div 
      className="form-page__img bg-dark-1"
      style={{
        height: '100vh',
        overflow: 'hidden'
      }}
    >
      <div className="form-page-composition">
    
        <div className="-el-3">
          <img
            style={{ width: "100%" }}
            data-move="10" 
            className="js-mouse-move"
            src="/assets/img/login/bg.png"
            alt="bg"
          />
        </div>
        
        <div 
          className="-el-1" 
          style={{ 
            transform: 'translateY(-5px)', 
          }}
        >
          <img
            style={{ width: "100%" }}
            data-move="20" 
            className="js-mouse-move"
            src="/assets/img/home-9/hero/8.png"
            alt="image"
          />
        </div>
        <div 
          className="-el-2" 
          style={{ 
            transform: 'translateY(15px)', 
          }}
        > 
          <img
            data-move="10" 
            className="js-mouse-move"
            src="/assets/img/home-9/hero/1.png"
            alt="icon"
          />
        </div>

      </div>
    </div>
  );
}