// import { UploadOutlined } from "@ant-design/icons";
// import { Button, Upload } from "antd";
// import React, { useState } from "react";
// import { storage } from "./firebase";

// // const fileList = [
// //   {
// //     uid: "-1",
// //     name: "xxx.png",
// //     status: "done",
// //     url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
// //     thumbUrl:
// //       "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
// //   },
// // ];

// const UploadImage = () => {
//   //Xử lý upload ảnh
//   const [progress, setProgress] = useState(0);
//   const [fileList, setFileList] = useState([]);
//   const [url, setUrl] = useState([]);

//   const handleChange = (e) => {
//     setFileList(e.fileList);
//     console.log(e.fileList);
//   };

//   const handleUpload = () => {
//     fileList.forEach((e) => {
//       const uploadTask = storage
//         .ref(`images/${e.originFileObj.name}`)
//         .put(e.originFileObj);
//       uploadTask.on(
//         "state_changed",
//         (snapshot) => {
//           const progress = Math.round(
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//           );
//           setProgress(progress);
//         },
//         (error) => {
//           console.log(error);
//         },
//         () => {
//           storage
//             .ref("images")
//             .child(e.originFileObj.name)
//             .getDownloadURL()
//             .then((url) => {
//               // posdocument({...newDocument, "nameUrl": urlimg})
//               // setUrl(pre => [...pre, urlimg])
//               setUrl((old) => [...old, url]);
//             })
//             .catch((e) => {
//               console.log(e);
//             });
//         }
//       );
//     });
//   };
//   console.log(url);
//   return (
//     <>
//       <Upload
//         listType="picture"
//         defaultFileList={[...fileList]}
//         className="upload-list-inline"
//         onChange={(e) => handleChange(e)}
//       >
//         {fileList.length >= 2 ? null : (
//           <Button icon={<UploadOutlined />}>Upload</Button>
//         )}
//       </Upload>
//       <Button onClick={() => handleUpload()}>Tải lên</Button>
//     </>
//   );
// };

// export default UploadImage;

// import { Progress } from "antd";
// import { useState } from "react";

// const UploadImage = () => {
//   const [progress, setProgress] = useState(50);
//   return (
//     <>
//       <img id="img1" />
//       <Progress type="circle" percent={progress} />
//       <input
//         type="file"
//         id="file-upload"
//         required
//         multiple
//         accept=".jpg, .png"
//         onChange={(e) => {
//           const image = document.getElementById("img1");
//           if (e.target.files.length) {
//             console.log(e.target.files);
//             const src = URL.createObjectURL(e.target.files[0]);
//             image.src = src;
//           }

//           const reader = new FileReader();
//           console.log(reader);

//           reader.readAsDataURL(e.target.files[3]);
//           reader.addEventListener("progress", (event) => {
//             const { loaded, total } = event;

//             if (loaded && total) {
//               const percent = Math.round(loaded / total) * 100;
//               // setProgress(100);
//               setProgress(percent);
//             }
//           });
//         }}
//       />
//     </>
//   );
// };

// export default UploadImage;

import { PlusOutlined } from "@ant-design/icons";
import { Upload, Icon, Modal } from "antd";
import { useState } from "react";

const UploadImage = () => {
  //Xử lý upload ảnh
  const [fileList, setFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  //Sửa lỗi Xem trước phóng to
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(() => file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      () => file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = (e) => {
    setFileList(e.fileList);
    console.log(e.fileList);
  };

  return (
    <div>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        multiple={true}
      >
        {fileList.length >= 4 ? null : (
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
      {/* <button onClick={handleUpload}>Upload</button> */}
      <br />
      <progress value={progress} max="100" />
      <br />
    </div>
  );
};

export default UploadImage;
