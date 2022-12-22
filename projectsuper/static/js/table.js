
$(document).ready(function() {
    var socket = io('http://' + document.domain + ":"+ location.port );
    let value;
    Highcharts.setOptions({
        time: {
            /**
             * Use moment-timezone.js to return the timezone offset for individual
             * timestamps, used in the X axis labels and the tooltip header.
             */
            getTimezoneOffset: function (timestamp) {
                var zone = 'Asia/Ho_Chi_Minh',
                    timezoneOffset = -moment.tz(timestamp, zone).utcOffset();
    
                return timezoneOffset;
            }
        }
    });
    
  chart = new Highcharts.Chart({
    chart: {
        renderTo: 'Chart',
        defaultSeriesType: 'spline',
    },
    title: {
        text: 'Live Data Esp32-MPU6050-BH1750'
    },
    plotOptions: {
      series: {
          dataLabels: {
              //enabled: true,
             enabled:false,
              borderRadius: 2,
              y: -10,
              shape: 'callout'
          }
      }
  },
    xAxis: {
        type: 'datetime',
        title: {
            text: 'Real Time ',
        },
        labels: {
            format: '{value:%H:%M:%S}'
          },
        tickPixelInterval: 150,
        maxZoom: 20 * 1000
    },
    yAxis: {
        minPadding: 0.2,
        maxPadding: 0.2,
        title: {
            text: 'Value',
            margin: 80
        }

    },
  
    series: [{
        name: 'Lux data',
        data: [] ,  
        tooltip: {
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} (lux)'
            },
    },
    {
      name: 'Ax',
      data: [],
      tooltip: {
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} (m/s²)'
            },
    },
    {
        name: 'Ay',
        data: [],
        tooltip: {
          pointFormat: '{point.x:%e. %b}: {point.y:.2f} (m/s²)'
              },
    },
    {
      name: 'Az',
      data: [],
      tooltip: {
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} (m/s²)'
            },
  },
  {
      name: 'Gx',
      data: [],
      tooltip: {
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} (rad/s)'
            },
  },
  {
      name: 'Gy',
      data: [],
      tooltip: {
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} (rad/s)'
            },
  },
  {
      name: 'Gz',
      data: [],
      tooltip: {
        pointFormat:'{point.x:%e. %b}: {point.y:.2f} (rad/s)'
            },
  },
  {
      name: 'T',
      data: [],
      tooltip: {
        pointFormat: '{point.x:%e. %b}: {point.y:.2f} ( °C )'
            },
  },],});

  
 

socket.on('mqtt_message', (data) => {
  m_value = JSON.parse(data.payload);
  var series = chart.series[0],
  shift = series.data.length > 20;

  // add the point
  chart.series[0].addPoint([new Date().getTime(), m_value[0]]);
  chart.series[1].addPoint([new Date().getTime(), m_value[1]]);
  chart.series[2].addPoint([new Date().getTime(), m_value[2]]);
  chart.series[3].addPoint([new Date().getTime(), m_value[3]]);
  chart.series[4].addPoint([new Date().getTime(), m_value[4]]);
  chart.series[5].addPoint([new Date().getTime(), m_value[5]]);
  chart.series[6].addPoint([new Date().getTime(), m_value[6]]);
  chart.series[7].addPoint([new Date().getTime(), m_value[7]]);
  if (series.data.length > 10) {
   // console.log(chart.userOptions.plotOptions.series.dataLabels.enabled)
    chart.userOptions.plotOptions.series.dataLabels.enabled = false;
  }

$(document).ready(function() {
  document.getElementById("topicchange").innerHTML=data.topic;
  document.getElementById("id-chip").innerHTML= m_value[9];
  document.getElementById("wifi").innerHTML= m_value[8];
 document.getElementById("lux").innerHTML = m_value[0].toFixed(2);
 document.getElementById("Ax").innerHTML = m_value[1].toFixed(2);
 document.getElementById("Ay").innerHTML = m_value[2].toFixed(2);
 document.getElementById("Az").innerHTML = m_value[3].toFixed(2);
 document.getElementById("Gx").innerHTML = m_value[4].toFixed(2);
 document.getElementById("Gy").innerHTML = m_value[5].toFixed(2);
 document.getElementById("Gz").innerHTML = m_value[6].toFixed(2);
 document.getElementById("T").innerHTML = m_value[7].toFixed(2);
}); 
});

document.getElementById('smart').addEventListener('click', function () {
    chart.setSize(400);
});
document.getElementById('large').addEventListener('click', function () {
    chart.setSize(600);
});

document.getElementById('auto').addEventListener('click', function () {
    chart.setSize(null);
});
});
