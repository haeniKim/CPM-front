import "./App.css";

import { useDebugValue, useState, useEffect, useMemo } from "react";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// ApexCharts
import ApexCharts from "apexcharts";
import ReactApexChart from "react-apexcharts";

// MUI
import Stack from "@mui/material/Stack";

import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function Header() {
  return (
    <header>
      <h1>Metricbeat Dashboard</h1>
    </header>
  );
}

//Gauge 퍼센트별로 색 조절 (초록, 빨강))

function CPU_gauge() {
  const cpu_user_pct = 0.6;
  const cpu_sys_pct = 0.3;
  const cpu_cores = 8;
  const cpu_usg_pct = (
    ((cpu_user_pct + cpu_sys_pct) / cpu_cores) *
    100
  ).toFixed(3);

  const options = {
    chart: {
      height: 250,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "50%",
        },
        startAngle: -110,
        endAngle: 110,
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "13px",
          },
          value: {
            color: "#111",
            fontSize: "25px",
            show: true,
            offsetY: 5,
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: [
        function ({ value }) {
          if (value < 70) {
            return "#4CAF50";
          } else if (value >= 70 && value < 85) {
            return "#FF9800";
          } else {
            return "#C62828";
          }
        },
      ],
    },
    labels: ["CPU Usage"],
  };

  const series = [cpu_usg_pct];

  return (
    <div className="grid-item">
      <h4>CPU Usage Gauge</h4>
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height={250}
      />
    </div>
  );
}

function Memory_gauge() {
  const sys_mem_used_pct = (0.932 * 100).toFixed(3);

  const options = {
    chart: {
      height: 250,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "50%",
        },
        startAngle: -110,
        endAngle: 110,
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "13px",
          },
          value: {
            color: "#111",
            fontSize: "25px",
            show: true,
            offsetY: 5,
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: [
        function ({ value }) {
          if (value < 70) {
            return "#4CAF50";
          } else if (value >= 70 && value < 85) {
            return "#FF9800";
          } else {
            return "#C62828";
          }
        },
      ],
    },
    labels: ["Memory Usage"],
  };

  const series = [sys_mem_used_pct];

  return (
    <div className="grid-item">
      <h4>Memory Usage Gauge</h4>
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height={250}
      />
    </div>
  );
}

function Load_gauge() {
  //게이지 범위 조정
  const sys_load_5 = 2.5;

  const options = {
    chart: {
      height: 250,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "50%",
        },
        startAngle: -110,
        endAngle: 110,
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "13px",
          },
          value: {
            color: "#111",
            fontSize: "25px",
            show: true,
            offsetY: 5,
            formatter: function (val) {
              return val;
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: "#4CAF50",
    },
    labels: ["5m Load"],
  };

  //그래프 게이지 조정 (0~20)
  const max = 20;

  const series = [sys_load_5];

  return (
    <div className="grid-item">
      <h4>Load Gauge</h4>
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height={250}
        min={0}
        max={20}
      />
    </div>
  );
}

function In_traffic() {
  const in_traffic = 29.7;
  const in_tot_transferred = 43.4;
  return (
    <div className="grid-item">
      <h4>Inbound Traffic</h4>
      <div className="text-box">
        <h3>Inbound Traffic</h3>
        <h1>{in_traffic}KB/s</h1>
        <h3>Total Transferred {in_tot_transferred}MB</h3>
      </div>
    </div>
  );
}

function Out_traffic() {
  const out_traffic = 3.1;
  const out_tot_transferred = 1.1;
  return (
    <div className="grid-item">
      <h4>Out Traffic</h4>
      <div className="text-box">
        <h3>Outbound Traffic</h3>
        <h1>{out_traffic}KB/s</h1>
        <h3>Total Transferred {out_tot_transferred}MB</h3>
      </div>
    </div>
  );
}

function Packetloss() {
  const packet_loss = 0;
  const out_packetloss = 5401;
  return (
    <div className="grid-item">
      <h4>Packetloss</h4>
      <div className="text-box">
        <h3>In Packetloss</h3>
        <h1>{packet_loss}</h1>
        <h3>Out Packetloss {out_packetloss}</h3>
      </div>
    </div>
  );
}

