"use strict";


const pageSetup = {

toggleDisplay:function toggleDisplay() {
    showHide('displayHomePage');
    showHide('displayAboutPage');
},

showHide : function showHide(division) {
    let x = document.getElementById(division);  
    if (x.style.display === "block") {
        x.style.display = "none";
    }
    else {
        x.style.display = "block";
    }
},

show : function show(division) {
    document.getElementById(division).style.display = "block";
},

hide : function hide(division) {
    document.getElementById(division).style.display = "none";
},

  filteredList : [],

  generateReportList : async function () { 
     const textBox = document.getElementById("foodListFilterTextBox"); 
    let searchTerm = "";
    const searchBox = document.getElementById("foodsSearchTextBox");
    if (searchBox) {
        searchTerm = searchBox.value;
    }
    const searchUrl = buildFoodListSearchUrl(searchTerm);
    const response = await httpCall(searchUrl);
    let unfilteredList = [];
    if (response.list.item) {
        unfilteredList = response.list.item;
    }
    let sortOrder = true;
    const sortReverse = document.getElementById("ZtoA"); 
    return unfilteredList;
},


  getResultsDiv : function () {
    const fixture = document.getElementById("qunit-fixture");
    const node = document.createElement("div");
    node.setAttribute("id", "results");
    fixture.appendChild(node);
    }
};


(function pageSetupIFFE() {
    document.getElementById('home').addEventListener("click", pageSetup.toggleDisplay);
    document.getElementById('displayHomePage').style.display = "block";
    document.getElementById('displayAboutPage').style.display = "none";
})();
