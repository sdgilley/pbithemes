---
---

// JavaScript Document
$(document).ready(function () {
    //initialize
    $('.choose').colorpicker();
    newtheme();
    // //list of themes to choose
    var themes = {{ site.data | jsonify }};
     

// load choices in selection box 
for (var prop in themes) {
    var item = $(themes[prop])[0];
    $("#files").append("<option>" + item.name + '</option>');
};

// Load Dialog Actions

// click on a file in Load dialog
$("#files").change(function () {
    var item = $(themes[$("#files").val()])[0];
    $("#input").val(JSON.stringify(item));
    showstrip(item);
});

// after closing the dialog, read the input to populate the main page, and show the result
$("#loadNew").click(function () {
    theme = JSON.parse($("#input").val());
    loadTheme(theme);  // creates the text input cells and colors them
    applyColors(); //make cells show their colors
    generate(); //generate the json text area
    $("#result").removeClass('hidden'); //show the div on the main page
});

// Main Page Actions
//
$("#themeName").change(function () {
    generate()
});

$("#download").click(function () {
    var fn  = $("#themeName").val() +".json";
    var text = $("#output").val();
    $("#download").prop({
        "href": "data:text/plain;charset=utf-8," + encodeURIComponent(text),
        "download": fn
    });
});
$("#new").click(function () {
    newtheme();
});

// addCell button adds another data cell
$("#addCell").click(function () {
    var tstart = '<div class="input-group col-xs-4 col-sm-3">'
    var tend = ' <span class="input-group-addon x" >&times;</span></div>'
    var newcell = tstart + '<input  class="choose data form-control"  value="#FFFFFF" />' + tend;
    $("#data").append(newcell); //add the new cell
    applyColors(); //make cells show their colors
    generate(); //generate the json text area 
});

// Helper Functions
//
function showstrip(item) {
    //show the data colors as a strip when clicking on the name in load dialog
    $('#colors').html(item.name + '&nbsp;')
    $.each(item.dataColors, function (index, value) {
        $('#colors').append('<span style="background-color:' + value + '"> &nbsp;&nbsp;</span>');
    });
    $('#colors').append('<span style="background-color:' + item.background + '"> &nbsp;&nbsp;</span>');
    $('#colors').append('<span style="background-color:' + item.foreground + '"> &nbsp;&nbsp;</span>');
    $('#colors').append('<span style="background-color:' + item.tableAccent + '"> &nbsp;&nbsp;</span>');

};
function loadTheme(theme) {
    // creates the text input cells and uses its value for background color
    $("#themeName").val(theme.name);
    // general section shows background, foreground, table accent
    var bg = '<label  for="bg">Background </label>';
    bg = bg + '<input  id="bg" class="choose form-control"  value="' + theme.background + '"/>';
    var fg = '<label  for="fg">Foreground </label>';
    fg = fg + '<input  id="fg" class="choose form-control"  value="' + theme.foreground + '"/>';
    var ta = '<label  for="ta">Table Accent </label>';
    ta = ta + '<input  id="ta" class="choose form-control"  value="' + theme.tableAccent + '"/>';
    $("#bgdiv").html(bg);
    $("#fgdiv").html(fg);
    $("#tadiv").html(ta);

    //data colors section - build a cell for each value
    var dc = "";
    var tstart = '<div class="input-group col-xs-4 col-sm-3">'
    var tend = ' <span class="input-group-addon x" >&times;</span></div>'

    $.each(theme.dataColors, function (index, value) {
        dc = dc + tstart + '<input type="text" class="choose data form-control"  value="' + value + '">' + tend;
    });
    $("#data").html(dc);
};

// functions called from above
function applyColors() {
    // apply the colors of cells. These functions need to be here because cells are 
    // created after the page loads
    $(".choose").colorpicker();

    $(".choose").each(function () {
        bgcolor = $(this).val();
        textcolor = txtcolor(bgcolor);
        $(this).css({ "backgroundColor": bgcolor });
        $(this).css({ "color": textcolor });

        // delete the cell when "x" is clicked
        $(".x").click(function () {
            $(this).prev().remove();
            $(this).remove();
            generate();
        });
    });
    //update cells each time user types new value
    $(".choose").change(function () {
        bgcolor = $(this).val();
        textcolor = txtcolor(bgcolor);
        $(this).css({ "backgroundColor": bgcolor });
        $(this).css({ "color": textcolor });
        generate(); //regenerate final theme at each cell change
    });
};


function txtcolor(bgcolor) {
    // simple text color assignment, not the greatest but ok for now
    var cl = bgcolor.toLowerCase();
    if (cl == "#ffffff" | cl == "#fff" | cl == "white") {
        textcolor = "#000000"
    } else {
        textcolor = "#ffffff"
    };
    return textcolor;
};

function generate() {
    // generate new theme based on current values
    var newTmp = new Object();
    newTmp.name = $("#themeName").val();
    var dcs = [];
    $(".data").each(function () {
        dcs.push($.trim($(this).val()));
    });
    newTmp.dataColors = dcs;
    newTmp.background = $.trim($("#bg").val());
    newTmp.foreground = $.trim($("#fg").val());
    newTmp.tableAccent = $.trim($("#ta").val());
    $("#output").val(JSON.stringify(newTmp), null, '\t');
    // preview plot
    var data = [[["a",23],["b",8],["c",5],["d",25],["e",20],["f",17],["g",70],["h",25]]];
    var containerHeight = $("#chart").parent("div.container").height();
    var options = {
        seriesDefaults:{
            shadow: false, 
            renderer:$.jqplot.PieRenderer, 
            rendererOptions:{
                // rotate the starting position of the pie around to 12 o'clock.
                startAngle: -90
            }},
        seriesColors: newTmp.dataColors,
        grid: {shadow:false, backgroundColor: "#ffffff"},
        legend:{ show:false },
        height: containerHeight,
        }; 
    var plot = $.jqplot('chart', data, options);
    // style the table
    $('table tr').css("background-color",newTmp.background);
    $("table").css("color",newTmp.foreground);
    $('table th').css("background-color",newTmp.tableAccent);
    if (newTmp.tableAccent != newTmp.background) {
        $('table th').css("color",newTmp.background);
    }


};
function newtheme (){
    var newthm = {"name":"newTheme",
        "dataColors":["#FFFFFF"],
        "background":"#FFFFFF",
        "foreground":"#000000",
        "tableAccent":"#FFFFFF"};
    loadTheme(newthm);  // creates the text input cells and colors them
    applyColors(); //make cells show their colors
    generate(); //generate the json text area
}


});
