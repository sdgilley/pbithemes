// JavaScript Document

$(document).ready ( function () {
    //initialize
    //$('#inputDlg').modal('show');
    var tmpl;
    var inp = '{ \
        "name": "Waveform", \
        "dataColors": ["#31B6FD", "#4584D3", "#5BD078", "#A5D028", "#F5C040", "#05E0DB", "#3153FD", "#4C45D3", "#5BD0B0", "#54D028", "#D0F540", "#057BE0"], \
        "background":"#FFFFFF", \
        "foreground": "#4584D3", \
        "tableAccent": "#31B6FD" \
        }';
     $("#input").val( inp );
    
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
  

    $("#loadnew").click(function(){
        tmpl = $.parseJSON( $("#input").val() );
        LoadColors(tmpl);
        generate();
    });

    function LoadColors(tmpl){        

        $("#tmplName").html( "Template: <strong> " + tmpl.name + "</strong>" );

        var bg = 'Background: <input type="text" id="bg" class="choose"  value=" ' + tmpl.background + '"/> &nbsp; &nbsp;';
        var fg = 'Foreground: <input type="text"  id="fg"class="choose"  value=" ' + tmpl.foreground + '"/> &nbsp; &nbsp;';
        var ta = 'Table accent: <input type="text" id="ta" class="choose"  value=" ' + tmpl.tableAccent + '"/>';
        $("#general").html (bg + fg + ta);

        //data colors
        var dc = "Data Colors:</br>";
        $.each(tmpl.dataColors, function (index, value) {
        dc = dc + '<input type="text" class="choose data"  value=" ' + value + '"/>'
        });
        $("#data").html (dc);


        //apply the colors for newly generated items
        $( ".choose" ).each(function() {
        $(this).css({"backgroundColor" : $(this).val() });

        //update cells each time user types new value
         $( ".choose" ).change(function() {
        $(this).css({"backgroundColor" : $(this).val() });
        generate();
        });

    });
    
};

    function generate (){
        // generate new template based on current values
        var newTmp = new Object();
        newTmp.name = tmpl.name;
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
            