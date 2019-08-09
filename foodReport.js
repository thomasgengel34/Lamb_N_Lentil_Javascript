"use strict";

const foodReport = {

    fetchReport: async function (ndbno) {
        const responseJSON = await foodReport.searchSubmit(ndbno); 
        const report = foodReport.formatFoodReport(responseJSON); 
        const dropzone = document.querySelector('#secondDrop');
        dropzone.innerHTML = report;
    },

    searchSubmit: async function (search) {
        let searchUrl = foodReport.buildSearchUrl(search);
        const responseJson = await httpFoodList.httpCall(searchUrl);
        return responseJson;
    },

    buildAnArrayOfNamesAndNdbnos: function buildAnArrayOfNamesAndNdbnos(json) {
        let array = [];
        if (!json.item) {
            return httpFoodList.getErrorMessage();
        }
        for (var i = 0; i < json.item.length; i++) {

            var element = { "name": json.item[i].name, "ndbno": json.item[i].ndbno };
            array.push(element);
        }
        return array;
    },

    buildSearchUrl: function buildSearchUrl(ndbno) {
        const string1 = " https://api.nal.usda.gov/ndb/V2/reports?ndbno=";
        const string2 = "&type=b&format=json&api_key=";
        const key = httpFoodList.key;
        const searchUrl = string1.concat(ndbno, string2, key);
        return searchUrl;
    },

    formatFoodReport: function formatFoodReport(result) {

        const tab = "&nbsp;&nbsp;&nbsp;&nbsp;";
        let formattedReport = "<div class=\"foodReport\">";
        formattedReport += "<div id=\"foodReportHeaderSection\" >";
        formattedReport += foodReport.formatFoodReportHeader(result);
        formattedReport += "</div>";
        formattedReport += "<div class=\"foodReportMiddleSection\">";
        formattedReport += foodReport.formatFoodReportMiddleSection(result, tab);
        formattedReport += "</div>";
        formattedReport += "<div id=\"foodReportBottomSection\">";
        formattedReport += foodReport.formatFoodReportBottomSection(result);
        formattedReport += "</div>";
        formattedReport += "</div>";
        formattedReport += "</div>";
        return formattedReport + "<br/><br/>";
    },

    formatFoodReportHeader: function formatFoodReportHeader(result) {
        let headerSection = "<h1>Nutrition Facts</h1>";
        headerSection += "<div class=\"hr\"></div>";
        const name = result.foods[0].food.desc.name;
        headerSection += "<br/><strong>" + name + "</strong>";
        let qty = result.foods[0].food.nutrients[0].measures[0].label;
        qty = qty === 0 ? "" : qty;
        let eqv = result.foods[0].food.nutrients[0].measures[0].eqv;
        eqv = eqv === 0 ? "" : eqv;
        let eunit = result.foods[0].food.nutrients[0].measures[0].eunit;
        eunit = eunit === 0 ? "" : eunit;
        headerSection += "<br/><strong>Serving Size: " + qty + '  (' + eqv + eunit + ")</strong>";
        headerSection += "<div class= hrWide></div>";
        return headerSection;
    },

    formatFoodReportMiddleSection: function formatFoodReportMiddleSection(result, tab) {
        var middleSection = "<div class=\"hrWide\"></div > ";
        middleSection += foodReport.buildCaloriesBlock(middleSection, result);
        middleSection += "<div class=\"hrThin\"></div>";
        middleSection += "<p id=\"percentDailyValue\">% Daily Value*</p>";
        middleSection += "<hr>";
        middleSection += foodReport.getNutritionalValueAndUnit(result, 204);
        middleSection += "<hr>";
        middleSection += foodReport.getNutritionalValueAndUnit(result, 606);
        middleSection += "<hr>";
        middleSection += foodReport.getNutritionalValueAndUnit(result, 605);
        middleSection += "<hr>";
        middleSection += foodReport.getNutritionalValueAndUnit(result, 601);
        middleSection += "<hr>";
        middleSection += foodReport.getNutritionalValueAndUnit(result, 307);
        middleSection += "<hr>";
        middleSection += foodReport.getNutritionalValueAndUnit(result, 205);
        middleSection += "<hr>";
        middleSection += foodReport.getNutritionalValueAndUnit(result, 291);
        middleSection += "<hr>";
        addNutrient(result, 269);
        middleSection += tab + tab + "The USDA database does not yet contain information on added sugars.";
        middleSection += "<hr>";
        middleSection += foodReport.getNutritionalValueAndUnit(result, 203);
        middleSection += "<div class= hrWide></div>";
        return middleSection;

        function addNutrient(result, n) {  // why not add this into getNutritionalValueAndUnit instead of creating another method?
            middleSection += foodReport.getNutritionalValueAndUnit(result, n);
            middleSection += "<hr>";
        }
    },

    buildCaloriesBlock: function buildCaloriesBlock(middleSection, result) {
        var calories = foodReport.getNutritionalValueAndUnit(result, 208);
        middleSection += "<div id=\"AmountPerServing\">Amount per serving</div>" +
            "<div id=\"Calories\">" + "Calories "+
            calories +
            "</div>";
        return middleSection;
    },

    formatFoodReportBottomSection: function formatFoodReportBottomSection(result) {
        const vitaminD = foodReport.getNutritionalValueAndUnit(result, 324);
        const calcium = foodReport.getNutritionalValueAndUnit(result, 301); 
        var bottomSection = foodReport.buildBottomSectionRow(vitaminD, calcium);
        bottomSection += "<hr>";
        var iron = foodReport.getNutritionalValueAndUnit(result, 303);
        var potassium = foodReport.getNutritionalValueAndUnit(result, 306);
        bottomSection += foodReport.buildBottomSectionRow(iron, potassium);
        bottomSection += "<hr>";
        bottomSection += "*The % Daily Value tells you how much a nutrient in a serving of food contributes to a daily diet." +
            "  2,000 calories a day is used for general nutrition advice.<hr> ";  
       
        let ingredients=  "---";
        if (result.foods[0].food.ing && result.foods[0].food.ing.desc) {
            ingredients = result.foods[0].food.ing.desc;
        } 
        bottomSection += "<br/><strong>INGREDIENTS:</strong>" + ingredients;
        let updatedDate = "---";  
            if (result.foods[0].food.ing && result.foods[0].food.ing.upd) {
                updatedDate = result.foods[0].food.ing.upd;
        }
        bottomSection += "<br/>   updated: " + updatedDate;  
        var manu = result.foods[0].food.desc.manu||"---";
        bottomSection += "<br/><strong>DISTRIBUTED BY:<br/>" + manu + "</strong>"; 
        return bottomSection;
    },

    buildBottomSectionRow: function buildBottomSectionRow(vitaminD, calcium) {
        let row = "<div>";
        row += " <div class=\"third floatLeft\"> " + vitaminD + "</div> ";
        row += " <div class=\"third center floatLeft  \">    &#9679;   " + "</div>";
        row += "<div class=\"third rightjustify\">" + calcium + "</div>";
        row += "</div>";
        return row;
    },
     
    getNutritionalValueAndUnit: function getNutritionalValueAndUnit(result, id) {
        const nutrients = result.foods[0].food.nutrients;
        const nutrient = nutrients.find(x => x.nutrient_id == id);
        
      
        if (nutrient) {  
            let nutritionalValue = nutrient.value;
            if (!nutritionalValue) {
                nutritionalValue = 0;
            }
            return nutrient.name+" "+ nutritionalValue + " " + nutrient.unit;
        }
        return "---";
    },
     
    displayTotal: function (usdaFoodList) {
        var index = usdaFoodList.indexOf('total');
        var total = usdaFoodList.slice(index + 8, 100);
        index = total.indexOf(',');
        total = total.slice(0, index);
        return total;
    }
};