"use strict";

let formatFoodList = async function (response) {
    const check = checkForErrorReturned(response);
    if (check !== "") {
        return check;
    }
    else {
        let formattedFoodList = formatFoodListHeader(response);
        formattedFoodList += formatFoodListBody(response);
        const sortedList = await generateReportList();
        formattedFoodList += formatListBody(sortedList);
        return  await formattedFoodList;
    }
};

let formatFoodListHeader = function (response) {
    const searchText = response.list.q;
    const total = response.list.total;
    let listHeader = "<div>";
    listHeader += "Your search for  <span style=\"font-weight: bold; color:green\">" + searchText + "</span> found " + total + " items";
    listHeader += "</div > ";
    listHeader += "<div>";
    listHeader += "<h3>Filter Your Results</h3> <p>Capitalization and EXACT spelling are important!</p> <input id=\"foodListFilterTextBox\" type=\"text\" placeholder=\"Enter a word to filter by\" />  <p>To Get items that the filter phrase is not in, check here  <input id=\"Checkbox1\" type=\"checkbox\" /></p><input id=\"foodListFilterBtn\" type=\"submit\" value=\"Go!\" onclick=filterList() /><h3>Sort Your Results</h3>  </div> ";
    listHeader += "<div><p>Select a sort option:</p ><input type=\"radio\" id=\"originalOrder\" name=\"sortChoices\" value=\"original\" checked>";
    listHeader += "<label for=\"originalOrder\">Original Order</label><input type=\"radio\" id=\"AtoZ\" name=\"sortChoices\" value=\"AtoZ\">";
    listHeader += "<label for=\"a2z\">A to Z</label><input type=\"radio\" id=\"ZtoA\" name=\"sortChoices\" value=\"ZtoA\"><label for=\"ZtoA\">Z to A</label></div></div>";
    return listHeader;
};

let formatFoodListBody = function (response) {
    let listBody = "<div id=\"listBody\">";
    response.list.item.forEach(function (entry) {
        listBody += "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(" + entry.ndbno + ")>" + entry.name + "</a>";
    });
    listBody += "</div>";
    return listBody;
};

let generateReportList = async function () {
    const textBox = document.getElementById("foodListFilterTextBox");
    let filterText = "";
    if (textBox) {
        filterText = textBox.value;
    }
    const searchBox = document.getElementById("foodsSearchTextBox");
    const searchTerm = searchBox.value;
    let IsChecked = false;
    const checkBox = document.getElementById("Checkbox1");
    if (checkBox) {
        IsChecked = checkBox.checked;
    }
    const searchUrl = buildFoodListSearchUrl(searchTerm);
    const response = await httpCall(searchUrl);
    const unfilteredList = response.list.item;
    const checkbox = document.querySelector('input[name="sortChoices"]:checked');
    let sortSelected;
    if (checkbox) {
        sortSelected = checkbox.value;
    }
    let sortedList = ""; 
    if (unfilteredList.length > 2) {
        console.log(63);
        console.log(unfilteredList.length);
        console.log(65);
        
        const filteredList = filterList(unfilteredList, filterText, IsChecked);
        sortedList = sortList(sortSelected, filteredList);
    }
    return await sortedList;
};

const filterList = function (unfilteredList, filterText, IsChecked) { 
    if (!unfilteredList) {
        unfilteredList = [];
    }
    if (!filterText && !IsChecked) {
        return unfilteredList;
    }
    
    const textBox = document.getElementById("foodListFilterTextBox"); 
    if (textBox) {
        filterText = textBox.value;
    }
    
    //const searchBox = document.getElementById("foodsSearchTextBox");
    //const searchTerm = searchBox.value;
    
    const checkBox = document.getElementById("Checkbox1");
    if (checkBox) {
        IsChecked = checkBox.checked;
    } 
    let filteredList = "";
    if (unfilteredList && unfilteredList.list) {
        
        if (IsChecked) { 
            filteredList = unfilteredList.list.item.filter(doesNotHaveFilterText);
        }
        else {    
            filteredList = unfilteredList.list.item.filter(hasFilterText); 
            }
        }
        else {
        if (IsChecked) { 
          
                filteredList = unfilteredList.filter(hasFilterText);
            }
            else {  
                filteredList = unfilteredList.filter(hasFilterText); 
            }
        }
    

    function hasFilterText(listItem) {
        return listItem.name.includes(filterText);
    }

    function doesNotHaveFilterText(listItem) {
       
        const trueOrFalse = listItem.name.includes(filterText); 
        if (trueOrFalse) {
            return false;
        }
        return true;
    } 
    return filteredList;
};

const sortList = function (sortSelected, unfilteredList) {
    if (sortSelected === "AtoZ") {
        return unfilteredList.sort(function (a, b) { return b - a; });
    }
    if (sortSelected === "ZtoA") {
        return unfilteredList.sort(function (a, b) { return b - a; });
    }
    return unfilteredList;
};


const formatListBody = function (sortedList) {
    let listBody = "<div>";
    sortedList.forEach(function (entry) {
        listBody += "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(" + entry.ndbno + ")>" + entry.name + "</a>";
    });
    listBody += "</div>";
    //document.getElementById('listBody').innerHTML = listBody;
    return listBody;
};


const populateResultsButtonText = function (total) {
    let text = "Show First Fifty Results";
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

