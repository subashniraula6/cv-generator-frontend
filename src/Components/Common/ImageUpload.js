import React, { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { useFirebase } from "../../context/Firebase"

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const ImageUpload = ({ defaultValue, handleFileChange, url, ...props }) => {
  const { user } = useFirebase()
  const [imageUrl, setImageUrl] = useState(() => defaultValue || null);

  useEffect(() => {
    handleFileChange(imageUrl);
  }, [imageUrl]);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const formData = new FormData();
      formData.append("user_id", user.id);
      formData.append("file", file);

      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json() 
        message.success(`${file.name} file uploaded successfully`);
        setImageUrl(process.env.REACT_APP_BACKEND_URL + data.path)
        onSuccess();
      } else {
        message.error(`${file.name} file upload failed`);
        onError();
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      onError();
    }
  };

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        // onChange={handleChange}
        customRequest={customRequest}
        {...props}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};
export default ImageUpload;
