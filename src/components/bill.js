import { Tabs } from "antd";
import React from "react";

const onChange = (key) => {
  console.log(key);
};

const Bill = () => {
  const { TabPane } = Tabs;
  return (
    <>
      <Tabs defaultActiveKey="1" style={{ margin: "0px 20px" }}>
        <TabPane tab="Đang chờ duyệt" key="1">
          <h6>Đang chờ duyệt</h6>
        </TabPane>
        <TabPane tab="Đang giao" key="2">
          <h6>Đang giao</h6>
        </TabPane>
        <TabPane tab="Đã giao" key="3">
          <h6>Đẫ giao</h6>
        </TabPane>
      </Tabs>
    </>
  );
};

export default Bill;
