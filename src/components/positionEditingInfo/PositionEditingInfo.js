import React, { useState, useEffect, createRef } from "react";
import httpClient from "../../api/httpClient";
import { FaTimesCircle } from "react-icons/fa";

import EditableComponent from "../editable/EditableComponent";

const PositionEditingInfo = ({ positionId }) => {
  const [images, setImages] = useState([]);

  const fileInputRef = createRef();
  const fetchImages = async (positionID) => {
    const res = await httpClient.get("/getPositionImages", {
      params: {
        positionID: positionID,
      },
    });
    if (res.data.length > 0) {
      setImages(res.data);
    } else {
      setImages([]);
    }
  };

  const removeImage = async (image) => {
    var result = window.confirm("Are you sure you want to delete image?");
    if (result) {
      const res = await httpClient.get("/removeImage", {
        params: {
          image,
        },
      });

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

  const handleOnPaste = (evt, positionId) => {
    console.log({ positionId });

    const clipboardItems = evt.clipboardData.items;
    const items = [].slice.call(clipboardItems).filter(function (item) {
      // Filter the image items only
      return item.type.indexOf("image") !== -1;
    });
    if (items.length === 0) {
      return;
    }

    const item = items[0];
    // Get the blob of image
    const blob = item.getAsFile();

    const formData = new FormData();
    formData.append("image", blob, positionId);
    formData.append("positionID", positionId);

    httpClient
      .post("/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        fetchImages(positionId);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleFileChange = (e, positionID) => {
    // console.log({ positionID });

    const file = e.target.files[0];
    // Do something with the file

    if (file) {
      const formData = new FormData();
      formData.append("image", file, positionID);
      formData.append("positionID", positionID);

      httpClient
        .post("/save", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
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
      <div
        onPaste={(e) => handleOnPaste(e, positionId)}
        style={{ border: "1px solid #888", padding: "1rem" }}
      >
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={(e) => handleFileChange(e, positionId)}
        />
        <kbd class="key">Ctrl</kbd> + <kbd class="key">V</kbd> in this window or{" "}
        <button
          style={{ background: "#123456", color: "#fff", cursor: "pointer" }}
          type="button"
          onClick={() => handleButtonClick()}
        >
          Upload
        </button>
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
                  apiUrl={"/updateDescription"}
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
