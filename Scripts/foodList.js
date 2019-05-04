"use strict";

const foodList = {

    FoodListReturned: {
        getNoItemsWereFound: function getNoItemsWereFound() {
            return "<div>Your search for  <span style=\"font-weight: bold; color:green\">" +
                "</span> found 0 items. </div> <div><div></div>";
        }
    },


    ingredientSearchSubmitBtnClickListener: async function ingredientSearchSubmitBtnClickListener(query = "", filterString = "", IsReverseFilterChecked = false, isSortedAtoZ = true, searchFunction = httpFoodList.ingredientSearchSubmit) {
        const settings = getDataFromFoodSearchInput(query, filterString, IsReverseFilterChecked, isSortedAtoZ);
        query = settings.searchString;
        filterString = settings.filterString;
        IsReverseFilterChecked = settings.IsReverseFilterChecked;
        isSortedAtoZ = settings.sortOrderChecked;
        let response = { "list": { "item": [] } };
        let text = "";
        const notFound = [{
            "name": "not found",
            "list": { "item": [] }
        }];

        if (query === filterString && IsReverseFilterChecked === false) {
            filterString = "";
            response = await searchFunction(query);
        }
        if (query !== filterString) {
            response = await  searchFunction(query);
        }
        if (query !== "" && filterString === "" && IsReverseFilterChecked === true) {
            response = notFound;
        }

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
                filtered = foodList.filterList(list, filterString, IsReverseFilterChecked);
            }
        }
        if (query.includes(filterString)) {
            filtered = list;
        }
        const sorted = foodList.sortList(filtered, isSortedAtoZ);
        text =foodList.formatFoodList(sorted, response);
        if (document) {
            if (document.getElementById("results")) {
                document.getElementById('results').innerHTML = text;
            }
        } 
        return text;
    },

    filterList : function filterList (list = [], filterString = '', unfilteredCheck = false) {
        let filtered = [];
        if (list.length === 0 || list[0] === [{ "name": "not found" }] || !Array.isArray(list) || (filterString === "" && unfilteredCheck)) {
            return list;
        }
        if (!unfilteredCheck) {
            filtered = list.filter(val => { return val.name.includes(filterString); });
        }
        else if (unfilteredCheck) {
            if (!filterString) {
                return list;
            }
            else {
                filtered = list.filter(val => { return !val.name.includes(filterString); });
            }
        }
        return filtered;
    },


    sortList: function (list, isSortedAtoZ) {
        if (Array.isArray(list)) {
            if (isSortedAtoZ) {
                list.sort((a, b) => a.name < b.name ? 1 : b.name < a.name ? -1 : 0);
            }
            if (!isSortedAtoZ) {
                list.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
            }
        }
        else {
            list = "bad value";
        }
        return list;
    },


    formatFoodList: function (list, response) { 
        let formattedFoodList =this.formatFoodListHeader(list, response);
        if (formattedFoodList !== this.FoodListReturned.getNoItemsWereFound()) {
            formattedFoodList += this.formatListBody(list);
        }
        return formattedFoodList;
    },



    formatFoodListHeader: function (list, response = { "list": [] }) {  
        console.log(116);
        console.log(list);
        console.log(response);
        const noItemsWereFound = this.FoodListReturned.getNoItemsWereFound();
        if (list[0] && list[0].name === "not found") { 
            console.log(120);
            return noItemsWereFound;
        } 
        let searchText = "";
        let total = 0;
        let shown = 50;
        if (response.list) {
            if (response.list.q) {
                searchText = response.list.q;
                console.log(130);
            }
            if (list.length) {
                console.log(33);
                total = list.length;
                if (total < 51) {
                    shown = "All " + total;
                }
                else {
                    shown = total;
                }
            }
        }
        else { 
            console.log(144);
            return noItemsWereFound;
        } 
        let listHeader = "<div>";
        let itemItems = " item. ";
        console.log(149);
        console.log(total);
        if (total !== 1) {
            itemItems = " items. ";
        }
        listHeader += "Your search for  <span style=\"font-weight: bold; color:green\">" + searchText + "</span> found " + total + itemItems;
       
        if (total > 0) {
            listHeader + shown;
            console.log(158);
            console.log(listHeader)
           // return listHeader; 
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
        console.log(171);
        console.log(listHeader);
        return listHeader;
    },

    formatListBody: function (list) {
        if (list[0] && list[0].name === "not found") {
            return "";
        }
        else {
            let listBody = "<div>";
            if (Array.isArray(list)) {
                list.forEach(function (entry) {
                    listBody += "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(" + entry.ndbno + ")>" + entry.name + "</a>";
                });
            }
            listBody += "</div>";
            return listBody;
        }
    },

    buildFoodListSearchUrl: function (search) {
        const string1 = "https://api.nal.usda.gov/ndb/search?format=json&q=";
        const string2 = "&max=50&offset=0&api_key=";
        const key = httpFoodList.key;
        const searchUrl = string1.concat(search, string2, key);
        return searchUrl;
    }
};


const foodListIFFE = (function () {
    document.getElementById('foodsSearchSubmitBtn').addEventListener("click", foodList.ingredientSearchSubmitBtnClickListener); 
})();

