function renderChart(ctx, options, type) {
    switch(type) {
        case "line":
            console.log(`Rendered ${type} chart`);
            return new Chart(ctx, options);
            break;
        default:
            return null;
    }
}
function reinitializePieChart() {
    $("#pie-chart-in-table").removeClass("hide");

    var adept = window.counts.adept;
    var detective = window.counts.detective;
    var slowDetective = window.counts.slowDetective;
    var failed = window.counts.failed;
    
    var config = {
            type: 'pie',
            data: {
                datasets: [{
                    data: [
                        adept/(adept+detective+slowDetective+failed),
                        detective/(adept+detective+slowDetective+failed),
                        slowDetective/(adept+detective+slowDetective+failed),
                        failed/(adept+detective+slowDetective+failed)
                    ],
                    backgroundColor: [
                        "green",
                        "lightgreen",
                        "orange",
                        "red"
                    ],
                    label: 'Dataset 1'
                }],
                labels: [
                    "Adept",
                    "Detective",
                    "Slow Detective",
                    "Failed"
                ]
            },
            options: {
                events: [],
                responsive: true,
                legend: {
                    display: false
                },
                animation: {
                    animateScale: false,
                    animateRotate: false
                },
                tooltips: {enabled: false},
                hover: {mode: null}
            }
    };
    
        var ctx = document.getElementById('pie-area').getContext('2d');
        window.myPie = new Chart(ctx, config);
        window.myPie.update();
    } // reinitializePieChart
    
    // $(reinitializePieChart);