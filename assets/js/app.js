const utils = {
} // utils

/*  
    @app
        Entry point
    @app.$timeHeaders
        General description of App
    @app.init
        Description of init function
*/
function App() {

/* @This function does this or that
   @example
    fxn(params) => Does that
*/
    console.log("App init");
} // App

var Modifiers = {
    init: () => {
        $("html").on("keydown", (e) => {
            if(e.metaKey || e.ctrlKey) {
                console.log("CMD or CTRL being held for global feature.");
            }
        });


        $("html").on("keyup", (e) => {
            if(!e.metaKey && !e.ctrlKey) {
                $("textarea").css("overflow-y", "scroll");
                console.log("End: CMD or CTRL being held for global feature.");
            }
        });
    }
}
Modifiers.init();

$(function() {
    new App();
}); 