"use strict";
let filteredList = [];

let generateReportList = async function () {
   // let filterText = "";
    const textBox = document.getElementById("foodListFilterTextBox"); 
    //if (textBox) {
    //    filterText = textBox.value;
    //}
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
    return unfilteredList;
};

const filterList = async function (unfilteredList, filterText, IsChecked) {
    unfilteredList = unfilteredList || await generateReportList();
    filterText = filterText || getFilterTextFromForm();

    function getFilterTextFromForm() {
        const textBox = document.getElementById("foodListFilterTextBox");
        if (textBox) {
            filterText = textBox.value;
        }
        return filterText || "";
    }


    let cbox = document.getElementById("Checkbox1");
    let cboxChecked = false;
    if (cbox) {
        cboxChecked = cbox.checked;
    };

    IsChecked = IsChecked || cboxChecked;


    if (IsChecked) {
        filteredList = unfilteredList.list.item.filter(doesNotHaveFilterText);
    }
    else { 
        if (Array.isArray(unfilteredList)) { 
            filteredList = unfilteredList.filter(hasFilterText);
        }
        else {  
                filteredList = unfilteredList.list.item.filter(hasFilterText); 
        }
    }

    function hasFilterText(listItem) {
        return listItem.name.includes(filterText);
    }

    function doesNotHaveFilterText(listItem) {
        const includeFlag = listItem.name.includes(filterText);
        return !includeFlag;
    }

    let listBody = "<div id=\"listBody\">";
    if (unfilteredList) {
        filteredList.forEach(function (entry) {
            listBody += "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(" + entry.ndbno + ")>" + entry.name + "</a>";
        });
    }
    else {
        listBody += "<div>No foods in list</div>";
    }
    listBody += "</div>";
    let resultsDiv = document.getElementById("results");

    if (!resultsDiv) {
        getResultsDiv();
        resultsDiv = document.getElementById("results");
    }
    resultsDiv.innerHTML = "";
    resultsDiv.innerHTML = listBody;
    return filteredList;
};

const getResultsDiv = function () {
    const fixture = document.getElementById("qunit-fixture");
    const node = document.createElement("div");
    node.setAttribute("id", "results");
    fixture.appendChild(node);
};


const formatListBody = function (sortedList) {
    let listBody = "<div>";
    sortedList.forEach(function (entry) {
        listBody += "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(" + entry.ndbno + ")>" + entry.name + "</a>";
    });
    listBody += "</div>";
    return listBody;
};

