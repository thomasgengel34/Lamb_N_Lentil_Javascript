"use strict";


async function ingredientSearchSubmitBtnClickListener(search) { // why is search a parameter? testing - add other 3
    let query = search;
    let filterString = "";
    let unfilterCheck = false;
    let sort = true;
    const settings = getDataFromFoodSearchInput();
    query = settings.searchString;
    filterString = settings.filterString;
    unfilterCheck = settings.unFilterChecked;
    console.log(13);
    console.log(settings.unFilterChecked);
    console.log(15);
    sort = settings.sortOrderChecked;

    // pattern is useful for testing - duplicate for the other variables but use a ternary operator
    if (query === null || query === "" || query === undefined) {
        query = search;
    }
    const response = await ingredientSearchSubmit(query);
    const filtered = filterResponse(response, filterString, unfilterCheck);
    const sorted = sortList(filtered, sort);
    const text = formatFoodList(sorted, response);

    if (document) {
        if (document.getElementById("results")) {
            document.getElementById('results').innerHTML = text;
        }
    }
}

const filterResponse = function (response, filterString, unfilteredCheck) {
    let filtered = [];
    let list = response.list.item;
    if (list.length === 0) {
        return list;
    }
    if (!unfilteredCheck) {
        filtered = list.filter(val => { return val.name.includes(filterString); });
    }
    else if (unfilteredCheck) {
        if (!filterString) {
            return response;
        }
        else {
            filtered = list.filter(val => { return !(val.name.includes(filterString)); });

        }
    }
    return filtered;
};


let sortList = function (list, sort) {
    if (Array.isArray(list)) {
        if (sort) {
            list.sort((a, b) => a.name < b.name ? 1 : (b.name < a.name) ? -1 : 0);
        }

        if (!sort) {
            list.sort((a, b) => a.name > b.name ? 1 : (b.name > a.name) ? -1 : 0);
        }
    }
    else {
        list = "bad value";
    }
    return list;
};


let formatFoodList = function (list, response) {

    let formattedFoodList = formatFoodListHeader(list, response);

    formattedFoodList += formatListBody(list);
    return formattedFoodList;
};



const formatFoodListHeader = function (list, response = { "list": [] }) {
    let searchText = "";
    let total = 0;
    let shown = 50;
    if (response.list) {
        if (response.list.q) {
            searchText = response.list.q;
        }
        if (list) {
            total = list.length;
            if (total < 51) {
                shown = "All " + total;
            }
            else {
                shown = total;
            }
        }
    }

    let listHeader = "<div>";
    listHeader += "Your search for  <span style=\"font-weight: bold; color:green\">" + searchText + "</span> found " + total + " items. " + shown + " are shown.";
    listHeader += "</div > ";
    listHeader += "<div>";
    return listHeader;
};

const formatListBody = function (list) {
    if (!Array.isArray(list)) {
        if (!list.list || !list.list.item || !Array.isArray(list.list.item)) {
            return "div  id=\"listBody\">There is an error in transmitting the data back. Please try your request again.</div>";
        }
    }
    else {
        let listBody = "<div>";
        list.forEach(function (entry) {
            listBody += "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(" + entry.ndbno + ")>" + entry.name + "</a>";
        });
        listBody += "</div>";
        return listBody;
    }
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




const foodList = (function () {
    document.getElementById('foodsSearchSubmitBtn').addEventListener("click", ingredientSearchSubmitBtnClickListener);

})();

