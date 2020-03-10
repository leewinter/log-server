let myChart;
// Document ready
$(document).ready(function() {
  let ctx = document.getElementById('myChart');
  myChart = new Chart(ctx, {
docker image     type: 'horizontalBar',
    data: {
      labels: allLogLevels,
      datasets: [
        // {
        //   label: 'Total #',
        //   data: [],
        //   backgroundColor: ['#6c757d', '#17a2b8', '#ffc107', '#dc3545'],
        //   borderColor: ['#6b737b', '#117888', '#b38600', '#981b27'],
        //   borderWidth: 1
        // }
      ]
    },
    options: {
      scales: {
        xAxes: [{ stacked: true }],
        yAxes: [
          {
            stacked: true,
            ticks: {
              beginAtZero: true
            }
          }
        ]
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });
});

var dynamicColors = function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = 255;
  return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.7 + ')';
};

const createDataset = (label, type) => {
  const dataset = {
    label: label,
    data: [],
    backgroundColor: dynamicColors(),
    borderWidth: 1,
    opacity: 0.3
    // type: type
  };
  return dataset;
};

const getDataset = (label, type = 'bar') => {
  let dataset = myChart.data.datasets.find(data => data.label === label);
  if (dataset) {
    // Clear data as we are about to update
    dataset.data = [];
    return dataset;
  } else {
    return createDataset(label, type);
  }
};

const pushDataToGraph = data => {
  const groupedByLevel = _.chain(data)
    .groupBy('level')
    .map((value, key) => ({ level: key, logs: value }))
    .value();

  const groupedByApi = _.chain(data)
    .groupBy('sourceApi')
    .map((value, key) => ({ sourceApi: key, logs: value }))
    .value();

  // let graphData = [...groupedByApi.map(api => getDataset(`${api.sourceApi} Total`)), getDataset('Total #')];
  let graphData = [...groupedByApi.map(api => getDataset(`${api.sourceApi} Total`))];
  allLogLevels.forEach(logLevel => {
    const matchingMessages = groupedByLevel.find(group => group.level === logLevel);
    const logLevelTotal = matchingMessages ? matchingMessages.logs.length : 0;

    // let apiGraphData = [{sourceApi: groupedByApi.map(api=>api.sourceApi), data: []}];
    groupedByApi.forEach(api => {
      const matchingApiMessages = api.logs.filter(message => message.level === logLevel);
      const apiLogLevelTotal = matchingApiMessages ? matchingApiMessages.length : 0;
      graphData.find(n => n.label === `${api.sourceApi} Total`).data.push(apiLogLevelTotal);
    });

    //graphData.find(n => n.label === 'Total #').data.push(logLevelTotal);
  });

  myChart.data.datasets = graphData;
  myChart.update();
};
