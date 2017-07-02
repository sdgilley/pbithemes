---
---

// JavaScript Document

$(document).ready(function () {
    //initialize
    $('.choose').colorpicker();
    var themes = {{ site.data | jsonify }};

for (var prop in themes) {
    var item = $(themes[prop])[0];
    $("#files").append("<option>" + item.name + '</option>');
}

// click on a file
$("#files").change(function () {
    var item = $(themes[$("#files").val()])[0];
    $("#input").val(JSON.stringify(item));
    showstrip(item);
});

function showstrip(item) {
    //show the data colors
    $('#colors').html(item.name + ' ')
    $.each(item.dataColors, function (index, value) {
        $('#colors').append('<span style="background-color:' + value + '"> &nbsp;&nbsp;</span>');
    });
}

// after closing the dialog, read the input to populate the main page, and show the result
$("#loadNew").click(function () {
    theme = JSON.parse($("#input").val());
    loadTheme(theme);  // creates the text input cells and colors them
    applyColors(); //make cells show their colors
    generate(); //generate the json text area
    $("#result").removeClass('hidden'); //show the div on the main page
});

// addCell button adds another data cell
$("#addCell").click(function () {
    var tstart = '<div class="input-group col-xs-4">'
    var tend = ' <span class="input-group-addon x" >&times;</span></div>'
    var newcell = tstart + '<input  class="jscolor choose data form-control"  value="#FFFFFF" />' + tend;
    $("#data").append(newcell); //add the new cell
    applyColors(); //make cells show their colors
    generate(); //generate the json text area 
});


function loadTheme(theme) {
    // creates the text input cells and uses its value for background color
    // TODO: change text color when value is too dark
    // TODO: add color picker for easier input
    // TODO: currently no error checking.  bad values won't change the current cell color. 
    $("#themeName").html("Theme: <strong> " + theme.name + "</strong>");
    // general section shows background, foreground, table accent
    var bg = '<label  for="bg">Background </label>';
    bg = bg + '<input  id="bg" class="jscolor choose form-control"  value="' + theme.background + '"/>';
    var fg = '<label  for="fg">Foreground </label>';
    fg = fg + '<input  id="fg" class="jscolor choose form-control"  value="' + theme.foreground + '"/>';
    var ta = '<label  for="ta">Table Accent </label>';
    ta = ta + '<input  id="ta" class="jscolor choose form-control"  value="' + theme.tableAccent + '"/>';

    $("#bgdiv").html(bg);
    $("#fgdiv").html(fg);
    $("#tadiv").html(ta);

    //data colors section - build a cell for each value
    var dc = "";
    var tstart = '<div class="input-group col-xs-4">'
    var tend = ' <span class="input-group-addon x" >&times;</span></div>'

    $.each(theme.dataColors, function (index, value) {
        dc = dc + tstart + '<input type="text" class="choose data form-control"  value="' + value + '">' + tend;
    });
    $("#data").html(dc);
};

function applyColors() {
    //apply the background color to each cell
        $(".choose").colorpicker();
        $(".choose").each(function () {
        bgcolor = $(this).val();
         $(this).css({ "backgroundColor": bgcolor });

        //update cells each time user types new value
        $(".choose").change(function () {
            bgcolor = $(this).val();
            // textcolor = findcolor(bgcolor);
            $(this).css({ "backgroundColor": bgcolor });
            // $(this).css({ "color": textcolor });
            generate(); //regenerate final theme at each cell change
        });

        // delete the cell when "x" is clicked
        $(".x").click(function () {
            $(this).prev().remove();
            $(this).remove();
            generate();
        });

    });
}
function findcolor(bcolor) {
    var cl = bcolor.toLowerCase();
    // simple text color assignment, not the greatest but ok for now
    if (cl == "#ffffff" | cl == "#fff" | cl == "white") {
        textcolor = "#000000"
    } else {
        textcolor = "#ffffff"
    };
        $(this).css({ "backgroundColor": bgcolor });
        $(this).css({ "color": textcolor });
}

function generate() {
    // generate new theme based on current values
    var newTmp = new Object();
    newTmp.name = theme.name;
    var dcs = [];
    $(".data").each(function () {
        dcs.push($.trim($(this).val()));
    });
    newTmp.dataColors = dcs;
    newTmp.background = $.trim($("#bg").val());
    newTmp.foreground = $.trim($("#fg").val());
    newTmp.tableAccent = $.trim($("#ta").val());
    $("#output").val(JSON.stringify(newTmp), null, '\t');

};

});
