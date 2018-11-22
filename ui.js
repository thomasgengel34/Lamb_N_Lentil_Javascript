"use strict";
 
(function displayAboutPageIIfe() {
    $('#displayAboutPage').hide(); 
    
})();

$('#foodsSearchSubmitBtn').click(ingredientSearchSubmitBtnClickListener);

var displayList = function (json) {  
    var toUI = checkForErrorReturned(json);  
    if (toUI === "") {
        toUI = "Search Term : " + json.list.q; 
         var total = json.list.total;   
         toUI = toUI + "  Total Found: " + total + "  ";
         $('#results').text(toUI);
        var text = populateResultsButtonText(total);
     
        addListSearchButton(text);
    }
};
 
function ingredientSearchSubmitBtnClickListener() { 
    let search  = $('#foodsSearchTextBox').val(); 
    ingredientSearchSubmit(search);
}

function addListSearchButton(text) {
    var r = $('<input/>').attr({
        type: "button",
        id: "field",
        value: text,
        onclick: "showAllResultClickListener()"
    });
    $("#results").append(r);
}

function showAllResultClickListener() {
    console.log("here");
}


function addItemDetailButton(namesAndNdbnos) {
    console.log(namesAndNdbnos);
  //  namesAndNdbnos.foreach(myFunction(ndbno)); 
}; 

function myFunction() {
  var button = $('<input/>').attr({
            type: "button",
            id: ndbno,
            value: "Show Nutrient Details ",
            onclick:
                "showNutrientDetailsClickListener(id)"
    });

        $("#results").append("<br/>" + name + "<br/>" + ndbno + button); 
} 