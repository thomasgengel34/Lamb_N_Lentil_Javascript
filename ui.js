"use strict";
//const foobar = function () { ingredientSearchSubmit("ff"); };

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
    console.log(40);
    console.log(query);
    console.log(41);
    const response = await ingredientSearchSubmit(query);     
    console.log(42);
    console.log(response);
    console.log(43);
    document.getElementById('results').innerHTML = formatFoodList(response); 
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

// this appears more advanced than addListSearchButton(text). Not sure.  
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


