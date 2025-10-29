
import Preloader from "@/components/common/Preloader";


import HeaderAuth from "@/components/layout/headers/HeaderAuth";
import AuthImageMove from "@/components/others/AuthImageMove";
import LoginForm from "@/components/others/LoginForm";

import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Login || Orio-x - Professional LMS Online Education Course ReactJS Template",
  description:
    "Eleve sua experiência de gerenciamento de secretaria integrada com nosso sistema intuitivo e eficiente.",
};
export default function LoginPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <HeaderAuth />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          <LoginForm />
        </section>
      </div>
    </div>
  );
}
