// JavaScript Document

$(document).ready ( function () {
    //initialize
    //$('#inputDlg').modal('show');
    var theme; 
    // load initial theme
    var inp = '{ \
        "name": "Waveform", \
        "dataColors": ["#31B6FD", "#4584D3", "#5BD078", "#A5D028", "#F5C040", "#05E0DB", "#3153FD", "#4C45D3", "#5BD0B0", "#54D028", "#D0F540", "#057BE0"], \
        "background":"#FFFFFF", \
        "foreground": "#4584D3", \
        "tableAccent": "#31B6FD" \
        }';
     $("#input").val( inp );
    
    // selT dropdown on Load dialog pre-loads a theme
    $("#selT").change(function(){
        var t = $(this).val();
        switch(t) {
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
        $("#input").val( inp );

    });
  
// loadnew button closes the dialog - now read the input to populate the main page.
    $("#loadnew").click(function(){
        theme = $.parseJSON( $("#input").val() );
        LoadColors(theme);  // creates the text input cells and colors them
        generate(); //generates the json text from text input cells
        $("#result").removeClass('hidden');

    });

    function LoadColors(theme){        
        // creates the text input cells and uses value for background colorblind
        // TODO: change text color when value is too dark
        // TODO: add color picker for easier input
        // TODO: currently no error checking.  bad colors won't change the current cell color. 
        $("#themeName").html( "Theme: <strong> " + theme.name + "</strong>" );
        // general section shows background, foreground, table accent
        var bg = 'Background: <input type="text" id="bg" class="choose"  value=" ' + theme.background + '"/> &nbsp; &nbsp;';
        var fg = 'Foreground: <input type="text"  id="fg"class="choose"  value=" ' + theme.foreground + '"/> &nbsp; &nbsp;';
        var ta = 'Table accent: <input type="text" id="ta" class="choose"  value=" ' + theme.tableAccent + '"/>';
        $("#general").html (bg + fg + ta);

        //data colors section - build a cell for each value
        var dc = "Data Colors:</br>";
        $.each(theme.dataColors, function (index, value) {
        dc = dc + '<input type="text" class="choose data"  value=" ' + value + '"/>'
        });
        $("#data").html (dc);


        //apply the background color to each cell
        $( ".choose" ).each(function() {
        $(this).css({"backgroundColor" : $(this).val() });

        //update cells each time user types new value
         $( ".choose" ).change(function() {
        $(this).css({"backgroundColor" : $(this).val() });
        generate(); //regenerate final theme at each cell change
        });

    });
    
};

    function generate (){
        // generate new theme based on current values
        var newTmp = new Object();
        newTmp.name = theme.name;
        var dcs = [];
        $(".data").each(function() {
            dcs.push($(this).val());
        });
        newTmp.dataColors = dcs;
        newTmp.background = $("#bg").val();
        newTmp.foreground = $("#fg").val();
        newTmp.tableAccent = $("#ta").val();
        $("#output").val ( JSON.stringify(newTmp),null,4);

    };
        
});
            