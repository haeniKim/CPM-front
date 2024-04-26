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
  return (
    <cpu_gauge>
      <h4>CPU Usage Gauge</h4>
      <Gauge
        value={cpu_usg_pct}
        startAngle={-110}
        endAngle={110}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 20,
            transform: "translate(0px, 0px)",
          },
        }}
        text={({ value }) => `${value}%`}
        style={{ height: "150px" }} //비율로 수정, 혹은 Grid에서 조절
      />
    </cpu_gauge>
  );
}

function Memory_gauge() {
  const sys_mem_used_pct = 0.932 * 100;
  return (
    <memory_gauge>
      <h4>Memory Usage Gauge</h4>
      <Gauge
        value={sys_mem_used_pct}
        startAngle={-110}
        endAngle={110}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 20,
            transform: "translate(0px, 0px)",
          },
        }}
        text={({ value }) => `${value}%`}
        style={{ height: "150px" }} //비율로 수정, 혹은 Grid에서 조절
        ranges={[
          { value: 0, label: "Low", color: "#FF5722" }, // 0 이하: 빨간색
          { value: 50, label: "Medium", color: "#FFEB3B" }, // 0부터 50까지: 노란색
          { value: 100, label: "High", color: "#4CAF50" }, // 50부터 100까지: 초록색
        ]}
      />
    </memory_gauge>
  );
}

function Load_gauge() {
  //게이지 범위 조정
  const sys_load_5 = 2.5;
  return (
    <load_gauge>
      <h4>Load Gauge</h4>
      <Gauge
        value={sys_load_5}
        startAngle={-110}
        endAngle={110}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 20,
            transform: "translate(0px, 0px)",
          },
        }}
        text={({ value }) => `${value}%`}
        style={{ height: "150px" }} //비율로 수정, 혹은 Grid에서 조절
      />
    </load_gauge>
  );
}

function In_traffic() {
  const in_traffic = 29.7;
  const in_tot_transferred = 43.4;
  return (
    <in_traffic>
      <h4>Inbound Traffic</h4>
      <div className="text-box">
        <h4>Inbound Traffic</h4>
        <h1>{in_traffic}KB/s</h1>
        <h5>Total Transferred {in_tot_transferred}MB</h5>
      </div>
    </in_traffic>
  );
}

function Out_traffic() {
  const out_traffic = 3.1;
  const out_tot_transferred = 1.1;
  return (
    <out_traffic>
      <h4>Out Traffic</h4>
      <div className="text-box">
        <h4>Outbound Traffic</h4>
        <h1>{out_traffic}KB/s</h1>
        <h5>Total Transferred {out_tot_transferred}MB</h5>
      </div>
    </out_traffic>
  );
}

function Packetloss() {
  const packet_loss = 0;
  const out_packetloss = 5401;
  return (
    <packetloss>
      <h4>Packetloss</h4>
      <div className="text-box">
        <h4>In Packetloss</h4>
        <h1>{packet_loss}</h1>
        <h5>Out Packetloss {out_packetloss}</h5>
      </div>
    </packetloss>
  );
}

function Swap_usage() {
  const sys_swap_pct = 58.3;
  return (
    <swap_usage>
      <h4>Swap Usage</h4>
      <Gauge
        value={sys_swap_pct}
        startAngle={-110}
        endAngle={110}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 20,
            transform: "translate(0px, 0px)",
          },
        }}
        text={({ value }) => `${value}%`}
        style={{ height: "150px" }} //비율로 수정, 혹은 Grid에서 조절
      />
    </swap_usage>
  );
}

function Memory_tot() {
  const mem_usage = 14.9;
  const tot_memory = 16;
  return (
    <memory_tot>
      <h4>Memory Udage vs Total </h4>
      <div className="text-box">
        <h4>Memory Usage</h4>
        <h1>{mem_usage}GB</h1>
        <h5>Total Memory {tot_memory}GB</h5>
      </div>
    </memory_tot>
  );
}

function Process_num() {
  const num_process = 35;
  return (
    <process_num>
      <h4>Number of Processes</h4>
      <div>
        <p style={{ fontSize: "50px", fontWeight: "800" }}>{num_process}</p>
        <h5>Processes</h5>
      </div>
    </process_num>
  );
}

function Disk_used() {
  const fsstat_used = 764737406464;
  const fsstat_total = 2967881852416;
  const d_used = ((fsstat_used / fsstat_total) * 100).toFixed(3);
  return (
    <disk_used>
      <h4>Disk Used</h4>
      <Gauge
        value={d_used}
        startAngle={-110}
        endAngle={110}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 20,
            transform: "translate(0px, 0px)",
          },
        }}
        text={({ value }) => `${value}%`}
        style={{ height: "150px" }} //비율로 수정, 혹은 Grid에서 조절
      />
    </disk_used>
  );
}

