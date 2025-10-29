import React from "react";
import Wrapper from "./Wrapper";
import HomePage1 from "./homes/home-1";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Home-1 || Orio-x: Precisão que impulsiona. ",
  description:
    "Elevate your e-learning content with Orio-x, the most impressive LMS template for online courses, education and LMS platforms.",
};

export default function index() {
  return (
    <Wrapper>
      <MetaComponent meta={metadata} />
      <HomePage1 />
    </Wrapper>
  );
}
