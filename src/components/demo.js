import { Button, Popover } from "antd";
import React from "react";
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const Demo = () => (
  <Popover content={content} title="Title">
    <Button type="primary">Hover me</Button>
  </Popover>
);

export default Demo;

// import React, { useRef } from "react";

// export default function Demo() {
//   const listInnerRef = useRef();

//   const onScroll = () => {
//     if (listInnerRef.current) {
//       const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
//       if (scrollTop + clientHeight === scrollHeight) {
//         console.log("reached bottom");
//       }
//     }
//   };

//   return (
//     <div>
//       <div
//         onScroll={onScroll}
//         ref={listInnerRef}
//         style={{ height: "200px", overflowY: "auto" }}
//       >
//         {Array(200)
//           .fill()
//           .map((_, i) => {
//             return <p key={i}>{i}</p>;
//           })}
//       </div>
//     </div>
//   );
// }

// import { Avatar, Button, List, Skeleton } from "antd";
// import React, { useEffect, useState } from "react";
// const count = 3;
// const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

// const Demo = () => {
//   const [initLoading, setInitLoading] = useState(true);
//   const [loading, setLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const [list, setList] = useState([]);
//   useEffect(() => {
//     fetch(fakeDataUrl)
//       .then((res) => res.json())
//       .then((res) => {
//         setInitLoading(false);
//         setData(res.results);
//         setList(res.results);
//       });
//   }, []);

//   const onLoadMore = () => {
//     setLoading(true);
//     setList(
//       data.concat(
//         [...new Array(count)].map(() => ({
//           loading: true,
//           name: {},
//           picture: {},
//         }))
//       )
//     );
//     fetch(fakeDataUrl)
//       .then((res) => res.json())
//       .then((res) => {
//         const newData = data.concat(res.results);
//         setData(newData);
//         setList(newData);
//         setLoading(false); // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
//         // In real scene, you can using public method of react-virtualized:
//         // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized

//         window.dispatchEvent(new Event("resize"));
//       });
//   };

//   const loadMore =
//     !initLoading && !loading ? (
//       <div
//         style={{
//           textAlign: "center",
//           marginTop: 12,
//           height: 32,
//           lineHeight: "32px",
//         }}
//       >
//         <Button onClick={onLoadMore}>loading more</Button>
//       </div>
//     ) : null;
//   return (
//     <List
//       className="demo-loadmore-list"
//       loading={initLoading}
//       itemLayout="horizontal"
//       loadMore={loadMore}
//       dataSource={list}
//       renderItem={(item) => (
//         <List.Item
//           actions={[
//             <a key="list-loadmore-edit">edit</a>,
//             <a key="list-loadmore-more">more</a>,
//           ]}
//         >
//           <Skeleton avatar title={false} loading={item.loading} active>
//             <List.Item.Meta
//               avatar={<Avatar src={item.picture.large} />}
//               title={<a href="https://ant.design">{item.name?.last}</a>}
//               description="Ant Design, a design language for background applications, is refined by Ant UED Team"
//             />
//             <div>content</div>
//           </Skeleton>
//         </List.Item>
//       )}
//     />
//   );
// };

// export default Demo;

// // import { UploadOutlined } from "@ant-design/icons";
// // import { Button, Upload } from "antd";
// // import React, { useState } from "react";
// // import { storage } from "./firebase";

// // // const fileList = [
// // //   {
// // //     uid: "-1",
// // //     name: "xxx.png",
// // //     status: "done",
// // //     url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
// // //     thumbUrl:
// // //       "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
// // //   },
// // // ];

// // const UploadImage = () => {
// //   //Xử lý upload ảnh
// //   const [progress, setProgress] = useState(0);
// //   const [fileList, setFileList] = useState([]);
// //   const [url, setUrl] = useState([]);

// //   const handleChange = (e) => {
// //     setFileList(e.fileList);
// //     console.log(e.fileList);
// //   };

