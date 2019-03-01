import React, { useState, useEffect } from "react";

const Test = () => {
  const [pause, setPause] = useState(false);
  const [count, setCount] = useState(0);
  const maxCount = 60;
  useEffect(() => {
    if (maxCount === count && pause === false) {
      setCount(0);
    }
    setInterval(() => {
      if (!pause) {
        setCount(prev => prev + 1);
      }
    }, 1000);
    return () => {
      clearInterval();
    };
  }, []);
  return (
    <div
      style={{ width: "500px", height: "500px", background: "yellow" }}
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
    >
      <h1>{count}</h1>
    </div>
  );
};

export default Test;
