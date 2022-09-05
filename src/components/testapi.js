import { useEffect } from "react";

const Testapi = () => {
  useEffect(() => {
    fetch("http://localhost:3000/api/get-product")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
};

export default Testapi;
