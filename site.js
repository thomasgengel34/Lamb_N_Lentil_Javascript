"use strict";

var stringResult = "";
var ndbno = "";
var i;
var key = "sFtfcrVdSOKA4ip3Z1MlylQmdj5Uw3JoIIWlbeQm";

(function () {


    $(document).on("click", "#ingredientSearchSubmitBtn", function () {
        var searchTerm = $('#foodsSearchBox').val();

        var defaultCount = 50;
        var string1 = "https://api.nal.usda.gov/ndb/search?format=json&q=";
        var string2 = "&max=" + defaultCount + "&offset=0&api_key=";
        var searchUrl = string1.concat(searchTerm, string2, key);
        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var result = this.responseText;
                displayList(result);
            }
        };
        xhttp.open('GET', searchUrl);
        xhttp.send();
    }
    );
    // note that the USDA json files are not necessarily correct json, and errors have been seem by me too many times. I need to write my own methods.

    function parseResult(result) {
        return String(result);
    }

    function displayList(result) {
        stringResult = parseResult(result);

        var toUI;
        if (stringResult.indexOf("error") !== -1) {
            var errorMessage = "Sorry. Something went wrong with the search. Please review it and then try again. If that does not work,  call me or something and I will look into it.";
            toUI = errorMessage;
        }
        else {
            toUI = "Search Term : " + displayQuery(stringResult);
            toUI = toUI + "  Total Found: " + displayTotal(stringResult) + "  ";
        }

        $('#results').text(toUI);
        addListSearchButton("Show First Fifty Results");


        $('#displayAboutPage').hide();
    }

    function displayQuery(stringResult) {
        var index = stringResult.indexOf('"q": "');
        var searchQuery = stringResult.slice(index + 6, 100);
        index = searchQuery.indexOf('",');
        searchQuery = searchQuery.slice(0, index);
        return searchQuery;
    }

    function displayTotal(stringResult) {
        var index = stringResult.indexOf('total');
        var searchTotal = stringResult.slice(index + 8);
        index = searchTotal.indexOf(',');
        searchTotal = searchTotal.slice(0, index);
        ndbno = Array[searchTotal];
        return searchTotal;
    }
})();

function addListSearchButton(showAllResults) {
    var r = $('<input/>').attr({
        type: "button",
        id: "field",
        value: showAllResults,
        onclick: "showAllResultClickListener()"
    });
    $("#results").append(r);
}

function showAllResultClickListener() {
    // split item out as a separate string 
    var item1 = stringResult.indexOf('item');
    var item2 = stringResult.indexOf(']');
    var item = stringResult.slice(item1 + 8, item2);

    // turn item into an array
    item = item.split('}');
    // show the first name 
    for (i = 0; i < item.length - 1; i++) {
        var name = getValue(item[i], 'name', 8, 'ndbno', 20);
        $("#results").append("<br/>" + name);

        var index = item[i].indexOf('ndbno');
        ndbno = item[i].slice(index + 9);

        index = ndbno.indexOf(',');
        ndbno = ndbno.slice(0, index - 1);

        $("#results").append("<br/>" + ndbno);
        addItemDetailButton(ndbno);
    }
}

function addItemDetailButton(ndbno) {
    var button = $('<input/>').attr({
        type: "button",
        id: ndbno,
        value: "Show Nutrient Details ",
        onclick:
            "showNutrientDetailsClickListener(id)"
    });
    $("#results").append(button);
}

function showNutrientDetailsClickListener(z) {
    var string1 = " https://api.nal.usda.gov/ndb/V2/reports?ndbno=";
    var string2 = "&type=b&format=json&api_key=";
    var searchUrl = string1.concat(z, string2, key);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var result = formatFoodReport(this.responseText);
            $("#results").empty();
            $("#results").append(result);
        }
    };
    xhttp.open('GET', searchUrl);
    xhttp.send();
}

function formatFoodReport(result) {
    var formattedReport = "<div class=\"foodReport\"><h2>Nutrition Facts</h2>";
    var name = getValue(result, 'name', 7, 'ds', 3);
    formattedReport +=   "<br/><strong>" + name + "</strong>";
    var qty = getValue(result, 'qty', 6, 'value', 2);
    var servingSize = getValue(result, 'label', 8, "eqv", 3);
    formattedReport += "<br/>Serving Size: " + qty + '  ' + servingSize;
    formattedReport += "<hr>"; 
  
    var nutrients = getValue(result, "nutrients", 11, "footnotes", 2).split('},{');
    var nutrient208 = getValue(result, 'nutrient_id":"208', 0, '},',0);
    var nutrient208Measures = getValue(nutrient208, "measures", 12, '" ]', 0);  
    var calories = getValue(nutrient208Measures, "value", 8, '}', 1);
    formattedReport += "Amount per serving<h3>Calories</h3>" + "<h2>" + calories + "</h2>";
    formattedReport += "<hr>";
    formattedReport += "<p class \"right\">% Daily Value*</p>";
    formattedReport += "<hr>";
    var nutrient204 = getValue(result, 'nutrient_id":"204', 0, '},', 0);
    var nutrient204Measures = getValue(nutrient204, "measures", 12, '" ]', 0); 
    var totalFat = getValue(nutrient204Measures, "value", 8, '}', 1);
    formattedReport += "<strong>Total Fat</strong>  " + totalFat;
    var totalFatUnit = getValue(nutrient204Measures, "eunit",8, '",', 0);
    alert(totalFatUnit);
    formattedReport += totalFatUnit;
    var ingredients = getValue(result, 'ing', 20, 'upd', 3);
    formattedReport += "<br/><strong>INGREDIENTS:</strong>" + ingredients;
    var updatedDate = getValue(result, "upd", 6, 'nutrients', 4);
    formattedReport += "   updated: " + updatedDate;
    var manu = getValue(result, 'manu', 7, 'ru', 3);
    formattedReport += "<br/><strong>DISTRIBUTED BY:<br/>" + manu + "</strong>";
    formattedReport+="</div>"
    return formattedReport + "<br/><br/>" + result ;
}

function getValue(item, itemKey, foreCount, nextItem, backCount) {
    var index = item.indexOf(itemKey);
    var name = item.slice(index + foreCount);
    index = name.indexOf(nextItem);
    name = name.slice(0, index - backCount);
    return name;
}