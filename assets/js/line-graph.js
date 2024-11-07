$(function() {

    var ctx = document.getElementById("myChart").getContext('2d'),
        
        settings = {
            type: 'line',
            data: {
                labels: [""],
                datasets: [
                    {
                        label: `Logged mental work per ticked ${idealMentalWorkPerXMins__Den} mins (Should grow)`,
                        fontSize: 4,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: green,
                        borderColor: green,
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: green,
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: green,
                        pointHoverBorderColor: green,
                        pointHoverBorderWidth: 2,
                        pointRadius: 0,
                        pointHitRadius: 10,
                        intersect: true,
                        data: [1, 1],
                        borderWidth: 1
                    },
                    {
                        label: `Cumulative mw per cumulative ticked ${idealMentalWorkPerXMins__Den} mins (Max horizontal line)`, // drops if procrastinating
                        fontSize: 4, // not working though
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: blue,
                        borderColor: blue,
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: blue,
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: blue,
                        pointHoverBorderColor: blue,
                        pointHoverBorderWidth: 2,
                        pointRadius: 5,
                        pointHitRadius: 10,
                        data: [0],
                        borderWidth: 1
                    },
                    {
                        // This is at [2]
                        // label: `Ideal ${idealMentalWorkPerXMins__Numerator} mw per ticked ${idealMentalWorkPerXMins__Den} mins (Should be surpassed)`,
                        label: `Benchmark 50%`,
                        fontSize: 4,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: red,
                        borderColor: red,
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: red,
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: red,
                        pointHoverBorderColor: red,
                        pointHoverBorderWidth: 2,
                        pointRadius: 0,
                        pointHitRadius: 10,
                        data: [2, 2],
                        borderWidth: 1
                    },
                    {
                        // This is at [3]
                        // label: `Ideal ${idealMentalWorkPerXMins__Numerator} mw per ticked ${idealMentalWorkPerXMins__Den} mins (Should be surpassed)`,
                        label: `Benchmark 75%`,
                        fontSize: 4,
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: orange,
                        borderColor: orange,
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: orange,
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: orange,
                        pointHoverBorderColor: orange,
                        pointHoverBorderWidth: 2,
                        pointRadius: 0,
                        pointHitRadius: 10,
                        data: [3, 3],
                        borderWidth: 1
                    }
                ]
            }, // data
            options: {
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                    ticks: {
                        reverse: false
                    }
                }]
                }
            }
        };

    window.chart = renderChart(ctx, settings, "line");

    /* On updating:
    https://www.chartjs.org/docs/latest/developers/updates.html

    Line Graph:
    http://www.chartjs.org/docs/latest/charts/line.html
    */
});