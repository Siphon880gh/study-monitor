/*!
 * RAPID TOOLS SUITE
 * A collection of frontend and mysql tools to shorten development time. Layouts with placeholders, lorem ipsum, and a command line Bootstrap layouter. Discover specifications while making quick layouts and emulating mysql queries to the database. Write code faster with controllers attached to elements. Collaborate better using tooltips and narration.
 * By Weng Fei Fung
 *
 * The Lorem Ipsum code is open source under GNU Lesser General Public License. It is forked from fkadeveloper's LoremJS. I removed data-lorem attribute in favor for  
 * class name. The class name takes inspiration from Bootstrap because you can indicate the quantity and type (word/sentence/paragraph) as part of the class name.
 * You must be explicit about the type.
 *
 * All other portions of the code in this JS file is licensed under Apache License to Weng Fei Fung. 
 * You may alter the code in this file but alterations must carry prominent notices stating that 
 * You changed the files or code where they occured.
 *
 * Requires jQuery, Jquery UI, Handlebars, Bootstrap
 * - jQuery for general functions, jQuery migrate for Chrome debugging functions (if using), Query UI for draggable Bootstrap status and draggable styled ihtml box, Bootstrap css for Bootstrap features, Bootstrap js for detailed tooltips, and Handlebars for handlebars
 * Date: 2015-04-28 T16:19Z
 * Version: 2
 */


/*     
*	ENGINE
*   ------------------------------------------------------------------------------------------ 
*/
    //E-1. Expose object
    if(typeof Rapid=='undefined') var Rapid = {};

    //D-2. Internal states, helpers, aliases
    $.extend(true, Rapid, {
        i: function() {
            console.info("Rapid.i: Shortened many interactive commands for faster typing.\nAvailable commands: options, toStaticCSS, preset, mod, lastID, ihtml, handlebars, ajax, db, serverListen, Chain, simpleChain \n");
            
            window.options = function() {
                return Rapid.options.apply(this, arguments);
            };
            window.toStaticCSS = function() {
                return Rapid.bootstrap.toStaticCSS.apply(this, arguments);
            };
            window.addHelp = function() {
                return Rapid.bootstrap.addHelp.apply(this, arguments);
            };
            window.preset = function() {
                return Rapid.bootstrap.preset.apply(this, arguments);
            };
            window.mod = function() {
                return Rapid.bootstrap.mod.apply(this, arguments);
            };
            window.lastID = function() {
                return Rapid.bootstrap.lastID.apply(this, arguments);
            };
            window.ihtml = function() {
                return Rapid.ihtml.apply(this, arguments);
            };
            window.handlebars = function() {
                return Rapid.handlebars.apply(this, arguments);
            };
            window.ajax = function() {
                return Rapid.ajax.apply(this, arguments);
            };
            window.db = function() {
                return Rapid.mysql.db.apply(this, arguments);
            };
            window.serverListen = function() {
                return Rapid.serverListen.apply(this, arguments);
            };
            window.Chain = function() {
                return Rapid.mysql.Chain.apply(this, arguments);
            };
            window.simpleChain = function() {
                return Rapid.mysql.simpleChain.apply(this, arguments);  
            };
        }, // i for shortening interactive commands
        constants: { // internal use only
            phpEmulate: "phpEmulate", 
            bootstrapAddContainer: '<div id="" class="container" style="" data-rapid-target></div>',
            bootstrapAddWell: '<div id="" class=well" style="" data-rapid-target></div>',
            bootstrapAddRow: '<div id="" class="row" style="" data-rapid-target></div>',
            bootstrapAddCol: '<div id="" class="col-md-1" style="" data-rapid-target></div>',
            bootstrapAddColXs: '<div id="" class="col-xs-1" style="" data-rapid-target></div>',
            bootstrapAddColSm: '<div id="" class="col-sm-1" style="" data-rapid-target></div>',
            bootstrapAddColMd: '<div id="" class="col-md-1" style="" data-rapid-target></div>',
            bootstrapAddColLg: '<div id="" class="col-lg-1" style="" data-rapid-target></div>',
            bootstrapAddSpecol: '<div id="" class="$_SPECOL_$" style="" data-rapid-target></div>',
            itrEnum: -1
        }
    }); // extend

    //D-3. Expose options to user
    Rapid.options = function(obj) { 
        if(typeof Rapid=="undefined") console.error("Rapid: Please set options on DOM ready or windows loaded. Options ignored.");
        var script = "";
        $.extend(true, Rapid, obj);
            
        for (var key in obj) {
            if(key=="stories")
                script+="initSM(); ";
            else if(key=="bootstrap")
                script+="initB(); ";
        } // for
        if(script.length>0) eval(script);
    }; // options

/*     
*	MAINTENANCE: 
*       - Enums
*       - Reverse engineer styles going up or down
*   ------------------------------------------------------------------------------------------ 
*/
    $.extend(true, Rapid,
        {
            Enum: {
                new: function() {
                    return ++Rapid.constants.itrEnum;
                },
                last: function() {
                    return Rapid.constants.itrEnum;
                }
            },
            // Reverse Engineer, eg. after a few months from a project:
            cssUp: function($DOM, cssProps, levels) {

                // Default parameter
                if(typeof levels=="undefined")
                    levels=1; // dont go up pass one parent
            
                // Assure $DOM
                var $DOM = $( $DOM ),
                    wrapped = {$currentDOM: $DOM}, // the for loop can't reset variables inside an object
                    arr = [];
            
                // Assure one $DOM
                if($DOM.length>1) {
                    console.log("Error: You must pass one DOM. Do not pass more than one.")
                    return;
                }
            
                // If user passed an array of CSS props
                if(cssProps.constructor.name==="Array") { //123
                    if(cssProps.length==0) return; //[]
                    var cssProp = cssProps[0]; //1
                    Rapid2.cssUp($DOM, cssProps.slice(1), levels); //23
                    // console.log(cssProps.slice(1));
                } else { // not an array
                    var cssProp = cssProps; // user passed 1 prop
                }
            
                for(var i=0; i<levels; i++) {
                    if(!wrapped.$currentDOM.length) // because it could still go to an invisible parent if no query result
                        break;
            
                    arr.push({"$first": $DOM,
                             "$current": wrapped.$currentDOM, 
                             "cssKey": cssProp, 
                             "cssValue": wrapped.$currentDOM.css(cssProp)});
            
                    if(wrapped.$currentDOM.is("html")) // because it could go all the way up to document level which would crash
                        break;
            
                    wrapped.$currentDOM = wrapped.$currentDOM.parent(); // I put it in an object wrapper because for loop keeps resetting the value
                }; // for
            
                console.log(arr);
            }, // cssUp
            cssDown: function($DOM, cssProps, rule) {  // rule is CSS value that may have mathematical expression or reg exp expression
                // Assure $DOM
                var $DOM = $( $DOM );
            
                // Assure one $DOM
                if($DOM.length>1) {
                    console.log("Error: You must pass one DOM. Do not pass more than one.")
                    return;
                }
            
                // If user passed an array of CSS props
                if(cssProps.constructor.name==="Array") { //123
                    if(cssProps.length==0) return; //[]
                    var cssProp = cssProps[0]; //1
                    Rapid2.cssDown($DOM, cssProps.slice(1)); //23
                    // console.log(cssProps.slice(1));
                } else { // not an array
                    var cssProp = cssProps; // user passed 1 prop
                }
            
                // Assure $DOM and its children
                var $DOMs = $DOM.add( $DOM.find("*") );
                
                var arr = [];
            
                //Assure computed space to convert human readable colors to rgb or rgba values, so we can parse "rgb" for color rules 
                if($("#rapid-findCSS-computed").length===0) $("body").append($('<template id="rapid-findCSS-computed"></template>')); 
                var $computedSpace = $("#rapid-findCSS-computed");
                
                $DOMs.each(function() { 
                    var matched = false, 
                        current_css_value = $(this).css(cssProp);
                        
                    if(typeof rule === "undefined") {
                        // If the developer doesn't want any criteria, then just show the CSS values of all the children DOM and itself
                        matched = true;
                    } else if(isColorRule = ( "" + window.getComputedStyle($computedSpace.css(cssProp, rule)[0], null).getPropertyValue(cssProp) ).indexOf("rgb")!==-1) {
                        var computed_current_css_value = window.getComputedStyle($computedSpace.css(cssProp, current_css_value)[0], null).getPropertyValue(cssProp);
                        var computed_rule = window.getComputedStyle($computedSpace.css(cssProp, rule)[0], null).getPropertyValue(cssProp);
                        matched = matchExact(computed_rule, computed_current_css_value); 
                    }
                    else if(isRegExpRule = rule instanceof RegExp) 
                        matched = matchRegExp(rule, current_css_value); 
                    else if (rule.match(">=")!==null | rule.match("<=")!==null | rule.match(">")!==null | rule.match("<")!==null) 
                        matched = matchMathExp(rule, current_css_value); // number expression?
                    else {
                        matched = matchExact(rule, current_css_value); 
                        //matched = matchRegExp(new RegExp(rule, "g"), current_css_value);
                    }
            
                    if(matched) arr.push({"$first": $DOM, 
                                            "$current": $(this), 
                                            "rule": rule, 
                                            "cssKey": cssProp, 
                                            "cssValue": current_css_value});
                }); // each $DOM
            
                console.log(arr);
            
                function matchExact(exact_css_value, current_css_value) {
                    return current_css_value.indexOf(exact_css_value) === 0; 
                }
                function matchRegExp(regExp_rule, current_css_value) { 
                    // console.log(`
                    //     return current_css_value.match(regExp_rule) !== null; 
                    // `);
                    // debugger;
            
                    return current_css_value.match(regExp_rule) !== null; 
                } 
                
                function matchMathExp(mathExp_rule, current_css_value) { 
                    if( isNaN(parseInt(current_css_value)) ) 
                        return false; 
                    else 
                        return eval(parseInt(current_css_value) + " " + mathExp_rule); // eg. eval(1>2); where 1 is the DOM's CSS value and 2 is the math expression rule passed
                }
            
            } // cssDown
        }
    );


/*     
*	MODULAR
*   ------------------------------------------------------------------------------------------ 
*/
    $.extend(true, Rapid, {
        modularCache: false, // for controllers
    }); // extend

    //S-2. Controllers
    var countScript=-1, countAsync=-1, elAsync = []; // next script
    var always=0, alwaysMax=0; // $.get(...).always(...)
    function initM() {
        var scripts = [], scripts2 = [];
        //window.scripts = scripts;
        //Rapid.watchArr("window.scripts", true);
        
        //onload-src and onload attributes without a letter is assigned to "a":
        $("[data-onload-src]").each(function() { 
            $(this).attr("data-onload-src-a", $(this).attr("data-onload-src")); 
            $(this).removeAttr("data-onload-src"); 
        });
        $("[data-onload]").each(function() { 
            $(this).attr("data-onload-a", $(this).attr("data-onload")); 
            $(this).removeAttr("data-onload"); 
        });
        
        //A:
        $("[data-onload-src-a]").each(function() {
            if(typeof $(this).attr("data-async-id")!='undefined') return;
            filename=$(this).data("onload-src-a");
            alwaysMax++;
            elAsync.push($(this));
            $.get(filename+(Rapid.cache?"?v="+$.now():""), function(data) { 
                countAsync = ++countAsync;
                elAsync[countAsync].attr("data-async-id", countAsync); 
                data = data.replace(new RegExp("\\)[\s\n\r ]*\\{"), ') {\nvar ori=$("[data-async-id=' + countAsync + ']");\n');
                scripts.push('\nvar ori = $("[data-async-id=' + countAsync + ']");\n'+data);
                always++;
                }, "text");
        });
        $("[data-onload-a]").each(function() {
            if(typeof $(this).attr("data-script-id")!='undefined') return;
            code=$(this).data("onload-a");
            countScript++;
            $(this).attr("data-script-id", countScript);
            code = code.replace(new RegExp("\\)[\s\n\r ]*\\{"), ') {\nvar ori=$("[data-script-id=' + countScript + ']");\n');
            scripts.push('\nvar ori = $("[data-script-id=' + countScript + ']");\n'+code);
        });

        
        //B:
        $("[data-onload-src-b]").each(function() {
            if(typeof $(this).attr("data-async-id")!='undefined') return;
            filename=$(this).data("onload-src-b");
            alwaysMax++;
            elAsync.push($(this));
            $.get(filename+(Rapid.cache?"?v="+$.now():""), function(data) { 
                countAsync = ++countAsync;
                elAsync[countAsync].attr("data-async-id", countAsync);  
                data = data.replace(new RegExp("\\)[\s\n\r ]*\\{"), ') {\nvar ori=$("[data-async-id=' + countAsync + ']");\n');
                scripts.push('\nvar ori = $("[data-async-id=' + countAsync + ']");\n'+data);
                always++;
                }, "text");
        });
        $("[data-onload-b]").each(function() {
            if(typeof $(this).attr("data-script-id")!='undefined') return;
            code=$(this).data("onload-b");
            countScript++;
            $(this).attr("data-script-id", countScript);
            code = code.replace(new RegExp("\\)[\s\n\r ]*\\{"), ') {\nvar ori=$("[data-script-id=' + countScript + ']");\n');
            scripts.push('\nvar ori = $("[data-script-id=' + countScript + ']");\n'+code);
        });

        
        //C:
        $("[data-onload-src-c]").each(function() {
            if(typeof $(this).attr("data-async-id")!='undefined') return;
            filename=$(this).data("onload-src-c");
            alwaysMax++;
            elAsync.push($(this));
            $.get(filename+(Rapid.cache?"?v="+$.now():""), function(data) { 
                countAsync = ++countAsync;
                elAsync[countAsync].attr("data-async-id", countAsync);  
                data = data.replace(new RegExp("\\)[\s\n\r ]*\\{"), ') {\nvar ori=$("[data-async-id=' + countAsync + ']");\n');
                scripts.push('\nvar ori = $("[data-async-id=' + countAsync + ']");\n'+data);
                always++;
                }, "text");
        });
        $("[data-onload-c]").each(function() {
            if(typeof $(this).attr("data-script-id")!='undefined') return;
            code=$(this).data("onload-c");
            countScript++;
            $(this).attr("data-script-id", countScript);
            code = code.replace(new RegExp("\\)[\s\n\r ]*\\{"), ') {\nvar ori=$("[data-script-id=' + countScript + ']");\n');
            scripts.push('\nvar ori = $("[data-script-id=' + countScript + ']");\n'+code);
        });

        
        //D:
        $("[data-onload-src-d]").each(function() {
            if(typeof $(this).attr("data-async-id")!='undefined') return;
            filename=$(this).data("onload-src-d");
            alwaysMax++;
            elAsync.push($(this));
            $.get(filename+(Rapid.cache?"?v="+$.now():""), function(data) { 
                countAsync = ++countAsync;
                elAsync[countAsync].attr("data-async-id", countAsync);  
                data = data.replace(new RegExp("\\)[\s\n\r ]*\\{"), ') {\nvar ori=$("[data-async-id=' + countAsync + ']");\n');
                scripts.push('\nvar ori = $("[data-async-id=' + countAsync + ']");\n'+data);
                always++;
                }, "text");
        });
        $("[data-onload-d]").each(function() {
            if(typeof $(this).attr("data-script-id")!='undefined') return;
            code=$(this).data("onload-d");
            countScript++;
            $(this).attr("data-script-id", countScript);
            code = code.replace(new RegExp("\\)[\s\n\r ]*\\{"), ') {\nvar ori=$("[data-script-id=' + countScript + ']");\n');
            scripts.push('\nvar ori = $("[data-script-id=' + countScript + ']");\n'+code);
        });
                            
        //S-3. Jquery has deprecated async, so let's mock async:
        var intvI = setInterval(function() {
            if(always==alwaysMax) {
                var str="";
                $.each(scripts, function(i, v) { str+=v; });
                $('<script>' + str + '</script>').appendTo("head");
                //console.dir(scripts);
                //console.log("Running I");
                clearInterval(intvI);
                scripts=[];
            }
            }, 1);
        
        //S-4. The onclick, data-onclick, data-onclick-src:
        
        //Desc: Keep ori use consistent in onclick too
        $("[onclick]").each(function() {
            $(this).attr("onclick", "var ori = $(this); " + $(this).attr("onclick"));
        });
        
        //Desc: Keep data- convention consistent. May interchangeably use onclick or data-onclick
        $("[data-onclick]").each(function() {
            $(this).attr("onclick", "var ori = $(this); " + $(this).attr("data-onclick"));
            $(this).removeAttr("data-onclick");
        });
         
        //Desc: data-onclick-src refers to external script
        $("[data-onclick-src]").each(function() {
            if(typeof $(this).attr("data-async-id")!='undefined') return;
            filename=$(this).data("onclick-src");
            alwaysMax++;
            elAsync.push($(this));
            $.get(filename+(Rapid.cache?"?v="+$.now():""), function(data) {
                countAsync = ++countAsync;
                elAsync[countAsync].attr("data-async-id", countAsync); 
                //console.log(data);
                scripts2.push('\n$("[data-async-id=' + countAsync + ']").click(function() {\nvar ori=$("[data-async-id=' + countAsync + ']");\n' + data + '});');
                always++;
            }, "text");
        });  
        
        var intvJ = setInterval(function() {
            if(always==alwaysMax) {
                var str="";
                $.each(scripts2, function(i, v) { str+=v; });
                $('<script>' + str + '</script>').appendTo("head");
                //console.log("Running J");
                //console.dir(scripts2);
                clearInterval(intvJ);
                scripts2=[];
            }
            }, 1); 
        
    } //initM


