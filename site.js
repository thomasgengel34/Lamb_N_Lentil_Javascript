"use strict";

var getKey = function () {
    const key = "sFtfcrVdSOKA4ip3Z1MlylQmdj5Uw3JoIIWlbeQm";
    return key;
};

(function () {
    $('#displayAboutPage').hide();
})();

// note that the USDA json files are not necessarily correct json, and errors have been seen by me too many times. I need to write my own methods.


var displayList = function (stringResult) { 
   var toUI = checkForErrorReturned(stringResult);
    if (toUI==="") {
        toUI = "Search Term : " + displayQuery(stringResult);
        var total = displayTotal(stringResult);
        toUI = toUI + "  Total Found: " + total + "  "; 
        $('#results').text(toUI); 
        var text = populateResultsButtonText(total);
        addListSearchButton(resultsButtonText);
    }
};

var checkForErrorReturned = function (incoming) {
    var message = ""; 
    if (incoming.indexOf("error") !== -1) {
        var errorMessage = "Sorry. Something went wrong with the search. Please review it and then try again. If that does not work,  call me or something and I will look into it.";
        message= errorMessage;
    }
    return message;
};

var populateResultsButtonText = function (total) {
    var text = "Show First Fifty Results";
    if (total===50) {
        text = "Show Fifty Results";
    }
    if (total < 50 && total > 1) {
        text = "Show the " + total + " Results";
    }
    if (total - 1 < 1) {
       text = "Show Result";
    }
    return text;
};



function buildFoodListSearchUrl(searchTerm) {
    var defaultCount = 50;
    var key = getKey();
    var string1 = "https://api.nal.usda.gov/ndb/search?format=json&q=";
    var string2 = "&max=" + defaultCount + "&offset=0&api_key=";
    var searchUrl = string1.concat(searchTerm, string2, key);
    return searchUrl;
}

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
        var ndbno = item[i].slice(index + 9);

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
    var searchUrl = buildFoodReportSearchUrl(z);
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

function buildFoodReportSearchUrl(z) {
    var string1 = " https://api.nal.usda.gov/ndb/V2/reports?ndbno=";
    var string2 = "&type=b&format=json&api_key=";
    var key = getKey();
    var searchUrl = string1.concat(z, string2, key);
    return searchUrl;
}

