import React from "react";

function Converter({ counter }) {
  return <div>{counter % 2 === 0 ? "짝수" : "홀수"}</div>;
}
export default Converter;