/**
* CHROME DEBUGGER ENHANCED
* Monitor for changes in Javascript Objects, Javascript Object Keys, HTML attributes,
* HTML5 data attributes, and HTML/text content.
* If you want to pause on changes like in a breakpoint, pass "true" to the monitoring
* function(s) and run the website with Chrome's DevTool opened (must be opened for
* the pauses to work). If you don't want pauses, skip that parameter or pass "false."
* ------------------------------------------------------------------------------------------
* Examples: 
*
*   var fooObj = {foo:13,baz:"42",bar:"33"};
*   var fooObj2 = {a:1, b:"2"};
*   Rapid.watchLit(var);
*   Rapid.watchObj("fooObj2");
*   Rapid.watchKey("fooObj", "baz");
*   Rapid.watchArr("arr");
*   Rapid.watchDOMOptions({subtree:false});
*   Rapid.watchDOM("#target");
*   Rapid.watchDOM("#target2", true);
*
* What could trigger alerts in the console:
*
*   foo.bar=30;   
*   $("#target").text("inserted");
*   $("#target").html("<b>changed</b>");
*   $("#target").data("attr","2");
*   $("#target2").data("attr","3");
*
*/

    //CD-1. Check if on Chrome
    /*
    if(typeof window.chrome !== "object" || !Object.observe) {
        $.extend(true, Rapid, {
                        watchLit: function() {
                            this.notCompatible();
                        },
                        watchObj: function() {
                            this.notCompatible();
                        }, // watchObj
                        watchKey: function() {
                            this.notCompatible();
                        }, // watchKey
                        watchArr: function() {
                            this.notComptible();
                        }, //watchArr
                        watchDOMOptions: function() {
                            this.notCompatible();
                        }, // watchDOM Options
                        watchDOM: function() {
                            this.notCompatible();
                        }, // watchDOM
                        assert: function() {
                            this.notCompatible();
                        }, // assert
                        notCompatible: function() {
                            console.error("Chrome Debugger Enhanced: Can't load. This feature only works on Chrome v36 and up.");
                        }
                    });
    } else {
    */

    //CD. assert and Assert
    $.extend(true, Rapid, {
        assert: function() {
            if(arguments.length==0) {
                    console.error("Rapid.assert: You must pass three parameters: value (mixed), comparison operator (string), and value (mixed). Optionally, pass a last parameter (string) that shows a message if the assertion fails.");
                return false;
            }
            console.assert(arguments[0], arguments.length>2&&arguments[2]==true?eval(arguments[1]):arguments[1]);
        }, // assert
        Assert: function(statement, settings) {

            if(arguments.length===0) { // User error. They called RapidAssert w/o passing an assertion
                console.log("%cRapid2.assert(statement, settings)", "font-style:italic");
                console.log("%cSettings are:", "font-style:italic");
                console.log({title:"", desc:"", functionPath:"", onPass:["print"], onFail:["trace","debugger"]});
                console.log("%cRequired are title and desc.\n\t-functionPath is the function you want to print as part of the description, similar to Function.toString(), runs when fails.\n\t-onPass and onFail takes in parameters to call when the assertion passes or fails. For example, you can print that a test passes, shows trace when it fails, or pauses when fails.", "font-style:italic")
                return;
            }
        
            if( typeof settings === 'undefined' )
                settings = {title:"", desc:"", onPass:[], onFail:[]};
            if( typeof settings.title==="undefined") settings.title="";
            if( typeof settings.desc==="undefined") settings.desc="";
            if( typeof settings.functionPath==="undefined") settings.functionPath="";
            if( typeof settings.onPass==="undefined") settings.onPass=[];
            if( typeof settings.onFail==="undefined") settings.onFail=[];
        
            var passed = Boolean(statement);
            if(passed) {
                printOnPass = typeof settings.onPass.find(el=>el==="print") !== "undefined";
            } else if(!passed) {
                traceOnFail = typeof settings.onFail.find(el=>el==="trace") !== "undefined";
                debugOnFail = typeof settings.onFail.find(el=>el==="debugger") !== "undefined";
            }
        
            if(passed) {
                if(printOnPass)
                    console.log("%cPassed " + settings.title + "\t", "color: green", {desc: settings.desc}, );
            }
        
            if(!passed)
                console.log("%cFailed on " + settings.title + "\n\t" + settings.desc + settings.functionPath, "color: red");
            if(!passed) {
                if(traceOnFail) {
                    //Error().stack
                    console.trace();
                }
                if(debugOnFail)
                    debugger;
            }
        
        } // Assert
    });
        
    //CD-2. Convenience function to get selector from object to pass to monitoring function(s)
    jQuery.fn.sSel = function () {
        var path, node = this;
        if (node.length > 1) node = node[0];
        if (node.length == 0) console.error("sSel: No node selected for getting string selector.");
        if (typeof node[0]!='undefined' && typeof node[0].id!='undefined') return "#" + node[0].id;
        while (node.length) {
            var realNode = node[0],
                name = realNode.localName;
            if (!name) break;
            name = name.toLowerCase();
            var parent = node.parent();
            var siblings = parent.children(name);
            if (siblings.length > 1) {
                name += ':eq(' + siblings.index(realNode) + ')';
            }
            path = name + (path ? '>' + path : '');
            node = parent;
        }
        return path;
    };

    //CD-3. Monitor changes in Javascript Object Keys
    console.watch = function(oObj, sProp) {
       sPrivateProp = "$_"+sProp+"_$"; // to minimize the name clash risk
       oObj[sPrivateProp] = oObj[sProp];

       // overwrite with accessor
       Object.defineProperty(oObj, sProp, {
           get: function () {
               return oObj[sPrivateProp];
           },

           set: function (value) {
                 Rapid.count++;
                 console.group("Observation " + Rapid.count);
                 var oldType = typeof oObj["$_" + sProp + "_$"];
                 var newType = typeof value;
                 console.log(oObj.$_name_$+" %cchanged:%c { \"" + sProp + "\" : " + (oldType==="number"?"":"\"") + oObj["$_" + sProp + "_$"] + (oldType==="number"?"":"\"") + " ➜ " + (newType==="number"?"":"\"") + value + (newType==="number"?"":"\"")  + " ..}","font-style:italic;","font-style:normal;", oObj);
             if(typeof oObj.$_debugger_pause_$!='undefined') { console.log("PAUSED"); debugger; }

                 console.groupEnd();
               oObj[sPrivateProp] = value;
           }
       });
    }

    //CD-4. Monitor changes in DOM
    //Changes caused by: $().text, $().html, $().attr
    var observer = new MutationObserver(function(mutations) {
        //console.log('OBSERVED', mutations);
        Rapid.count++;
        console.group('Observation ' + Rapid.count);
        mutations.forEach(function(mutation) {
            //console.dir(mutation.target);
            var extraInfo = ((typeof mutation.target.attributes!='undefined')&&(typeof mutation.target.attributes["data-debugger-path"]!='undefined')?mutation.target.attributes["data-debugger-path"]["value"]:"");
            var extraInfo2 = "";
            switch (mutation.type) {
                case "attributes":
                    extraInfo2 = "[" + mutation.attributeName + " = '" + mutation.oldValue + "'";
                    if(typeof mutation.target.attributes!='undefined' && typeof mutation.target.attributes[mutation.attributeName]!='undefined')
                        extraInfo2+=" ➜ '" + mutation.target.attributes[mutation.attributeName]["value"]+"']";
                    break;
                case "characterData":
                    extraInfo2 = "'" + mutation.oldValue + "' ➜ '" + mutation.target.data + "'";
                    break;
            } // switch
                    
            console.log('%s %cchanged:%c %s %s', mutation.target.nodeName.toLowerCase() + extraInfo,  'font-style:italic', 'font-style:normal', mutation.type, extraInfo2, mutation);
             if((typeof mutation.target.attributes!='undefined')&&(typeof mutation.target.attributes["data-debugger-pause"]!='undefined')) { console.log("PAUSED"); debugger; }
        });
        console.groupEnd();
    });

    //CD-5. Monitor changes in DOM's HTML5 data
    //Changes caused by: $().data
    (function($) {
        // maintain a reference to the existing function
        var oldfxn = $.fn.data;
        // ...before overwriting the jQuery extension point
        $.fn.data = function(key, val)
        {
            // original behavior - use function.apply to preserve context
            var ret = oldfxn.apply(this, arguments);
            $(this).attr("data-"+key,val);
            //console.dir(arguments);
            //$(this).attr("data-"+key,val);

            // preserve return value (probably the jQuery object...)
            return ret;
        };
    })(jQuery);
        
    //CD-6. Expose monitoring and assert methods to global scope 
    $.extend(true, Rapid, {
                    config: {childList: true, subtree: true, attributes: true, characterData: true, attributeOldValue: true, characterDataOldValue: true },
                    count: 0, // for observation number
                    arrCount: 0,
                    arrs: {}
                });
    $.extend(true, Rapid, {
                    watchObj: function(sObj) {
                        var oObj = {};
                        try {
                            oObj = eval(sObj);
                        } catch(e) {
                            console.error("Rapid.watchObj: The object passed to watchObj as a first parameter string cannot be found, most likely due to that object not being in the global scope because watchObj was implemented in global scope. You have two options. You can pass the object instead of the name of the object, wherein the console will show the name as [Object object] rather than its object name during reported changes. Or you can (1) create a global reference to that object and (2) make sure to pass the global string name (1. window.var=var; 2. Then pass \"window.var\")");
                            return;
                        }
                        if(arguments.length>1 && arguments[1]==true)
                            oObj.$_debugger_pause_$ = "T";
                        if(typeof sObj !== "string") oObj.$_name_$ = "[object Object]";
                        else oObj.$_name_$ = sObj;
                        //console.watch(oObj, sKey);
                        Object.observe(oObj, function(changes) {
                            //console.log('observed ' + changes.length + " changes:", changes);
                            
                            var isStr1 = false;
                            var isStr2 = false;
                            var extraInfo = "";
                            var longName = "";
                            if(typeof sObj==="string") {
                                //alert("string!");
                                longName = oObj.$_name_$; // may be window.foo
                                extraInfo = eval(longName + "." + changes[0]["name"])!=undefined?(eval(longName + "." + changes[0]["name"])):"";
                            } else { //
                                for(var key in oObj)
                                    if(key==changes[0]["name"])
                                        extraInfo = oObj[key];
                            }
                            
                            if(typeof changes[0]["oldValue"]!='undefined' && typeof changes[0]["oldValue"] === "string")
                                isStr1=true;
                            if(extraInfo.length>0 && typeof extraInfo === "string")
                                isStr2=true;

                            
                            if(changes[0].type=="delete")
                                console.log(oObj.$_name_$+" %cchanged:%c { \"" + changes[0]["name"] + "\" : (deleted) ..}", "font-style:italic;", "font-style:normal", changes, oObj);
                            else if(typeof changes[0]["oldValue"]!='undefined')
                                console.log(oObj.$_name_$+" %cchanged:%c { \"" + changes[0]["name"] + "\" : " + (isStr1?"\"":"") + changes[0]["oldValue"] + (isStr1?"\"":"") + " ➜ " + (isStr2?"\"":"") + extraInfo + (isStr2?"\"":"") + " ..}", "font-style:italic;", "font-style:normal", changes, oObj);
                            else
                                console.log(oObj.$_name_$+" %cchanged:%c { \"" + changes[0]["name"] + "\" : " + (isStr2?"\"":"") + extraInfo + (isStr2?"\"":"") + " ..}", "font-style:italic;", "font-style:normal", changes, oObj);
                            
                            
                            if(typeof oObj.$_debugger_pause_$!='undefined') { console.log("PAUSED"); debugger; }
                        }); // observe
                    } // watchObj
                });
    $.extend(true, Rapid, {
                    watchLit: function(lit) {
                        //TODO: keep track of variable name and value
                        //setInterval
                        //how to know when it's out of scope / undefined, to end it
                    },
                    watchKey: function(sObj, sKey) {
                        var oObj = {};
                        try {
                            oObj = eval(sObj);
                        } catch(e) {
                            console.error("Rapid.watchKey: The object passed to watchKey as a first parameter string cannot be found, most likely due to that object not being in the global scope because watchKey was implemented in global scope. You have two options. You can pass the object instead of the name of the object, wherein the console will show the name as [Object object] rather than its object name during reported changes. Or you can (1) create a global reference to that object and (2) make sure to pass the global string name (1. window.var=var; 2. Then pass \"window.var\")");
                            return;
                        }
                      if(arguments.length>2 && arguments[2]==true) oObj.$_debugger_pause_$ = "T";
                        if(typeof sObj !== "string") oObj.$_name_$ = "[object Object]";
                        else oObj.$_name_$ = sObj;
                        console.watch(oObj, sKey);
                    }, // watchKey
                    watchArr: function(sArr) {
                        var oArr = {};
                        try {
                            oArr = eval(sArr);
                        } catch(e) {
                            console.error("Rapid.watchArr: The array passed to watchArr as a first parameter string cannot be found, most likely due to that array not being in the global scope because watchArr was implemented in global scope. You have two options. You can pass the array instead of the name of the array, wherein the console will show the name as [Array array] rather than its array name during reported changes. Or you can (1) create a global reference to that array and (2) make sure to pass the global string name (1. window.arr=arr; 2. Then pass \"window.arr\")");
                            return;
                        }
                        Rapid.arrCount++;
                        if(typeof sArr !== "string") { eval('Rapid.arrs.arrN' + Rapid.arrCount + '="[Array array]";');
                                                     }
                        else {
                              var pause=false;
                              if (arguments.length>1)
                                    if(arguments[1]!=true && arguments[1]!=false)
                                        console.error("Rapid.watchArr is passed a second parameter that wasn't true or false.");
                              else pause=arguments[1];

                              var holderInfoArray = "Rapid.arrs.arrN" + Rapid.arrCount; // eg. Rapid.arrs.arrN0, etc
                              eval(holderInfoArray + '={}; ' + holderInfoArray + '.name="' + sArr + '";')
                              if(pause) eval(holderInfoArray + '.debuggerPause=""');
		                      //for a quick reminder, use this function at this point: console.dir(Rapid.arrs);
                        } // else
                        Array.observe(oArr, function(changes) {
                            Rapid.count++;
                            console.group("Observation " + Rapid.count);
                            console.log(eval("Rapid.arrs.arrN" + Rapid.arrCount) + " %cchanged:%c " + changes[0].type + " from i=" + changes[0].name + (changes[0].oldValue!==undefined?", value "+changes[0].oldValue:""), "font-style:italic;", "font-style:normal;", oArr);
                            if(eval("Rapid.arrs.arrN" + Rapid.arrCount + ".debuggerPause")!=undefined) { console.log("PAUSED"); debugger; }
                            console.groupEnd();
});
                    },
                    watchDOMOptions: function(oObj) {
                      $.extend( Rapid.config, oObj );
                      console.group("Observation Options");
                      console.log("Set: ", Rapid.config);
                      console.groupEnd();
                      //console.log(Rapid.config)
                    }, // watch Options
                    watchDOM: function() {
                      var sSel = arguments[0];
                      if(arguments.length>1 && arguments[1]==true) $(sSel).data("debugger-pause","T");
                      $(sSel).data("debugger-path", sSel);
                      try {
                        observer.observe(document.querySelector(sSel), this.config);
                      } catch(e) {
                        if(e.name=="NotFoundError")
                            console.error("Rapid.watchDOM: " + sSel + " not found! Either you misspelled or you started monitoring that element before the DOM is ready. Wrap your monitoring code in $(function() {..});, $(document).ready(function() {..});, or any variation for DOM Ready.");
                      }
                    } // watchDOM
                }); // extend
    //} // else is Chrome

    //CD-8 delayDebugger
    $.extend(true, Rapid, {
        delayDebugger: function(ms) {
            console.log("Will freeze in " + ms + "milliseconds.");
            setTimeout(function() { debugger; }, ms);
        }
    });


    //CD+. If you want to test monitoring functions, uncomment this block, view demo.php, and open Chrome Console:
    /*$(function() {
        var aa = {a:1, b:2};
        window.aa = aa;
        $("#demo").attr("attr","blahblah");
        Rapid.watchDOMOptions({subtree:true});
        Rapid.watchDOM("#demo", false);
        $("#demo").attr("attr","gahgah");
        Rapid.watchKey("window.aa", "a");
        aa.a=3;
    });*/

