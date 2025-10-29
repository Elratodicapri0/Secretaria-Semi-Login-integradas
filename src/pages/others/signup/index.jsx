
import Preloader from "@/components/common/Preloader";


import HeaderAuth from "@/components/layout/headers/HeaderAuth";
import AuthImageMove from "@/components/others/AuthImageMove";

import SignUpForm from "@/components/others/SignUpForm";

import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Cadastre-se || Orio-x - Template Profissional de LMS para Educação Online",
  description:
    "Eleve sua experiência de gerenciamento de secretaria integrada com nosso sistema intuitivo e eficiente.",
};
export default function SignupPage() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <HeaderAuth />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          <SignUpForm />
        </section>
      </div>
    </div>
  );
}
