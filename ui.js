"use strict";

(function () {
  
        document.getElementById('foodsSearchSubmitBtn').addEventListener("click", ingredientSearchSubmitBtnClickListener);  
})();

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

function ingredientSearchSubmitBtnClickListener() {
    let search = document.getElementById('foodsSearchTextBox').value;
    ingredientSearchSubmit(search);
}

function addListSearchButton(text) {
    var r = document.getElementByClass('<input/>').attr({
        type: "button",
        id: "field",
        value: text,
        onclick: "showAllResultClickListener()"
    });
    document.getElementById("results").append(r);
}

function showAllResultClickListener() {
    console.log("here");
}


function addItemDetailButton(namesAndNdbnos) {
    console.log(namesAndNdbnos);
};

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