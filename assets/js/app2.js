// Data tables:
// https://datatables.net/manual/installation

window.started = false;
window.maxCountsToDisplayOnGraph = 7;

// Globals
var blue = "rgba(0,100,255, .75)",
    green = "rgba(0,155,50, .5)",
    red = "rgba(175,0,0, .25)";

function mayNeedToStudyMore() {
// window.chart.chart.data.datasets[1].borderColor = "orange";
// window.chart.chart.data.datasets[1].backgroundColor = "orange";
$("#studyStateRecommendation").html('<small style="color:orange; font-weight:bold;">Study some more!</small>');
}

function needToStudyMore() {
// window.chart.chart.data.datasets[1].borderColor = "red";
// window.chart.chart.data.datasets[1].backgroundColor = "red";
$("#studyStateRecommendation").html('<small style="color:red; font-weight:bold;">Study much more!</small>');
}

function canStudyCurrentRate() {
// 	window.chart.chart.data.datasets[1].borderColor = "rgba(0,160,0,.5)";
// 	window.chart.chart.data.datasets[1].backgroundColor = "rgba(0,160,0,.5)";
$("#studyStateRecommendation").html("");
}
function allowOnly1234(event) {
    var key = event.key;
    switch(key) {
        case "1":
            break;
        case "2":
            break;
        case "3":
            break;
        case "4":
            break;
        default:
            event.preventDefault();
    }
}

// TODO
// $(function() {
// setInterval(function() {
//     var arr = []; 
    
//     $("#myTable .calc").each(function(i, cell) { 
//         var $cell = $(cell),
//             $row = $cell.closest("tr"), 
//             percent=parseFloat($cell.text().replace("[^a-zA-Z0-9]", ""));
        
//         // Keep a list of currently ordered percents and their rows
//         arr.push({$cell, $row, percent});
//     });

//     // Sort percents and their rows
//     var sortedArr = arr.slice(0).sort(function(a, b) { return a.percent < b.percent });

//     // Move rows on the table DOM to match the sorted percents and their rows
//     if( arr[0].percent!==sortedArr[0].percent || arr[1].percent!==sortedArr[1].percent ||  arr[2].percent!==sortedArr[2].percent ||  arr[3].percent!==sortedArr[3].percent ) {
//         $(sortedArr).each(function(i, rowData) {  
//             rowData.$row.detach(); 
//             $("#myTable").append(rowData.$row);
//         });
//     }
// }, 100);
// });

window.secsElapsed = 1;
window.counts = {
adept: 0,
detective: 0,
slowDetective: 0,
failed: 0
}
window.lastTotalCount = 0;
window.lastAvg = 0;
window.timerOn = false;
window.timerInst = null;

window.setOptions = function(idealMW, idealMinTicks, idealWarn, idealDang) {
window.idealMentalWorkPerXMins__Numerator = idealMW;
window.idealMentalWorkPerXMins__Den = idealMinTicks;
window.thresholdWarning_RateLessThanPerc = idealWarn;
window.thresholdDanger_RateLessThanPerc = idealDang;
}
// window.setOptions((3, 5, 3/4, 1/2);

console.log("You can use setOptions((3, 5, 3/4, 1/2);");

console.log("3,5: This sets the ideal mental work per ideal number of minutes. The mental work is points you get from classifying information by clicking 1, 2, 3, or 4. In this example, the ideals are 3 points of mental work for every 5 minutes.");

console.log("3/4,1/2: This sets when you get warned. 3/4 means that if your studying rate drops to below 3/4 of the ideal rate, then you'll get an orange warning. At 1/2 of the ideal rate, you'll get a red warning that you are studying way too slow.");

window.idealMentalWorkPerXMins__Numerator = 3;
window.idealMentalWorkPerXMins__Den = 5;
window.thresholdWarning_RateLessThanPerc = 3/4;
window.thresholdDanger_RateLessThanPerc = 1/2;

