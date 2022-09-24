import { useState, useEffect, createContext } from "react";

export const DataContext = createContext();

function DataProvider({ children }) {
  //Hiện model đặt hàng
  const [visibleOrderProduct, setVisibleOrderProduct] = useState(false);

  const value = {
    visibleOrderProduct,
    setVisibleOrderProduct,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
export default DataProvider;
