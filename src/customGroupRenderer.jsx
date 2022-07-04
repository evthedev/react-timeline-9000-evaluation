import React from "react";

const customGroupRenderer = (props) => {
  console.log("customGroupRender", props);
  const { group } = props;
  // console.log("customGroupRenderer, params", params);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center"
      }}
    >{`${group.group.first_name} ${group.group.last_name}`}</div>
  );
};

export default customGroupRenderer;
