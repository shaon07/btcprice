import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import { ButtonGroup } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { Chart, registerables } from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
import moment from "moment";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
Chart.register(...registerables,zoomPlugin);

const MainChart = ({ func }) => {
  //   const [price, setPrice] = useState([]);
  const dataInfo = useSelector((state) => state.getBitcounReducer);
  let infos = [];
  let times = [];

  //   console.log(dataInfo.info.length);
  for (let i = 0; i <= 200 - 1; i++) {
    // setPrice([...price,dataInfo.info[i].high])
    const datas = dataInfo.info.length === 0 ? "empty" : dataInfo.info[i].high;
    infos.unshift(parseInt(datas));
    const timesInfo =
      dataInfo.info.length === 0
        ? "empty"
        : moment(dataInfo.info[i].date).format("LT");
    times.unshift(timesInfo);
  }
  //   console.log(dataInfo.info.length!==0 ? dataInfo.info[0].high : "empty");

  //   dataInfo.info.map(item=>item ?setPrice([...price,item.high]):"empty")
  //   const stepsSize = 100;

  console.log(infos);
  const data = {
    labels: times,
    datasets: [
      {
        data: [...infos],
        backgroundColor: "white",
        fill: true,
        pointBackgroundColor: "black",
        showLine: true,

        borderColor: "blue",
        borderWidth: 2,
        tension: 0,
        borderJoinStyle: "meter",
      },
    ],
  };
  const zoomOptions = {
    
    pan: {
      enabled: true,
      mode: 'xy',
    },
    zoom: {
      wheel: {
        enabled: true,
      },
      pinch: {
        enabled: true
      },
      mode: 'xy',
      onZoomComplete({chart}) {
        // This update is needed to display up to date zoom level in the title.
        // Without this, previous zoom level is displayed.
        // The reason is: title uses the same beforeUpdate hook, and is evaluated before zoom.
        chart.update('none');
      }
    }
  };

  const options = {
    scales: {
      y: {
        ticks: {
          display: false,
          stepSize: 50,
          //   min:15000,
          //   max:23000,
          color: "red",
          beginAtZero: true,
        },

        grid: {
          display: false,
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      zoom: zoomOptions,
      legend: {
        display: false,
      },
      tooltip: {
        yAlign: "bottom",
        displayColors: false,
        titleFont: {
          weight: "bold",
        },
        padding: 20,
        bodyFontSize: 40,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  return (
    <div className="chartBody">
      <div className="topHeading">
        <span> </span>
        <Button
          variant="contained"
          sx={{ fontWeight: "bold" }}
          startIcon={<CurrencyBitcoinIcon />}
        >
          Bitcoin -{" "}
          <span>
            <h3> {infos[infos.length - 1]} USD</h3>
          </span>
        </Button>
      </div>
      {!dataInfo.loading ? (
        <>
          <div className="btnSec">
            {/* <select value="Select value" id="">
                <option value="shaon">
                <Button onClick={() => func("1min")}>1 Min</Button>
                </option>
                <option value="shaon">
                <Button onClick={() => func("5min")}>5 Min</Button>
                </option>
                <option value="shaon">
                <Button onClick={() => func("15min")}>15 Min</Button>
                </option>
                <option value="shaon">
                <Button onClick={() => func("30min")}>30 Min</Button>
                </option>
                <option value="shaon">
                <Button onClick={() => func("1hour")}>1 Hour</Button>
                </option>
                <option value="shaon">
                <Button onClick={() => func("4hour")}>4 Hour</Button>
                </option>
            </select> */}
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
            >
              <Button onClick={() => func("1min")}>1 Min</Button>
              <Button onClick={() => func("5min")}>5 Min</Button>
              <Button onClick={() => func("15min")}>15 Min</Button>
              <Button onClick={() => func("30min")}>30 Min</Button>
              <Button onClick={() => func("1hour")}>1 Hour</Button>
              <Button onClick={() => func("4hour")}>4 Hour</Button>
              <Button onClick={() => func("4hour")}>All</Button>
            </ButtonGroup>
          </div>
          <div className="lineCharts">
            <Line data={data} options={options} />
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "1rem 0",
              flexDirection: "column-reverse",
              alignItems: "center",
            }}
          >
            <h2>Loading....</h2>
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </div>
        </>
      )}
    </div>
  );
};

export default MainChart;
