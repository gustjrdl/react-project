import React, { useState, useEffect } from "react";

const Counter = ({ counter, setCounter }) => {
  const [searchWord, setSearchWord] = useState("");

  const addCounter = () => {
    setCounter(counter + 1);
  };

  const onChange = (e) => {
    setSearchWord(e.target.value);
  };

  useEffect(() => {
    console.log("API 호출");
  }, []);

  useEffect(() => {
    console.log("change input");
  }, [searchWord]);

  useEffect(() => {
    console.log(counter);
  }, [counter]);

  return (
    <div>
      <input
        type="text"
        onChange={onChange}
        value={searchWord}
        placeholder="검색어"
      />
      <div>{counter}번클릭</div>
      <button onClick={addCounter}>+</button>
    </div>
  );
};

export default Counter;