function Swap_usage() {
  const sys_swap_pct = 58.3;

  const options = {
    chart: {
      height: 250,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "50%",
        },
        startAngle: -110,
        endAngle: 110,
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "13px",
          },
          value: {
            color: "#111",
            fontSize: "25px",
            show: true,
            offsetY: 5,
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: [
        function ({ value }) {
          if (value < 70) {
            return "#4CAF50";
          } else if (value >= 70 && value < 85) {
            return "#FF9800";
          } else {
            return "#C62828";
          }
        },
      ],
    },
    labels: ["Swap usage"],
  };

  const series = [sys_swap_pct];

  return (
    <div className="grid-item">
      <h4>Swap Usage</h4>
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height={250}
      />
    </div>
  );
}

function Memory_tot() {
  const mem_usage = 14.9;
  const tot_memory = 16;
  return (
    <div className="grid-item">
      <h4>Memory Udage vs Total </h4>
      <div className="text-box">
        <h3>Memory Usage</h3>
        <h1>{mem_usage}GB</h1>
        <h3>Total Memory {tot_memory}GB</h3>
      </div>
    </div>
  );
}

function Process_num() {
  const num_process = 35;
  return (
    <div className="grid-item">
      <h4>Number of Processes</h4>
      <div className="text-box">
        <p style={{ fontSize: "55px", fontWeight: "800" }}>{num_process}</p>
        <h3>Processes</h3>
      </div>
    </div>
  );
}

function Disk_used() {
  const fsstat_used = 764737406464;
  const fsstat_total = 2967881852416;
  const d_used = ((fsstat_used / fsstat_total) * 100).toFixed(3);

  const options = {
    chart: {
      height: 250,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "50%",
        },
        startAngle: -110,
        endAngle: 110,
        dataLabels: {
          showOn: "always",
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "13px",
          },
          value: {
            color: "#111",
            fontSize: "25px",
            show: true,
            offsetY: 5,
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: [
        function ({ value }) {
          if (value < 70) {
            return "#4CAF50";
          } else if (value >= 70 && value < 85) {
            return "#FF9800";
          } else {
            return "#C62828";
          }
        },
      ],
    },
    labels: ["Disk used"],
  };

  const series = [d_used];

  return (
    <div className="grid-item">
      <h4>Disk Used</h4>
      <ReactApexChart
        options={options}
        series={series}
        type="radialBar"
        height={250}
      />
    </div>
  );
}

function Disk_usage() {
  //bar graph
  const options = {
    chart: {
      height: 250,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        borderRadiusApplication: "end",
        horizontal: true,
      },
    },
    xaxis: {
      // 받아와야 하는 값
      labels: { show: false },
      categories: ["/Volumes/Google Chrome", "/Volumes/Docker", "/"],
    },
    fill: {
      colors: [
        function ({ value }) {
          if (value < 70) {
            return "#4CAF50";
          } else if (value >= 70 && value < 85) {
            return "#FF9800";
          } else {
            return "#C62828";
          }
        },
      ],
    },
    grid: {
      show: false,
    },
  };

  const series = [{ data: [100, 45, 30] }]; //예시 시계열 데이터

  return (
    <div className="grid-item">
      <h4>Disk Usage</h4>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={250}
      />
    </div>
  );
}

function CPU_usage() {
  //영역 그래프, 값 % 표시하기
  // 시계열, 값은 10초 단위, 범례는 30분 단위, 기본은 최신값 범례에 표시
  const options = {
    chart: {
      height: 350,
      type: "area",
      stacked: true,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    legend: {
      position: "right",
    },
    xaxis: {
      // 따로 빼서 넣어주기
      type: "datetime",
      categories: [
        "2018-09-19T17:38:10.000Z",
        "2018-09-19T17:38:20.000Z",
        "2018-09-19T17:38:30.000Z",
        "2018-09-19T17:38:40.000Z",
        "2018-09-19T17:38:50.000Z",
        "2018-09-19T17:39:00.000Z",
        "2018-09-19T17:39:10.000Z",
        "2018-09-19T17:39:20.000Z",
      ],
    },
    stroke: {
      width: 3,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm:ss",
      },
    },
    grid: {
      show: false,
    },
    colors: ["#4CAF50", "#E53935", "#AB47BC"],
    fill: {
      type: "solid",
    },
  };

  const series = [
    // 실제 값은 0.8 이므로 * 100 필요함
    {
      name: "user",
      data: [80, 80, 70.9, 79, 70.9, 88.9, 70, 80],
    },
    {
      name: "system",
      data: [60, 50, 50.6, 49.4, 40.5, 79, 50, 40],
    },
    {
      name: "nice",
      data: [0, 0, 0, 0, 0, 0, 0, 0],
    },
  ];

  return (
    <div className="grid-item">
      <h4>CPU Usage</h4>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={250}
      />
    </div>
  );
}

