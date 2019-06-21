"use strict";

const ui = {
    ascendDescend: {
        ascend: "ascend",
        descend: "descend"
    },
    excludeInclude: {
        exclude: "exclude",
        include: "include"
    },

    getDataFromFoodSearchInput: function (searchString = "", filterString = "", excludeOrInclude = ui.excludeInclude.include, sortOrder = ui.ascendDescend.ascend) {
        
        if (document) { 
            let f = "foodsSearchTextBox";
            if (document.getElementById(f)) {
                searchString = document.getElementById(f).value;
            }
            f = "foodListFilterTextBox";
            if (document.getElementById(f)) {
                filterString = document.getElementById(f).value;
            }
            f = "excludeFilterFromSearchCheckbox";
            if (document.getElementById(f)) { 
                const IsExcludeChecked = document.getElementById(f).checked; 
                if (IsExcludeChecked) {
                    excludeOrInclude = ui.excludeInclude.exclude; 
                }
            }
            f = "ZtoA";

            if (document.getElementById(f)) {
                const order = document.getElementById(f).checked;

                if (sortOrder != ui.ascendDescend.ascend || sortOrder !== ui.ascendDescend.descend) {
                    if (order) {
                        sortOrder = ui.ascendDescend.descend;
                    }
                    else {
                        sortOrder = ui.ascendDescend.ascend;
                    }
                }
            }
        }
    
        const settings =
            { "searchString": searchString, "filterString": filterString, "excludeOrInclude": excludeOrInclude, "sortOrder": sortOrder };
        return settings;
    }
};

