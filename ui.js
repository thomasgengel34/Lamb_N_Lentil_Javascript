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

async function ingredientSearchSubmitBtnClickListener(search) {    
    let query = document.getElementById("foodsSearchTextBox").value; 
    if (query===null ||query===""||query===undefined) {
        query = search;
    } 
    const response = await ingredientSearchSubmit(query);   
    const text = await formatFoodList(response);  
    document.getElementById('results').innerHTML = text;
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

function showAllResultClickListener() {
    console.log("here");
}


function addItemDetailButton(namesAndNdbnos) {
    console.log(namesAndNdbnos);
};