// //   const handleUpload = () => {
// //     fileList.forEach((e) => {
// //       const uploadTask = storage
// //         .ref(`images/${e.originFileObj.name}`)
// //         .put(e.originFileObj);
// //       uploadTask.on(
// //         "state_changed",
// //         (snapshot) => {
// //           const progress = Math.round(
// //             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
// //           );
// //           setProgress(progress);
// //         },
// //         (error) => {
// //           console.log(error);
// //         },
// //         () => {
// //           storage
// //             .ref("images")
// //             .child(e.originFileObj.name)
// //             .getDownloadURL()
// //             .then((url) => {
// //               // posdocument({...newDocument, "nameUrl": urlimg})
// //               // setUrl(pre => [...pre, urlimg])
// //               setUrl((old) => [...old, url]);
// //             })
// //             .catch((e) => {
// //               console.log(e);
// //             });
// //         }
// //       );
// //     });
// //   };
// //   console.log(url);
// //   return (
// //     <>
// //       <Upload
// //         listType="picture"
// //         defaultFileList={[...fileList]}
// //         classNameName="upload-list-inline"
// //         onChange={(e) => handleChange(e)}
// //       >
// //         {fileList.length >= 2 ? null : (
// //           <Button icon={<UploadOutlined />}>Upload</Button>
// //         )}
// //       </Upload>
// //       <Button onClick={() => handleUpload()}>Tải lên</Button>
// //     </>
// //   );
// // };

// // export default UploadImage;

// // import { Progress } from "antd";
// // import { useState } from "react";

// // const UploadImage = () => {
// //   const [progress, setProgress] = useState(50);
// //   return (
// //     <>
// //       <img id="img1" />
// //       <Progress type="circle" percent={progress} />
// //       <input
// //         type="file"
// //         id="file-upload"
// //         required
// //         multiple
// //         accept=".jpg, .png"
// //         onChange={(e) => {
// //           const image = document.getElementById("img1");
// //           if (e.target.files.length) {
// //             console.log(e.target.files);
// //             const src = URL.createObjectURL(e.target.files[0]);
// //             image.src = src;
// //           }

// //           const reader = new FileReader();
// //           console.log(reader);

// //           reader.readAsDataURL(e.target.files[3]);
// //           reader.addEventListener("progress", (event) => {
// //             const { loaded, total } = event;

// //             if (loaded && total) {
// //               const percent = Math.round(loaded / total) * 100;
// //               // setProgress(100);
// //               setProgress(percent);
// //             }
// //           });
// //         }}
// //       />
// //     </>
// //   );
// // };

// // export default UploadImage;

// import { PlusOutlined } from "@ant-design/icons";
// import { Upload, Icon, Modal } from "antd";
// import { useState } from "react";

// const UploadImage = () => {
//   //Xử lý upload ảnh
//   const [fileList, setFileList] = useState([]);
//   const [progress, setProgress] = useState(0);
//   const [previewVisible, setPreviewVisible] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const [previewTitle, setPreviewTitle] = useState("");

//   //Sửa lỗi Xem trước phóng to
//   function getBase64(file) {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = (error) => reject(error);
//     });
//   }

//   const handleCancel = () => setPreviewVisible(false);

//   const handlePreview = async (file) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj);
//     }

//     setPreviewImage(() => file.url || file.preview);
//     setPreviewVisible(true);
//     setPreviewTitle(
//       () => file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
//     );
//   };

//   const handleChange = (e) => {
//     setFileList(e.fileList);
//     console.log(e.fileList);
//   };

//   return (
//     <div>
//       <Upload
//         action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
//         listType="picture-card"
//         fileList={fileList}
//         onPreview={handlePreview}
//         onChange={handleChange}
//         multiple={true}
//       >
//         {fileList.length >= 4 ? null : (
//           <div>
//             <PlusOutlined />
//             <div style={{ marginTop: 8 }}>Upload</div>
//           </div>
//         )}
//       </Upload>
//       <Modal
//         visible={previewVisible}
//         title={previewTitle}
//         footer={null}
//         onCancel={handleCancel}
//       >
//         <img alt="example" style={{ width: "100%" }} src={previewImage} />
//       </Modal>
//       {/* <button onClick={handleUpload}>Upload</button> */}
//       <br />
//       <progress value={progress} max="100" />
//       <br />
//     </div>
//   );
// };

// export default UploadImage;

// import { Modal, Popconfirm, Table } from "antd";
// import React, { useEffect, useState } from "react";
// import { Button, Checkbox } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import getproduct, {
//   getproductcategory,
//   updateproduct,
// } from "../action/product";
// import ProductAPI from "../services/productAPI";
// import { deleteproduct, getproductid } from "../action/product";
// import ProductUpdate from "./productupdate";
// import { DeleteOutlined, FormOutlined } from "@ant-design/icons";

