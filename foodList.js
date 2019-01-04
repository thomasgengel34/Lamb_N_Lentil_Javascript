"use strict";

let formatFoodList = async function (response) {
    const check = checkForErrorReturned(response);
    if (check !== "") {
        return check;
    }
    else {
        if (!response.list || !response.list.item) {
            return "div  id=\"listBody\">There is an error in transmitting the data back. Please try your request again.</div>";
        }
        let formattedFoodList = formatFoodListHeader(response);
        formattedFoodList += formatFoodListBody(response);
        const sortedList = await generateReportList();
        formattedFoodList += formatListBody(sortedList);
        return await formattedFoodList;
    }
};

let formatFoodListHeader = function (response) {
    let searchText = "";
    let total = 0;
    if (response.list) {
        if (response.list.q) {
            searchText = response.list.q;
        }
        if (response.list.total) {
            total = response.list.total;
        }
    }
    let listHeader = "<div>";
    listHeader += "Your search for  <span style=\"font-weight: bold; color:green\">" + searchText + "</span> found " + total + " items";
    listHeader += "</div > ";
    listHeader += "<div>";
    listHeader += "<h3>Filter Your Results</h3> <p>Capitalization and EXACT spelling are important!</p> <input id=\"foodListFilterTextBox\" type=\"text\" placeholder=\"Enter a word to filter by\" />  <p>To Get items that the filter phrase is not in, check here  <input id=\"Checkbox1\" type=\"checkbox\" /></p><input id=\"foodListFilterBtn\" type=\"submit\" value=\"Filter and Sort\" onclick=filterList() /><h3>Sort Your Results</h3>  </div> ";
    listHeader += "<div><p>Select a sort option:</p ><input type=\"radio\" id=\"originalOrder\" name=\"sortChoices\" value=\"original\" checked>";
    listHeader += "<label for=\"originalOrder\">Original Order</label><input type=\"radio\" id=\"AtoZ\" name=\"sortChoices\" value=\"AtoZ\">";
    listHeader += "<label for=\"a2z\">A to Z</label><input type=\"radio\" id=\"ZtoA\" name=\"sortChoices\" value=\"ZtoA\"><label for=\"ZtoA\">Z to A</label></div></div>";
    return listHeader;
};

let formatFoodListBody = function (response) {
    if (!response.list || !response.list.item) {
        return "div  id=\"listBody\">There is an error in transmitting the data back. Please try your request again.</div>";
    }
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
    let searchTerm = "";
    const searchBox = document.getElementById("foodsSearchTextBox");
    if (searchBox) {
        searchTerm = searchBox.value;
    }
    //let IsChecked = false;
    //const checkBox = document.getElementById("Checkbox1");
    //if (checkBox) {
    //    IsChecked = checkBox.checked;
    //}
    const searchUrl = buildFoodListSearchUrl(searchTerm);
    const response = await httpCall(searchUrl);
    let unfilteredList = [];
    if (response.list.item) {
        unfilteredList = response.list.item;
    }
    return unfilteredList;
};

const filterList = async function (unfilteredList, filterText, IsChecked) {
  

    if (!unfilteredList) {
        unfilteredList = await generateReportList();
    }
     
    if (!filterText) {
        const textBox = document.getElementById("foodListFilterTextBox");
        if (textBox) {
            filterText = textBox.value; 
        }
    } 

    if (!IsChecked) {
        if (document.getElementById("Checkbox1")) {
            IsChecked = document.getElementById("Checkbox1").checked;
        }
    }

    if (!filterText && !IsChecked) { 
        return unfilteredList;
    }


    if (!filterText && IsChecked) {
        return [];
    }

    let filteredList = [];
  
 //   if (unfilteredList && unfilteredList.list) {
    if (unfilteredList) {
        if (IsChecked) {
            filteredList = unfilteredList.filter(doesNotHaveFilterText);
           
        }
        else {
            filteredList = unfilteredList.filter(hasFilterText); 
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
       return listItem.name.includes(filterText); 
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
    resultsDiv.innerHTML = "";
    resultsDiv.innerHTML = listBody;
    return filteredList;

    //const checkbox = document.querySelector('input[name="sortChoices"]:checked');
    //let sortSelected;
    //if (checkbox) {
    //    sortSelected = checkbox.value;
    //}
    //let sortedList = ""; 
    //if (unfilteredList.length > 2) {  
    //    filteredList = filterList(filteredList, filterText, IsChecked); 
    //    sortedList = await sortList(sortSelected, filteredList);
    //} 
    //console.log(sortedList);
    //return   sortedList;
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

