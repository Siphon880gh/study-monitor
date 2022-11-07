<!DOCTYPE html>
<html lang="en">
  <head>
   <title>Study Monitor by Weng</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">

    <!-- jQuery and Bootstrap  -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
    <script src="assets/js/vendors/chart.js/dist/Chart.bundle.min.js"></script>

    <link rel="stylesheet" href="assets/css/index.css">
    <script src="assets/js/app.js"></script>    
    <script src="assets/js/app2.js"></script>    
    <script src="assets/js/pie.js"></script> 
    <script src="assets/js/line-graph.js"></script>

    <script>
    // Make draggable into positions
    $(function() {
        $("#cards").sortable({handle:".handle"}).disableSelection();
    })
    </script>

    <style>
    .box-part {
        position: relative;
    }
    .box-part .handle {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 5px;
        right: 5px;
        cursor: move;
        color: white;
        transition: border 200ms;
        opacity: 0.3;
    }
    .box-part .handle.active {
        border: 1px solid black;
        border-radius: 3px;
        background-color: lightgray;
    }
    </style>

    <script>
    $(function() {
        $(".box-part .handle").on("mouseenter", () => { console.log("in"); $(event.target).addClass("active"); })
                            .on("mouseleave", () => { console.log("out");  $(event.target).removeClass("active"); } );
    });
    </script>
    
