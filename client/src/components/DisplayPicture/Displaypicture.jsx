import React from "react";

const Displaypicture = (props) => {
  return (
    <div className="">
      <img
        className="mb-2 w-14 h-14 rounded-full"
        src={props.image}
        alt={props.alt}
      />
    </div>
  );
};

export default Displaypicture;
