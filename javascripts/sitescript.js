// JavaScript Document

$(document).ready(function () {
    //initialize
    var fileExt = ".json";

    // populate the theme selector
    $.ajax({
        url: '{{ site.github.url }}/images/',
        success: function (data) {
            //list all themes
            $(data).find("a:contains(" + fileExt + ")").each(function () {
                $("#files").append('<option>' + $(this).text());
            });
            $("#fileNames").append('</option>');
        }
    });

    // click on a file
    $("#files").change(function () {
        filename = '{{ site.github.url }}/images/' + $("#files").val()
        $.get(filename, function (data) {
            $("#input").val(JSON.stringify(data));
            showstrip(data);
        }, 'json');
    });

    function showstrip(data) {
        //show the data colors
         $('#colors').html($("#files").val() + ' ')
        $.each(data.dataColors, function (index, value) {
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
        var newcell = tstart + '<input type="text" class="choose data form-control"  value="#FFFFFF" />' + tend;
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
        bg = bg + '<input type="text" id="bg" class="choose form-control"  value="' + theme.background + '"/>';
        var fg = '<label  for="fg">Foreground </label>';
        fg = fg + '<input type="text"  id="fg" class="choose form-control"  value="' + theme.foreground + '"/>';
        var ta = '<label  for="ta">Table Accent </label>';
        ta = ta + '<input type="text" id="ta" class="choose form-control"  value="' + theme.tableAccent + '"/>';

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
        $(".choose").each(function () {
            $(this).css({ "backgroundColor": $(this).val() });

            //update cells each time user types new value
            $(".choose").change(function () {
                $(this).css({ "backgroundColor": $(this).val() });
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
