import React, {
  forwardRef,
  useImperativeHandle,
  memo,
} from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const MainChart = forwardRef((props, ref) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };


  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => [Math.random() * 100]),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => [Math.random() * 100]),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  const [chartData, setChartData] = React.useState(data);
  useImperativeHandle(ref, () => ({
    updateData(iso_country_code) {
      console.log("updateData with iso_country_code:", iso_country_code);
      axios({
        method: "GET",
        url: "https://inquinapi.derpi.it/api/",
        params: {
          iso_code: iso_country_code,
          year: `${2000}-${new Date().getFullYear()}`,
        },
        headers: {
          "Content-Type": "application/json",
        },
      })
          .then((response) => {
            console.log(response.data);
            setChartData(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
    },
  }));
  return <Line options={options} data={data} type={"line"}/>;
});

export default memo(MainChart);