function System_load() {
  // 시계열, 값은 10초 단위, 범례는 30분 단위, 기본은 최신값 범례에 표시
  const options = {
    chart: {
      height: 350,
      type: "line",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [3, 3, 3],
      curve: "straight",
      colors: ["#90CAF9", "#2196F3", "#0D47A1"],
    },
    legend: {
      // formatter: function (val, opts) {
      //   return (
      //     val +
      //     " - <strong>" +
      //     opts.w.globals.seires[opts.seriesIndex].at(-1) +
      //     "</strong>"
      //   );
      // },
      tooltipHoverFormatter: function (val, opts) {
        return (
          val +
          " - <strong>" +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          "</strong>"
        );
      },
      position: "right",
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T17:38:10.000Z",
        "2018-09-19T17:38:20.000Z",
        "2018-09-19T17:38:30.000Z",
        "2018-09-19T17:38:40.000Z",
        "2018-09-19T17:38:50.000Z",
        "2018-09-19T17:39:00.000Z",
        "2018-09-19T17:39:10.000Z",
        "2018-09-19T17:39:20.000Z",
        "2018-09-19T17:39:30.000Z",
        "2018-09-19T17:39:40.000Z",
        "2018-09-19T17:39:50.000Z",
        "2018-09-19T17:40:00.000Z",
      ],
    },
    grid: {
      show: false,
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val;
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val;
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val;
            },
          },
        },
      ],
    },
    colors: ["#90CAF9", "#2196F3", "#0D47A1"],
  };

  const series = [
    {
      name: "1m",
      data: [
        2.65, 2.596, 3.661, 4.193, 5.018, 4.541, 4.592, 4.914, 5.759, 5.975,
        5.136, 4.742,
      ],
    },
    {
      name: "5m",
      data: [
        2.582, 2.494, 2.478, 2.544, 2.492, 2.525, 2.524, 2.653, 2.648, 2.686,
        4.741, 4.6,
      ],
    },
    {
      name: "15m",
      data: [
        0.347, 0.345, 0.342, 0.341, 0.342, 0.342, 0.347, 0.348, 0.347, 0.348,
        0.611, 0.604,
      ],
    },
  ];

  return (
    <div className="grid-item">
      <h4>System Load</h4>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={250}
      />
    </div>
  );
}

function Memory_usage() {
  const options = {
    chart: {
      type: "bar",
      stacked: true,
    },
  };

  const series = [
    {
      name: "Free",
      data: [
        0.034, 0.03, 0.035, 0.0397, 0.0375, 0.0311, 0.0354, 0.0311, 0.0418,
        0.0287,
      ],
    },
    {
      name: "Cache", //수식 필요
      data: [1, 1, 1, 0.9, 1, 0.9, 0.9, 1, 1.015, 0.977],
    },
    {
      name: "Used",
      data: [15, 14.9, 15, 15, 15, 14.9, 14.9, 14.9, 15, 14.9],
    },
  ];

  return (
    <div className="grid-item">
      <h4>Memory Usage</h4>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={250}
      />
    </div>
  );
}

