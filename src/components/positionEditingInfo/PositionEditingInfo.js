import React, { useState, useEffect, createRef } from "react";
import axios from "axios";
import {
  FaEye,
  FaPencilAlt,
  FaFileUpload,
  FaTimesCircle,
} from "react-icons/fa";
import Modal from "../modal/Modal";
import EditableComponent from "../editable/EditableComponent";

const PositionEditingInfo = ({ positionId }) => {
  const [images, setImages] = useState([]);

  const fileInputRef = createRef();
  const fetchImages = async (positionID) => {
    const res = await axios.get(
      "https://doubtful-fawn-baseball-cap.cyclic.app/getPositionImages",
      {
        params: {
          positionID: positionID,
        },
      }
    );
    console.log(res.data);
    if (res.data.length > 0) {
      setImages(res.data);
    } else {
      setImages([]);
    }
  };

  const removeImage = async (image) => {
    var result = window.confirm("Are you sure you want to delete image?");
    if (result) {
      const res = await axios.get(
        "https://doubtful-fawn-baseball-cap.cyclic.app/removeImage",
        {
          params: {
            image,
          },
        }
      );

      console.log({ REMOVE: res });
      if (res.data.removed) {
        fetchImages(positionId);
      }
    }
  };
  useEffect(() => {
    fetchImages(positionId);
  }, [positionId]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e, positionID) => {
    // console.log({ positionID });

    const file = e.target.files[0];
    // Do something with the file

    if (file) {
      const formData = new FormData();
      formData.append("image", file, positionID);
      formData.append("positionID", positionID);

      axios
        .post("https://doubtful-fawn-baseball-cap.cyclic.app/save", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Response from server:", response.data);
          fetchImages(positionId);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "1rem",
        paddingBottom: "2rem",
        color: "#123456",
      }}
    >
      <div>
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={(e) => handleFileChange(e, positionId)}
        />

        <div
          style={{
            display: "flex",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
            // border: ".5px solid #888",

            padding: "0.5rem",
          }}
        >
          <button
            style={{ background: "#123456", color: "#fff" }}
            type="button"
            onClick={() => handleButtonClick()}
          >
            Upload
          </button>
          {/* <FaFileUpload
            size={"1.2rem"}
            cursor="pointer"
            color="lightblue"
            
          /> */}
        </div>
      </div>
      {images.length === 0 ? (
        <h1>There are no images!</h1>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: ".5rem",
            flexWrap: "wrap",
            overflow: "scroll",
            height: "85vh",
          }}
        >
          {images?.map((item) => {
            return (
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "space-between",
                  borderBottom: "6px solid #040508",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    width: "65%",
                  }}
                >
                  <span
                    style={{ position: "absolute", top: "1rem", right: "1rem" }}
                    onClick={() => removeImage(item)}
                  >
                    <FaTimesCircle cursor="pointer" color="red" size="1.2rem" />
                  </span>
                  <img src={item.image} alt="" style={{ width: "100%" }} />
                </div>
                <EditableComponent
                  apiUrl={
                    "https://doubtful-fawn-baseball-cap.cyclic.app/updateDescription"
                  }
                  initialContent={item.description}
                  id={item.id}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PositionEditingInfo;