function startTimer() {
if(!window.timerOn) {

    window.timerInst = setInterval(function() { 
        const formatted = moment.utc(window.secsElapsed*1000).format('HH:mm:ss');
        $(".dom-elapsed-time").text(formatted);
        window.secsElapsed++;
    }, 1000);
    window.timerOn = true;
    $("#start-timer").addClass("btn-default").removeClass("btn-primary");
} else {
    clearInterval(window.timerInst);
    window.timerOn = false;
    $("#start-timer").removeClass("btn-default").addClass("btn-primary");
}
} // startTimer

function calcIDEALTickedAvg() {
//return window.idealMentalWorkPerXMins__Numerator / window.idealMentalWorkPerXMins__Den;

var mins = window.secsElapsed/60;
var wholeCumTickedMins = Math.floor(mins / window.idealMentalWorkPerXMins__Den) + window.idealMentalWorkPerXMins__Den;
var remainerCumTickedMins = mins%window.idealMentalWorkPerXMins__Den; // in case expanding math in the future
var cumTickedXMins = wholeCumTickedMins;

var numerator = window.idealMentalWorkPerXMins__Numerator * (wholeCumTickedMins/window.idealMentalWorkPerXMins__Den);

return numerator/cumTickedXMins;

}

function calcTickedAvg() {
var mins = window.secsElapsed/60;
var wholeCumTickedMins = Math.floor(mins / window.idealMentalWorkPerXMins__Den) + window.idealMentalWorkPerXMins__Den;
var remainerCumTickedMins = mins%window.idealMentalWorkPerXMins__Den; // in case expanding math in the future
var cumTickedXMins = wholeCumTickedMins;

return cumTickedXMins;
}

