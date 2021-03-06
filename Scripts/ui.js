﻿"use strict";
 
 
var displayList = function (json) {
    var toUI = checkForErrorReturned(json);
    if (toUI === "") {
        toUI = "Search Term : " + json.list.q;
        var total = json.list.total;
        toUI = toUI + "  Total Found: " + total + "  ";
        document.getElementById('results').text(toUI);
        var text = populateResultsButtonText(total);

        addListSearchButton(text);
    }
};


function addListSearchButton(text) {
    var r = document.getElementByClass('<input/>').attr({
        type: "button",
        id: "field",
        value: text,
        onclick: "showAllResultClickListener()"
    });
    document.getElementById("results").append(r);
}

// this appears more advanced than addListSearchButton(text). Not sure which one should be used.  .  
function myFunction() {
    var button = document.getElementByClass('<input/>').attr({
        type: "button",
        id: ndbno,
        value: "Show Nutrient Details ",
        onclick:
            "showNutrientDetailsClickListener(id)"
    });

    document.getElementById("results").append("<br/>" + name + "<br/>" + ndbno + button);
}
 


const getDataFromFoodSearchInput = function( searchString = "",filterString = "", IsReverseFilterChecked = false, sortOrderChecked = false) { 
    
    if (document) {
        let f = "foodsSearchTextBox";
        if (document.getElementById(f)) {
            searchString = document.getElementById(f).value;
        }
        f = "foodListFilterTextBox";
        if (document.getElementById(f)) {
            filterString = document.getElementById(f).value;
        }
        f = "reverseFilterFoodSearchCheckbox";
        if (document.getElementById(f)) {
            IsReverseFilterChecked = document.getElementById(f).checked; 
            
        }
        f = "ZtoA";
        if (document.getElementById(f)) {
            sortOrderChecked = document.getElementById(f).checked;
        }

    }
    const settings =  
        { "searchString": searchString, "filterString": filterString, "IsReverseFilterChecked": IsReverseFilterChecked, "sortOrderChecked": sortOrderChecked };
    
    return settings;
};
