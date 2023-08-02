import React from "react";

const AuthCarousel = ({ img, title }) => {
  return (
    <div className="!flex flex-col items-center justify-center mb-10">
      <img src={img} className="w-[600px] h-[600px]"></img>
      <h3 className="text-4xl text-blue-800 text-center font-bold">{title}</h3>
    </div>
  );
};

export default AuthCarousel;
