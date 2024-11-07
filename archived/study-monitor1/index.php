<html>
<head>
<title>Study Motiv</title>
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="HandheldFriendly" content="true">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous"/>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css" integrity="sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B" crossorigin="anonymous"/>

<script
  src="https://code.jquery.com/jquery-2.2.4.min.js"
  integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
  crossorigin="anonymous"></script>
<script src="assets/js/vendors/chart.js/dist/Chart.bundle.min.js"></script>


<link rel="stylesheet" href="assets/css/index.css"/>
<script src="assets/js/app.js"></script>
<script src="assets/js/line-graph.js"></script>
<script src="assets/js/pie.js"></script>

<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css">
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js"></script>

<script src="assets/js/vendors/moment/min/moment.min.js"></script>

</head>
<body>

<div class="container">
<h1 class="clickable" onclick='window.location.href = window.location.pathname'>Monitor Studying</h1>

<div class="halves">    
    <div class="half" style="text-align: center;">
        <div style="display:inline-block; border:1px solid gray; border-radius:5px; padding:10px; position:relative;">
            <span class="fa fa-question clickable" onclick='$("#instructions").toggleClass("hide");' style="margin-top:10px; position:absolute;  top:-.5rem; right:2.5px;"></span>
            <div class="dom-elapsed-time" style="display:inline-block; font-size: 2rem;">0:00:00</div><br/>
            <button id="start-timer" class="btn btn-primary" onclick='startTimer(); window.started=true;' style="display: inline-block; margin: 0 auto;">Start</button>
        </div>

        <textarea onkeydown="allowOnly1234(event);" placeholder="Mobile users, tap here for your keyboard to pull up so you can type 1-4. Or either way if you want a log, type here." style="width:80%; height: 3.5rem; border-radius:5px; border: 0 solid transparent; resize:none; font-size: .75rem; margin-top:10px;"></textarea>

    </div> <!-- half -->

    <div class="half" style="position: relative;">
        <canvas id="myChart"></canvas>
        <div id="studyStateRecommendation" style="position: absolute; right: 5px; bottom: 5px;"></div>
    </div>
</div>

<div class="halves">
    <div class="half">
        <table id="myTable" class="display" style="text-align:left;">
            <tr>
                <th colspan="3">Textbook vs memorizing facts</th>
            </tr>
            <tr class="adept">
                <th class="key"><span class="fa fa-keyboard"></span> 1</th>
                <th class="type">Fluid / Familiar</th>
                <td class="calc" id="recent-adept">0.0%</td>
            </tr>
            <tr class="detective">
                <th class="key"><span class="fa fa-keyboard"></span> 2</th>
                <th class="type">Analyze / Elaborate</th>
                <td class="calc" id="recent-detective">0.0%</td>
            </tr>
            <tr class="slowDetective">
                <th class="key"><span class="fa fa-keyboard"></span> 3</th>
                <th class="type">Exposure</th>
                <td class="calc" id="recent-slow-detective">0.0%</td>
            </tr>
            <tr class="failed">
                <th class="key"><span class="fa fa-keyboard"></span> 4</th>
                <th class="type">Research / Trust it</th>
                <td class="calc" id="recent-failed">0.0%</td>
            </tr>
            <tr id="pie-chart-in-table" class="hide">
                <td colspan="3" style="border: 1px solid black; width:100%;">
                    <canvas id="pie-area"></canvas>
                </td>
            </tr>
        </table>
    </div> <!-- half -->

    <div class="spacer" style="width:4rem; display:inline-block; width:100%;"></div>

    <div id="instructions" class="hide">
        <p><b>Instructions: </b>
        When you need to forcefeed information and you're being lazy about it, this tool will monitor if you are passing the ideal amount of studying. Use this tool to forcefeed info or know when to take breaks when your studying slows down. Please note this does not guarantee you will learn the material, just that you will get exposure to it. It's a first step in the door. Once you are focused on studying, then turn off this tool and re-read what you were forcefeeding.
        </p>
        <p>Press 1, 2, 3, 4 when you classify a piece of information by how much mental work you put in. One point system you can use is 1: There's mostly an automatic process to that type of thinking. 2: I had to use much working memory and thinking step by step. 3: I had to actively recall details and then think step by step. 4: I had to go out of my way to find other information and incorporate that to what I know. <i>2: Had to repeat information to have it stick and it feels like it will stick next time. 3: Had to repeat information to have it stick and it feels like it might stick next time because of a current mnemonic or flash cards. 4: It does not stick and is unlikely to stick again, will need some mnemonic or flash cards.</p>
    </div>


</div> <!-- container -->

</body>
</html>