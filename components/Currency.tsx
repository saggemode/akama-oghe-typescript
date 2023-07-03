import React from "react";

interface IProps {
  price: number;
}

const Currency: React.FC<IProps> = ({ prices }) => {
  return (
    <>
    {Intl.NumberFormat('en-US', {
      style: 'currency', 
      currency: 'NGN' // Change this
      }).format(prices)}
    </>
  );
}