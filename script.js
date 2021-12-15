
let count = 0;

const data = {
      labels: [],
      datasets: []
    };

const conf = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Number of Employees in Thousands'
        }
      }
    }
  };

const Ssector = {
    "0000": "Total nonfarm",
    "0500": "Total private",
    "0600": "Goods-producing",
    "0700": "Service-providing",
    "0800": "Private service-providing",
    "1000": "Mining and logging",
    "2000": "Construction",
    "3000": "Manufacturing",
    "3100": "Durable Goods",
    "3200": "Nondurable Goods",
    "4000": "Trade, transportation, and utilities",
    "4142": "Wholesale trade",
    "4200": "Retail trade",
    "4300": "Transportation and warehousing",
    "4422": "Utilities",
    "5000": "Information",
    "5500": "Financial activities",
    "6000": "Professional and business services",
    "6500": "Education and health services",
    "7000": "Leisure and hospitality",
    "8000": "Other services",
    "9000": "Government"
};
let SsectorKeys = Object.keys(Ssector);


const CHART_COLORS = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)',
    pink: 'rgb(235, 77, 216)',
    lightblue: 'rgb(2, 15, 115)',
    brown: 'rgb(69, 30, 31)',
    turquoise: 'rgb(147, 237, 231)',
    black: 'rgb(0, 0, 0)',
    limegreen: 'rgb(18, 224, 11)',
    violet: 'rgb(89, 11, 224)',
    creamsicle: 'rgb(245, 163, 56)',
    magenta: 'rgb(245, 56, 210)',
    light_yellow: 'rgb(247, 243, 104)',
    darkorange: 'rgb(212, 92, 0)',
    lavender: 'rgb(202, 144, 252)',
    lightgrey: 'rgb(99, 96, 99)',
    darkgreen: 'rgb(27, 77, 35)',
    darkblue: 'rgb(29, 23, 143)'
    };
let CHART_COLORS_KEYS = Object.keys(CHART_COLORS);
 
const CHART_COLORS_50_Percent = {
    red: 'rgba(255, 99, 132, 0.5)',
    orange: 'rgba(255, 159, 64, 0.5)',
    yellow: 'rgba(255, 205, 86, 0.5)',
    green: 'rgba(75, 192, 192, 0.5)',
    blue: 'rgba(54, 162, 235, 0.5)',
    purple: 'rgba(153, 102, 255, 0.5)',
    grey: 'rgba(201, 203, 207, 0.5)',
    pink: 'rgba(235, 77, 216, 0.5)',
    lightblue: 'rgba(2, 15, 115, 0.5)',
    brown: 'rgba(69, 30, 31, 0.5)',
    turquoise: 'rgba(147, 237, 231, 0.5)',
    black: 'rgba(0, 0, 0, 0.5)',
    limegreen: 'rgba(18, 224, 11, 0.5)',
    violet: 'rgba(89, 11, 224, 0.5)',
    creamsicle: 'rgba(245, 163, 56, 0.5)',
    magenta: 'rgba(245, 56, 210, 0.5)',
    light_yellow: 'rgba(247, 243, 104, 0.5)',
    darkorange: 'rgba(212, 92, 0, 0.5)',
    lavender: 'rgba(202, 144, 252, 0.5)',
    lightgrey: 'rgba(99, 96, 99, 0.5)',
    darkgreen: 'rgba(27, 77, 35, 0.5)',
    darkblue: 'rgba(29, 23, 143, 0.5)'
    };
let CHART_COLORS_50_Percent_KEY = Object.keys(CHART_COLORS_50_Percent);

let flag = false;
function responseHandler() {
    if (this.status == 200) {
      let dataArray = this.response.Results.series[0].data;
 let seriesID = this.response.Results.series[0].seriesID;
      let sectorline = {
        label: "",
        data:[],
        borderColor: "",
        backgroundColor: "",
        hidden:true
        }

sectorline.label = (Ssector[seriesID.substring(3,7)]);
sectorline.borderColor = (CHART_COLORS_KEYS[count]);
sectorline.backgroundColor = (CHART_COLORS_50_Percent_KEY[count]);

if(flag == false){
 for (let i = dataArray.length -1; i >= 0; i--) {
    data.labels.push(dataArray[i].periodName + " " + dataArray[i].year);
    flag = true;
    }
  }

for(let i = dataArray.length -1; i >= 0; i--) {
  sectorline.data.push(dataArray[i].value);
    }

data.datasets.push(sectorline);
count++

    console.log(this.response);
    }else {
    console.log ("error");
    }
}


const myChart = new Chart(
    document.getElementById('myChart'),
      conf);


for (i = 0; i < SsectorKeys.length; i++){

    let call = new XMLHttpRequest()
      call.addEventListener("load", responseHandler);

    let x = "https://api.bls.gov/publicAPI/v2/timeseries/data/CEU";
    let y = "000001?registrationkey=b691556fb89246b7a9cc7b1cb92bb891";

    call.open("GET", x + SsectorKeys[i] + y);
    call.responseType = "json";
    call.send();
    }
