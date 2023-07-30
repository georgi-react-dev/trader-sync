import React from "react";

function SwitchButton({ on, onClick }) {
  return (
    <label className="switch">
      <input type="checkbox" checked={on} onChange={onClick} />
      <span className="slider round"></span>
    </label>
  );
}

export default SwitchButton;
