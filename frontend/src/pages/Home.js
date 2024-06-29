import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCartProduct from "../components/HorizontalCardProduct";
import VerticalCartProduct from "../components/VerticalCardProduct";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCartProduct category={"airpodes"} heading={"Top's Airpods"} />
      <HorizontalCartProduct category={"earphone"} heading={"Earphone's"} />
      <HorizontalCartProduct category={"printer"} heading={"Printer's"} />
      <VerticalCartProduct category={"mobile"} heading={"Phones"} />
      <VerticalCartProduct category={"mouse"} heading={"Top's Mouse's"} />
      <VerticalCartProduct category={"camera"} heading={"Camera's"} />
      <VerticalCartProduct category={"refrigetor"} heading={"Refrigetor's"} />
      <VerticalCartProduct category={"proccesser"} heading={"Proccesser's"} />
    </div>
  );
};

export default Home;
