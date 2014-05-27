var url = "https://docs.google.com/spreadsheet/pub?key=0AhPDHGEW3vsydFBSWFpRRnljLUNFS2VKaS1rYnVNckE&output=html";
var googleSpreadsheet = new GoogleSpreadsheet();
googleSpreadsheet.url(url);
var restos = null;
googleSpreadsheet.load(function(result) {
    restos = result;
});


var delay = 40;
var cpt = 0;
var cptLimit = 50;
var stop = false;
var resto = null;

$(window).load(function(){
    getResto();
    $('#launch').on('click', function(e){
        e.preventDefault();
        $('#intro').hide();
        $('#result').show();
        if (delay == 20){
            delay = 20;
            cpt = 0;
            stop = false;
            getResto();
        }
    });
    $('#reload').on('click', function(e){
        e.preventDefault();
        if (delay == 20){
            delay = 20;
            cpt = 0;
            stop = false;
            getResto();
        }
    });
});

function getResto()
{
    setTimeout(function(){
        var rand = parseInt(Math.random() * Object.size(restos.items));
        resto = restos.items[rand];
        $('#resto').html(resto.id);
        $('#prix').html(resto.prix);
        if (!stop) {
            getResto();
        }
    }, delay);

    cpt++;

    if (cpt > cptLimit) {
        stop = true;
        delay = 20;
        cpt = 0;
    }
}

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