function Disk_IO() {
  const options = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    legend: {
      position: "right",
    },
    xaxis: {
      // 따로 빼서 넣어주기
      type: "datetime",
      categories: [
        "2018-09-19T17:38:10.000Z",
        "2018-09-19T17:38:20.000Z",
        "2018-09-19T17:38:30.000Z",
        "2018-09-19T17:38:40.000Z",
        "2018-09-19T17:38:50.000Z",
        "2018-09-19T17:39:00.000Z",
        "2018-09-19T17:39:10.000Z",
        "2018-09-19T17:39:20.000Z",
      ],
    },
    stroke: {
      width: 3,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm:ss",
      },
    },
    grid: {
      show: false,
    },
    colors: ["#26A69A", "#FFA000"],
    fill: {
      type: "solid",
    },
  };

  const series = [
    // 계산 조금 복잡함
    {
      name: "reads",
      data: [77.6, 552, 470.4, 79, 118.4, 1110.9, 875.6, 565.2],
    },
    {
      name: "writes",
      data: [-143, -745.2, -602.2, -102.4, -173.3, -1935.3, -934.6, -612.3],
    },
  ];

  return (
    <div className="grid-item">
      <h4>Disk IO (Bytes)</h4>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={250}
      />
    </div>
  );
}

function Network_traffic_p() {
  const options = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    legend: {
      position: "right",
    },
    xaxis: {
      // 따로 빼서 넣어주기
      type: "datetime",
      categories: [
        "2018-09-19T17:38:10.000Z",
        "2018-09-19T17:38:20.000Z",
        "2018-09-19T17:38:30.000Z",
        "2018-09-19T17:38:40.000Z",
        "2018-09-19T17:38:50.000Z",
        "2018-09-19T17:39:00.000Z",
        "2018-09-19T17:39:10.000Z",
        "2018-09-19T17:39:20.000Z",
      ],
    },
    stroke: {
      width: 3,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm:ss",
      },
    },
    grid: {
      show: false,
    },
    colors: ["#4527A0", "#9C27B0"],
    fill: {
      type: "solid",
    },
  };

  const series = [
    // 계산 조금 복잡함
    {
      name: "Inbound",
      data: [77.6, 552, 470.4, 79, 118.4, 1110.9, 875.6, 565.2],
    },
    {
      name: "Outbound",
      data: [-143, -745.2, -602.2, -102.4, -173.3, -1935.3, -934.6, -612.3],
    },
  ];

  return (
    <div className="grid-item">
      <h4>Network Traffic (Packets)</h4>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={250}
      />
    </div>
  );
}

function Network_traffic_b() {
  const options = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    legend: {
      position: "right",
    },
    xaxis: {
      // 따로 빼서 넣어주기
      type: "datetime",
      categories: [
        "2018-09-19T17:38:10.000Z",
        "2018-09-19T17:38:20.000Z",
        "2018-09-19T17:38:30.000Z",
        "2018-09-19T17:38:40.000Z",
        "2018-09-19T17:38:50.000Z",
        "2018-09-19T17:39:00.000Z",
        "2018-09-19T17:39:10.000Z",
        "2018-09-19T17:39:20.000Z",
      ],
    },
    stroke: {
      width: 3,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm:ss",
      },
    },
    grid: {
      show: false,
    },
    colors: ["#4527A0", "#9C27B0"],
    fill: {
      type: "solid",
    },
  };

  const series = [
    // 계산 조금 복잡함
    {
      name: "reads",
      data: [77.6, 552, 470.4, 79, 118.4, 1110.9, 875.6, 565.2],
    },
    {
      name: "writes",
      data: [-143, -745.2, -602.2, -102.4, -173.3, -1935.3, -934.6, -612.3],
    },
  ];

  return (
    <div className="grid-item">
      <h4>Network Traffic (Bytes)</h4>
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={250}
      />
    </div>
  );
}

function Process_by_m() {
  //bar graph
  const options = {
    chart: {
      height: 250,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        borderRadiusApplication: "end",
        horizontal: true,
      },
    },
    xaxis: {
      // 받아와야 하는 값
      labels: { show: false },
      categories: ["java", "Google Chrome", "Notion Helper", "KakaoTalk"],
    },
    fill: {
      colors: [
        function ({ value }) {
          if (value < 70) {
            return "#4CAF50";
          } else if (value >= 70 && value < 85) {
            return "#FF9800";
          } else {
            return "#C62828";
          }
        },
      ],
    },
    grid: {
      show: false,
    },
  };

  const series = [{ data: [5.76, 2.53, 1.75, 1.06] }]; //예시 시계열 데이터

  return (
    <div className="grid-item">
      <h4>Processes By Memory</h4>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={250}
      />
    </div>
  );
}

