async function getBankA() {
  const response = await fetch('http://localhost:8080/restapi/getDataA', {});
  const json = await response.json();
  console.log('Response: ', json);
  const t1 = JSON.stringify(json);
  const obj = JSON.parse(t1);
  return obj.Data;
}


async function init() {
  const tempA = await getBankA();

  Highcharts.chart('container', {

    title: {
      text: 'Exchage rate'
    },
    subtitle: {
      text: 'Source: internet'
    },
    yAxis: {
      title: {
        text: 'Money'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle'
    },
    xAxis: {
      type: 'datetime'
    },
    series: [{
      data: [{
        x: tempA[0].date,
        y: tempA[0].dollar.buy
      },
      {
        x: tempA[1].date,
        y: tempA[1].dollar.buy
      },
      {
        x: tempA[2].date,
        y: tempA[2].dollar.buy
      },
      {
        x: tempA[3].date,
        y: tempA[3].dollar.buy
      },
      {
        x: tempA[4].date,
        y: tempA[4].dollar.buy
      },
      {
        x: tempA[5].date,
        y: tempA[5].dollar.buy
      },
      {
        x: tempA[6].date,
        y: tempA[6].dollar.buy
      }]
    }],

    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  });
}
