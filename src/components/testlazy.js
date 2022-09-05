import axios from "axios";
import { useEffect, useState } from "react";

const TestLazy = () => {
  const [data, setData] = useState([]);
  const [number, setNumber] = useState(0);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      //   .then((response) => response.json())
      .then((d) => {
        setData(d.data);
      });
  }, []);
  //   console.log(data[0]?.name);
  return (
    <>
      <h1>Danh sách</h1>
      <h3>{number}</h3>
      <ul>
        {data.map((element) => {
          return <li>{element.title}</li>;
        })}
      </ul>
      <button
        onClick={() => {
          setNumber((old) => {
            console.log(data);
            return old + 1;
          });
        }}
      >
        Tăng
      </button>
    </>
  );
};

export default TestLazy;
