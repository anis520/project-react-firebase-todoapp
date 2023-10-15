import React from "react";
import homelogo from "../assets/home.gif";
import { Helmet } from "react-helmet";
const Home = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Todo app</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="bg-indigo-400 w-full h-screen flex flex-col gap-3 items-center justify-center  ">
        <img src={homelogo} className="rounded-md" alt="home page" />
        <p className="font-semibold text-white text-2xl">Welcome to app</p>
      </div>
    </>
  );
};

export default Home;