function Disk_usage() {
  return (
    <disk_usage>
      <h4>Disk Usage</h4>
    </disk_usage>
  );
}

function CPU_usage() {
  return (
    <cpu_usage>
      <h4>CPU Usage</h4>
    </cpu_usage>
  );
}

function System_load() {
  return (
    <system_load>
      <h4>System Load</h4>
    </system_load>
  );
}

function Memory_usage() {
  return (
    <memory_usage>
      <h4>Memory Usage</h4>
    </memory_usage>
  );
}

function Disk_IO() {
  return (
    <disk_io>
      <h4>Disk IO (Bytes)</h4>
    </disk_io>
  );
}

function Network_traffic_p() {
  return (
    <net_traffic_p>
      <h4>Network Traffic (Packets)</h4>
    </net_traffic_p>
  );
}

function Network_traffic_b() {
  return (
    <net_traffic_b>
      <h4>Network Traffic (Bytes)</h4>
    </net_traffic_b>
  );
}

function Process_by_m() {
  return (
    <process_by_m>
      <h4>Processes By Memory</h4>
    </process_by_m>
  );
}

function Top_process() {
  return (
    <top_process>
      <h4>Top Processes By CPU</h4>
    </top_process>
  );
}

function If_in_traffic() {
  return (
    <if_in_traffic>
      <h4>Interfaces by Incoming traffic</h4>
    </if_in_traffic>
  );
}

function If_out_traffic() {
  return (
    <if_out_traffic>
      <h4>Interfaces by Outgoing traffic</h4>
    </if_out_traffic>
  );
}

function Footer() {
  return (
    <footer>
      <h1>Direa</h1>
    </footer>
  );
}

function App() {
  return (
    <Container>
      <Header></Header>
      <Container>
        <Grid container>
          <Grid item xs="2" style={{ border: "1px solid gray" }}>
            <CPU_gauge></CPU_gauge>
          </Grid>
          <Grid item xs="2" style={{ border: "1px solid gray" }}>
            <Memory_gauge></Memory_gauge>
          </Grid>
          <Grid item xs="2" style={{ border: "1px solid gray" }}>
            <Load_gauge></Load_gauge>
          </Grid>
          <Grid item xs="2" style={{ border: "1px solid gray" }}>
            <In_traffic></In_traffic>
          </Grid>
          <Grid item xs="2" style={{ border: "1px solid gray" }}>
            <Out_traffic></Out_traffic>
          </Grid>
          <Grid item xs="2" style={{ border: "1px solid gray" }}>
            <Packetloss></Packetloss>
          </Grid>
          <Grid item xs="2" style={{ border: "1px solid gray" }}>
            <Swap_usage></Swap_usage>
          </Grid>
          <Grid item xs="2" style={{ border: "1px solid gray" }}>
            <Memory_tot></Memory_tot>
          </Grid>
          <Grid item xs="2" style={{ border: "1px solid gray" }}>
            <Process_num></Process_num>
          </Grid>
          <Grid item xs="2" style={{ border: "1px solid gray" }}>
            <Disk_used></Disk_used>
          </Grid>
          <Grid item xs="4" style={{ border: "1px solid gray" }}>
            <Disk_usage></Disk_usage>
          </Grid>
          <Grid item xs="6" style={{ border: "1px solid gray" }}>
            <CPU_usage></CPU_usage>
          </Grid>
          <Grid item xs="6" style={{ border: "1px solid gray" }}>
            <System_load></System_load>
          </Grid>
          <Grid item xs="6" style={{ border: "1px solid gray" }}>
            <Memory_usage></Memory_usage>
          </Grid>
          <Grid item xs="6" style={{ border: "1px solid gray" }}>
            <Disk_IO></Disk_IO>
          </Grid>
          <Grid item xs="6" style={{ border: "1px solid gray" }}>
            <Network_traffic_p></Network_traffic_p>
          </Grid>
          <Grid item xs="6" style={{ border: "1px solid gray" }}>
            <Network_traffic_b></Network_traffic_b>
          </Grid>
          <Grid item xs="6" style={{ border: "1px solid gray" }}>
            <Process_by_m></Process_by_m>
          </Grid>
          <Grid item xs="6" style={{ border: "1px solid gray" }}>
            <Top_process></Top_process>
          </Grid>
          <Grid item xs="6" style={{ border: "1px solid gray" }}>
            <CPU_usage></CPU_usage>
          </Grid>
          <Grid item xs="6" style={{ border: "1px solid gray" }}>
            <CPU_usage></CPU_usage>
          </Grid>
        </Grid>
      </Container>
      <Footer></Footer>
    </Container>
  );
}

export default App;
