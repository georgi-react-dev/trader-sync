// ElementMaker.js

import React, { useState } from "react";
import axios from "axios";
// Create an ElementMaker component
function EditableComponent({ apiUrl, initialContent, id }) {
  const [showInputEle, setShowInputEle] = useState(false);
  const [content, setContent] = useState(initialContent);

  const handleBlur = async () => {
    try {
      // const sanitizedContent = DOMPurify.sanitize(content);
      // Make the API request with the sanitized content on blur
      await axios.post(apiUrl, {
        description: content,
        id: id,
      });
      console.log("API request sent successfully!");
      setShowInputEle(false);
    } catch (error) {
      console.error("Error sending API request:", error);
    }
  };

  return (
    <span style={{ flex: "0.5" }}>
      {
        // Use JavaScript's ternary operator to specify <span>'s inner content
        showInputEle ? (
          <textarea
            style={{ minWidth: "300px", minHeight: "100px" }}
            onChange={(e) => setContent(e.target.value)}
            value={content}
            onBlur={handleBlur}
            autoFocus
          />
        ) : (
          <pre>
            <div
              onClick={() => setShowInputEle(true)}
              style={{
                display: "inline-block",
                textAlign: "left",
                color: "black",
                minWidth: "300px",
                padding: "5px",
                cursor: "pointer",
              }}
            >
              {content ? content : "doube click to add description"}
            </div>
          </pre>
        )
      }
    </span>
  );
}

export default EditableComponent;
