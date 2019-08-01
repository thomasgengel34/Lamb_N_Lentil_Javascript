"use strict";
const foodList = {
    noItemsWereFound: "<div id=\"listHeaderDiv\" >Your search found 0 items. </div>",

    clickListenerQueryDefaultParameter: "query initial value for testing",
    clickListenerFilterStringDefaultParameter: "filter string initial value for testing",
    clickListenerSortOrderDefaultParameter: "sort order initial value for testing",
    clickListenerSearchFunctionDefaultParameter: "for testing",


    ingredientSearchSubmitBtnClickListener: async function ingredientSearchSubmitBtnClickListener(query = "", filterString = "", excludeInclude = ui.excludeInclude.include, sortOrder = ui.ascendDescend.ascend, searchFunction = httpFoodList.ingredientSearchSubmit) {
        console.log(12);
        const settings = ui.getDataFromFoodSearchInput(query, filterString, excludeInclude, sortOrder);
        foodList.ingredientSearchSubmitBtnClickListener.searchFunction = searchFunction;
        foodList.clickListenerQueryDefaultParameter = query;
        foodList.clickListenerFilterStringDefaultParameter = filterString;
        foodList.clickListenerSortOrderDefaultParameter = sortOrder;
        foodList.clickListenerSearchFunctionDefaultParameter = searchFunction;
        query = settings.searchString;
        filterString = settings.filterString;
        excludeInclude = settings.excludeOrInclude;
        sortOrder = settings.sortOrder;

        let response = { "name": "initial test", "list": { "item": [] } };
      let text = "";
       const notFound = { "name": "initial test", "list": { "item": ["not found"] } };

       response = await searchFunction(query);

        let list = [];
        if (response.list && response.list.item) {
            list = response.list.item;
        }
        if (response.errors) {

            list = notFound;
        }

        let filtered = list;
        if (!query.includes(filterString)) {
            if (query !== filterString) {
                filtered = foodList.filterList(list, filterString, excludeInclude);
                const sorted = foodList.sortList(filtered, sortOrder);
                text = foodList.formatFoodList(sorted, response);
            }
        }
        else if (query.includes(filterString)) {
            console.log(48);
            if (response.list && response.list.item) {
                filtered = response.list.item;
                if (excludeInclude == ui.excludeInclude.include) {
                    const sorted = foodList.sortList(filtered, sortOrder);
                    text = foodList.formatFoodList(sorted, response);
                }
                else if (excludeInclude == ui.excludeInclude.exclude) {

                    text = foodList.noItemsWereFound;
                }
            }
            else {
                text = response;
            }
        }

        if (text.errors) {
            text = [foodList.noItemsWereFound];
        }
         
        const resultWindow = document.querySelector("#firstDrop");
        resultWindow.innerHTML = text;
        console.log(79);

    },

    filterList: function filterList(list = [], filterString = '', excludeInclude = ui.excludeInclude.include) {
        let filtered = [];
        if (list.length === 0 || list[0] === [{ "name": "not found" }] || !Array.isArray(list) || (filterString === "" && excludeInclude === ui.excludeInclude.include)) {
            return list;
        }

        if (excludeInclude === ui.excludeInclude.include) {
            filtered = list.filter(val => { return val.name.includes(filterString); });

        }

        else if (excludeInclude == ui.excludeInclude.exclude) {
            filtered = list.filter(val => { return !val.name.includes(filterString); });
        }
        return filtered;
    },


    sortList: function (list, sortOrder) {
        if (Array.isArray(list)) {
            if (sortOrder === ui.ascendDescend.descend) {
                list.sort((a, b) => a.name < b.name ? 1 : b.name < a.name ? -1 : 0);
            }
            else {
                list.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
            }
        }
        else {
            list = "bad value";
        }
        return list;
    },


    formatFoodList: function (list, response) {
        console.log(120);
        console.log(list);
        if (!Array.isArray(list)) {
            list = "bad value";
            return list;
        }
        if (list.length == 0) {

            return this.noItemsWereFound;
        }
        let formattedFoodList = this.formatFoodListHeader(list, response);
        if (formattedFoodList !== this.noItemsWereFound) {
            formattedFoodList += this.formatFoodListBody(list);
        }
        return formattedFoodList;
    },



    formatFoodListHeader: function (list, response = { "list": [] }) {
        const noItemsWereFound = this.noItemsWereFound;
        let searchText = "";
        let total = 0;
        let shown = 50;
        if (response.list) {
            if (response.list.q) {
                searchText = response.list.q;
            }
            if (list.length) {
                total = list.length;
                if (total == 0) {
                    return noItemsWereFound;
                }
                if (total < 51) {
                    shown = "All " + total;
                }
                else {
                    shown = total;
                }
            }
            else {
                return noItemsWereFound;
            }
        }


        let listHeader = "<div id=\"listHeaderDiv\" >";
        let itemItems = " item. ";
        if (total !== 1) {
            itemItems = " items. ";
        }
        console.log(170);
        console.log(response);
        searchText = response.list.q;
        if (!searchText) {
            searchText = "(no search text)";
        }
        console.log(176);
        console.log(searchText);
        listHeader += "Your search for  <span style=\"font-weight: bold; color:green\">" +
            searchText + "</span> found " + total + itemItems;

        if (total > 0) {
            listHeader + shown;
        }
        if (!response.errors) {
            if (total === 1) {
                listHeader + " is shown.";
            }
            if (total > 1) {
                listHeader + " are shown.";
            }
        }
        listHeader += "</div> ";
        listHeader += "<div>";
        return listHeader;
    },

    formatFoodListBody: function (list) {
        console.log(199);
        console.log(list);
        const rejectMessage = "<div  id=\"listBody\">There is an error in transmitting the data back. Please try your request again.</div>";
        if (!Array.isArray(list)) {
            return rejectMessage;
        }

        else {
            let listBody = "<div>";
            if (Array.isArray(list)) {
                list.forEach(function (entry) {
                    listBody += "<div><a href=\"#\" id=\"fetchReportBtn" + entry.ndbno + "\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=foodReport.fetchReport(" + entry.ndbno + ")  draggable=\"true\" ondragstart=\"dragging.drag(event)\">" + entry.name + "</a></div>";
                });
            }
            listBody += "</div>";
            return listBody;
        }
    },
 

    buildSearchUrl: function (search) {
        const string1 = "https://api.nal.usda.gov/ndb/search?format=json&q=";
        const string2 = "&max=50&offset=0&api_key=";
        const key = httpFoodList.key;
        const searchUrl = string1.concat(search, string2, key);
        return searchUrl;
    }



};



const foodListIIFE = (function () {
    document.getElementById('foodsSearchSubmitBtn').addEventListener("click", foodList.ingredientSearchSubmitBtnClickListener);
})();