function formatFoodReport(result) {
    var tab = "&nbsp;&nbsp;&nbsp;&nbsp;";
    var formattedReport = "<div class=\"foodReport\"><h1>Nutrition Facts</h1><div class=\"hr\"></div>";
    var name = getValue(result, 'name', 7, 'ds', 3);
    formattedReport += "<br/><strong>" + name + "</strong>";
    var qty = getValue(result, 'qty', 6, 'value', 2);
    qty = qty === 0 ? "" : qty;
    var servingSize = getValue(result, 'label', 8, "eqv", 3);
    formattedReport += "<br/><strong>Serving Size: " + qty + '  ' + servingSize + "</strong>";
    formattedReport += "<div class= hrWide></div>";
    var calories = getNutritionalValueAndUnit(result, 208);
    calories = calories.substring(0, calories.length - 39);
    formattedReport += "<div class=\"hrWide\"></div > " +     //   += "<div>" +
        "<div id=\"AmountPerServing\">Amount per serving</div>" +
        "<div id=\"Calories\">" +
        "<div id=\"caloriesNumber\">" +
        calories +
        "</div>" +
        "Calories" +
        "</div >";
    formattedReport += "<div class=\"hrThin\"></div>";
    formattedReport += "<p id=\"percentDailyValue\">% Daily Value*</p>";
    formattedReport += "<hr>";
    var totalFat = getNutritionalValueAndUnit(result, 204);
    formattedReport += "<strong>Total Fat</strong>  " + totalFat;
    formattedReport += "<hr>";
    var satFat = getNutritionalValueAndUnit(result, 606);
    formattedReport += "<br/>" + tab + "Saturated Fat " + satFat;
    formattedReport += "<hr>";
    var transFat = getNutritionalValueAndUnit(result, 605);
    formattedReport += "<br/>" + tab + "Trans Fat " + transFat;
    formattedReport += "<hr>";
    var cholesterol = getNutritionalValueAndUnit(result, 601);
    formattedReport += "</br><strong>Cholesterol</strong> " + cholesterol;
    formattedReport += "<hr>";
    var sodium = getNutritionalValueAndUnit(result, 307);
    formattedReport += "</br><strong>Sodium</strong> " + sodium;
    formattedReport += "<hr>";
    var totalCarbohydrate = getNutritionalValueAndUnit(result, 205);
    formattedReport += "</br><strong>Total Carbohydrate</strong> " + totalCarbohydrate;
    formattedReport += "<hr>";
    var dietaryFiber = getNutritionalValueAndUnit(result, 291);
    formattedReport += "</br>" + tab + "Dietary Fiber " + dietaryFiber;
    formattedReport += "<hr>";
    var totalSugars = getNutritionalValueAndUnit(result, 269);
    formattedReport += "</br>" + tab + "Total Sugars " + totalSugars;
    formattedReport += "<hr>" + tab + tab + "The USDA database does not yet contain information on added sugars.<hr>";
    var protein = getNutritionalValueAndUnit(result, 203);
    formattedReport += "</br><strong>Protein</strong> " + protein;
    formattedReport += "<div class= hrWide></div>";
    var vitaminD = getNutritionalValueAndUnit(result, 324);
    var calcium = getNutritionalValueAndUnit(result, 301);
    formattedReport += "</br> Vitamin D  " + vitaminD + "   &#9679;   " + "Calcium " + calcium;
    formattedReport += "<hr>";
    var iron = getNutritionalValueAndUnit(result, 303);
    var potassium = getNutritionalValueAndUnit(result, 306);
    formattedReport += "</br> Iron  " + iron + "   &#9679;   " + "Potassium " + potassium;
    formattedReport += "<hr>";
    formattedReport += "*The % Daily Value tells you how much a nutrient in a serving of food contributes to a daily diet.  2,000 calories a day is used for general nutrition advice.<hr> ";
    var ingredients = getValue(result, 'ing', 14, 'upd', 3);

    formattedReport += "<br/><strong>INGREDIENTS:</strong>" + ingredients;
    var updatedDate = getValue(result, "upd", 6, 'nutrients', 4);
    formattedReport += "   updated: " + updatedDate;
    var manu = getValue(result, 'manu', 7, 'ru', 3);
    formattedReport += "<br/><strong>DISTRIBUTED BY:<br/>" + manu + "</strong>";

    formattedReport += "</div></div>";
    return formattedReport + "<br/><br/>" + result;
}

function getValue(item, itemKey, foreCount, nextItem, backCount) {
    var index = item.indexOf(itemKey);
    var name = item.slice(index + foreCount);
    index = name.indexOf(nextItem);
    name = name.slice(0, index - backCount);
    return name;
}

var dv;

function getNutritionalValueAndUnit(result, id) {

    var n = getValue(result, 'nutrient_id":"' + id, 0, '},', 0);

    var notFound = {
        "nutrient": "none",
        "nutrient_id": -1,
        "unit": "g",
        "dv": 0
    };
    var selected = minDailyReq.filter(val => { return val.nutrient_id === id; }) || notFound;

    var dv = 0;
    var dvUnit = "";
    if (selected[0]) {
        dv = selected[0].dv || 0;
        dvUnit = selected[0].unit || "";
    }


    var nMeasures = getValue(n, "measures", 12, '" ]', 0);
    var measures = getValue(nMeasures, "value", 8, '}', 1);
    if (!measures) {
        measures = 0;
    }
    var unit = getValue(nMeasures, "eunit", 8, '",', 0);
    var percentage = "";
    if (dv !== 0) {
        percentage = 100 * measures / dv + "%";
    }

    var valueAndUnit = measures + unit + "<span class=\"rightjustify\">" + percentage + "</span>";
    return valueAndUnit;
}

var displayQuery = function (goesIn) {
    var index = goesIn.indexOf('"q": "');
    var result = goesIn.slice(index + 6, 100);
    index = result.indexOf('",');
    result = result.slice(0, index);
    return result;
};


var displayTotal = function (usdaFoodList) {
    var index = usdaFoodList.indexOf('total');
    var total = usdaFoodList.slice(index + 8, 100);
    index = total.indexOf(',');
    total = total.slice(0, index);
    return total;
};