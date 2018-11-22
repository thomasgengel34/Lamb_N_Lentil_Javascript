 
"use strict";

var getKey = function () {
    const key = "sFtfcrVdSOKA4ip3Z1MlylQmdj5Uw3JoIIWlbeQm";
    return key;
};
 
var populateResultsButtonText = function (total) {
    var text = "Show First Fifty Results";
    if (total === 50) {
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


var displayList = function (json) {
    console.log("displayList 1");
    console.log(json);
    console.log("displayList 2");

};



function buildFoodListSearchUrl(searchTerm) {
    var defaultCount = 50;
    var key = getKey();
    var string1 = "https://api.nal.usda.gov/ndb/search?format=json&q=";
    var string2 = "&max=" + defaultCount + "&offset=0&api_key=";
    var searchUrl = string1.concat(searchTerm, string2, key); 
    return searchUrl;
}
 

function buildAnArrayOfNamesAndNdbnos(json) { 
    var array = []; 
    if (!json.item  ) {
        return getErrorMessage();
    }
    for (var i = 0; i < json.item.length; i++) {
 
        var element = {"name": json.item[i].name, "ndbno":json.item[i].ndbno }; 
        array.push(element);
    };  
    return array; 
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
            var formattedReport = "<div class=\"foodReport\">";
                 formattedReport += "<div id=\"foodReportHeaderSection\" >";
                             formattedReport += formatFoodReportHeader(result);
                formattedReport += "</div>"; 
                formattedReport += "<div class=\"foodReportMiddleSection\">";
                             formattedReport += formatFoodReportMiddleSection(result , tab);
                formattedReport += "</div>"; 
                formattedReport += "<div id=\"foodReportBottomSection\">";
                             formattedReport += formatFoodReportBottomSection(result );
                formattedReport += "</div>";
            formattedReport += "</div>";
            formattedReport += "</div>";
    return formattedReport + "<br/><br/>" + result;
}



function formatFoodReportHeader(result) {
    var headerSection = "<h1>Nutrition Facts</h1>";
    headerSection +="<div class=\"hr\"></div>";
    var name = getValue(result, 'name', 7, 'ds', 3);
    headerSection += "<br/><strong>" + name + "</strong>";
    var qty = getValue(result, 'qty', 6, 'value', 2);
    qty = qty === 0 ? "" : qty;
    var servingSize = getValue(result, 'label', 8, "eqv", 3);
    headerSection += "<br/><strong>Serving Size: " + qty + '  ' + servingSize + "</strong>";
    headerSection += "<div class= hrWide></div>";
    return headerSection;
}

function formatFoodReportMiddleSection(result,  tab) {  
    var middleSection = "<div class=\"hrWide\"></div > ";
    middleSection +=  buildCaloriesBlock(middleSection, result);
    middleSection += "<div class=\"hrThin\"></div>";
    middleSection += "<p id=\"percentDailyValue\">% Daily Value*</p>";
    middleSection += "<hr>";
    middleSection += getNutritionalValueAndUnit(result, 204); 
    middleSection += "<hr>";
    middleSection += getNutritionalValueAndUnit(result, 606); 
    middleSection += "<hr>";
    middleSection += getNutritionalValueAndUnit(result, 605); 
    middleSection += "<hr>";
    middleSection += getNutritionalValueAndUnit(result, 601); 
    middleSection += "<hr>";
    middleSection += getNutritionalValueAndUnit(result, 307); 
    middleSection += "<hr>";
    middleSection += getNutritionalValueAndUnit(result, 205); 
    middleSection += "<hr>";
    middleSection += getNutritionalValueAndUnit(result, 291); 
    middleSection += "<hr>";
    middleSection += getNutritionalValueAndUnit(result, 269); 
    middleSection += "<hr>";
    middleSection += tab + tab + "The USDA database does not yet contain information on added sugars.";
    middleSection += "<hr>";
    middleSection += getNutritionalValueAndUnit(result, 203); 
    middleSection += "<div class= hrWide></div>"; 
    return middleSection;
}

function buildCaloriesBlock(middleSection, result) {
    var calories = getNutritionalValue(result, 208);  
    middleSection += "<div id=\"AmountPerServing\">Amount per serving</div>" +
        "<div id=\"Calories\">" + "Calories" +
             "<div id=\"caloriesNumber\">" +
              calories +
              "</div>" + 
        "</div>"; 
    return middleSection;
}

function formatFoodReportBottomSection(result) {
    var vitaminD = getNutritionalValueAndUnit(result, 324);
    var calcium = getNutritionalValueAndUnit(result, 301);
     
    var bottomSection = buildBottomSectionRow(vitaminD, calcium);
    bottomSection += "<hr>";
    var iron = getNutritionalValueAndUnit(result, 303);
    var potassium = getNutritionalValueAndUnit(result, 306);
    bottomSection += buildBottomSectionRow(iron, potassium); 
    bottomSection += "<hr>";
    bottomSection += "*The % Daily Value tells you how much a nutrient in a serving of food contributes to a daily diet.  2,000 calories a day is used for general nutrition advice.<hr> ";
    var ingredients = getValue(result, 'ing', 14, 'upd', 3);
    bottomSection += "<br/><strong>INGREDIENTS:</strong>" + ingredients;
    var updatedDate = getValue(result, "upd", 6, 'nutrients', 4);
    bottomSection += "   updated: " + updatedDate;
    var manu = getValue(result, 'manu', 7, 'ru', 3);
    bottomSection += "<br/><strong>DISTRIBUTED BY:<br/>" + manu + "</strong>";
    return bottomSection;
}

function buildBottomSectionRow(vitaminD, calcium) {
    var row = "<div>";
        row += " <div class=\"third floatLeft\"> " + vitaminD + "</div> ";
        row += " <div class=\"third center floatLeft  \">    &#9679;   " + "</div>";
        row+= "<div class=\"third rightjustify\">" + calcium + "</div>";
    row+="</div>";
    return row;
}

function getValue(item, itemKey, foreCount, nextItem, backCount) {
    var index = item.indexOf(itemKey);
    var value = item.slice(index + foreCount);
    index = value.indexOf(nextItem);
    value = value.slice(0, index - backCount); 
    return value;
    
}
  
function getNutritionalValue(result, id) {
    var n = getValue(result, 'nutrient_id":"' + id, 0, '},', 0); 
    var nMeasures = getValue(n, "measures", 12, '" ]', 0);
    var nutritionalValue = getValue(nMeasures, "value", 8, '}', 1);
    if (!nutritionalValue) {
        nutritionalValue = 0;
    } 
    return nutritionalValue;
}


function getNutritionalValueAndUnit(result, id) {

    var n = getValue(result, 'nutrient_id":"' + id, 0, '},', 0); 
    var nutrientName = getValue(n, ',', 9, 'derivation', 3);  
    var notFound = {
        "nutrient": "none",
        "nutrient_id": -1,
        "unit": "g",
        "dv": 0
    };
    var selected = minDailyReq.filter(val => { return val.nutrient_id === id; }) || notFound;

    var dv = 0; 
    if (selected[0]) {
        dv = selected[0].dv || 0; 
    }


    var nMeasures = getValue(n, "measures", 12, '" ]', 0);
    var measures = getValue(nMeasures, "value", 8, '}', 1);
    if (!measures) {
        measures = 0;
    }
    var unit = getValue(nMeasures, "eunit", 8, '",', 0);
    var percentage = "";
    if (dv !== 0) {
        percentage = (100 * measures / dv).toFixed() + "%";
    }
 

    var piece = "<strong>" + nutrientName + "</strong>  " + measures + unit + "<span class=\"rightjustify\">" + percentage + "</span>";  
    return piece;
}
 


var displayTotal = function (usdaFoodList) {
    var index = usdaFoodList.indexOf('total');
    var total = usdaFoodList.slice(index + 8, 100);
    index = total.indexOf(',');
    total = total.slice(0, index);
    return total;
};