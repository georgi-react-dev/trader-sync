import Sidebar from "../components/sidebar/Sidebar";
import Layout from "../components/Layout/Layout";
import React from "react";

export default function Root() {
    return (
      <>
        <Sidebar show={true}/>    
        <Layout/>
      </>
    );
  }