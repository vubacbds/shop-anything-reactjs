import { useState, useEffect } from "react";

const Random = ({ data }) => {
  const [randomProduct, setRandomProduct] = useState();
  //   const [runrandom, setRunrandom] = useState(true);

  //   setInterval(() => {
  //     const rand = data[Math.floor(Math.random() * data.length)];
  //     setRandomProduct(rand);
  //   }, 3000);
  useEffect(() => {
    var timerId = setInterval(() => {
      const rand = data[Math.floor(Math.random() * data.length)];
      setRandomProduct(rand);
    }, 12000);

    // Clear intervals after 6 sec with the timer id
    setTimeout(() => {
      clearInterval(timerId);
    }, 120000);
  }, []);
  return (
    randomProduct && (
      <>
        <a
          href={`http://localhost:3000/products/${randomProduct?._id}`}
          target="_blank"
        >
          <img
            src={randomProduct?.images[0]}
            style={{ width: 200, height: 200 }}
          />
        </a>
      </>
    )
  );
};

export default Random;
