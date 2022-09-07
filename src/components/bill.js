import { Tabs } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BillList from "./billlist";
import getbill, { get_bill_user_status } from "../action/bill";
import { GetCookie } from "../util/cookie";

const Bill = () => {
  const dispatch = useDispatch();
  const demo = useSelector((state) => state.bill.data);
  const [numberTab, setNumberTab] = useState(1);

  const userData = GetCookie("user") ? JSON.parse(GetCookie("user")) : "";
  const { TabPane } = Tabs;
  const onChange = (key) => {
    if (userData.email === "bac") {
      dispatch(get_bill_user_status(key - 1));
    } else {
      dispatch(get_bill_user_status(key - 1, userData?._id));
    }
    setNumberTab(key);
  };

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        style={{ margin: "0px 20px" }}
        onChange={onChange}
      >
        <TabPane tab="Đang chờ duyệt" key="1">
          <BillList numbertab={numberTab} />
        </TabPane>
        <TabPane tab="Đang giao" key="2">
          <BillList numbertab={numberTab} />
        </TabPane>
        <TabPane tab="Đã giao" key="3">
          <BillList numbertab={numberTab} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Bill;
