"use strict";
const foodList = {
    noItemsWereFound: function (searchText) {
        if (!searchText || searchText == "  ") {
            searchText = "-- no text --";
        }
        return "<div id=\"listHeaderDiv\" class=\"foodListBoxWrapper\" >Your search for " + searchText + " found 0 items. </div>"
    },

    clickListenerQueryDefaultParameter: "query initial value for testing",
    clickListenerFilterStringDefaultParameter: "filter string initial value for testing",
    clickListenerSortOrderDefaultParameter: "sort order initial value for testing",
    clickListenerSearchFunctionDefaultParameter: "for testing",


    ingredientSearchSubmitBtnClickListener: async function ingredientSearchSubmitBtnClickListener(query = "", filterString = "", excludeInclude = ui.excludeInclude.include, sortOrder = ui.ascendDescend.ascend, searchFunction = httpFoodList.ingredientSearchSubmit) {

        const settings = ui.getDataFromFoodSearchInput(query, filterString, excludeInclude, sortOrder);
        foodList.ingredientSearchSubmitBtnClickListener.searchFunction = searchFunction;
        foodList.clickListenerQueryDefaultParameter = query; 
        foodList.clickListenerFilterStringDefaultParameter = filterString;
        foodList.clickListenerSortOrderDefaultParameter = sortOrder;
        foodList.clickListenerSearchFunctionDefaultParameter = searchFunction;
        query = settings.searchString;
        query = foodList.cleanQuery(query);
        filterString = settings.filterString;
        excludeInclude = settings.excludeOrInclude;
        sortOrder = settings.sortOrder;

        let response = { "name": "initial test", "list": { "item": [] } };
        let text = "";
        const notFound = { "name": "initial test", "list": { "item": ["not found"] } };
       
        response = await searchFunction(query);
        
        let list = [];
        if (response && response.list && response.list.item) {
            list = response.list.item;
        }
        if (response && response.errors) {

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
            if (response && response.list && response.list.item) {
                filtered = response.list.item;
                if (excludeInclude == ui.excludeInclude.include) {
                    const sorted = foodList.sortList(filtered, sortOrder);
                    text = foodList.formatFoodList(sorted, response);
                }
                else if (excludeInclude == ui.excludeInclude.exclude) {
                    text = foodList.noItemsWereFound(response.list.q);
                }
            }
            else {
                const value = {
                    "list": { "q": query }
                };
                text = foodList.formatFoodList([], value);

            }
        }

        if (text.errors) {
            text = foodList.noItemsWereFound();
        }
        const resultWindow = document.querySelector("#gridContainer div:first-child");
        if (resultWindow) {
            resultWindow.innerHTML = text;   // thrown away in tests  TODO: test without this condition - create it in testing
        }
        return text;
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
        if (!Array.isArray(list)) {
            list = "bad value";
            return list;
        }
        if (list.length == 0) {
            const query = response.list ? (response.list.q ? response.list.q : "") : "-- no text --";
            return this.noItemsWereFound(query);
        }
        let formattedFoodListHeader = this.formatFoodListHeader(list, response);

        let formattedFoodList = this.formatFoodListBody(list);
        //if (formattedFoodList !== this.noItemsWereFound) {
        //    formattedFoodList += this.formatFoodListBody(list);
        //}
        formattedFoodList = "<div class=\"foodListBoxWrapper\">" + formattedFoodListHeader + "<div class=\"foodListBox\">" + formattedFoodList + "</div></div>";

        return formattedFoodList;
    },


    formatFoodListHeader: function (list, response = { "query": "empty", "list": [] }) {

        const noItemsWereFound = this.noItemsWereFound(response.list.q);
        let searchText = "";
        let total = 0;
        let shown = 50;
        if (response.list) {
            if (response.list.q) {
                searchText = response.list.q;
            }
            if (list.length) {
                total = list.length;

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
        else {
            return noItemsWereFound;
        }

        let listHeader = "<div id=\"listHeaderDiv\" >";
        let itemItems = " item. ";
        if (total !== 1) {
            itemItems = " items. ";
        }
        searchText = response.list.q;
        if (searchText == " " || !searchText) {
            searchText = "- no text -";
        }

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
        listHeader += "</div>";

        return listHeader;
    },

    formatFoodListBody: function (list) {
        const rejectMessage = "<div  id=\"listBody\">There is an error in transmitting the data back. Please try your request again.</div>";
        if (!Array.isArray(list)) {
            return rejectMessage;
        }

        else {
            let listBody = "<div>";
            if (Array.isArray(list)) {
                list.forEach(function (entry) {
                    listBody += "<a href=\"#\" id=\"fetchReportBtn" + entry.ndbno + "\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=foodReport.fetchReport(" + entry.ndbno + ")  draggable=\"true\" ondragstart=\"dragging.drag(event)\">" + entry.name + "</a>";
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
    },

    cleanQuery: function (query) { 
        if (query == '-'
            || query == '?'
            || query == '&'
            || query == '%'
            || query == '=') {
            query = '';
        } 
        return query;
    }
};



const foodListIIFE = (function () {
    document.getElementById('foodsSearchSubmitBtn').addEventListener("click", foodList.ingredientSearchSubmitBtnClickListener);
})();