// const ProductList = () => {
//   const dataProduct = useSelector((state) => state.product.data); //Chú ý state.product là khi gộp các reducer lại
//   const dispatch = useDispatch();

//   //Xuất hiện Modal sửa sản phẩm
//   const [visibleProductUpdate, setVisibleProductUpdate] = useState(false);

//   //Khi commponent bắt đầu render
//   useEffect(() => {
//     dispatch(getproduct());
//   }, []);

//   //Thông báo
//   const ProductAddSuccess = () => {
//     toast.success("Xóa thành công !", {
//       position: toast.POSITION.BOTTOM_RIGHT,
//     });
//   };

//   //Hàm xóa một sản phẩm trong ProductList
//   const deleteProductList = (id) => {
//     ProductAPI.deleteproduct(id).then(() => {
//       ProductAddSuccess();
//       dispatch(deleteproduct(id));
//     });
//   };

//   //Hàm update sản phẩm trường khi Ghim
//   const handleGhim = (record) => {
//     let data;
//     if (record.ghim == 0) data = { ghim: 1 };
//     else data = { ghim: 0 };
//     ProductAPI.updateproduct(record._id, data)
//       .then(function (response) {
//         dispatch(updateproduct({ ...data, _id: record._id }));
//       })
//       .catch(function (error) {
//         console.log("Error on Authentication", error);
//         //ProductAddFail(error.response.data.message);
//       });
//   };

//   //Định nghĩa các cột trong table
//   const columns = [
//     {
//       title: "",
//       dataIndex: "image",
//       key: "image",
//       render: (_, record) => {
//         return (
//           <img src={record.images[0]} style={{ width: 100, height: 100 }} />
//         );
//       },
//     },
//     {
//       title: "Tiêu đề",
//       dataIndex: "title",
//       key: "title",
//     },
//     Table.EXPAND_COLUMN,
//     {
//       title: "Giá tiền",
//       dataIndex: "price",
//       key: "price",
//       render: (_, record) => {
//         return (
//           <p>
//             {record.price.toLocaleString("vi-VN", {
//               style: "currency",
//               currency: "VND",
//             })}{" "}
//           </p>
//         );
//       },
//     },
//     {
//       title: "Số lượng",
//       dataIndex: "amount",
//       key: "price",
//     },
//     Table.SELECTION_COLUMN,
//     {
//       title: "",
//       dataIndex: "operation",
//       render: (_, record) => {
//         return (
//           <>
//             <Popconfirm
//               title="Bạn chắc chắn xóa?"
//               onConfirm={() => deleteProductList(record._id)}
//             >
//               <a href="#">
//                 <DeleteOutlined />
//               </a>
//             </Popconfirm>{" "}
//             &nbsp; &nbsp;
//             <a
//               onClick={() => {
//                 dispatch(getproductid(record._id));
//                 setVisibleProductUpdate(true);
//               }}
//               href="#"
//             >
//               <FormOutlined />
//             </a>
//             &nbsp; &nbsp;
//             <a
//               onClick={() => {
//                 //dispatch(getproductid(record._id));
//                 //setVisibleProductUpdate(true);
//                 handleGhim(record);
//               }}
//               href="#"
//             >
//               {record.ghim == 0 ? "Ghim" : "Bỏ ghim"}
//             </a>
//           </>
//         );
//       },
//     },
//   ];

//   //Xử lý Checkbox chọn tất cả
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]); //state chứa các ID cần xóa
//   const [isCheckedAll, setIsCheckedAll] = useState({
//     //state để biết checkbox checkall hay chưa all
//     all: false,
//     part: false,
//     amount: 0,
//   });
//   const [pageSize, setPageSize] = useState(10); //để lấy pagesize hiện tại , kiểm tra checkall

//   //Hàm truyền vào table trả về 2 tham số các key chọn và hàng chọn
//   const rowSelection = {
//     onChange: (selectedRowKeys, selectedRows) => {
//       setSelectedRowKeys(selectedRowKeys);
//       if (
//         pageSize == selectedRowKeys?.length ||
//         dataProduct.length == selectedRowKeys.length
//       )
//         setIsCheckedAll({
//           all: true,
//           part: false,
//           amount: selectedRowKeys.length,
//         });
//       else if (selectedRowKeys.length > 0 && selectedRowKeys.length < pageSize)
//         setIsCheckedAll({
//           all: false,
//           part: true,
//           amount: selectedRowKeys.length,
//         });
//       else
//         setIsCheckedAll({
//           all: false,
//           part: false,
//           amount: selectedRowKeys.length,
//         });
//     },
//     getCheckboxProps: (record) => {
//       return {
//         disabled: record?.working != null,
//         name: record?.title,
//       };
//     },
//   };

