import { useState, useEffect, createContext, useRef } from "react";

export const DataContext = createContext();

function DataProvider({ children }) {
  //Hiện model đặt hàng
  const [visibleOrderProduct, setVisibleOrderProduct] = useState(false);

  //set on top modal đặt hàng khi nhấn vào tên web
  const useRefModalOder = useRef();

  //set on top modal bình luận khi nhấn vào tên
  const useRefComment = useRef();

  const value = {
    visibleOrderProduct,
    setVisibleOrderProduct,
    useRefModalOder,
    useRefComment,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
export default DataProvider;
