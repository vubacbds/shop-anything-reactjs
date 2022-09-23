import React, { useEffect, useState } from "react";
import axios from "axios";

import { Form, Input, Select } from "antd";
import getaddress from "../action/address";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd/lib/radio";
const { Option } = Select;

const Address = () => {
  const dispatch = useDispatch();
  const dataProvince = useSelector((state) => state.address.data);
  const [dataDistrict, setDataDistrict] = useState();
  const [dataWard, setDataWard] = useState();
  const [dataNumHome, setDataNumHome] = useState(false);

  const onChangeProvince = (value) => {
    const data = dataProvince.find((item) => item.name == value);
    setDataDistrict(data);
  };

  const onChangeDistrict = (value) => {
    const data = dataDistrict.districts?.find((item) => item.name == value);
    setDataWard(data);
  };

  const onChangeWard = (value) => {
    setDataNumHome(true);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  // useEffect(() => {
  //   form.resetFields();
  // }, [dataAddress]);

  return (
    dataProvince && (
      <>
        <Form.Item
          label="Chọn Tỉnh/TP"
          rules={[
            {
              required: true,
              message: "Bạn chưa chọn tỉnh/tp!",
            },
          ]}
          name="province"
        >
          <Select
            showSearch
            placeholder="Chọn tỉnh/tp"
            optionFilterProp="children"
            onChange={onChangeProvince}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().includes(input.toLowerCase())
            }
            className="input-oder"
          >
            {dataProvince?.map((item, index) => {
              return (
                <Option value={item.name} key={item.code}>
                  {item.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        {dataDistrict && (
          <Form.Item
            label="Chọn quận/huyện"
            rules={[
              {
                required: true,
                message: "Bạn chưa chọn quận/huyện!",
              },
            ]}
            name="district"
          >
            <Select
              showSearch
              placeholder="Chọn quận/huyện"
              optionFilterProp="children"
              onChange={onChangeDistrict}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              className="input-oder"
            >
              {dataDistrict?.districts?.map((item, index) => {
                return (
                  <Option value={item.name} key={item.code}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        )}

        {dataWard && (
          <Form.Item
            label="Chọn phường/xã"
            rules={[
              {
                required: true,
                message: "Bạn chưa chọn phường/xã!",
              },
            ]}
            name="ward"
          >
            <Select
              showSearch
              placeholder="Chọn phường xã"
              optionFilterProp="children"
              onSearch={onSearch}
              onChange={onChangeWard}
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              className="input-oder"
            >
              {dataWard?.wards?.map((item, index) => {
                return (
                  <Option value={item.name} key={item.code}>
                    {item.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        )}

        {dataNumHome && (
          <Form.Item
            label="Số nhà, tên đường"
            name="numhome"
            rules={[
              {
                required: true,
                message: "Bạn chưa nhập số nhà/tên đường/thôn..!",
              },
            ]}
          >
            <Input
              placeholder="Số nhà, đường, thôn,..."
              className="input-oder"
            />
          </Form.Item>
        )}
      </>
    )
  );
};

export default Address;
