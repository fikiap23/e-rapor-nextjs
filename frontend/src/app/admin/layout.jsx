import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";
import "../bootstrap.css";
import React from "react";
const AboutLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Sidebar />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default AboutLayout;
