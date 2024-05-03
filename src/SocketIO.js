import { useEffect, useState } from "react";
import io from "socket.io-client";

const useMetricbeatData = () => {
  const [mbData, setMbData] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("MetricbeatData", (data) => {
      console.log("Received Metricbeat data: ", data);
      setMbData(data);
    });

    //component unmount시 socket 연결 해제
    return () => {
      socket.off("MetricbeatData");
      socket.close();
    };
  }, []);

  return mbData;
};

export default useMetricbeatData;
