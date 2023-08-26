import React, { useState } from "react";

function SwitchButton({ on, onClick }) {
  const [toggle, setToggle] = useState(false);

  const triggerToggle = (e) => {
    setToggle(!toggle);
    onClick(e);
  };
  return (
    <label className="switch">
      <input type="checkbox" checked={toggle} onChange={triggerToggle} />
      <span
        className="slider round"
        style={{ background: toggle ? "#4f293f" : "#125c51" }}
      ></span>
    </label>
  );
}

export default SwitchButton;
