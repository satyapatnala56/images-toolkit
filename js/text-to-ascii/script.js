var fontCache = {};

let invertColor = false;

var myMap = new Map;
let currFont = 0;


const nextfont = () => {
    if (currFont < 151) {
        currFont++;
        let temp = myMap.get(currFont);

        document.getElementById("fontSelector").value = temp;
        // $(document).trigger('##CHANGE_FONT##', { "fontName": $(this).val() })

        $(document).trigger('##RENDER_ASCII_ART##', { font: temp });
    }
}
const prefont = () => {
    if (currFont > 0) {
        currFont--;
        let temp = myMap.get(currFont);

        document.getElementById("fontSelector").value = temp;
        // $(document).trigger('##CHANGE_FONT##', { "fontName": $(this).val() })

        $(document).trigger('##RENDER_ASCII_ART##', { font: temp });
    }
}
const rendomfont = () => {
    currFont = Math.floor((Math.random() * 151) + 1);
    currFont--;
    let temp = myMap.get(currFont);

    document.getElementById("fontSelector").value = temp;
    // $(document).trigger('##CHANGE_FONT##', { "fontName": $(this).val() })

    $(document).trigger('##RENDER_ASCII_ART##', { font: temp });
}
$(document).ready(function () {

    // populate the select box
    for (var i = 0; i < Figlet.fontList.length; i++) {
        var fontTitle = Figlet.fontList[i].replace('.flf', '').replace('.aol', ''); // remove the file extentions for the title
        $('#fontSelector').append('<option data-index = "' + i + '" value = "' + Figlet.fontList[i] + '">' + fontTitle + '</option>');
        myMap.set(i, Figlet.fontList[i]);
    }
    console.log(myMap);

    /***** NAMED EVENTS *****/

    // change the font and load a new font via jQuery async AJAX request
    $(document).bind('##CHANGE_FONT##', function (e, data) {
        Figlet.loadFont(data.fontName, function (rsp) {
            $(document).trigger('##RENDER_ASCII_ART##', { font: rsp }); // the font has changed, lets call the render ascii art event
        });
    });

    $(document).bind('##RENDER_ASCII_ART##', function (e) {
        Figlet.write($('#theCode').val(), $('#fontSelector').val(), function (str) {
            debug.log(str);
            // console.log(str);
            $('#asciiArt').html('<textarea id="outputText" readonly value wrap = "off" name="output">' + str + '</textarea>');
        });
    });

    /**** END NAMED EVENTS ****/

    /**** BIND UI EVENTS ****/

    // select box change
    $('#fontSelector').change(function () {
        $(document).trigger('##CHANGE_FONT##', { "fontName": $(this).val() })
        currFont = $(this).find(':selected').data('index');
        console.log(currFont);
    });


    // you would think jQuery.change() would cover the keypress event on select boxes? 
    $("#fontSelector").keypress(function () {
        $(document).trigger('##CHANGE_FONT##', { "fontName": $(this).val() })
    });

    // keyup on textarea
    $('#theCode').keyup(function (e) {
        $(document).trigger('##RENDER_ASCII_ART##');
    });

    $('#run').click(function (e) {
        $(document).trigger('##RENDER_ASCII_ART##');
    });

    /**** END UI BIND EVENTS ****/

    // little bit of a onReady hack. i'll fix the API a bit so this can be done better
    $(document).trigger('##CHANGE_FONT##', { "fontName": 'Doh' });
    $('#fontSelector').val('larry3d');

});


const copyText = () =>{
    document.getElementById("outputText").select();
    document.execCommand("copy");
    document.getSelection().removeAllRanges()
}