setInterval(function() {
window.needToUpdateChart = false;

var totalCount = window.counts.adept + window.counts.detective + window.counts.slowDetective + window.counts.failed;

// console.log("level1 :" +totalCount>0? window.counts.adept/totalCount : window.counts.adept);
// console.log("level2 :" +totalCount>0? window.counts.detective/totalCount : window.counts.detective);
// console.log("level3 :" +totalCount>0? window.counts.slowDetective/totalCount : window.counts.slowDetective);
// console.log("level4 :" +totalCount>0? window.counts.failed/totalCount : window.counts.failed);


let level1 = totalCount>0? window.counts.adept/totalCount : window.counts.adept;
let level2 = totalCount>0? window.counts.detective/totalCount : window.counts.detective;
let level3 = totalCount>0? window.counts.slowDetective/totalCount : window.counts.slowDetective;
let level4 = totalCount>0? window.counts.failed/totalCount : window.counts.failed;

level1f = (level1*100).toFixed(1);
level2f = (level2*100).toFixed(1);
level3f = (level3*100).toFixed(1);
level4f = (level4*100).toFixed(1);


$(".level1").text(level1f);
$(".level2").text(level2f);
$(".level3").text(level3f);
$(".level4").text(level4f);


$(".level1-row, .level2-row, .level3-row, .level4-row").removeClass("bold");
var arrLevels = [level1, level2, level3, level4];
var maxLevel = Math.max(...arrLevels);
var fIndex = arrLevels.indexOf(maxLevel)
var lIndex = arrLevels.lastIndexOf(maxLevel)
if(fIndex!==-1) {
    $(`.level${fIndex+1}-row`).addClass("bold");
}
if(lIndex!==-1) {
    $(`.level${lIndex+1}-row`).addClass("bold");

}




// Mental work rate:
//     const minElapsed = window.secsElapsed/60,
//            avg = Number.parseFloat( totalCount/minElapsed ).toPrecision(2);
//             avg = Number.parseFloat( totalCount/minElapsed ).toPrecision(2);
const avg = Number.parseFloat( totalCount/calcTickedAvg() ).toPrecision(2);

// Setting ideal to graph:
if(avg!==window.lastAvg) {
    
    // Plugin Constraint: Other lines must have the same number of data points to span the graph
    var arrIdeal = [],
    idealTickedAvg = calcIDEALTickedAvg();

    arrIdeal.push( idealTickedAvg ); // position 0

    window.chart.chart.data.datasets[0].data.forEach(function() { arrIdeal.push( idealTickedAvg ); });

    window.chart.chart.data.datasets[2].data = arrIdeal;

    // If cumulative is less than ideal
    if(totalCount/calcTickedAvg() < totalCount/calcTickedAvg() * window.thresholdWarning_RateLessThanPerc ) {
        mayNeedToStudyMore();
    } else if(totalCount/calcTickedAvg() < totalCount/calcTickedAvg() * window.thresholdDanger_RateLessThanPerc ) {
        needToStudyMore();
    } else {
        canStudyCurrentRate();
    }

    // console.log("a");
    needToUpdateChart = true;
}

var haveToUpdateHighestLoggedLine = false;

// Adding logged to graph:
if(totalCount!==window.lastTotalCount) {
    window.lastTotalCount = totalCount;
    window.lastAvg = avg;

    window.chart.chart.data.datasets[0].data.push(avg);
    window.chart.chart.data.labels.push("");

    if(totalCount>window.maxCountsToDisplayOnGraph) { // Too many points on the graph makes it compressed and difficult to read, so lets slice at >5 data points, for example
        window.chart.chart.data.datasets[0].data = window.chart.chart.data.datasets[0].data.slice(1);
        window.chart.chart.data.labels = window.chart.chart.data.labels.slice(1);
    }
    needToUpdateChart = true;
    haveToUpdateHighestLoggedLine = true;
    // console.log("c");
}

// Updating highest logged (so can compare to ideal ticked avg)
if(haveToUpdateHighestLoggedLine) {
    // Plugin Constraint: Other lines must have the same number of data points to span the graph
    var arrPersonalBest = [],
        personalBest = window.chart.chart.data.datasets[0].data [ window.chart.chart.data.datasets[0].data.length - 1 ];
    arrPersonalBest.push(personalBest); // position 0
    
    window.chart.chart.data.datasets[0].data.forEach(function() { arrPersonalBest.push(personalBest); });

    window.chart.chart.data.datasets[1].data = arrPersonalBest;
    // console.log("b");
    needToUpdateChart = true;
}

if(window.needToUpdateChart)
    window.chart.update();
// Updating mental work rate near chart:
//$("#mentalWorkRate").text(avg);
//asdf

}, 500); // changed to 1 second to remain real time with the mins of the chart. 
// Why: 100ms was causing tooltip to stuck once hovered

$(()=>{
    $("body").on("keyup", function(event) {
        switch(event.key) {
            case "1":
                if(!window.started) { $("#start-timer").click(); }
                window.counts.adept++;
                $("#recent-adept, #recent-detective, #recent-slow-detective, #recent-failed").removeClass("bold");
                $("#recent-adept").addClass("bold");
                reinitializePieChart();
                break;
            case "2":
                if(!window.started) { $("#start-timer").click(); }
                window.counts.detective++;
                $("#recent-adept, #recent-detective, #recent-slow-detective, #recent-failed").removeClass("bold");
                $("#recent-detective").addClass("bold");
                reinitializePieChart();
                break;
            case "3":
                if(!window.started) { $("#start-timer").click(); }
                window.counts.slowDetective++;
                $("#recent-adept, #recent-detective, #recent-slow-detective, #recent-failed").removeClass("bold");
                $("#recent-slow-detective").addClass("bold");
                reinitializePieChart();
                break;
            case "4":
                if(!window.started) { $("#start-timer").click(); }
                window.counts.failed++;
                $("#recent-adept, #recent-detective, #recent-slow-detective, #recent-failed").removeClass("bold");
                $("#recent-failed").addClass("bold");
                reinitializePieChart();
                break;
        }
    });
});
