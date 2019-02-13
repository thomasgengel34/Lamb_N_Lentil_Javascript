"use strict"; 

const foodList = (function () {
    document.getElementById('foodsSearchSubmitBtn').addEventListener("click", ingredientSearchSubmitBtnClickListener);
})();

async function ingredientSearchSubmitBtnClickListener(search) {
    let query = document.getElementById("foodsSearchTextBox").value;
    if (query === null || query === "" || query === undefined) {
        query = search;
    }
    const response = await ingredientSearchSubmit(query);
    const text = await formatFoodList(response);
    document.getElementById('results').innerHTML = text;
}




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



const formatFoodListHeader = function (response) {
    let searchText = "";
    let total = 0;
    let shown = 50;
    if (response.list) {
        if (response.list.q) {
            searchText = response.list.q;
        }
        if (response.list.total) {
            total = response.list.total;
            if (total<51) {
                shown = "All "+ total;
            } 
            else {
                shown = 50;
            }
        }
    }

    let listHeader = "<div>";
    listHeader += "Your search for  <span style=\"font-weight: bold; color:green\">" + searchText + "</span> found " + total + " items. " + shown + " are shown.";
    listHeader += "</div > ";
    listHeader += "<div>";
    listHeader += "<h3>Filter Your Results</h3>";
    listHeader += "<p>Capitalization and EXACT spelling are important!</p>"; 
    listHeader += "<input id=\"foodListFilterTextBox\" type=\"text\" placeholder=\"Enter a word to filter by\" />";
    listHeader += "<p>To Get items that the filter phrase is not in, check here";
    listHeader += "<input id=\"Checkbox1\" type=\"checkbox\" />";
    listHeader += "<input id=\"foodListFilterBtn\" type=\"submit\" value=\"Filter\" onclick=filterList() /></p>";
    listHeader += "<h3>Sort Your Results</h3>";
    listHeader += "</div> ";
    listHeader += "<div> Select a sort option:";
    listHeader += "<input type=\"radio\" id=\"AtoZ\" name=\"sortChoices\" value=\"AtoZ\" checked onclick=sortListAtoZ()  >";
    listHeader += "<label for=\"a2z\">A to Z</label>";
    listHeader += "<input type=\"radio\" id=\"ZtoA\" name=\"sortChoices\" value=\"ZtoA\" onclick=sortListZtoA()>";
    listHeader += "<label for=\"ZtoA\">Z to A</label></div></div>";
    return listHeader; 

    


    function sortListAtoZ() {
        sortList(ascending , filteredList);
    }

    function sortListZtoA() {
        sortList(descending , filteredList);
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
 