function Top_process() {
  //bar graph
  const options = {
    chart: {
      height: 250,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        borderRadiusApplication: "end",
        horizontal: true,
      },
    },
    xaxis: {
      // 받아와야 하는 값
      labels: { show: false },
      categories: [
        "WindowServer",
        "Code Helper (Re",
        "Code Helper (GP",
        "PerfPowerService",
      ],
    },
    fill: {
      colors: "#4CAF50",
    },
    grid: {
      show: false,
    },
  };

  const series = [{ data: [0.46, 0.28, 0.15, 0.13] }]; //예시 시계열 데이터

  return (
    <div className="grid-item">
      <h4>Top Processes By CPU</h4>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={250}
      />
    </div>
  );
}

function If_in_traffic() {
  //bar graph
  const options = {
    chart: {
      height: 250,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        borderRadiusApplication: "end",
        horizontal: true,
      },
    },
    xaxis: {
      // 받아와야 하는 값
      labels: { show: false },
      categories: ["lo0", "en0", "awdl0", "utun3"],
    },
    fill: {
      colors: "#4CAF50",
    },
    grid: {
      show: false,
    },
  };

  const series = [{ data: [7100, 5900, 46.6, 0.013] }]; //예시 시계열 데이터
  //실제 데이터는 bytes => GB 단위로 변환해서 표현!

  return (
    <div className="grid-item">
      <h4>Interfaces by Incoming traffic</h4>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={250}
      />
    </div>
  );
}

function If_out_traffic() {
  //bar graph
  const options = {
    chart: {
      height: 250,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        borderRadiusApplication: "end",
        horizontal: true,
      },
    },
    xaxis: {
      // 받아와야 하는 값
      labels: { show: false },
      categories: ["lo0", "en0", "awdl0", "utun3"],
    },
    fill: {
      colors: "#4CAF50",
    },
    grid: {
      show: false,
    },
  };

  const series = [{ data: [7200, 988.2, 6.1, 0.069] }]; //예시 시계열 데이터
  //실제 데이터는 bytes => GB 단위로 변환해서 표현!

  return (
    <div className="grid-item">
      <h4>Interfaces by Incoming traffic</h4>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={250}
      />
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <img src="direa_logo.png" alt="Direa logo" />
    </footer>
  );
}

function App() {
  return (
    <Container maxWidth="xl">
      <Header></Header>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <CPU_gauge></CPU_gauge>
          </Grid>
          <Grid item xs={2}>
            <Memory_gauge></Memory_gauge>
          </Grid>
          <Grid item xs={2}>
            <Load_gauge></Load_gauge>
          </Grid>
          <Grid item xs={2}>
            <In_traffic></In_traffic>
          </Grid>
          <Grid item xs={2}>
            <Out_traffic></Out_traffic>
          </Grid>
          <Grid item xs={2}>
            <Packetloss></Packetloss>
          </Grid>
          <Grid item xs={2}>
            <Swap_usage></Swap_usage>
          </Grid>
          <Grid item xs={2}>
            <Memory_tot></Memory_tot>
          </Grid>
          <Grid item xs={2}>
            <Process_num></Process_num>
          </Grid>
          <Grid item xs={2}>
            <Disk_used></Disk_used>
          </Grid>
          <Grid item xs={4}>
            <Disk_usage></Disk_usage>
          </Grid>
          <Grid item xs="6">
            <CPU_usage></CPU_usage>
          </Grid>
          <Grid item xs="6">
            <System_load></System_load>
          </Grid>
          <Grid item xs="6">
            <Memory_usage></Memory_usage>
          </Grid>
          <Grid item xs="6">
            <Disk_IO></Disk_IO>
          </Grid>
          <Grid item xs="6">
            <Network_traffic_p></Network_traffic_p>
          </Grid>
          <Grid item xs="6">
            <Network_traffic_b></Network_traffic_b>
          </Grid>
          <Grid item xs="6">
            <Process_by_m></Process_by_m>
          </Grid>
          <Grid item xs="6">
            <Top_process></Top_process>
          </Grid>
          <Grid item xs="6">
            <If_in_traffic></If_in_traffic>
          </Grid>
          <Grid item xs="6">
            <If_out_traffic></If_out_traffic>
          </Grid>
        </Grid>
      </Container>
      <Footer></Footer>
    </Container>
  );
}

export default App;
