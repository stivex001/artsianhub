import React from "react";

type props = {
  data: any;
};

export const renderData = ({ data }: props) => {
  if (typeof data === "string" || typeof data === "number") {
    return <p className="text-red-500">{data}</p>;
  }
  // if (React.isValidElement(data)) {
  //   return data;
  // }
  // return null;
};