//   //Hàm xóa nhiều sản phẩm trong ProductList
//   const delProductLists = () => {
//     selectedRowKeys.forEach((id) => {
//       ProductAPI.deleteproduct(id)
//         .then(function (response) {
//           ProductAddSuccess();
//           dispatch(deleteproduct(id));

//           setSelectedRowKeys([]);
//           setIsCheckedAll({
//             //state để biết checkbox checkall hay chưa all
//             all: false,
//             part: false,
//             amount: 0,
//           });
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//     });
//   };

//   //Hàm set ảnh chính để hiển thị tại trang chủ
//   const handleFirtImage = (record, url) => {
//     const newImagesList = record?.images.filter((item) => {
//       return item != url;
//     });
//     const newImages = [url, ...newImagesList];

//     ProductAPI.updateproduct(record._id, { images: newImages }) //Update lại mảng images của Product và dispatch lại phía giao diện
//       .then(function (response) {
//         dispatch(updateproduct({ images: newImages, _id: record._id }));
//       })
//       .catch(function (error) {
//         console.log("Error on Authentication", error);
//       });
//   };

//   return (
//     <div
//       style={{
//         flexDirection: "row",
//         display: "inline",
//       }}
//     >
//       <div
//         style={{
//           margin: "10px 20px",
//           float: "right",
//         }}
//       >
//         <Checkbox
//           checked={isCheckedAll.all}
//           indeterminate={isCheckedAll.part}
//           disabled
//         />
//         &nbsp;
//         <span
//           style={{ width: 40, margin: "0px 10px 0px 0px" }}
//         >{` Đã chọn: ${isCheckedAll.amount} `}</span>
//         <Popconfirm
//           title="Bạn chắc chắn xóa?"
//           onConfirm={() => delProductLists()}
//         >
//           <a href="#">
//             <DeleteOutlined style={{ fontSize: 20 }} />
//           </a>
//         </Popconfirm>{" "}
//       </div>
//       <Table
//         scroll={{ x: true }}
//         columns={columns}
//         rowSelection={{}}
//         expandable={{
//           expandedRowRender: (record) => (
//             <>
//               {record.images.map((item, index) => {
//                 if (index > 0)
//                   return (
//                     <a key={index}>
//                       <img
//                         src={item}
//                         onClick={() => handleFirtImage(record, item)}
//                         style={{ width: 50, height: 50, margin: 10 }}
//                       />
//                     </a>
//                   );
//               })}
//               <span
//                 style={{
//                   margin: 0,
//                 }}
//               >
//                 {record.description}
//               </span>
//             </>
//           ),
//         }}
//         rowKey={(record) => record?._id}
//         rowSelection={rowSelection}
//         pagination={{
//           onChange: (page, pageSize) => {
//             setPageSize(pageSize);
//           },
//           pageSizeOptions: [2, 10, 20, 40],
//           showSizeChanger: true,
//         }}
//         dataSource={dataProduct}
//         style={{ margin: "0px 20px" }}
//       />
//       <ModalProductUpdate
//         visible={visibleProductUpdate}
//         setVisible={setVisibleProductUpdate}
//       />
//     </div>
//   );
// };

// //Modal Product Update
// const ModalProductUpdate = (props) => {
//   const [confirmLoading, setConfirmLoading] = useState(false);

//   const handleOk = () => {
//     setConfirmLoading(true);
//     setTimeout(() => {
//       props.setVisible(false);
//       setConfirmLoading(false);
//     }, 500);
//   };

//   const handleCancel = () => {
//     props.setVisible(false);
//   };

//   return (
//     <>
//       <Modal
//         title="Sửa sản phẩm"
//         visible={props.visible}
//         onOk={handleOk}
//         confirmLoading={confirmLoading}
//         onCancel={handleCancel}
//         footer={null}
//       >
//         <ProductUpdate setVisible={props.setVisible} />
//       </Modal>
//     </>
//   );
// };

// export default ProductList;
