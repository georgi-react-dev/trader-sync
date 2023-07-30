import React, { createRef, useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import Badge from "../tabs/Badge";
import format from "date-fns/format";
import axios from "axios";
import Modal from "../modal/Modal";
import ZoomModalImage from "../modal/ZoomModalImage";
import {
  FaEye,
  FaPencilAlt,
  FaFileUpload,
  FaTimesCircle,
} from "react-icons/fa";
import DealDetails from "./DealDetails";
import EditableComponent from "../editable/EditableComponent";
const TableContainer = styled.div`
  table {
    width: 100%;
  }
  background: #252b3d;
  overflow: auto;
  tr {
    border-bottom: 1px solid #fff;
  }
  color: #fff;
  th {
    font-weight: normal;
    text-transform: uppercase;
    font-size: 0.9rem;
    padding-bottom: 1rem;
    border: none;
  }
  td {
    text-align: center;
    padding: 5px 10px;
    &.symbol {
      color: #01b299;
      font-weight: bold;
    }
  }
  thead {
    margin-bottom: 1rem;
  }
`;
const ImageWrapper = styled.div`
  img {
    cursor: pointer;
    // &:hover {
    //   scale: 6.5;
    //   transition: 0.4s all;
    //   transform: translate(-15%, -15%);
    // }
  }
`;

function DealsTable({ dealsInfo }) {
  console.log({ DEAL: dealsInfo });
  const [dealsData, setDealsData] = useState(dealsInfo);
  const fileInputRefs = dealsInfo.map(() => createRef());

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const results = await Promise.all(
  //       dealsInfo.map(async (item) => {
  //         // Replace 'your_api_endpoint' with the actual API endpoint
  //         const response = await axios.get("https://doubtful-fawn-baseball-cap.cyclic.app/getData", {
  //           params: {
  //             positionID: item.position,
  //           },
  //         });

  //         console.log({ response });
  //         // item.image = response.data.image_path;
  //         return {
  //           ...item,
  //           image: response.data.image_path,
  //           description: response.data.description,
  //         }; // Assuming the API returns JSON data
  //       })
  //     );
  //     console.log({ results });
  //     setDealsData(results);
  //     // const deals = dealsInfo.map(async (item) => {
  //     //   const res = await axios.get("https://doubtful-fawn-baseball-cap.cyclic.app/getImage", {
  //     //     params: {
  //     //       positionID: item.position,
  //     //     },
  //     //   });
  //     //   console.log({ res1112: res });
  //     //   item.image = res.data.image_path;
  //     // });
  //     // console.log({ deals });
  //     // setDealsData(deals);
  //   };
  //   fetchData();
  // }, []);

  const [currentImage, setCurrentImage] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const handleButtonClick = (index) => {
    console.log({ index });
    console.log({ fileInputRefs });
    fileInputRefs[index].current.click();
  };
  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   // Do something with the file
  //   handleFormSubmit(file);
  // };
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

          // setDealsData([]);
          const test = dealsData.map((item) => {
            if (item.position_id === positionID) {
              item.image_path = response.data.filename;
            }
            return item;
          });

          console.log({ test });
          setDealsData(test);

          // const fetchData = async () => {
          //   const results = await Promise.all(
          //     dealsInfo.map(async (item) => {
          //       // Replace 'your_api_endpoint' with the actual API endpoint
          //       const response = await axios.get(
          //         "https://doubtful-fawn-baseball-cap.cyclic.app/getImage",
          //         {
          //           params: {
          //             positionID: item.position,
          //           },
          //         }
          //       );
          //       // item.image = response.data.image_path;
          //       return { ...item, image_path: response.data.image_path }; // Assuming the API returns JSON data
          //     })
          //   );
          //   console.log({ results });
          //   setDealsData(results);
          //   // const deals = dealsInfo.map(async (item) => {
          //   //   const res = await axios.get("https://doubtful-fawn-baseball-cap.cyclic.app/getImage", {
          //   //     params: {
          //   //       positionID: item.position,
          //   //     },
          //   //   });
          //   //   console.log({ res1112: res });
          //   //   item.image = res.data.image_path;
          //   // });
          //   // console.log({ deals });
          //   // setDealsData(deals);
          // };

          // fetchData();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const showImageByPositionID = async (positionID) => {
    // get image path
    setCurrentImage(null);
    const res = await axios.get(
      "https://doubtful-fawn-baseball-cap.cyclic.app/getImage",
      {
        params: {
          positionID: positionID,
        },
      }
    );

    console.log({ res: res.data.filename });
    setCurrentImage(res.data.image_path);
    setCurrentPosition(positionID);
  };

  const removeImageByPositionID = async (positionID) => {
    // get image path
    setCurrentImage(null);
    const res = await axios.get(
      "https://doubtful-fawn-baseball-cap.cyclic.app/removeImage",
      {
        params: {
          positionID: positionID,
        },
      }
    );
  };

  const showZoomedImage = (url) => {
    setImageUrl(url);
    setShowImageModal(true);
  };
  return (
    <TableContainer>
      <table border="1">
        <thead>
          <tr>
            <th>Position ID</th>
            <th>open date</th>
            <th>symbol</th>
            <th>status</th>
            <th>side</th>
            <th>return $</th>
            <th>lot size</th>
            <th>pips</th>
            <th>Image</th>
            <th>Description</th>
            <th>Open time</th>
            <th>Close time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dealsData?.map((item, index) => {
            console.log({ item });
            return (
              <tr key={item.position_id}>
                <td>{item.position_id}</td>
                <td>{format(new Date(item.trade_date), "LLL dd, yyyy")}</td>
                <td className="symbol">{item.symbol}</td>
                <td>
                  <Badge variant={Number(item.profit) > 0 ? "win" : "loss"} />
                </td>
                <td>
                  <Badge variant={item.type === "buy" ? "long" : "short"} />
                </td>
                <td
                  style={{
                    color: Number(item.profit) > 0 ? "#468481" : "#c36969",
                  }}
                >
                  {item.profit > 0
                    ? `$${item.profit}`
                    : `-$${Math.abs(item.profit).toFixed(2)}`}
                </td>
                <td>{item.volume}</td>
                <td>
                  {Math.abs((item.profit / item.volume) * 0.1).toFixed(2)}
                </td>
                <td>
                  <ImageWrapper style={{ position: "relative" }}>
                    {!currentImage && item.image_path && (
                      <>
                        <img
                          src={
                            "https://doubtful-fawn-baseball-cap.cyclic.app/uploads/" +
                            item.image_path
                          }
                          alt={"img"}
                          style={{ height: "30px" }}
                          onClick={() =>
                            showZoomedImage(
                              "https://doubtful-fawn-baseball-cap.cyclic.app/uploads/" +
                                item.image_path
                            )
                          }
                        />
                        {/* <FaTimesCircle
                          style={{ position: "absolute", right: 0 }}
                          size={"1.2rem"}
                          color={"red"}
                          cursor="pointer"
                          onClick={() => {
                            setShowModal(true);
                            // removeImageByPositionID(item.position);
                          }}
                        /> */}
                      </>
                    )}

                    {currentImage && currentPosition === item.position_id && (
                      <>
                        <img
                          src={
                            "https://doubtful-fawn-baseball-cap.cyclic.app/uploads/" +
                            item.image_path
                          }
                          alt={"img"}
                          style={{ height: "30px" }}
                        />
                        {/* <FaTimesCircle
                          style={{ position: "absolute", right: 0 }}
                          size={"1.2rem"}
                          color={"red"}
                          cursor="pointer"
                          onClick={() => {
                            setShowModal(true);
                            // removeImageByPositionID(item.position);
                          }}
                        /> */}
                      </>
                    )}
                  </ImageWrapper>
                </td>
                <td>
                  <EditableComponent
                    apiUrl={
                      "https://doubtful-fawn-baseball-cap.cyclic.app/updateDescription"
                    }
                    initialContent={item.description}
                    positionId={item.position_id}
                  />
                </td>
                <td>{format(new Date(item.time_open), "HH:mm:ss")}</td>
                <td>{format(new Date(item.time_close), "HH:mm:ss")}</td>
                <td>
                  {/* <FaPencilAlt
                    size={"1.2rem"}
                    cursor="pointer"
                    onClick={() => {
                      setCurrentPosition(item.position);
                      setShowModal(true);
                    }}
                  /> */}
                  <input
                    type="file"
                    ref={fileInputRefs[index]}
                    style={{ display: "none" }}
                    onChange={(e) => handleFileChange(e, item.position_id)}
                  />

                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1rem",
                      // border: ".5px solid #888",
                      padding: "0.5rem",
                    }}
                  >
                    <FaFileUpload
                      size={"1.2rem"}
                      cursor="pointer"
                      color="lightblue"
                      onClick={() => handleButtonClick(index)}
                    />
                    {/* <FaPencilAlt
                      size={"1.2rem"}
                      cursor="pointer"
                      onClick={() => showImageByPositionID(item.position)}
                    /> */}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <DealDetails positionId={currentPosition} />
        </Modal>
      )}
      {showImageModal && (
        <ZoomModalImage setShowModal={setShowImageModal}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={imageUrl} alt={"img"} style={{ height: "80vh" }} />
          </div>
        </ZoomModalImage>
      )}
    </TableContainer>
  );
}

export default DealsTable;
