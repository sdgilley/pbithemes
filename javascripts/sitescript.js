// JavaScript Document

$(document).ready(function () {
    //initialize

    var theme;
    // load initial theme
    var inp = '{ \
        "name": "Waveform", \
        "dataColors": ["#31B6FD", "#4584D3", "#5BD078", "#A5D028", "#F5C040", "#05E0DB", "#3153FD", "#4C45D3", "#5BD0B0", "#54D028", "#D0F540", "#057BE0"], \
        "background":"#FFFFFF", \
        "foreground": "#4584D3", \
        "tableAccent": "#31B6FD" \
        }';
    $("#input").val(inp);

    // selTheme dropdown on Load dialog pre-loads a theme
    $("#selTheme").change(function () {
        var t = $(this).val();
        switch (t) {
            case "waveform":
                inp = '{ \
        "name": "Waveform", \
        "dataColors": ["#31B6FD", "#4584D3", "#5BD078", "#A5D028", "#F5C040", "#05E0DB", "#3153FD", "#4C45D3", "#5BD0B0", "#54D028", "#D0F540", "#057BE0"], \
        "background":"#FFFFFF", \
        "foreground": "#4584D3", \
        "tableAccent": "#31B6FD" \
        }';
                break;
            case "colorblind":
                inp = '{ \
        "name": "ColorblindSafe-Longer", \
        "dataColors": ["#074650", "#009292", "#fe6db6", "#feb5da", "#480091", "#b66dff", "#b5dafe", "#6db6ff", "#914800", "#23fd23"], \
        "background":"#FFFFFF", \
        "foreground": "#074650", \
        "tableAccent": "#fe6db6" \
    }';
                break;
            case "valentine":
                inp = '{ \
        "name": "Valentine\'s Day", \
        "dataColors": ["#990011", "#cc1144", "#ee7799", "#eebbcc", "#cc4477", "#cc5555", "#882222", "#A30E33"],\
        "background":"#FFFFFF",\
        "foreground": "#ee7799",\
        "tableAccent": "#990011"\
    }';
                break;
            default:
            //
        }
        $("#input").val(inp);

    });

    // after closing the dialog, read the input to populate the main page, and show the result
    $("#loadNew").click(function () {
        theme = $.parseJSON($("#input").val());
        loadTheme(theme);  // creates the text input cells and colors them
        applyColors(); //make cells show their colors
        generate(); //generate the json text area
        $("#result").removeClass('hidden'); //show the div on the main page
    });

    // addCell button adds another data cell
    $("#addCell").click(function () {
        var newcell = '<div class="col-xs-4"><input type="text" class="choose data form-control"  value="#FFFFFF" /></div>';
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
        bg = bg + '<input type="text" id="bg" class="choose form-control"  value=" ' + theme.background + '"/>';
        var fg = '<label  for="fg">Foreground </label>';
        fg = fg + '<input type="text"  id="fg" class="choose form-control"  value=" ' + theme.foreground + '"/>';
        var ta = '<label  for="ta">Table Accent </label>';
        ta = ta + '<input type="text" id="ta" class="choose form-control"  value=" ' + theme.tableAccent + '"/>';
        $("#bgdiv").html(bg);
        $("#fgdiv").html(fg);
        $("#tadiv").html(ta);

        //data colors section - build a cell for each value
        var dc = "";
        $.each(theme.dataColors, function (index, value) {
            dc = dc + '<div class="col-xs-4"><input type="text" class="choose data form-control"  value=" ' + value + '"/></div>'
        });
        $("#data").html(dc);


    };

    function applyColors() {
        //apply the background color to each cell
        $(".choose").each(function () {
            $(this).css({ "backgroundColor": $(this).val() });

            //update cells each time user types new value
            $(".choose").change(function () {
                $(this).css({ "backgroundColor": $(this).val() });
                generate(); //regenerate final theme at each cell change
            });

        });
    }


    function generate() {
        // generate new theme based on current values
        var newTmp = new Object();
        newTmp.name = theme.name;
        var dcs = [];
        $(".data").each(function () {
            dcs.push($(this).val());
        });
        newTmp.dataColors = dcs;
        newTmp.background = $("#bg").val();
        newTmp.foreground = $("#fg").val();
        newTmp.tableAccent = $("#ta").val();
        $("#output").val(JSON.stringify(newTmp), null, 4);

    };

});