/**
* DESIGN UTILITIES: LOREM IPSUM
* Generate Lorem Ipsum words, sentences, or paragraphs easily.
* --------------------------------------------------------------------------------------------
* Best practices: 
*     E.g. For 20 words,  use class 'lorem-20w'
*     E.g. For 8 sentences, use class 'lorem-8s'
*     E.g. For 5 paragraphs, use class 'lorem-5p'
*
*/

function initL() {
    function rand_word() {
        return "";
        var s = Math.floor(Math.random() * 3) + 1,
            c = ['b', 'd', 'f', 'g', 'h', 'j', 'k', 'm', 'n', 'p', 'r', 's', 'sh', 't', 'ts', 'll', 'qu', 'sc', 'gr', 'en', 'ad', 'ip', 'am', 'eg', 'ph', 'al', 'el', 'urn', 'fr', 'rh', 'pr', 'ul', 'et', 'gn', 'er', 'ult', 'odo', 'oro', 'ti', 'l', 'v', 'w', 'z', 'tr', 'ch', 'bl', 'pl', 'cr'],
            v = ['a', 'e', 'i', 'o', 'u', 'au', 'ou', 'ae', 'us', 'ui'],
            i = 0,
            str = '';
        while (i < s) {
            str += c[Math.floor(Math.random() * (c.length - 1))] + v[Math.floor(Math.random() * (v.length - 1))];
            i++;
        }
        return str + (Math.random() * 10 < 3 ? c[Math.floor(Math.random() * (c.length - 1))] : '');
    } // rand_word

    (function() {
    var Lorem = function() {
        this.type = null;
        this.jqObj = null;
    };
    Lorem.TYPE = {
        PARAGRAPH: 1,
        SENTENCE: 2,
        WORD: 3
    };
    Lorem.WORDS = [
        "lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipiscing", "elit", "ut", "aliquam,", "purus", "sit", "amet", "luctus", "venenatis,", "lectus", "magna", "fringilla", "urna,", "porttitor", "rhoncus", "dolor", "purus", "non", "enim", "praesent", "elementum", "facilisis", "leo,", "vel", "fringilla", "est", "ullamcorper", "eget", "nulla", "facilisi", "etiam", "dignissim", "diam", "quis", "enim", "lobortis", "scelerisque", "fermentum", "dui", "faucibus", "in", "ornare", "quam", "viverra", "orci", "sagittis", "eu", "volutpat", "odio", "facilisis", "mauris", "sit", "amet", "massa", "vitae", "tortor", "condimentum", "lacinia", "quis", "vel", "eros", "donec", "ac", "odio", "tempor", "orci", "dapibus", "ultrices", "in", "iaculis", "nunc", "sed", "augue", "lacus,", "viverra", "vitae", "congue", "eu,", "consequat", "ac", "felis", "donec", "et", "odio", "pellentesque", "diam", "volutpat", "commodo", "sed", "egestas", "egestas", "fringilla", "phasellus", "faucibus", "scelerisque", "eleifend", "donec", "pretium", "vulputate", "sapien", "nec", "sagittis", "aliquam", "malesuada", "bibendum", "arcu", "vitae", "elementum",
        "curabitur", "vitae", "nunc", "sed", "velit", "dignissim", "sodales", "ut", "eu", "sem", "integer", "vitae", "justo", "eget", "magna", "fermentum", "iaculis", "eu", "non", "diam", "phasellus", "vestibulum", "lorem", "sed", "risus", "ultricies", "tristique", "nulla", "aliquet", "enim", "tortor,", "at", "auctor", "urna", "nunc", "id", "cursus", "metus", "aliquam", "eleifend", "mi", "in", "nulla", "posuere", "sollicitudin", "aliquam", "ultrices", "sagittis", "orci,", "a", "scelerisque", "purus", "semper", "eget", "duis", "at", "tellus", "at", "urna", "condimentum", "mattis", "pellentesque", "id", "nibh", "tortor,", "id", "aliquet", "lectus", "proin", "nibh", "nisl,", "condimentum", "id", "venenatis", "a,", "condimentum", "vitae", "sapien", "pellentesque", "habitant", "morbi", "tristique", "senectus", "et", "netus", "et", "malesuada", "fames", "ac", "turpis", "egestas", "sed", "tempus,", "urna", "et", "pharetra", "pharetra,", "massa", "massa", "ultricies", "mi,", "quis", "hendrerit", "dolor", "magna", "eget", "est", "lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipiscing", "elit", "pellentesque", "habitant", "morbi", "tristique", "senectus", "et", "netus", "et", "malesuada", "fames", "ac", "turpis", "egestas", "integer", "eget", "aliquet", "nibh", "praesent", "tristique", "magna", "sit", "amet", "purus", "gravida", "quis", "blandit", "turpis", "cursus", "in", "hac", "habitasse", "platea", "dictumst", "quisque", "sagittis,", "purus", "sit", "amet", "volutpat", "consequat,", "mauris", "nunc", "congue", "nisi,", "vitae", "suscipit", "tellus", "mauris", "a", "diam",
        "maecenas", "sed", "enim", "ut", "sem", "viverra", "aliquet", "eget", "sit", "amet", "tellus", "cras", "adipiscing", "enim", "eu", "turpis", "egestas", "pretium", "aenean", "pharetra,", "magna", "ac", "placerat", "vestibulum,", "lectus", "mauris", "ultrices", "eros,", "in", "cursus", "turpis", "massa", "tincidunt", "dui", "ut", "ornare", "lectus", "sit", "amet", "est", "placerat", "in", "egestas", "erat", "imperdiet", "sed", "euismod", "nisi", "porta", "lorem", "mollis", "aliquam", "ut", "porttitor", "leo", "a", "diam", "sollicitudin", "tempor", "id", "eu", "nisl", "nunc", "mi", "ipsum,", "faucibus", "vitae", "aliquet", "nec,", "ullamcorper", "sit", "amet", "risus", "nullam", "eget", "felis", "eget", "nunc", "lobortis", "mattis", "aliquam", "faucibus", "purus", "in", "massa", "tempor", "nec", "feugiat", "nisl", "pretium", "fusce", "id", "velit", "ut", "tortor", "pretium", "viverra", "suspendisse", "potenti", "nullam", "ac", "tortor", "vitae", "purus", "faucibus", "ornare", "suspendisse", "sed", "nisi", "lacus,", "sed", "viverra", "tellus", "in", "hac", "habitasse", "platea", "dictumst", "vestibulum", "rhoncus", "est", "pellentesque", "elit", "ullamcorper", "dignissim", "cras", "tincidunt", "lobortis", "feugiat", "vivamus", "at", "augue", "eget", "arcu", "dictum", "varius", "duis", "at", "consectetur", "lorem",
        "donec", "massa", "sapien,", "faucibus", "et", "molestie", "ac,", "feugiat", "sed", "lectus", "vestibulum", "mattis", "ullamcorper", "velit", "sed", "ullamcorper", "morbi", "tincidunt", "ornare", "massa,", "eget", "egestas", "purus", "viverra", "accumsan", "in", "nisl", "nisi,", "scelerisque", "eu", "ultrices", "vitae,", "auctor", "eu", "augue", "ut", "lectus", "arcu,", "bibendum", "at", "varius", "vel,", "pharetra", "vel", "turpis", "nunc", "eget", "lorem", "dolor,", "sed", "viverra", "ipsum", "nunc", "aliquet", "bibendum", "enim,", "facilisis", "gravida", "neque", "convallis", "a", "cras", "semper", "auctor", "neque,", "vitae", "tempus", "quam", "pellentesque", "nec", "nam", "aliquam", "sem", "et", "tortor", "consequat", "id", "porta", "nibh", "venenatis", "cras", "sed", "felis", "eget", "velit", "aliquet", "sagittis", "id", "consectetur", "purus", "ut", "faucibus", "pulvinar", "elementum", "integer", "enim", "neque,", "volutpat", "ac", "tincidunt", "vitae,", "semper", "quis", "lectus", "nulla", "at", "volutpat", "diam", "ut", "venenatis", "tellus", "in", "metus", "vulputate", "eu", "scelerisque", "felis", "imperdiet", "proin", "fermentum", "leo", "vel", "orci", "porta", "non", "pulvinar", "neque", "laoreet", "suspendisse", "interdum", "consectetur", "libero,", "id", "faucibus", "nisl", "tincidunt", "eget", "nullam", "non", "nisi", "est,", "sit", "amet", "facilisis", "magna",
        "etiam", "tempor,", "orci", "eu", "lobortis", "elementum,", "nibh", "tellus", "molestie", "nunc,", "non", "blandit", "massa", "enim", "nec", "dui", "nunc", "mattis", "enim", "ut", "tellus", "elementum", "sagittis", "vitae", "et", "leo", "duis", "ut", "diam", "quam", "nulla", "porttitor", "massa", "id", "neque", "aliquam", "vestibulum", "morbi", "blandit", "cursus", "risus,", "at", "ultrices", "mi", "tempus", "imperdiet", "nulla", "malesuada", "pellentesque", "elit", "eget", "gravida", "cum", "sociis", "natoque", "penatibus", "et", "magnis", "dis", "parturient", "montes,", "nascetur", "ridiculus", "mus", "mauris", "vitae", "ultricies", "leo", "integer", "malesuada", "nunc", "vel", "risus", "commodo", "viverra", "maecenas", "accumsan,", "lacus", "vel", "facilisis", "volutpat,", "est", "velit", "egestas", "dui,", "id", "ornare", "arcu", "odio", "ut", "sem", "nulla", "pharetra", "diam", "sit", "amet", "nisl", "suscipit", "adipiscing", "bibendum", "est", "ultricies", "integer", "quis", "auctor", "elit",
        "sed", "vulputate", "mi", "sit", "amet", "mauris", "commodo", "quis", "imperdiet", "massa", "tincidunt", "nunc", "pulvinar", "sapien", "et", "ligula", "ullamcorper", "malesuada", "proin", "libero", "nunc,", "consequat", "interdum", "varius", "sit", "amet,", "mattis", "vulputate", "enim", "nulla", "aliquet", "porttitor", "lacus,", "luctus", "accumsan", "tortor", "posuere", "ac", "ut", "consequat", "semper", "viverra", "nam", "libero", "justo,", "laoreet", "sit", "amet", "cursus", "sit", "amet,", "dictum", "sit", "amet", "justo", "donec", "enim", "diam,", "vulputate", "ut", "pharetra", "sit", "amet,", "aliquam", "id", "diam", "maecenas", "ultricies", "mi", "eget", "mauris", "pharetra", "et", "ultrices", "neque", "ornare", "aenean", "euismod", "elementum", "nisi,", "quis", "eleifend", "quam", "adipiscing", "vitae", "proin", "sagittis,", "nisl", "rhoncus", "mattis", "rhoncus,", "urna", "neque", "viverra", "justo,", "nec", "ultrices", "dui", "sapien", "eget", "mi", "proin", "sed", "libero", "enim,", "sed", "faucibus", "turpis", "in", "eu", "mi", "bibendum", "neque", "egestas", "congue", "quisque", "egestas", "diam", "in", "arcu", "cursus", "euismod", "quis", "viverra", "nibh", "cras", "pulvinar", "mattis", "nunc,", "sed", "blandit", "libero", "volutpat", "sed", "cras", "ornare", "arcu", "dui", "vivamus", "arcu", "felis,", "bibendum", "ut", "tristique", "et,", "egestas", "quis", "ipsum", "suspendisse", "ultrices", "gravida", "dictum",
        "fusce", "ut", "placerat", "orci", "nulla", "pellentesque", "dignissim", "enim,", "sit", "amet", "venenatis", "urna", "cursus", "eget", "nunc", "scelerisque", "viverra", "mauris,", "in", "aliquam", "sem", "fringilla", "ut", "morbi", "tincidunt", "augue", "interdum", "velit", "euismod", "in", "pellentesque", "massa", "placerat", "duis", "ultricies", "lacus", "sed", "turpis", "tincidunt", "id", "aliquet", "risus", "feugiat", "in", "ante", "metus,", "dictum", "at", "tempor", "commodo,", "ullamcorper", "a", "lacus", "vestibulum", "sed", "arcu", "non", "odio", "euismod", "lacinia", "at", "quis", "risus", "sed", "vulputate", "odio", "ut", "enim", "blandit", "volutpat", "maecenas", "volutpat", "blandit", "aliquam", "etiam", "erat", "velit,", "scelerisque", "in", "dictum", "non,", "consectetur", "a", "erat", "nam", "at", "lectus", "urna", "duis", "convallis", "convallis", "tellus,", "id", "interdum", "velit", "laoreet", "id", "donec", "ultrices", "tincidunt", "arcu,", "non", "sodales", "neque", "sodales", "ut", "etiam", "sit", "amet", "nisl", "purus,", "in", "mollis", "nunc",
        "sed", "id", "semper", "risus", "in", "hendrerit", "gravida", "rutrum", "quisque", "non", "tellus", "orci,", "ac", "auctor", "augue", "mauris", "augue", "neque,", "gravida", "in", "fermentum", "et,", "sollicitudin", "ac", "orci", "phasellus", "egestas", "tellus", "rutrum", "tellus", "pellentesque", "eu", "tincidunt", "tortor", "aliquam", "nulla", "facilisi", "cras", "fermentum,", "odio", "eu", "feugiat", "pretium,", "nibh", "ipsum", "consequat", "nisl,", "vel", "pretium", "lectus", "quam", "id", "leo", "in", "vitae", "turpis", "massa", "sed", "elementum", "tempus", "egestas", "sed", "sed", "risus", "pretium", "quam", "vulputate", "dignissim", "suspendisse", "in", "est", "ante", "in", "nibh", "mauris,", "cursus", "mattis", "molestie", "a,", "iaculis", "at", "erat",
        "pellentesque", "adipiscing", "commodo", "elit,", "at", "imperdiet", "dui", "accumsan", "sit", "amet", "nulla", "facilisi", "morbi", "tempus", "iaculis", "urna,", "id", "volutpat", "lacus", "laoreet", "non", "curabitur", "gravida", "arcu", "ac", "tortor", "dignissim", "convallis", "aenean", "et", "tortor", "at", "risus", "viverra", "adipiscing", "at", "in", "tellus", "integer", "feugiat", "scelerisque", "varius", "morbi", "enim", "nunc,", "faucibus", "a", "pellentesque", "sit", "amet,", "porttitor", "eget", "dolor", "morbi", "non", "arcu", "risus,", "quis", "varius", "quam", "quisque", "id", "diam", "vel", "quam", "elementum", "pulvinar", "etiam", "non", "quam", "lacus", "suspendisse", "faucibus", "interdum", "posuere", "lorem", "ipsum", "dolor", "sit", "amet,", "consectetur", "adipiscing", "elit", "duis", "tristique", "sollicitudin", "nibh", "sit", "amet", "commodo", "nulla", "facilisi",
        "nullam", "vehicula", "ipsum", "a", "arcu", "cursus", "vitae", "congue", "mauris", "rhoncus", "aenean", "vel", "elit", "scelerisque", "mauris", "pellentesque", "pulvinar", "pellentesque", "habitant", "morbi", "tristique", "senectus", "et", "netus", "et", "malesuada", "fames", "ac", "turpis", "egestas", "maecenas", "pharetra", "convallis", "posuere", "morbi", "leo", "urna,", "molestie", "at", "elementum", "eu,", "facilisis", "sed", "odio", "morbi", "quis", "commodo", "odio", "aenean", "sed", "adipiscing", "diam", "donec", "adipiscing", "tristique", "risus", "nec", "feugiat", "in", "fermentum", "posuere", "urna", "nec", "tincidunt", "praesent", "semper", "feugiat", "nibh", "sed", "pulvinar", "proin", "gravida", "hendrerit", "lectus", "a", "molestie"
    ];
        function rand_word2() { return Lorem.WORDS[Math.floor(Math.random()*Lorem.WORDS.length)]; }
    var a = 0;
    while (a < 1272) {
        Lorem.WORDS.push(rand_word2());
        a++
    }
    Lorem.prototype.randomInt = function(c, b) {
        return Math.floor(Math.random() * (b - c + 1)) + c
    };
    Lorem.prototype.createText = function(f, h) {
        switch (h) {
            case Lorem.TYPE.PARAGRAPH:
                var k = new Array;
                for (var d = 0; d < f; d++) {
                    var j = this.randomInt(10, 20);
                    var c = this.createText(j, Lorem.TYPE.SENTENCE);
                    k.push(c)
                }
                return k.join("\n");
                break;
            case Lorem.TYPE.SENTENCE:
                var l = new Array;
                for (var d = 0; d < f; d++) {
                    var m = this.randomInt(5, 10);
                    var g = this.createText(m, Lorem.TYPE.WORD).split(" ");
                    g[0] = g[0].substr(0, 1).toUpperCase() + g[0].substr(1);
                    var e = g.join(" ");
                    l.push(e)
                }
                return (l.join(". ") + ".").replace(/(\.\,|\,\.)/g, ".");
                break;
            case Lorem.TYPE.WORD:
                var b = this.randomInt(0, Lorem.WORDS.length - f - 1);
                return Lorem.WORDS.slice(b, b + f).join(" ").replace(/\.|\,/g, "");
                break
        }
    };
    Lorem.prototype.createLorem = function(d) {
        //defaults
        var e = Lorem.TYPE.WORD,
        g = 0;
        
        var re = /lorem-([0-9]{1,})([spw]{1,1})[\s"']/,
        str = "'" + $(this.jqObj).attr("class") + "'",
        //console.log(str);
        m = str.match(re);
        if(m) {
        g = parseInt(m[1]);
        switch(m[2]) {
            case "p":
                $(this.jqObj).text("");
                for(var i=0; i<g; i++) {
                    $(this.jqObj).html($(this.jqObj).html() + "<p>" + this.createText(g, Lorem.TYPE.PARAGRAPH) + "</p>");
                }
                break;
            case "s":
                $(this.jqObj).text(this.createText(g, Lorem.TYPE.SENTENCE));
                break;
            case "w":
                $(this.jqObj).text(this.createText(g, Lorem.TYPE.WORD));
                break;
        }
        }
        //debugger;
        
    };
        (function(b) {
            b.fn.lorem = function() {
                b(this).each(function() {
                    var c = new Lorem;
                    c.jqObj = $(this);
                    c.createLorem(this);
                })
            };
            b(document).ready(function() {
                $('[class*="lorem-"]').each(function() { $(this).lorem(); });
            })
        })(jQuery);
    })();
    }; // initL


/**
* DESIGN UTILITIES: IMG AND BLOCK PLACEHOLDERS
* Placeholders of sections and elements for quick wireframing. Colored, labeled, and choice of rectangle/circle.
* If you dynamically loaded new elements, their placeholders may need to be re-initialized calling initP().
* ---------------------------------------------------------------------------------------------------------------
*/
    
function initP() {
    //for plain placeholders, use class rapid-rect or rapid-circ from rapid.css
    
    //for fully customizable placeholders
    $("[data-rect]").each(function () {
        var json=typeof $(this).data("rect")!='undefined'?$(this).data("rect"):{};
        if(typeof json.font=='undefined') json.font = "16px Helvetica";
        if(typeof json.top=='undefined') json.top = ($(this).height()/2 + parseInt(json.font.replace(/[^\d]/g, ''))/2).toString() + "px";
        rect = $("<canvas width=" + $(this).width() + " height= " + $(this).height() + ">HTML5 Unsupported</canvas>").appendTo($(this));
        context = rect[0].getContext("2d");
        context.fillStyle = typeof json.bgcolor=='undefined'?'#efefef':json.bgcolor;
        context.fillRect(0, 0, $(this).width(), $(this).height());
        context.fillStyle = typeof json.color=='undefined'?'#000':json.color;
        context.font = json.font; // defaultable font
        if(typeof json.align=='undefined' || json.align=="center") {
            context.textAlign = "center";
            context.fillText(typeof json.title=='undefined'?'':json.title, $(this).width()/2, parseInt(json.top.replace("px", ""))); // defaultable top
        } else if(json.align=="left") { 
            context.textAlign = json.align;
            context.fillText(typeof json.title=='undefined'?'':json.title, 0, parseInt(json.top.replace("px", ""))); // defaultable top
        } else if(json.align=="right") { 
            context.textAlign = json.align;
            context.fillText(typeof json.title=='undefined'?'':json.title, $(this).width(), parseInt(json.top.replace("px", ""))); // defaultable top
        } // else
    });


    $("[data-circ]").each(function () {
        var json=typeof $(this).data("circ")!='undefined'?$(this).data("circ"):{};
        if(typeof json.font=='undefined') json.font = "16px Helvetica";
        if(typeof json.top=='undefined') json.top = ($(this).height()/2 + parseInt(json.font.replace(/[^\d]/g, ''))/2).toString() + "px";
        rect = $("<canvas width=" + $(this).width() + " height= " + $(this).height() + ">HTML5 Unsupported</canvas>").appendTo($(this));
        context = rect[0].getContext("2d");
        context.fillStyle = typeof json.bgcolor=='undefined'?'#efefef':json.bgcolor;
        context.arc($(this).width() / 2, $(this).width() / 2, $(this).width() / 2, 0, 2 * Math.PI);
        context.fill();
        context.fillStyle = typeof json.color=='undefined'?'#000':json.color;
        context.font = json.font; // defaultable font
        if(typeof json.align=='undefined' || json.align=="center") {
            context.textAlign = "center";
            context.fillText(typeof json.title=='undefined'?'':json.title, $(this).width()/2, parseInt(json.top.replace("px", ""))); // defaultable top
        } else if(json.align=="left") { 
            context.textAlign = json.align;
            context.fillText(typeof json.title=='undefined'?'':json.title, 0, parseInt(json.top.replace("px", ""))); // defaultable top
        } else if(json.align=="right") { 
            context.textAlign = json.align;
            context.fillText(typeof json.title=='undefined'?'':json.title, $(this).width(), parseInt(json.top.replace("px", ""))); // defaultable top
        } // else
    });
} // initP



/*     
*	DESIGN UTILITIES: Handlebars and ihtml
*   ------------------------------------------------------------------------------------------ 
*/

function parseHtmlComment(str) {
    return str.replace("<!--", "").replace("-->", "");
}

$.extend(true, Rapid, {
    handlebars: function(lang, data /*polymorphic*/) {
        if(typeof Handlebars==="undefined") {
            console.error("Rapid.handlebars: Make sure to load Handlebars JS before Rapid Tools Suite if you want to use this function to validate Handlebars code with a javascript object.");
            return;   
        }
        error_incorrect_parameters = "Rapid.handlebars: Make sure to pass a string Handlebars template code (Eg. \"{{#wrapper}} {{row}} {{/wrapper}}\") and a context Javascript object (Eg. {wrapper: [{row:1},{row:2},{row:3}]}). Third parameter is optional and if provided, must be an array of one or more Handlebars helpers.";
        if(arguments.length<2) {
            console.error(error_incorrect_parameters);
            return; 
        }
        if(typeof arguments[0]!="string" || typeof arguments[1]!="object") {
            console.error(error_incorrect_parameters);
            return;
        }
        
        var arrHelpers = [];
        // Any helper functions passed
        if(arguments.length>2) {
        for(var i=2; i<arguments.length; i++) {
                var fxnName = arguments[i][0],
            fxn = arguments[i][1];
            Handlebars.registerHelper(fxnName, fxn);
            arrHelpers.push( {fxnName:fxnName, fxn:fxn} )
        } // for
        } // if provided helpers
    
        console.log("%cRendered:\n%c" + Handlebars.compile(lang)(data) + '\n', "color:green;", "color:black;");
    
        console.log("%cYour Handlebar code:", "color:green");
    
        if(arrHelpers.length) {
            for(var i = 0; i<arrHelpers.length; i++) {
                console.log(`Handlebars.registerHelper('${arrHelpers[i].fxnName}', ${arrHelpers[i].fxn});
                `);
            }
        }
        console.log(`
    $("body").append("<template id='template-temp'>${lang}</template>");
    var source   = $("#template-temp").html();
    var template = jsTemplate = Handlebars.compile(source);
    var context = jsData = ${JSON.stringify(data)};
    var html = contextualizedIntoFinalHTML = template(context);
    $("body").append(html); // or change to another element
    `, "color:green", "color:black");
    
    }, //handlebars
    ihtml: function() {
        //toggling ihtml canvas
        if(arguments.length==0)
            if($("#rapid-html").length>0) {
                $("#rapid-html").remove();
                return;
            }
        //creating ihtml canvas on demand
        if($("#rapid-html").length==0) {
            $('<div id="rapid-html" class="rapid-resizable ui-widget-content" style="z-index: 1000; position: fixed; overflow-x:hidden; overflow-y:scroll; word-break: break-all; padding-top: 2em; padding-left:.2em; border: 1px solid black; min-width: 170px; min-height: 100px; width: 170px; height: 100px; max-width: 100%; max-height: 100%;"><h4 class="ui-widget-header" style="position:absolute; top:0px; left:0px; margin-top: 0px; padding: .2em .5em;">Rapid HTML</h4><div id="controls" style="position:absolute; bottom:2px; left:2px"><small><a id="fade" href="javascript:void(0)" style="text-decoration:none;">Fade</a> / <a id="normal" href="javascript:void(0)" style="text-decoration:none;">Normal</a></small></div></div>').prependTo("body");
        if (typeof jQuery.ui != "undefined") {
            $(".rapid-resizable").resizable(
            {
                stop: function(event, ui)
                {                        
                    var top = getTop(ui.helper);
                    ui.helper.css('position', 'fixed');
                    ui.helper.css('top', top+"px");            
                }        
            });
    
            $("#rapid-html").draggable(
                {
                    stop: function(event, ui)
                    {            
                        var top = getTop(ui.helper);
                        ui.helper.css('position', 'fixed');
                        ui.helper.css('top', top+"px");
                    }
                });
                function getTop(ele)
                {
                    var eTop = ele.offset().top;
                    var wTop = $(window).scrollTop();
                    var top = eTop - wTop;
    
                    return top;    
                }
        } // if jQuery UI loaded
        $("#rapid-html a#fade").click(function() {
                if($("#rapid-html").css("opacity")>.1) 
                    $("#rapid-html").css("opacity", $("#rapid-html").css("opacity")-.1);
            });
    
        $("#rapid-html a#normal").click(function() {
                if($("#rapid-html").css("opacity")<1) 
                    $("#rapid-html").css("opacity", 1);
            });
        } // if creating ihtml
        
        
        if(arguments.length>0)
            $("#rapid-html").prepend(arguments[0]);
    },
}); // extend

/*     
*	BOOTSTRAP
*       - JS Bootstrap Media Queries
*       - CLI Bootstrap (preset, cols)
*   ------------------------------------------------------------------------------------------ 
*/
    $.extend(true, Rapid, {
        bootstrap: {
            lgCSS: "",
            mdCSS: "",
            smCSS: "",
            xsCSS: "",
            lgJS: function() {},
            mdJS: function() {},
            smJS: function() {},
            xsJS: function() {},
            gridlines: false,
            status: false,
            helpers: {
                htmlCount: 0,
                pollRearrange: function() {
                    
                    // First, if given bootstrap CSS media query options, then insert the style block
                    if((Rapid.bootstrap.xsCSS+Rapid.bootstrap.smCSS+Rapid.bootstrap.mdCSS+Rapid.bootstrap.lgCSS).length) {
                        var reinsertCSS = "\n@media (max-width: 767px) {\n" + Rapid.bootstrap.xsCSS + "\n}\n";
                        reinsertCSS += "@media (min-width: 768px) {\n" + Rapid.bootstrap.smCSS + "\n}\n";
                        reinsertCSS += "@media (min-width: 992px) {\n" + Rapid.bootstrap.mdCSS + "\n}\n";
                        reinsertCSS += "@media (min-width: 1200px) {\n" + Rapid.bootstrap.lgCSS + "\n}\n";

                        if(reinsertCSS.indexOf("!important")!=-1) {
                            console.error("Rapid bootstrap options: Bootstrap restyling aborted. Do not add !important to xsCSS, smCSS, mdCSS, or lgCSS!");
                            return;
                        }
                        reinsertCSS = reinsertCSS.replace(new RegExp(";", "ig"), "!important;"); //prevents inline styles from being more important than css media queries
                        $("#rapid-bootstrap-css-media-queries").remove();
                        $("<style id='rapid-bootstrap-css-media-queries' type='text/css'>" + reinsertCSS + "</style>").appendTo("head");
                    }
                    
                    //Then JS because there may be alerts blocking the layout change
                    if($("#rapid-lg").css("display")=="block")
                        Rapid.bootstrap.lgJS();
                    else if($("#rapid-md").css("display")=="block")
                        Rapid.bootstrap.mdJS();
                    else if($("#rapid-sm").css("display")=="block")
                        Rapid.bootstrap.smJS();
                    else if($("#rapid-xs").css("display")=="block")
                        Rapid.bootstrap.xsJS();
                } // pollRearrange
            }, // helpers

            lastID: function() {
                var report ="";
                if(Rapid.bootstrap.helpers.htmlCount==0) {
                    report="Rapid.bootstrap.lastID: You haven't added any Bootstrap divs thru Rapid.bootstrap.preset yet.";
                    console.info(report);
                } else {
                    report="$(\"%c#bid" + (Rapid.bootstrap.helpers.htmlCount-1).toString() + "%c\")";
                    arr=[report];
                    arr.push("font-weight:bold;","font-weight:normal;");
                    console.info.apply(console, arr);
                    return $("#bid" + (Rapid.bootstrap.helpers.htmlCount-1).toString());
                }
            },
            toStaticCSS: function() {
            console.info("Rapid.bootstrap.toStaticCSS:\n-Generates static CSS code block of xsCSS, smCSS, mdCSS, and lgCSS media queries.\n-Fixes the problem of your page having elements growing and shrinking with the page loading. Copying the static code and removing the Rapid bootstrap media queries would make sure the CSS media queries run before inline styles rather than the other way around, which causes two sets of style changes, hence the growing and shrinking during loading.\n\n");
                return $("#rapid-bootstrap-css-media-queries").text();
            },
            cols: function(sel, mode, widths) {
                var jqObj;
                if(sel instanceof jQuery)
                    jqObj = sel;
                else
                    jqObj = $(sel);
                
                var paramColIndex = 0;
                if($(jqObj).length==0) console.error("Rapid.bootstrap.mod: Selector matched no element.");
                $(jqObj).children().each(function() {
                    $(this).removeClass("col-" + mode + "-1")
                        .removeClass("col-" + mode + "-2")
                        .removeClass("col-" + mode + "-3")
                        .removeClass("col-" + mode + "-4")
                        .removeClass("col-" + mode + "-5")
                        .removeClass("col-" + mode + "-6")
                        .removeClass("col-" + mode + "-7")
                        .removeClass("col-" + mode + "-8")
                        .removeClass("col-" + mode + "-9")
                        .removeClass("col-" + mode + "-10")
                        .removeClass("col-" + mode + "-11")
                        .removeClass("col-" + mode + "-12");

                    if (typeof widths.length!='undefined') {
                        $(this).addClass("col-" + mode + "-" + widths[paramColIndex]);
                        if (paramColIndex < widths.length-1) paramColIndex++;
                    } else {
                        $(this).addClass("col-" + mode + "-" + widths);
                    }
                    //console.log(paramColIndex);
                }); // each child
            }, // cols
            preset: function(preset, objParam) {
                //Validation against required parameter
                if(typeof preset!="string" || preset==="") {
                    console.info("Rapid.bootstrap.preset: Pass a string for the first parameter that is a bootstrap element: 'container', 'well', 'row', 'col', 'colxs', 'colsm', 'colmd', 'collg', or any column class from 'col-xs-1' to 'col-lg-12'.");
                    console.info("The second parameter is optional and may include {style:'text-align:center;', class:'someClass orAnotherClass', attr:'someAttr someOtherAttr='value\"', inner:'someTextOrHTML'}");
                    console.info("Each new element is given an unique ID number. You can mouseover in DevTools to find this unique ID so you can continue appending elements as chidren. You can also find out the last ID with Rapid.bootstrap.lastID()");

                    return "";
                }
                
                // Assign html preset:
                var html="";
                preset = preset.toLowerCase();
                switch(preset) {
                    case "container":
                        html = Rapid.constants.bootstrapAddContainer;
                        break;
                    case "row":
                        html = Rapid.constants.bootstrapAddRow;
                        break;
                    case "well":
                        html = Rapid.constants.bootstrapAddWell;
                        break;
                    case "col":
                        html = Rapid.constants.bootstrapAddCol;
                        break;
                    case "colxs":
                        html = Rapid.constants.bootstrapAddColXs;
                        break;
                    case "colsm":
                        html = Rapid.constants.bootstrapAddColSm;
                        break;
                    case "colmd":
                        html = Rapid.constants.bootstrapAddColMd;
                        break;
                    case "collg":
                        html = Rapid.constants.bootstrapAddColLg;
                        break;
                    case "column":
                        html = Rapid.constants.bootstrapAddCol;
                        break;
                    default:
                        if( (preset.indexOf("-")==3) && (preset.lastIndexOf("-")==6) && (preset.length>7) ) {
                            html = Rapid.constants.bootstrapAddSpecol;
                            html = html.replace(new RegExp("\\$_SPECOL_\\$", "i"), preset);
                            //console.log("+++" + html + "\n" + preset)
                        } else {
                            console.error("Rapid.bootstrap.preset: Could not create Bootstrap div. Please pass one of these as the first parameter: 'container', 'well', 'row', 'col', 'colxs', 'colsm', 'colmd', 'collg', or any column class from 'col-xs-1' to 'col-lg-12'");
                            return "";
                        }
                } // switch
                
                // Assign ID:
                html = html.replace(new RegExp('id=""',"g"), 'id="' + 'bid' + Rapid.bootstrap.helpers.htmlCount + '"');
                Rapid.bootstrap.helpers.htmlCount++;

                //Assign Class(es), Style(s), Text
                if(arguments.length>1 && typeof arguments[1] == "object") {
                for(var key in objParam) {
                    switch (key) {
                        case "class":
                            html = html.replace(new RegExp('class="(.*?)"', 'g'), function(html, $1) { return "class=\"" + $1 + " $_CLASS_$\""});
                            html = html.replace(/\$_CLASS_\$/i, objParam[key]); // this way keeps track of spacing
                            break;
                        case "style":
                            html = html.replace(/style="(.*?)"/i, "style=\"" + objParam[key] + "\"");
                            break;
                        case "attr":
                            html = html.replace(new RegExp('data-rapid-target',"g"), objParam[key]);
                            break;
                        case "inner":
                            html = html.replace(/><\//i, ">" + objParam[key] + "<\/");
                            break;
                    } //switch statements for html regexp
                } // for
                } // if
                else if(arguments.length>1 && typeof arguments[1] != "object") {
                    console.error("Rapid.bootstrap.preset: 2nd parameter must be an object that further specifies the Bootstrap div being created. Eg. {class:\"bg-primary text-center\", style:\"color:gray; font-weight: 600\", attr:\"data-here data-also\", inner:\"Created.\"}");
                    return;
                } // object provided to further specify the Bootstrap div
                
                // Add gridlines if option on
                if(Rapid.bootstrap.gridlines) {
                    html = html.replace(new RegExp('class="(.*?)"', 'g'), function(html, $1) { return "class=\"" + $1 + " $_CLASS_$\""});
                    html = html.replace(/\$_CLASS_\$/i, "rapid-bootstrap-gridlines");
                } // if
                
                // Remove non-filled attributes:
                html = html.replace(/ style=""/i, "");
                html = html.replace(new RegExp(' data-rapid-target',"g"), '');
                
                // Formatted html to console
                var consoleHTML = html;
                consoleHTML = consoleHTML.replace(new RegExp('id="(.*?)"', 'g'), 'id="%c$1%c"');
                var arrHTML = ["Rapid.bootstrap.preset: Your html is\n" + consoleHTML];
                arrHTML.push("font-weight:bold;","font-weight:normal;");
                console.info.apply(console, arrHTML);
                
                return html;
            } // add
        } //bootstrap defaults
     } // wrapper
    ); // extend

    function initB() {
        //Check if Bootstrap exists before showing optional status
        if(typeof $().emulateTransitionEnd == 'function') {

            //Status needed for responsive scripts
            if($("#rapid-bootstrap-status").length==0) {
                $('<div id="rapid-bootstrap-status" class="rapid-drags" style="background-color:gray; position:fixed;bottom:30px;right:2px;opacity:.7;display:none; width:130px !important; border-radius: 4px; cursor:all-scroll;"><div id="rapid-lg" class="visible-lg">&nbsp;<i class="fa fa-desktop fa-6"></i>&nbsp;Large Screen (lg)</div> <div id="rapid-md" class="visible-md">&nbsp;<i class="fa fa-desktop fa-5"></i>&nbsp;Desktop (md)</div><div id="rapid-sm" class="visible-sm">&nbsp;<i class="fa fa-tablet fa-5"></i>&nbsp;Tablets (sm)</div><div id="rapid-xs" class="visible-xs">&nbsp;<i class="fa fa-mobile fa-5 fa-inverse"></i>&nbsp;Mobile (xs)</div></div>').appendTo("body");
            } // if
            if (typeof jQuery.ui != "undefined") {
                $("#rapid-bootstrap-status").draggable();
            }
        }
        
        //Check for responsive scripts and css media queries
        $(function() {
            Rapid.bootstrap.helpers.pollRearrange();
            Rapid.bootstrap.helpers.pollRearrange();
            $("#rapid-bootstrap-status").offset({ left: $(window).width()-132 });
        }); // after DOM. Minimal layout disruptions
        $(window).on("load", function() {
            Rapid.bootstrap.helpers.pollRearrange();
        }); // after DOM, images, frames, scripts
        $(window).resize(function() {
            Rapid.bootstrap.helpers.pollRearrange();
            $("#rapid-bootstrap-status").offset({ left: $(window).width()-132 });
        }); // on resizing
        
        //Bring bid up to speed if adding Bootstrap elements from a previous code
        (function() {
            var arrBID = [];
            $('[id^="bid"]').each(function() { 
                var bid = $(this).attr("id").substr(3);
                if($.isNumeric(parseInt(bid))) arrBID.push(bid);
            });
            arrBID.push(-1); // in case empty array
            Rapid.bootstrap.helpers.htmlCount = Math.max.apply(Math, arrBID) + 1;
        })();
        
        //Gridline visibility
        if(Rapid.bootstrap.gridlines)
            $('[class*="col-"]').each(function() {
                if( !$(this).hasClass("rapid-bootstrap-gridlines") )
                    $(this).addClass("rapid-bootstrap-gridlines");
            }); // gridlines
        else
            $('[class*="col-"]').each(function() {
                $(this).removeClass("rapid-bootstrap-gridlines");
            }); // gridlines
            
        //Status visibility
        if(Rapid.bootstrap.status)
            $("#rapid-bootstrap-status").css("display", "block");
        else
            $("#rapid-bootstrap-status").css("display", "none");
        // status
        
    } // initB


/*
*   ASSET UTILITIES
*   ------------------------------------------------------------------------------------------ 
*/

Rapid.assets = {};
$.extend(true, Rapid.assets, { 
    script: function(src) {
        //Because jQuery's ajax overrides arguments
        var args = arguments;
        
        //Call jQuery ajax
        $.getScript(src, {cacheBuster: $.now()})
            .done(function(data) {
                //if(!Rapid.ihelpers.validateResponse("Rapid.iscript", data)) return;
                console.group("Called script at " + src);
                console.dir({script:data});
            
                //console.dir(argsParent);
                var callback="";
                if(args.length>1) {
                for(var i = 1; i<args.length; i++) {
                    if(typeof args[i]=="function")
                        callback = "var rapidCallback = " + args[i].toString() + "; rapidCallback();";
                    else
                        callback += "\n" + args[i].toString();
                } // for
                } // if
            
                $("head").append("<script>" + callback + "</script>");
            
                console.groupEnd(); 
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                        console.log("Rapid.assets.script:" + textStatus + " with " + errorThrown);
                        //console.log("Rapid.iscript: Error", jqXHR);
            });
    },
    style: function(url) {
        // If empty, then remove all Rapid added styles. If provided an CSS asset URL, then load CSS asset

        if(typeof url!=="undefined" || url!="") {
            let $styles = $("style.rapid-style");
            $styles.remove();
            console.log("Rapid.assets.style: Removed all Rapid added styles")
            return true;
        }

        $.get(url + (url.indexOf("?")<0?"?":"&")+$.now()).done(function(css) {
            $("head").append("<style class='rapid-style'>" + css + "</style>");
        }).error(function(jqXHR, error) { console.error("Rapid.assets.style: " + error); });                  
    }
}); // extend


/*     
*	BACKEND
*       - AJAX Generator
*       - JS COnsole of PHP and MySQL
*   ------------------------------------------------------------------------------------------ 
*/

    //For serverListen - optional function to prevent SQL injection
    function mysqli_real_escape_string(str) {
        if(typeof str!=="string") return;
        str = str.replace(new RegExp("1=1", 'g'), "");
        str = str.replace(/(<([^>]+)>)/ig,"");
        return str;
    }
    function real_escape_string(str) {
        return mysqli_real_escape_string(str);
    }

    $.extend(true, Rapid, {
        backend_helpers: {
            listeners: {},
            validateRequestLine: function(id, requestLine) {
              if(requestLine.indexOf(" ")==-1) {
                  console.error(id + ": Missing a space in the parameter. You need to pass 'METHOD some-url'. For example, 'GET list/'.");
                  return false;
              } // if
              return true;
            },
            validateResponse: function(id, data) {
              if(typeof data=='undefined') { console.log(id); }
              if(data.length==0) {
                  console.info(id + ": Blank response text.");
                  
                  // Rationale: A blank response text is not necessarily an error, so do not block the caller from continuing
                  return true;
              } else if(data.substr(0,3).indexOf("<")!=-1) { // found
                  console.error(id + ": Not the expected response text. Detected '<' in the first few characters. Likely a HTML was returned. Check the URL because it could be a custom 404 page.");
                  console.dir(data);
                  return false;
              } else if(data.length<3) {
                  console.error(id + ": Blank json.");
                  console.dir(data);
                  return false;
              }
                
                
              try {
                  JSON.parse(data);
              } catch (e) {
                  console.error(id + ": Not correct JSON in response text. Check the URL because it could be a custom 404 page. Or if you echoed the literal JSON string rather than echo json_encode($arr), double check your JSON text.");
                  console.dir(data);
                  return false;
              }
                
              return true;
            } // validateResponse
          },
          ajax: function(/*polymorphic*/) { 
              
              //Validation:
              if(arguments.length==0) {
                  console.error("Rapid.ajax: Missing parameter. You need to pass 'METHOD some-url'. For example, 'GET list/'.");
                  return;
              }
              if(!Rapid.backend_helpers.validateRequestLine("Rapid.ajax", arguments[0])) {
                  return;
              }
              if(typeof arguments[arguments.length-1]!=="function" && arguments[arguments.length-1]!=null) {
                  console.error("Rapid.ajax: Last parameter should be a done callback that handles the responseText on the client side. If you do not want to bother with a done callback, pass null. The console will still return a console.dir but the ajax code it gives you will exclude any done callback.");
                  return;
              }
                           
              //Model:
              var requestLine = arguments[0], // VALUE: GET http..
              requestLine_arr = requestLine.split(" "),
              method = requestLine_arr[0].toUpperCase(), // VALUE: GET
              url = requestLine_arr[1].toLowerCase(), // VALUE: http..
              cbClientDone = typeof arguments[arguments.length-1]=="function"?arguments[arguments.length-1]:null, // TYPE: function vs null
              params = arguments.length>=2?arguments[1]:{};
              
              //Listeners overriding Ajax, part 1:
              var internalDone = {
                  forGet: function(data) { // done wrapper
                          var strJS="";
                          if(data!==Rapid.constants.phpEmulate) {
                              if(!Rapid.backend_helpers.validateResponse("Rapid.ajax", data)) return;
                              if(data.length)
                                  data = JSON.parse(data);
                              else
                                  data = "";
                          }
                          strJS+='$.' + method.toLowerCase() + '("' + url + '"';
                          if(params==null);
                          else if(params.length==0);
                          else if(typeof params=="string") strJS+=", " + params;
                          else if(typeof params=="object") { if(typeof params.rapidKey!='undefined') delete params.rapidKey; strJS+=", " + JSON.stringify(params); }
                          if(typeof cbClientDone == "function") strJS+=")\n\t.done(" + cbClientDone.toString() + ");"
                          else strJS+=")\n\t.done(function(data) {\n\t\tconsole.dir(data);\n\t});"

                          console.group("Called get");
                          console.log("Your js code would be:\n");
                          console.log(strJS);
                          console.log("Evaluating the done callback passed to ajax...");
                          if(typeof data!='undefined') console.log("data: ", data);
                          console.groupEnd();
                  },
                  forPost: function(data) { // done wrapper
                          var strJS="";
                          if(data!=Rapid.constants.phpEmulate) {
                              if(!Rapid.backend_helpers.validateResponse("Rapid.ajax", data)) return;
                              if(data.length)
                                  data = JSON.parse(data);
                              else
                                  data = "";
                          }
                          strJS+='$.' + method.toLowerCase() + '("' + url + '"';
                          if(params==null);
                          else if(params.length==0);
                          else if(typeof params=="string") strJS+=", " + params;
                          else if(typeof params=="object") { if(typeof params.rapidKey!='undefined') delete params.rapidKey; strJS+=", " + JSON.stringify(params); }
                          if(typeof cbClientDone == "function") strJS+=")\n\t.done(" + cbClientDone.toString() + ");"
                          else strJS+=")\n\t.done(function(data) {\n\t\tconsole.dir(data);\n\t});"

                          console.group("Called post");
                          console.log("Your js code would be:\n");
                          console.log(strJS);
                          //alert("reached cbClientDone");
                          console.log("Evaluating the done callback passed to ajax...");
                          if(typeof data!='undefined') console.log("data: ", data);
                          console.groupEnd();
                          
                  
                  },
                  forMiscMethod: function(data) { // done wrapper
                          var strJS="";
                          if(data!==Rapid.constants.phpEmulate) {
                              if(!Rapid.backend_helpers.validateResponse("Rapid.ajax", data)) return;
                              if(data.length)
                                  data = JSON.parse(data);
                              else
                                  data = "";
                          }
                          strJS+='$.ajax({\n\turl:"' + url + '",\n';
                          if(params==null);
                          else if(params.length==0);
                          else if(typeof params=="string");
                          else if(typeof params=="object") { if(typeof params.rapidKey!='undefined') delete params.rapidKey; strJS+='\tdata:' + JSON.stringify(params) + ',\n'; }
                          strJS+='\tmethod:"' + method + '"\n}';
                          if(typeof cbClientDone == "function") strJS+=")\n\t.done(" + cbClientDone.toString() + ");"
                          else strJS+=")\n\t.done(function(data) {\n\t\tconsole.dir(data);\n\t});"
                          console.group("Called " + method.toLowerCase());
                          console.log("Your js code would be:\n");
                          console.log(strJS);
                          console.log("Evaluating the done callback passed to ajax...");
                          if(typeof data!='undefined') console.log("data: ", data);
                          console.groupEnd();
                  }
                  
              } // done
              var fail = function(jsxhr, textStatus, errorThrown) {
                  console.error("Rapid.ajax: " + method + " " + textStatus + " with " + errorThrown);
              }; // fail
              
              
              //Listeners overriding Ajax, part 2:
                  if(typeof Rapid.backend_helpers.listeners[requestLine]!='undefined') {
                      switch (method) {
                          case "GET":
                              cbInternalDone = internalDone.forGet;
                              break;
                          case "POST":
                              cbInternalDone = internalDone.forPost;
                              break;
                          case "PUT": //nobreak's
                          case "PATCH":
                          case "UPDATE":
                          case "DELETE":
                          case "HEAD":
                          case "OPTIONS":
                              cbInternalDone = internalDone.forMiscMethod;
                              break;
                          default:
                              console.log("Rapid.ajax: Wrong method.");
                      } // switch
                      Rapid.backend_helpers.listeners[requestLine].curParams=params;
                      Rapid.backend_helpers.listeners[requestLine].cbInternalDone=cbInternalDone;
                      Rapid.backend_helpers.listeners[requestLine].cbClientDone=cbClientDone;
                      //console.log("here I am here I am!")
                      var jsExecAjaxStart = Rapid.backend_helpers.listeners[requestLine].jsExecAjax;
                      if(jsExecAjaxStart.length>0) { // start async sequence over at serverListen
                          Rapid.backend_helpers.listeners[requestLine].jsExecAjaxStarter();
                      } else { // no ajax response over at serverListen so just echo manually
                          Rapid.backend_helpers.listeners[requestLine].runFinalEcho();
                      }
                      return;
                  } // if overridden by serverListen
              
              //No listeners, use Ajax:
              switch (method) {
                  case "GET":
                          $.get(url, $.extend(params, {rapidKey: Rapid.mysql.backend_helpers.rapidKey}))
                              .done(function(data) {
                                  internalDone.forGet(data);
                              }) // done
                              .fail(function(jqXHR, textStatus, errorThrown) {
                                  fail(jqXHR, textStatus, errorThrown);
                              }); // fail
                      break;
                  case "POST":
                          $.post(url, $.extend(params, {rapidKey: Rapid.mysql.backend_helpers.rapidKey}))
                              .done(function(data) {
                                  internalDone.forPost(data);
                              }) // done
                              .fail(function(jqXHR, textStatus, errorThrown) {
                                  fail(jqXHR, textStatus, errorThrown);
                              }); // fail
                          break;
                  case "PUT":
                          //nobreak
                  case "PATCH":
                          //nobreak
                  case "UPDATE":
                          //nobreak
                  case "DELETE":
                          //nobreak
                  case "HEAD":
                          //nobreak
                  case "OPTIONS":
                          $.ajax({
                              url : url,
                              data: $.extend(params, {rapidKey: Rapid.mysql.backend_helpers.rapidKey}),
                              method: method,
                              }).done(function(data) {
                                      internalDone.forMiscMethod(data);
                              }) // done
                              .fail(function(jqXHR, textStatus, errorThrown) {
                              
                                  fail(jqXHR, textStatus, errorThrown);
                              }); // fail
                          break;
                  default:
                      console.log("Rapid.ajax: Wrong method.");
              } // switch
          }, // ajax
          mysql:{
              simpleChain: function() {
                return $.extend(Chain.call(this, "POST null"), {testingChain: true});  
              },
              Chain: function(requestLine) { 
                  
                      //Validation
                      if(arguments.length==0) {
                          console.error("Rapid.mysql's Chain: Missing parameter. You need to pass 'METHOD uri' to start a Chain object of the mysql code. For example, 'GET list/'.");
                          return;
                      }
                      if(!Rapid.backend_helpers.validateRequestLine("Rapid.mysql.Chain constructor", arguments[0]))
                          return;
                  
                      return {
                          chainer: true,
                          requestLine: requestLine,
                          curParams:{},
                          jsBeforeAjax: "",
                          jsExecAjax: [], // DONE
                          cbInternalDone: function(data) { console.dir(data) },
                          cbClientDone: function(data) { console.dir(data) },
                          ajaxMax: 0, // DONE
                          ajaxCounter: 0,
                          jsExecBottom: "",
                          phpSrcHTTP: "", // DONE
                          phpSrcInitScope: "",
                          phpSrcMysqli: "",
                          phpSrcEcho: "",
                          responseHolderVals: [],
                          responseHolderKeys: [],
                          initScope:function(php) {
                              this.phpSrcInitScope+=php;
                              return this;
                          }, // initScope
                          execQuery: function(reg) {                                                
                              if(typeof this._error!='undefined') {
                                  //Already shown error
                                  return this;
                              }
                              
                              if(!(reg instanceof RegExp)) {
                                  console.error("Rapid.mysql.Chain()'s execQuery: Must pass a regular expression and that regular expression represents exactly what you would type into mysqli_query in PHP with or without: string quotes, escape quotes, method parameters (eg. $_POST[\"someVar\"]), sql injection functions, and query string. Regular expression escapes the javascript parser so that PHP syntax can be allowed.");
                                  return $.extend(this, {_error:true});
                              }
                              
                              this.fetchQuery($.extend({}, {$rapidNull: reg})); // $rapidNull = flag for don't save mysqli results
                              return this;
                          },
                          fetchQuery: function(objFetcher) {                                                
                              if(typeof this._error!='undefined') {
                                  //Already shown error
                                  return this;
                              }
                              
                              if(Rapid.mysql.backend_helpers.rapidKey.length==0) {
                                  console.error("Rapid.mysql.Chain's fetchQuery/execQuery: Access denied. Did not authenticate with Rapid.mysql.db(path, rapidKey)");
                                  return $.extend(this, {_error:true});
                              }
                              
                              
                              error_obj_key_reg = "Rapid.mysql.Chain()'s fetchQuery: Must pass an object with a key name preceded with \$ and assigned a regular expression. The key name represents the PHP array that stores the fetch assocs before echoing. Therefore, the key name must be preceded with a \$. The regular expression represents what you would type into mysqli_query in PHP with or without: string quotes, escape quotes, method parameters (eg. $_POST[\"someVar\"]), sql injection functions, and query string. Regular expression escapes the javascript parser so that PHP syntax can be allowed.\nEg. fetchQuery(\$arr: /\"SELECT * from users\"/) ";
                              var _getArrayName="";
                              var asIsQuery="";
                              if(typeof objFetcher != "object") {
                                  console.error(error_obj_key_reg);
                                  return $.extend(this, {_error: true});
                              }
                              else if (objFetcher instanceof RegExp) {
                                  console.error(error_obj_key_reg);
                                  return $.extend(this, {_error: true});
                              }
                              
                              if(typeof objFetcher == "object")
                                  for(var arrName in objFetcher) {
                                      _getArrayName = arrName;
                                      if(arrName.length==0 || arrName[0]!='$') {
                                          console.error(error_obj_key_reg);
                                          return $.extend(this, {_error: true});
                                      }
                                          
                                      var reg = objFetcher[_getArrayName];
                                      if(!(reg instanceof RegExp)) {
                                          console.error(error_obj_key_reg);
                                          return $.extend(this, {_error: true});
                                      } // if
                                      
                                      var str = reg.toString();
                                      var strStr = str.substr(1, str.length-2);
                                      asIsQuery = strStr;
                                      console.log("When you call .run(), will run mysqli query: ", asIsQuery);
                                  } // for
                              
                              if(_getArrayName.indexOf("$rapidNull")==0)
                                  _getArrayName="";

                              this.ajaxMax++;
                              //console.dir(this.jsExecAjax);
                              //PROBLEM:
                              this.jsExecAjax.push("eval(Rapid.backend_helpers.listeners[\"" + requestLine + "\"].jsBeforeAjax); $.post(\"" + Rapid.mysql.backend_helpers.path + "\", $.extend({rapidKey:\"" + Rapid.mysql.backend_helpers.rapidKey + "\", cacheBuster:" + $.now() + ", rapidMysqli:" + asIsQuery.replace(/\./g, '+') + "}, Rapid.backend_helpers.listeners[\"" + requestLine + "\"].curParams)).done(function(data) { var curRequest = Rapid.backend_helpers.listeners[\"" + requestLine + "\"]; curRequest.responseHolderKeys.push(\"" + _getArrayName + "\"); curRequest.responseHolderVals.push(data); if(curRequest.ajaxCounter<curRequest.jsExecAjax.length) { curRequest.ajaxCounter++; eval(Rapid.backend_helpers.listeners[\"" + requestLine + "\"].jsExecAjax[curRequest.ajaxCounter]); } if(curRequest.ajaxCounter==curRequest.jsExecAjax.length) { curRequest.ajaxCounter=0; curRequest.runFinalEcho();} });");
                              
                              var requestLine_arr = requestLine.split(" ");
                              var method = requestLine_arr[0].toUpperCase();
                              
                              this.jsBeforeAjax="var $_" + method + "={}; $.extend($_" + method + ", Rapid.backend_helpers.listeners[\"" + requestLine + "\"].curParams);";
                              //console.log(this.jsBeforeAjax);
                              
                              if(method!="GET" && method!="POST") {
                                  this.phpSrcHTTP+="$_" + method + "=array();\n";
                                  this.phpSrcHTTP+="if (($stream = fopen('php://input', \"r\")) !== FALSE) {\n";
                                  this.phpSrcHTTP+="\t$str_prm = stream_get_contents($stream);\n";
                                  this.phpSrcHTTP+="\tparse_str($str_prm, $_" + method + ");\n";
                                  this.phpSrcHTTP+="}";
                              }
                              
                              this.phpSrcMysqli+="\n$rsQuery = mysqli_query($lnk1, " + asIsQuery + ");";
                              if(_getArrayName.length>0) {
                                  this.phpSrcMysqli+=(_getArrayName.length!=0)?("\n" + _getArrayName + " = array();"):"";
                                  this.phpSrcMysqli+="\nwhile($row = mysqli_fetch_assoc($rsQuery)) {";
                                  this.phpSrcMysqli+="\n\tarray_push(" + _getArrayName + ", $row);";
                                  this.phpSrcMysqli+="\n}";
                              } // if

                              //console.log(this.phpSrcHTTP);
                              
                              //eval(this.jsExecAjax[0]);
                              //console.dir(this.jsExecAjax);
                              
                              return this;
                          }, // fetchQuery
                          setFinalEcho: function(str) {
                              this.phpSrcEcho+="\n"+str;
                              return this;
                          },
                          
                          
                           jsExecAjaxStarter: function() {
                              //alert("reached!");
                              requestLine = this.requestLine;
                              cbInternalDone = this.cbInternalDone;
                              if(Rapid.backend_helpers.listeners[requestLine].jsExecAjax.length>0) {
                                 console.info("Your php code would be:");
                                 var str = Rapid.backend_helpers.listeners[requestLine].phpSrcInitScope + Rapid.backend_helpers.listeners[requestLine].phpSrcMysqli + Rapid.backend_helpers.listeners[requestLine].phpSrcEcho;
                                 console.log(str);
                                 eval(Rapid.backend_helpers.listeners[requestLine].jsExecAjax[0]);
                              } else {
                                  // has been handled earlier in the stack
                              }
                          }, // jsExecAjaxStart

                          runFinalEcho: function() {
                              var curRequest = Rapid.backend_helpers.listeners[requestLine];
                              var rsObj = {};
                              var cbClientDone = curRequest.cbClientDone;

                              for(index in curRequest.responseHolderKeys) {
                                  if(curRequest.responseHolderKeys[index].length!=0) {
                                      console.log(curRequest.responseHolderVals[index]);
                                      eval("$.extend(rsObj, {" + curRequest.responseHolderKeys[index] + ": " + curRequest.responseHolderVals[index] + "});");
                                  } // if
                              } // for
                              // rsObj values
                              var requestLine_arr = curRequest.requestLine.split(" ");
                              var method = requestLine_arr[0].toUpperCase(); // VALUE: GET
                              //-

                              if(typeof this.testingChain=='undefined')
                                  $.post(Rapid.mysql.backend_helpers.path, {rapidKey: Rapid.mysql.backend_helpers.rapidKey, 
                                                                       rapidEcho: curRequest.phpSrcEcho, 
                                                                       rapidMethod: method, 
                                                                       rapidParams: typeof curRequest.curParams=="object"?JSON.stringify(curRequest.curParams):JSON.stringify({"_error":"Can't echo a method without parameters."}), 
                                                                       rapidMultiFetchAssocs: $.isEmptyObject(rsObj)?"":rsObj})
                                      .done(function(data) { 
                                          if(curRequest.jsExecAjax.length>0)
                                              console.info("Rerouted to chain code -> Database -> Echo -> Done Callback:"); 
                                          else
                                              console.info("Rerouted to chain code -> Echo -> Done Callback:"); 
                                          if(cbClientDone!=null) cbClientDone(data); 
                                  }); // done
                          }, // runFinalEcho
                          
                          run: function() {
                              var requestLine = "POST null";
                              var params = arguments.length && typeof arguments[0]=="object" ? arguments[0] : {};
                              console.dir(params);
                              if(this.requestLine!="POST null") {
                                  console.error("Rapid.mysql.Chain: Do not chain the run function to a regular Chain. Run should receive optional parameter object and be chained to a Test Chain. Regular Chain needs to be passed to serverListen so that it is ready to run the mysql chain when ajax triggers it.");
                                  return this;
                              }
                              else if(!this.phpSrcMysqli.length) {
                                  console.error("Rapid.mysql.simpleChain: You must perform a valid execQuery or a fetchQuery for simpleChain.");
                                  return this;    
                              }
                              
                              //Rapid.backend_helpers.listeners[requestLine] = this;
                              this.curParams=params;
                              //this.cbInternalDone=cbInternalDone;
                              //this.cbClientDone=cbClientDone;
                              var jsExecAjaxStart = this.jsExecAjax;
                              Rapid.backend_helpers.listeners[requestLine] = this;
                              if(jsExecAjaxStart.length>0) { // start async sequence over at serverListen
                                  this.jsExecAjaxStarter();
                              } else { // no ajax response over at serverListen so just echo manually
                                  this.runFinalEcho();
                              }
                          } // run if not waiting for ajax (doing a simpleChain)
                        }; // return 
                      }, // ChainBuilder with implicit build                
              backend_helpers: {
                path: "", // path to mysql with access to mysql database
                rapidKey: "" // the password that grants access to mysql
              },
              connect: function(path, rapidKey) {
                  //eg. path = "../sandbox/rapid/js/rapid-mysql.php"
                  
                  if(arguments.length!=2 || typeof arguments[0]!= "string" || typeof arguments[1]!= "string") {
                      console.error('Rapid.mysql.db: Must pass a string path of the mysql config file and a string access key that matches rapidKey defined in the mysql config file. Eg. Rapid.mysql.db(\"some-folder/rapid-mysqli-or-some-other-filename.php\", \"your-configured-password\")');
                      return false;
                  } // if
                  
                  try {
                      $.post(path, {rapidKey: rapidKey, authenticating: true})
                          .done(function(data) {
                              if(!Rapid.backend_helpers.validateResponse("Rapid.mysql.db", data)) return false;
                              if(typeof JSON.parse(data).authenticated!='undefined') {
                                  Rapid.mysql.backend_helpers.path=path;
                                  Rapid.mysql.backend_helpers.rapidKey=rapidKey;
                                  console.info("Rapid.idb: " + JSON.parse(data).status);
                                  console.info("Your php code would be: " + JSON.parse(data).phpSrc);
                              } else {
                                  console.error("Rapid.idb: " + JSON.parse(data).status);
                                  return true;
                              }
                                  
                          }) // done
                          .fail(function() {
                              console.error("Rapid.idb: Can't authenticate. Path to mysql file is probably incorrect.");
                              return false;
                          });
                  } catch (e) {
                          if(e instanceof SyntaxError) {
                              console.error("Rapid.idb: Can't authenticate. Path to mysql file is probably incorrect.");
                              return false;
                          }
                  } // catch
              }
          },
          serverListen: function() {
              function error_bad_chain() {
                  console.error("Chain object instructs how the mysql is emulated. You can initiate variables before calling database or outputting, then call mysqli (the db is live), and echo the results. Or you can choose not to call mysqli and just echo fake mock data. But you must always set the final echo.\n Example:%c\nRapid.serverListen(Rapid.mysql.Chain(\"GET /some-path/\").initScope(\"$arr=array();\").fetchQuery({arr0:/\"SELECT * FROM tbl WHERE col1='\" . mysqli_real_escape_string($POST[\"var\"]) . \"' LIMIT 5;\"/}).execQuery(/\"another-sql-query-in-reg-exp-here\"/).setFinalEcho(\"echo json_encode($arr1);\"));", "font-style:italic;");
              } // error_bad_chain
              
              // Validation
              if(arguments.length==0) {
                  console.error("Rapid.serverListen: Missing first parameter. You need to pass 'METHOD uri' to disable an active listener or a Chain object to enable one. For example, 'GET list/'.");
                  error_bad_chain()
                  return;
              }
              
              //Listener unsetting
              if(typeof arguments[0] == "string") {
                  var requestLine = arguments[0];
                  
                  //Validation
                  if(!Rapid.backend_helpers.validateRequestLine("Rapid.serverListen", requestLine)) return;

                  //Unset
                  if(typeof Rapid.backend_helpers.listeners[requestLine]!='undefined') {
                      delete Rapid.backend_helpers.listeners[requestLine];
                      console.info("Rapid.serverListen: Listener %cUNSET%c.\nRapid Ajax requests will route to external pages.", "color:gray;", "color:black;");
                      return;
                  } else {
                      console.error("Rapid.serverListen: You tried unsetting a listener that does not exist. Set a listener by passing a Chain object.");
                      error_bad_chain();
                      return;
                  }
                  
                  return;
              } // if
              
              
              //Going down chain with error
              if(typeof arguments[0].testingChain!='undefined') {
                  console.error("Rapid.mysql.serverListen: A test chain does not belong to serverListen because you are not listening for ajax to perform a mysql chain. The purpose of test chain is to validate your query code without the boilerplate of a regular Chain with serverListen. Just run it standalone and finish the chain with .run(). Eg. (Rapid.mysql.simpleChain()).fetchQuery({results:/\"SELECT * FROM tbl1 LIMIT 5\"}).run();");
                  return null;
              }
              
              if(typeof arguments[0]._error!='undefined') {
                  return this;
              }
              var phpSrcEcho = arguments[0].phpSrcEcho;
              if(phpSrcEcho.length==0) {
                  console.error("Rapid.mysql.Chain's fetchQuery/execQuery: You did not instruct the chain on what to output from the server PHP. ajax will call the request line supplied to it without rerouting to an emulated mysql.");     
                  error_bad_chain();
                  return;
              }
              
              var requestLine = arguments[0].requestLine;
              Rapid.backend_helpers.listeners[requestLine] = {};
              $.extend(true, Rapid.backend_helpers.listeners[requestLine], arguments[0]); // ChainBuilder returns an object representing JS and PHP code 
              
              console.info("Rapid.serverListen: Listener %cSET%c.\nRapid Ajax requests will route to your Chain's code.\nTo turn off, call serverListen with the string (%cGET api.php/list%c).", "color:green;", "color:black;", "font-style:italic;", "font-style:normal;");
                  
          } // serverListen
    }); // extend


/**
* TEAMWORK UTILITIES: Notes inside elements
* Removed when loaded in browser. For dev code eyes only.
*/
    $(function(){
        //Notes are only for developer eyes in development environment:
        var arr = [];
        $('*').filter(function() {
          for (attr of this.attributes)
            if (attr.name.startsWith("data-note")) {
                arr.push({$el:$(this), dataNoteAttr:attr.name}); // attr.name - native type attribute has a name property
            }
        });
        arr.forEach(function(elWithAttrName) { var $el = elWithAttrName.$el, attrName = elWithAttrName.dataNoteAttr; $el.removeAttr(attrName); })
    });

/**
* TEAMWORK UTILITIES: Tooltips
* A bubble with info appears when moving mouse cursor over element. Or when in Story 
* Mode, it appears when pressing the key binded to it. The tooltip also has customizable 
* background color and font color. It also has icons that indicate to-do tasks or bugs.
* If you dynamically loaded new elements, their placeholders may need to be re-initialized 
* calling initT().
* ------------------------------------------------------------------------------------------
* Best practices: 
*     -To add a mouseover tooltip to an element, use: data-detail.
*     -Add icons into the tooltip with _BUG_, _TODO_, etc.
*     -Newlines and tabs with \n abd \t.
*     -When customizing bgcolor or color, use full words for color such
*      as: blue. Avoid using Hex, RGB, and RGBA. This limitation is only 
*      for tooltips (OK in placeholders).
*     -If you want the tooltip to appear in Story Mode only, use: 
*      data-story-detail.
*     -The tooltip can be used as a to-do list for developers, listing requirements of the
*      user, the website and/or the system (anything other than the user such as the app or
*      website frontend, database, JS code, PHP code, etc), the flow of data (what info 
*      is received, any intermediate variables, and the final data that gets used), the 
*      RESTful API's request method and URI, the JSON data from/to API, the HTML5 data 
*      attributes (if used to store info on client side), the HTML element's presentation 
*      of any data, events (onclick, onmouseover, etc), and poll (aka setInterval).
*      Eg.
*      *TO DO*\n_DONE_USER: Sees list of clickable addresses.\n_TODO_SYSTEM: \n\t_num1_Load 
*      list of home addresses.\n\t_DONE__num2_Mark home addresses that are sold within 5 years
*      of putting on market\n_TODO_DATA-FLOW: inputs -> intermediates -> outputs\n_DONE_API: 
*      GET /addresses/\n_TODO_DATA-JSON:...\n_DONE_DATA-ATTR: data-addresses-count\n_TODO_DATA-VIEW:
*      ...\n_DONE_EVENTS: None.\n_TODO_POLL: every 1 sec
*
*/    

function initT() {
    $("[data-detail], [data-story-detail]").each(function (i) {
        var tip;
        if(typeof $(this).data("detail")!='undefined') tip = $(this).data("detail");
        else tip = $(this).data("story-detail");
        //console.log(tip);

    if($("#rapid-hidden").length==0) $('<div id="rapid-hidden" style="display:none;"></div>').appendTo("body");
        if($("#rapid-hidden").length==0) $('<div id="rapid-hidden" style="display:none;"></div>').appendTo("body");
        var strTitle = tip.title;
        if(tip.title.indexOf("_")!=-1) 
            strTitle = 
                tip.title.replace(/_todo_/g, $("#rapid-hidden").html("&#x274f;").text())
                .replace(/_TODO_/g, $("#rapid-hidden").html("&#x25a2;").text())
                .replace(/_done_/g, $("#rapid-hidden").html("&#x9745;").text())
                .replace(/_DONE_/g, $("#rapid-hidden").html("&#10004;").text())
                .replace(/_skipped_/g, $("#rapid-hidden").html("&#x2612;").text())
                .replace(/_SKIPPED_/g, $("#rapid-hidden").html("&#x2718;").text())
                .replace(/_bug_/g, $("#rapid-hidden").html("&#x1f50e;").text())
                .replace(/_BUG_/g, $("#rapid-hidden").html("&#x1f41e;").text())
                .replace(/_point_/g, $("#rapid-hidden").html("&#x261B;").text())
                .replace(/_POINT_/g, $("#rapid-hidden").html("&#x261E;").text())
                .replace(/_stop_/g, $("#rapid-hidden").html("&#x270b;").text())
                .replace(/_walk_/g, $("#rapid-hidden").html("&#x1f6b6;").text())
                .replace(/_run_/g, $("#rapid-hidden").html("&#x1f3c3;").text())
                .replace(/_biceps_/g, $("#rapid-hidden").html("&#x1f4aa;").text())
                .replace(/_scissor_/g, $("#rapid-hidden").html("&#x2702;").text())
                .replace(/_SCISSOR_/g, $("#rapid-hidden").html("&#x2704;").text())
                .replace(/_phone_/g, $("#rapid-hidden").html("&#x2706;").text())
                .replace(/_airplane_/g, $("#rapid-hidden").html("&#x2708;").text())
                .replace(/_letter_/g, $("#rapid-hidden").html("&#x2709;").text())
                .replace(/_edit_/g, $("#rapid-hidden").html("&#x270D;").text())
                .replace(/_EDIT_/g, $("#rapid-hidden").html("&#x270E;").text())
                .replace(/_check_/g, $("#rapid-hidden").html("&#x2713;").text())
                .replace(/_CHECK_/g, $("#rapid-hidden").html("&#x2714;").text())
                .replace(/_x_/g, $("#rapid-hidden").html("&#x2715;").text())
                .replace(/_X_/g, $("#rapid-hidden").html("&#x2716;").text())
                .replace(/_ix_/g, $("#rapid-hidden").html("&#x2717;").text())
                .replace(/_IX_/g, $("#rapid-hidden").html("&#x2718;").text())
                .replace(/_spokes_/g, $("#rapid-hidden").html("&#x2722;").text())
                .replace(/_SPOKES_/g, $("#rapid-hidden").html("&#x2723;").text())
                .replace(/_bspokes_/g, $("#rapid-hidden").html("&#x2724;").text())
                .replace(/_BSPOKES_/g, $("#rapid-hidden").html("&#x2725;").text())
                .replace(/_ninja_/g, $("#rapid-hidden").html("&#x2726;").text())
                .replace(/_NINJA_/g, $("#rapid-hidden").html("&#x2727;").text())
                .replace(/_star1_/g, $("#rapid-hidden").html("&#x2729;").text())
                .replace(/_star2_/g, $("#rapid-hidden").html("&#x272A;").text())
                .replace(/_star3_/g, $("#rapid-hidden").html("&#x272B;").text())
                .replace(/_star4_/g, $("#rapid-hidden").html("&#x272C;").text())
                .replace(/_star5_/g, $("#rapid-hidden").html("&#x272D;").text())
                .replace(/_star6_/g, $("#rapid-hidden").html("&#x272E;").text())
                .replace(/_star7_/g, $("#rapid-hidden").html("&#x272F;").text())
                .replace(/_star8_/g, $("#rapid-hidden").html("&#x2730;").text())
                .replace(/_star9_/g, $("#rapid-hidden").html("&#x2739;").text())
                .replace(/_ASTER_/g, $("#rapid-hidden").html("&#x273D;").text())
                .replace(/_aster_/g, $("#rapid-hidden").html("&#x274B;").text())
                .replace(/_biohazard_/g, $("#rapid-hidden").html("&#x2756;").text())
                .replace(/_Num1_/g, $("#rapid-hidden").html("&#x2776;").text())
                .replace(/_Num2_/g, $("#rapid-hidden").html("&#x2777;").text())
                .replace(/_Num3_/g, $("#rapid-hidden").html("&#x2778;").text())
                .replace(/_Num4_/g, $("#rapid-hidden").html("&#x2779;").text())
                .replace(/_Num5_/g, $("#rapid-hidden").html("&#x277A;").text())
                .replace(/_Num6_/g, $("#rapid-hidden").html("&#x277B;").text())
                .replace(/_Num7_/g, $("#rapid-hidden").html("&#x277C;").text())
                .replace(/_Num8_/g, $("#rapid-hidden").html("&#x277D;").text())
                .replace(/_Num9_/g, $("#rapid-hidden").html("&#x277E;").text())
                .replace(/_Num0_/g, $("#rapid-hidden").html("&#x277F;").text())
                .replace(/_NUM1_/g, $("#rapid-hidden").html("&#x2780;").text())
                .replace(/_NUM2_/g, $("#rapid-hidden").html("&#x2781;").text())
                .replace(/_NUM3_/g, $("#rapid-hidden").html("&#x2782;").text())
                .replace(/_NUM4_/g, $("#rapid-hidden").html("&#x2783;").text())
                .replace(/_NUM5_/g, $("#rapid-hidden").html("&#x2784;").text())
                .replace(/_NUM6_/g, $("#rapid-hidden").html("&#x2785;").text())
                .replace(/_NUM7_/g, $("#rapid-hidden").html("&#x2786;").text())
                .replace(/_NUM8_/g, $("#rapid-hidden").html("&#x2787;").text())
                .replace(/_NUM9_/g, $("#rapid-hidden").html("&#x2788;").text())
                .replace(/_NUM0_/g, $("#rapid-hidden").html("&#x2789;").text())
                .replace(/_num1_/g, $("#rapid-hidden").html("&#x278A;").text())
                .replace(/_num2_/g, $("#rapid-hidden").html("&#x278B;").text())
                .replace(/_num3_/g, $("#rapid-hidden").html("&#x278C;").text())
                .replace(/_num4_/g, $("#rapid-hidden").html("&#x278D;").text())
                .replace(/_num5_/g, $("#rapid-hidden").html("&#x278E;").text())
                .replace(/_num6_/g, $("#rapid-hidden").html("&#x278F;").text())
                .replace(/_num7_/g, $("#rapid-hidden").html("&#x2790;").text())
                .replace(/_num8_/g, $("#rapid-hidden").html("&#x2791;").text())
                .replace(/_num9_/g, $("#rapid-hidden").html("&#x2792;").text())
                .replace(/_num0_/g, $("#rapid-hidden").html("&#x2793;").text())
                .replace(/_lock_/g, $("#rapid-hidden").html("&#x1f513;").text())
                .replace(/_LOCK_/g, $("#rapid-hidden").html("&#x1f512;").text())
                .replace(/_diamond_/g, $("#rapid-hidden").html("&#x25c6").text())
                .replace(/_DIAMOND_/g, $("#rapid-hidden").html("&#x25c7;").text())
                .replace(/_sparks_/g, $("#rapid-hidden").html("&#x2728;").text())
                .replace(/_loop_/g, $("#rapid-hidden").html("&#x27BF;").text())
                .replace(/_lefthalf_/g, $("#rapid-hidden").html("&#x25E7;").text())
                .replace(/_righthalf_/g, $("#rapid-hidden").html("&#x25E8;").text())
                .replace(/_tlhalf_/g, $("#rapid-hidden").html("&#x25E9;").text())
                .replace(/_brhalf_/g, $("#rapid-hidden").html("&#x25EA;").text())
                .replace(/_tlcorner_/g, $("#rapid-hidden").html("&#x25F0;").text())
                .replace(/_blcorner_/g, $("#rapid-hidden").html("&#x25F1;").text())
                .replace(/_brcorner_/g, $("#rapid-hidden").html("&#x25F2;").text())
                .replace(/_trcorner_/g, $("#rapid-hidden").html("&#x25F3;").text())
                .replace(/_clock_/g, $("#rapid-hidden").html("&#x1f550;").text())
                .replace(/_CLOCK_/g, $("#rapid-hidden").html("&#x23f0;").text())
                .replace(/_rdquo_/g, $("#rapid-hidden").html("&#x8221;").text())
                .replace(/_ldquo_/g, $("#rapid-hidden").html("&#x8220;").text())
                .replace(/_rsquo_/g, $("#rapid-hidden").html("&#x2019;").text())
                .replace(/_lsquo_/g, $("#rapid-hidden").html("&#x2018;").text())
                .replace(/_lsaquo_/g, $("#rapid-hidden").html("&#x2039;").text())
                .replace(/_rsaquo_/g, $("#rapid-hidden").html("&#x203A;").text())
                .replace(/_laquo_/g, $("#rapid-hidden").html("&#xAB;").text())
                .replace(/_raquo_/g, $("#rapid-hidden").html("&#xBB;").text())
                .replace(/_ldaquo_/g, $("#rapid-hidden").html("&#xAB;").text())
                .replace(/_rdaquo_/g, $("#rapid-hidden").html("&#xBB;").text())
                .replace(/_dash_/g, $("#rapid-hidden").html("&#x2013;").text())
                .replace(/_DASH_/g, $("#rapid-hidden").html("&#x2014;").text())
                .replace(/_circle_/g, $("#rapid-hidden").html("&#x2022;").text())
                .replace(/_CIRCLE_/g, $("#rapid-hidden").html("&#x25CB;").text())
                .replace(/_triang_/g, $("#rapid-hidden").html("&#x2023;").text())
                .replace(/_TRIANG_/g, $("#rapid-hidden").html("&#x25B9;").text())
                .replace(/_square_/g, $("#rapid-hidden").html("&#x25A0;").text())
                .replace(/_SQUARE_/g, $("#rapid-hidden").html("&#x25A1;").text())
                .replace(/_point0_/g, $("#rapid-hidden").html("&#x27A7;").text())
                .replace(/_point1_/g, $("#rapid-hidden").html("&#x279B;").text())
                .replace(/_point2_/g, $("#rapid-hidden").html("&#x279D;").text())
                .replace(/_point3_/g, $("#rapid-hidden").html("&#x2799;").text())
                .replace(/_point4_/g, $("#rapid-hidden").html("&#x279E;").text())
                .replace(/_point5_/g, $("#rapid-hidden").html("&#x2794;").text())
                .replace(/_point6_/g, $("#rapid-hidden").html("&#x279C;").text())
                .replace(/_point7_/g, $("#rapid-hidden").html("&#x27A1;").text())
                .replace(/_point8_/g, $("#rapid-hidden").html("&#x27A8;").text())
                .replace(/_point9_/g, $("#rapid-hidden").html("&#x27B2;").text())
                .replace(/_trends_/g, $("#rapid-hidden").html("&#x219D;").text())
                .replace(/_spoint1_/g, $("#rapid-hidden").html("&#x21A6;").text())
                .replace(/_spoint2_/g, $("#rapid-hidden").html("&#x21A3;").text())
                .replace(/_spoint3_/g, $("#rapid-hidden").html("&#x21A0;").text())
                .replace(/_spoint4_/g, $("#rapid-hidden").html("&#x27B3;").text())
                .replace(/_spoint5_/g, $("#rapid-hidden").html("&#x27B8;").text())
                .replace(/_spoint6_/g, $("#rapid-hidden").html("&#x27BC;").text())
                .replace(/_spoint7_/g, $("#rapid-hidden").html("&#x27BD;").text())
                .replace(/_spoint8_/g, $("#rapid-hidden").html("&#x27B5;").text())
                .replace(/_spoint9_/g, $("#rapid-hidden").html("&#x27BB;").text())
                .replace(/_3darrowhead_/g, $("#rapid-hidden").html("&#x27A2;").text())
                .replace(/_3DARROWHEAD_/g, $("#rapid-hidden").html("&#x27A3;").text())
                .replace(/_arrowhead_/g, $("#rapid-hidden").html("&#x27A4;").text())
                .replace(/_return_/g, $("#rapid-hidden").html("&#x27A5;").text())
                .replace(/_RETURN_/g, $("#rapid-hidden").html("&#x27A6;").text())
                .replace(/_POINT0_/g, $("#rapid-hidden").html("&#x27A9;").text())
                .replace(/_POINT1_/g, $("#rapid-hidden").html("&#x27AA;").text())
                .replace(/_POINT2_/g, $("#rapid-hidden").html("&#x27AF;").text())
                .replace(/_POINT3_/g, $("#rapid-hidden").html("&#x27B1;").text())
                .replace(/_POINT4_/g, $("#rapid-hidden").html("&#x27AD;").text())
                .replace(/_POINT5_/g, $("#rapid-hidden").html("&#x27AE;").text())
                .replace(/_POINT6_/g, $("#rapid-hidden").html("&#x27AB;").text())
                .replace(/_POINT7_/g, $("#rapid-hidden").html("&#x27AC;").text())
                .replace(/_POINT8_/g, $("#rapid-hidden").html("&#x21E8;").text())
                .replace(/_POINT9_/g, $("#rapid-hidden").html("&#x21FE;").text());

        if (typeof (tip.title) != 'undefined') $(this).attr("title", strTitle);
        $(this).attr("data-toggle", "tooltip");

        if (typeof (tip.align) != 'undefined') {
            if($('tooltip-' + tip.align).length==0)
               $('<style type="text/css">.tooltip-' + tip.align + ' + .tooltip > .tooltip-inner {text-align: ' + tip.align + ';}</style>').appendTo($('head'));
            $(this).addClass('tooltip-' + tip.align);
        }
        if (typeof (tip.pos) != 'undefined') $(this).attr("data-placement", tip.pos);
        if (typeof (tip.onKey) != 'undefined') $(this).attr("data-onKey", tip.onKey);

        if (typeof (tip.color) != 'undefined') {
            $('<style type="text/css">.tooltip-' + tip.color + ' + .tooltip > .tooltip-inner {color: ' + tip.color + ';}</style>').appendTo($('head'));
            $(this).addClass('tooltip-' + tip.color);
        }
        if (typeof (tip.font) != 'undefined') {
            var strFont = tip.font;
            var selFontSize = String.fromCharCode(65+Number(strFont.substr(0, strFont.indexOf("px "))));
            var selFontFamily = strFont.substr(strFont.indexOf(" ")+1).split(" ").join("");
            var propFontSize = strFont.substr(0, strFont.indexOf(" "));
            var propFontFamily = strFont.substr(strFont.indexOf(" ")+1);
            
            $('<style type="text/css">.tooltip-' + selFontSize + selFontFamily + ' + .tooltip > .tooltip-inner { font-size: ' + propFontSize + '; font-family: ' + propFontFamily + '; }</style>').appendTo($('head'));
            $(this).addClass('tooltip-' + selFontSize + selFontFamily);
        }     
        
        
        if (typeof (tip.bgcolor) != 'undefined') {
            $('<style type="text/css">.tooltip-bg' + tip.bgcolor + ' + .tooltip > .tooltip-inner {background-color: ' + tip.bgcolor + ';}</style>').appendTo($('head'));
            $(this).addClass('tooltip-bg' + tip.bgcolor);

            if(typeof (tip.pos) != 'undefined' && tip.pos == "right") {
               $('<style type="text/css">.tooltip-rightbg' + tip.bgcolor + ' + .tooltip > .tooltip-arrow { border-right-color: ' + tip.bgcolor + '; }</style>').appendTo($('head'));
                $(this).addClass('tooltip-rightbg' + tip.bgcolor);
            }
            else if(typeof (tip.pos) != 'undefined' && tip.pos == "left") {
               $('<style type="text/css">.tooltip-leftbg' + tip.bgcolor + ' + .tooltip > .tooltip-arrow { border-left-color: ' + tip.bgcolor + '; }</style>').appendTo($('head'));
                $(this).addClass('tooltip-leftbg' + tip.bgcolor);
            }
            else if(typeof (tip.pos) != 'undefined' && tip.pos == "top") {
               $('<style type="text/css">.tooltip-topbg' + tip.bgcolor + ' + .tooltip > .tooltip-arrow { border-top-color: ' + tip.bgcolor + '; }</style>').appendTo($('head'));
                $(this).addClass('tooltip-topbg' + tip.bgcolor);
            }
            else if(typeof (tip.pos) != 'undefined' && tip.pos == "bottom") {
               $('<style type="text/css">.tooltip-bottombg' + tip.bgcolor + ' + .tooltip > .tooltip-arrow { border-bottom-color: ' + tip.bgcolor + '; }</style>').appendTo($('head'));
                $(this).addClass('tooltip-bottombg' + tip.bgcolor);
            } // else
    } // there's a bgcolor
        
        $(this).tooltip();
        if(typeof $(this).data("story-detail")!='undefined') $(this).tooltip("disable");
    });
} // initT

/**
* TEAMWORK UTILITIES: Storyboards
* Add more settings like a storytelling of the tooltips explaining how the elements work 
* together or further to do's.
* --------------------------------------------------------------------------------------------
* Best practices: 
*     -You can bind a key (0-9 or a-z) to multiple tooltips and have them appear with an
*      explanation in the console after activating Story Mode (by pressing the 
*      backquote ` key found left of the number keys) and then pressing the binded key.
*      You must activate Story Mode to press a key to show tooltip(s) because it's
*      normally disruptive for user to type into a website's textfield and have tooltips
*      appear as they are typing.
* 
*/

//SB-1. Story Mode On/Off
function initSM() {
    window.showing=[];
    window.storytelling=[];
    $("body").off("keypress"); // to prevent multiple firings if stories are set through Rapid.options
    $("body").on("keypress", function(e) {
       if(e.keyCode==96 && typeof window.showable=='undefined') { 
           console.log("%cON - Story %cPress the keys the developer gave you to read some stories or to see some tooltips.","color:red;font-weight:bold;","color:red; font-weight:normal;"); 
           window.showable="";
           return;
       } else if(e.keyCode==96) {
           console.log("%cOFF - Stories %cTyping on the website produces normal behavior again.","color:gray; font-weight:bold;","font-weight:normal;");
           $("[data-detail],[data-story-detail]").trigger("mouseout"); // close all current tooltips
           delete window.showable;
           return;
       } // else
       if(typeof window.showable=='undefined') return;

        //SB-2. Show story about opened tooltips

       //check if there's a story attached to what's binded:
        var input = String.fromCharCode(event.keyCode).toLowerCase();
        var currentKey = "";
        var currentStory = "";
        var found=false;
        if(typeof Rapid.stories!="undefined") {
            $.each(Rapid.stories.array, function( index, value )
            {
                if(input==value.onKey) {
                    Rapid.stories.helpers.showStoryAndTooltip(input, value.story);
                    found=true;
                    return false;
                } // look for a story whose onKey is triggered
            }); // then look through stories
            
            //Triggering tooltips is independent of storyboard
            if(!found) {
                Rapid.stories.helpers.showStoryAndTooltip(input, []);
            }
        } // if user defined stories

    }); // keypress
} // initSM


/*     
*	TEAMWORK: Stories
*   ------------------------------------------------------------------------------------------ 
*/
    $.extend(true, Rapid, {
        stories: {
            helpers: {
                showStoryAndTooltip: function(input, story) {
                    var arr = []; 
                    if(typeof story=="string") arr.push(story);
                    story = arr;

                    if(typeof window.showing[input]=='undefined') {
                        $('[data-toggle="tooltip"][data-onKey="' + input + '"]').each(function() {
                        $(window).scrollTop(Math.floor($('[data-onKey=' + input + ']').offset().top));
                        if(typeof $(this).data("story-detail")!='undefined') $(this).tooltip("enable");
                        $(this).trigger('mouseenter'); });
                        console.log.apply(console, story);
                        window.showing[input]="";
                    } else {
                        $('[data-toggle="tooltip"][data-onKey="' + input + '"]').each(function() {
                        if(typeof $(this).data("story-detail")!='undefined') $(this).tooltip("disable");
                        $(this).trigger('mouseout'); });
                        delete window.showing[input];
                    } // else
                }, // showStoryAndTooltip    
            }, // stories helpers
            array: []
        } // stories
    });

    const reinitL = initL,
          reinitM = initM,
          reinitT = initT;
          
    $(function() {
        (function init_rapid() {
            initM(); // Semantics incl. global, controllers (as inline js or external script)
            initP(); // Placeholders including rects and circles
            initT(); // Tooltips
            initSM(); // Storymode that combines tooltips with a console narrative
            initL(); // Lorem Ipsum
            initB(); // Command-line Bootstrap
            
            // Autoruns on appropriate browser: 
            // Chrome's debugger enhanced
        })();
    });
