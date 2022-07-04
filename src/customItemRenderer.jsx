import React from "react";

/*
item: Object
  key: 26
  title: "6 hours"
  color: "#dd5900"
  row: 3
  start: Moment
  end: Moment
  rowOffset: 0
  className: "rct9k-items-inner"
  style: Object
  backgroundColor: "#dd5900"
*/

const customItemRenderer = (props) => {
  // console.log("customItemRenderer", props);
  const { item = {}, className, style, isSelected } = props;
  const { key, workload } = item;
  return (
    <div
      key={`${key}-${className}`}
      className={className}
      style={{
        height: "100%",
        background: `linear-gradient(90deg, #FFC0CB ${
          item.workload * 100
        }%, rgba(1,1,1,0) ${(item.workload % 1) * 100}%)`
      }}
    >
      <p
        style={{ fontSize: "6px", margin: "0px", height: "min-content" }}
      >{`workload: ${item.workload * 100}%`}</p>
      <div
        // key={`${key}-${className}`}
        style={{
          ...style,
          backgroundColor: `${isSelected ? "orange" : "blue"}`,
          color: "white",
          marginTop: "0px"
        }}
        // className={className}
      >
        {`${workload * 100}%`}
      </div>
    </div>
  );
};

export default customItemRenderer;

// NEW CHANGES
/*
return (
    <div
      key={`${key}-${className}`}
      className={className}
      style={{
        height: "100%",
        background: `linear-gradient(90deg, #FFC0CB ${
          item.workload * 100
        }%, rgba(1,1,1,0) ${(item.workload % 1) * 100}%)`
      }}
    >
      <p
        style={{ fontSize: "6px", margin: "0px", height: "min-content" }}
      >{`workload: ${item.workload * 100}%`}</p>
      <div
        // key={`${key}-${className}`}
        style={{
          ...style,
          backgroundColor: `${isSelected ? "orange" : "blue"}`,
          color: "white",
          marginTop: "0px"
        }}
        // className={className}
      >
        {`${workload * 100}%`}
      </div>
    </div>
  );
*/

// ORIGINAL VERSION
/*
return (

      <div
        key={`${key}-${className}`}
        style={{
          ...style,
          backgroundColor: `${isSelected ? "orange" : "blue"}`,
          color: "white",
          marginTop: "7px"
        }}
        className={className}
      >
        {`${workload * 100}%`}
      </div>
  );
*/
