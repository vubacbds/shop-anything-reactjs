import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BillList from "./billlist";
import getbill, { get_bill_user_status } from "../action/bill";
import { GetCookie } from "../util/cookie";

const Bill = () => {
  const dispatch = useDispatch();
  const demo = useSelector((state) => state.bill.data);
  const [numberTab, setNumberTab] = useState(1);

  // const userData = GetCookie("user") ? JSON.parse(GetCookie("user")) : "";

  const userData = useSelector((state) => state.user.dataOne);
  const { TabPane } = Tabs;
  const onChange = (key) => {
    if (userData?.isadmin) {
      dispatch(get_bill_user_status(key - 1));
    } else {
      dispatch(get_bill_user_status(key - 1, userData?._id));
    }
    setNumberTab(key);
  };

  //Lấy ra số lượng hóa đơn
  const dataBill = useSelector((state) => state.bill);

  return (
    <>
      <Tabs
        defaultActiveKey="1"
        style={{ margin: "0px 20px" }}
        onChange={onChange}
      >
        <TabPane tab={`Đang chờ duyệt (${dataBill.coutcheck})`} key="1">
          <BillList numbertab={numberTab} />
        </TabPane>
        <TabPane tab={`Đang giao (${dataBill.coutdelivering})`} key="2">
          <BillList numbertab={numberTab} />
        </TabPane>
        <TabPane tab={`Đã giao (${dataBill.coutdelivered})`} key="3">
          <BillList numbertab={numberTab} />
        </TabPane>
      </Tabs>
    </>
  );
};

export default Bill;