</head>
<body>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-12" style="margin-left:15px;">
                <span onclick="window.location.href=window.location.href;" style="cursor:pointer; font-weight:bold; font-size:150%;">Study Monitor</span>
                <span>By Weng Fei Fung. Beat procrastination while studying. To encourage breaks, limit this to 1 hour use.</span>
            </div>
        </div>

        <div id="cards" class="row">
             <div class="box-part-wrapper col-lg-4 col-md-4 col-sm-4 col-xs-12">
                 <div class="box-part text-center">
                    <div class="handle"></div>
                     <div class="title">
                         <span>Countup</span><br/>
                         <span>Click to pause/resume. Right-click/tap hold to restart.</span>
                     </div>
                     <div class="text">
                         <span id="countup" class="active" data-seconds=0>00:00</span>
                     </div>
                  </div>
             </div>	 

             <script>
             $(function() {
                $("#countup")
                    .on("click", () => {
                        var $countup = $(event.target);
                        if($countup.hasClass("active"))
                            $countup.removeClass("active");
                        else
                            $countup.addClass("active");
                    })
                    .on("taphold contextmenu", () => {
                        var yes = confirm("Are you sure you want to RESTART the countup?");
                        if(yes) {
                            $("#countup").data("seconds", 0);
                        }
                        event.preventDefault();
                        event.stopPropagation();
                    });
                // init countup
                setInterval( ()=> {
                    if($("#countup").hasClass("active")) {
                        $("#countup").data("seconds", $("#countup").data("seconds")+1);
                        var seconds = $("#countup").data("seconds");
                        
                        $("#countup").text(secs2Timemark(seconds));
                    }
                }, 1000);

             });

             function secs2Timemark(seconds) {
                var mm = "", ss="";
                if(seconds<60) {
                    mm="00";
                    ss=seconds+"";
                    if(ss.length===1)
                        ss = "0" + ss;
                } else if(seconds>=60) {
                    mm = Math.floor(seconds/60)+"";
                    if(mm.length===1)
                        mm = "0" + mm;
                    
                    ss = Math.floor(seconds%60)+"";
                    if(ss.length===1)
                        ss = "0" + ss;
                }
                return `${mm}:${ss}`;
             } // secs2Timemark
             </script>
             
              <div class="box-part-wrapper col-lg-4 col-md-4 col-sm-4 col-xs-12">
                 <div class="box-part text-center">
                    <div class="handle"></div>
                     <div class="title">
                         <span>Credit</span><br/>
                         <span>Enter 1-4 separated with spaces.<!--<a href="#" onclick="infoPoints()" style="text-decoration:none; border-bottom: 0;">Point system</a>--></span>
                     </div>
                     
                     <div class="text">
                         <textarea id="credit" style="overflow-y: scroll; width:100%; font-size: 2vw" disabled></textarea>
                     </div>
                  </div>
             </div> <!-- Credit -->

            <script>
            function infoPoints() {
                var info = ``;
                alert(`
Point scheme:
                    1 = Easy and intuitive.
                    2 = Can follow thru internally.
                    3 = Need visual cues to follow thru.
                    4 = Even visual cues take a lot of sorting/categorizing/prioritizing. Some visual cues may be missed.
Alternate point scheme:
                    1 = Intuitive/fast
                    2 = Analysis
                    2 = Incorporate outside info
                    3 = Both analysis and incorporate
                    4=  Have to research and find unknowns
                `);
            }
            window.firstEverSuccessfulEntry = false;
            $(function() {
                $("html")
                    .on("keydown", (event) => {
                        if( ! event.key.toString().match(/[1-4]/)) {
                            event.preventDefault();
                            event.stopPropagation();
                        } else {
                            if(!window.firstEverSuccessfulEntry) {
                                window.firstEverSuccessfulEntry = true;
                                $("#credit").val(event.key);
                            } else {
                                $("#credit").val(event.key+","+$("#credit").val());
                            } // else
                            updateUserFreq();
                            updateAverage();
                        }
                    });
            })
            </script>

            <style>
                .fs-100 {
                    font-size:100%;
                }
                .hide {
                    display: none !important;
                }
            </style>

            <div class="box-part-wrapper col-lg-4 col-md-4 col-sm-4 col-xs-12">

                <div class="box-part switch switch1" style="text-align:left; background-color:white; display:inline-block;" onclick="$(`.switch`).addClass(`hide`); $(`.switch2`).removeClass(`hide`);">
                    <div>
                        <span class="fs-100">Textbook vs memorizing facts</span><br/>
                        <span class="fa fa-keyboard"></span> 1</th>
                        <span>Fluid / Familiar</span>
                        <span class='level level1'>0.0</span>
                    </div>
                    <div class="detective fs-100">
                        <span class="fa fa-keyboard"></span> 2</th>
                        <span>Analyze / Elaborate</span>
                        <span class='level level2'>0.0</span>
                    </div>
                    <div class="slowDetective fs-100">
                        <span class="fa fa-keyboard"></span> 3</th>
                        <span>Exposure</span>
                        <span class='level level3'>0.0</span>
                    </div>
                    <div class="failed fs-100">
                        <span class="fa fa-keyboard"></span> 4</th>
                        <span>Research / Trust it</span>
                        <span class='level level4'>0.0</span>
                    </div>
                </div> <!-- End a switch -->
                
                <div class="box-part switch switch2 hide" style="text-align:left; background-color:white; display:inline-block;" onclick="$(`.switch`).addClass(`hide`); $(`.switch3`).removeClass(`hide`);">
                    <div>
                        <span class="fs-100">Textbook vs memorizing facts</span><br/>
                        <span class="fa fa-keyboard"></span> 1</th>
                        <span>Intuitive/fast</span>
                        <span class='level level1'>0.0</span>
                    </div>
                    <div class="detective fs-100">
                        <span class="fa fa-keyboard"></span> 2</th>
                        <span>Analysis OR Incorporate outside info</span>
                        <span class='level level2'>0.0</span>
                    </div>
                    <div class="slowDetective fs-100">
                        <span class="fa fa-keyboard"></span> 3</th>
                        <span>Both analysis and incorporate</span>
                        <span class='level level3'>0.0</span>
                    </div>
                    <div class="failed fs-100">
                        <span class="fa fa-keyboard"></span> 4</th>
                        <span>Have to research and find unknowns</span>
                        <span class='level level4'>0.0</span>
                    </div>
                </div> <!-- End a switch -->

                <div class="box-part switch switch3 hide" style="text-align:left; background-color:white; display:inline-block;" onclick="$(`.switch`).addClass(`hide`); $(`.switch1`).removeClass(`hide`);">
                    <div>
                        <span class="fs-100">Textbook vs memorizing facts</span><br/>
                        <span class="fa fa-keyboard"></span> 1</th>
                        <span>Easy and intuitive</span>
                        <span class='level level1'>0.0</span>
                    </div>
                    <div class="detective fs-100">
                        <span class="fa fa-keyboard"></span> 2</th>
                        <span>Can follow thru internally.</span>
                        <span class='level level2'>0.0</span>
                    </div>
                    <div class="slowDetective fs-100">
                        <span class="fa fa-keyboard"></span> 3</th>
                        <span>Need visual cues to follow thru.</span>
                        <span class='level level3'>0.0</span>
                    </div>
                    <div class="failed fs-100">
                        <span class="fa fa-keyboard"></span> 4</th>
                        <span>Even visual cues take much sorting/categorizing/prioritizing. Some visual cues may be missed.</span>
                        <span class='level level4'>0.0</span>
                    </div>
                </div> <!-- End a switch -->




             </div> <!-- Ends Card Legend -->


             <div class="box-part-wrapper col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <span>Distribution</span>
                <div id="pie-chart-in-table" class="hide">
                    <canvas id="pie-area"></canvas>
                </div>
             </div> <!-- Pie Chart -->

             <div class="box-part-wrapper col-lg-4 col-md-4 col-sm-4 col-xs-12">
                <canvas id="myChart"></canvas>
                <div id="studyStateRecommendation" style="position: absolute; right: 5px; bottom: 5px;"></div>
             </div> <!-- Line Chart -->

             <div class="box-part-wrapper col-lg-4 col-md-4 col-sm-4 col-xs-12">
                
                <div class="box-part text-center">
                    
                    <div class="handle"></div>
                    <div class="title">
                        <span>Would Avg</span><br/>
                        <span>If you had taken credit now, 1 min later, or 5 mins later:</span>
                    </div>
                    
                    <table class="text would-avgs" style="width:100%;">
                        <thead>
                            <tr>
                                <th></th>
                                <th style="border: 1px solid gray;">Now</th>
                                <th style="border: 1px solid gray;">1m</th>
                                <th style="border: 1px solid gray; cursor:pointer;" onclick="toggle5Mins()">5m</th>

                                <script>
                                function toggle5Mins() {
                                    var $el = $(event.target);
                                    if($el.text()==="5mins") {
                                        var secs = $("#countup").data("seconds");
                                        secs+=300;
                                        $el.text(secs2Timemark(secs));
                                        setTimeout(()=>{ $el.text("5mins"); }, 3000);
                                    } else {
                                        $el.text("5mins");
                                    }
                                }
                                </script>
                            </tr>
                        </thead>
                        <tbody style="border: 1px solid gray;">
                            <tr>
                                <td style="border: 1px solid gray;">+1pt</td>
                                <td style="border: 1px solid gray;" id="would-avg-1"></td>
                                <td style="border: 1px solid gray;" id="would-avg-1-later"></td>
                                <td style="border: 1px solid gray;" id="would-avg-1-muchlater"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid gray;">+2pt</td>
                                <td style="border: 1px solid gray;" id="would-avg-2"></td>
                                <td style="border: 1px solid gray;" id="would-avg-2-later"></td>
                                <td style="border: 1px solid gray;" id="would-avg-2-muchlater"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid gray;">+3pt</td>
                                <td style="border: 1px solid gray;" id="would-avg-3"></td>
                                <td style="border: 1px solid gray;" id="would-avg-3-later"></td>
                                <td style="border: 1px solid gray;" id="would-avg-3-muchlater"></td>
                            </tr>
                            <tr>
                                <td style="border: 1px solid gray;">+4pt</td>
                                <td style="border: 1px solid gray;" id="would-avg-4"></td>
                                <td style="border: 1px solid gray;" id="would-avg-4-later"></td>
                                <td style="border: 1px solid gray;" id="would-avg-4-muchlater"></td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>

                <script>
                $(function() {
                    setInterval(()=> {
                        function wouldCredit(credit, plusMins) {
                            var points =  $("#credit").val().split(" ").filter(el=>typeof parseInt(el)==="number" && el.length>0).map(el=>parseInt(el));
                            var mins = Math.floor($("#countup").data("seconds")/60);
                            if(mins===0) mins=1;

                            var total=0;
                            if(points.length) total = points.reduce( (total, part)=>total+=part );
                                
                            return ( (total+credit)/(mins+plusMins) ).toFixed(2); // returns avg
                        }


                        var prev=0, arr = $("#avg").text().split(" ").filter(el=>typeof parseFloat(el)==="number" && el.length>0).map(el=>parseFloat(el));
                        if(arr.length>0) 
                            prev=arr[arr.length-1];

                        // TODO: Refactor
                        var a=0, b=0, c=0;

                        $("#would-avg-1")
                            .text( wouldCredit(1, 0) )
                            .removeClass("text-lightred")
                            .addClass( wouldCredit(1, 0)<prev?"text-lightred":"" );
                        $("#would-avg-1-later")
                            .text( wouldCredit(1, 1) )
                            .removeClass("text-lightred")
                            .addClass( wouldCredit(1, 1)<prev?"text-lightred":"" );
                        $("#would-avg-1-muchlater")
                            .text( wouldCredit(1, 5) )
                            .removeClass("text-lightred")
                            .addClass( wouldCredit(1, 5)<prev?"text-lightred":"" );

                        $("#would-avg-2")
                            .text( wouldCredit(2, 0) )
                            .removeClass("text-lightred")
                            .addClass( wouldCredit(2, 0)<prev?"text-lightred":"" );
                        $("#would-avg-2-later")
                            .text( wouldCredit(2, 1) )
                            .removeClass("text-lightred")
                            .addClass( wouldCredit(2, 1)<prev?"text-lightred":"" );
                        $("#would-avg-2-muchlater")
                            .text( wouldCredit(2, 5) )
                            .removeClass("text-lightred")
                            .addClass( wouldCredit(2, 5)<prev?"text-lightred":"" );

                        $("#would-avg-3")
                            .text( wouldCredit(3, 0) )
                            .removeClass("text-lightred")
                            .addClass( wouldCredit(3, 0)<prev?"text-lightred":"" );
                        $("#would-avg-3-later")
                            .text( wouldCredit(3, 1) )
                            .removeClass("text-lightred")
                            .addClass( wouldCredit(3, 1)<prev?"text-lightred":"" );
                        $("#would-avg-3-muchlater")
                            .text( wouldCredit(3, 5) )
                            .removeClass("text-lightred")
                            .addClass( wouldCredit(3, 5)<prev?"text-lightred":"" );

                        $("#would-avg-4")
                            .text( wouldCredit(4, 0) )
                            .removeClass("text-lightred")
                            .addClass( wouldCredit(4, 0)<prev?"text-lightred":"" );
                        $("#would-avg-4-later")
                            .text( wouldCredit(4, 1) )
                            .removeClass("text-lightred")
                            .addClass( wouldCredit(4, 1)<prev?"text-lightred":"" );
                        $("#would-avg-4-muchlater")
                            .text( wouldCredit(4, 5) )
                            .removeClass("text-lightred")
                            .addClass( wouldCredit(4, 5)<prev?"text-lightred":"" );

                    }, 1000);
                });
                </script>

                <style>
                .would-avgs {
                    text-align: left !important;
                }
                .would-avgs, .would-avgs * { 
                    /* font-size:12px; */
                    padding: 5px;
                }
                </style>
            </div>	 <!-- End would average -->
             
              <div class="box-part-wrapper col-lg-4 col-md-4 col-sm-4 col-xs-12">
            
                 <div class="box-part text-center">
                     
                    <div class="handle"></div>
                     <div class="title">
                         <span>User Frequency</span>
                     </div>
                     
                     <div class="text">
                         <span id="use-freq"></span>
                     </div>
                     
                     
                     
                  </div>
             </div>	  <!-- Ends Card User Frequency -->

             <script>
             function updateUserFreq() {
                var freqs = $("#use-freq").text().split(","), // as array
                            currentTimemark = $("#countup").text(); // as string
                        var matched = freqs.find(function(foundTimemark) { // as boolean
                            return currentTimemark==foundTimemark; 
                        });

                        if(!matched)
                            $("#use-freq").append($("#countup").text() + ", ");
             }
             </script>
             
             <div class="box-part-wrapper col-lg-4 col-md-4 col-sm-4 col-xs-12">
            
                 <div class="box-part text-center">
                     
                    <div class="handle"></div>
                     <div class="title">
                         <span>Average</span><br/>
                         <span>Try to maintain or beat your usual average points/min.</span>
                     </div>
                     
                     <div class="text">
                         <span id="avg"></span>
                     </div>
                  </div>

                    <script>
                    function updateAverage() {
                        var mins = Math.floor($("#countup").data("seconds")/60);
                        if(mins===0)
                            mins=1;
                        var points = 0;

                        var total = $("#credit").val().split(" ").filter(el=>typeof parseInt(el)==="number" && el.length>0).map(el=>parseInt(el)).reduce( (total, part)=>total+=part );
                        var avg = (total/mins).toFixed(2);

                        var prev=0, arr = $("#avg").text().split(" ").filter(el=>typeof parseFloat(el)==="number" && el.length>0).map(el=>parseFloat(el));
                        if(arr.length>0)
                            prev=arr[arr.length-1];
                        
                        if(avg<prev) {
                            $("#avg .text-red, #avg .text-lightred").removeClass("text-red").removeClass("text-lightred").addClass("text-purple");
                            $("#avg").append(`<span class="text-red">${avg}</span> `);
                        } else {
                            $("#avg .text-red, #avg .text-purple").removeClass("text-red").removeClass("text-purple").addClass("text-lightred");
                            $("#avg").append(`<span>${avg}</span> `);
                        }
                    }
                    </script>

                    <style>
                    .text-red { color:red; }
                    .text-lightred { color:red; opacity:0.3; }
                    .text-purple { color:purple; }
                    </style>
             </div>
             
             
              <div class="box-part-wrapper col-lg-4 col-md-4 col-sm-4 col-xs-12">
            
                 <div class="box-part text-center">
                     
                    <div class="handle"></div>
                     <div class="title">
                         <span>Need Review</span><br/>
                         <span>Turns red when it's time you should review the User Frequency and Average to see if you are approaching your studying well or you need to take a small break. Click this card to reset the red color.</span>
                     </div>
                     
                     <div class="text">
                         <label for="review-time">Every Minutes</label>
                         <input id="review-time" type="number" min="0" style="width:100%; font-size: 2vw" />
                     </div>
                     
                  </div>

                  <script>
                    $(function() {
                        $("#review-time").closest(".box-part").on("click", () => {
                            if($(event.target).hasClass("need-review"))
                                $(event.target).removeClass("need-review");
                        });
                        setInterval(()=> {
                            var mins = Math.abs($("#review-time").val());
                            // Is it time yet? The first time
                            if($("#countup").data('seconds')<mins*60)
                                return;
                            if($("#countup").data('seconds')%(mins*60)==0)
                                $("#review-time").closest(".box-part").addClass("need-review");
                        }, 1000);

                        $(function() {
                            $('[data-toggle="tooltip"]').tooltip();
                        });
                    });
                  </script>
             </div>	 
     
     </div> <!-- .row -->
    </div> <!-- /.container -->

    <script>
    console.log(`Test the user interaction by changing the timer seconds with:\n$("#countup").data("seconds", 1000);`);
    </script>

    <!-- Bootstrap JS -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6SpejspanU02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    
    <!-- Font-Awesome -->
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">

    <!-- jQuery mobile for taphold -->
    <script src="assets/js/vendors/jquery.mobile.custom/jquery.mobile.custom.min.js"></script>
    
    <!-- jQuery UI -->
    <script
        src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
        integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
        crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"></script>
        

</body>
</html>