import React, { memo, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const SecondaryChart = (props) => {
  const [dataChart, setDataChart] = useState(Object);
  return <Bar />;
};

export default memo(SecondaryChart);
