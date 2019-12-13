"use strict";

const foodReport = {

    fetchReport: async function (ndbno) {
        const responseJSON = await foodReport.searchSubmit(ndbno);
        const report = foodReport.formatFoodReport(responseJSON); 
        const dropzone = document.querySelector('#gridContainer>div:nth-child(2)');
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
    formattedReport += "<h1>Nutrition Facts</h1>";
    formattedReport += "<div class=\"hr\"></div>";
    formattedReport += "<div id=\"foodReportHeaderSection\" >";
    formattedReport += foodReport.formatFoodReportHeader(result);
    console.log(48);
    const x = document.querySelector("#unitMultiplierTextBox");
   // console.log(x);
    
    if (x) {
        console.log("x is not null")
        foodReport.multiplierValue = document.querySelector("#unitMultiplierTextBox").value;
        console.log(foodReport.multiplierValue);
    }
    console.log(foodReport.multiplierValue);
    console.log(54);
    formattedReport += foodReport.formatUnitMultiplierSection(foodReport.multiplierValue);
    formattedReport += "</div>";
    formattedReport += "<div class=\"hrWide\"></div > ";
    formattedReport += foodReport.formatFoodReportAmountPerServingSection();
    formattedReport += "<div class=\"foodReportMiddleSection\">";
    formattedReport += foodReport.formatFoodReportCalorieSection(result, tab);
    formattedReport += "</div>";
    formattedReport += "<div class=\"hrThin\"></div>";
    formattedReport += foodReport.formatPercentDailyValueSection();
    formattedReport += "<hr>";
    formattedReport += foodReport.formatTotalFatSection(result);
    formattedReport += "<hr>";
    formattedReport += foodReport.formatSaturatedFatSection(result, tab);
    formattedReport += "<hr>";
    formattedReport += foodReport.formatTransFatSection(result, tab);
    formattedReport += "<hr>";
    formattedReport += foodReport.formatCholesterolSection(result, null);
    formattedReport += "<hr>";
    formattedReport += foodReport.formatSodiumSection(result, null);
    formattedReport += "<hr>";
    formattedReport += foodReport.formatTotalCarbsSection(result, null);
    formattedReport += "<hr>";
    formattedReport += foodReport.formatDietaryFiberSection(result, tab);
    formattedReport += "<hr>";
    formattedReport += foodReport.formatTotalSugarsSection(result, tab);
    formattedReport += "<hr>";
    formattedReport += tab + tab + "The USDA database does not yet contain information on added sugars.";
    formattedReport += "<hr>";
    formattedReport += foodReport.formatProteinSection(result, tab);
    formattedReport += "<div class= hrWide1></div>";
    formattedReport += foodReport.formatVitaminDSection(result, null);
    formattedReport += "<hr>";
    formattedReport += foodReport.formatCalciumSection(result, null);
    formattedReport += "<hr>";
    formattedReport += foodReport.formatIronSection(result, null);
    formattedReport += "<hr>";
    formattedReport += foodReport.formatPotassiumSection(result, null); 
    formattedReport += "<div class= hrWide1></div>";
    formattedReport += "*The % Daily Value tells you how much a nutrient in a serving of food contributes to a daily diet." +
        "  2,000 calories a day is used for general nutrition advice.<hr> ";

    let ingredients = "---";
    if (result.foods[0].food.ing && result.foods[0].food.ing.desc) {
        ingredients = result.foods[0].food.ing.desc;
    }
    formattedReport += "<br/><strong>INGREDIENTS:</strong>" + ingredients;
    let updatedDate = "---";
    if (result.foods[0].food.ing && result.foods[0].food.ing.upd) {
        updatedDate = result.foods[0].food.ing.upd;
    }
    formattedReport += "<br/>   updated: " + updatedDate;
    var manu = result.foods[0].food.desc.manu || "---";
    formattedReport += "<br/><strong>DISTRIBUTED BY:<br/>" + manu + "</strong>";
    return formattedReport + "<br/><br/>";
},

formatFoodReportHeader: function formatFoodReportHeader(result) {

    const name = result.foods[0].food.desc.name;
    let headerSection = "<br/><strong>" + name + "</strong>";

    if (result.foods[0].food.nutrients[0].measures[0]) {
        let qty = result.foods[0].food.nutrients[0].measures[0].label;
        qty = qty === 0 ? "" : qty;
        let eqv = result.foods[0].food.nutrients[0].measures[0].eqv;
        eqv = eqv === 0 ? "" : eqv;
        let eunit = result.foods[0].food.nutrients[0].measures[0].eunit;

        eunit = eunit === 0 ? "" : eunit;
        headerSection += "<br/><strong>Serving Size: " + qty + '  (' + eqv + eunit + ")</strong> ";
    }
    return headerSection;
    },

    formatUnitMultiplierSection: function formatUnitMultiplierSection(multiplier = 1) {  
        multiplier = Number(multiplier)||1;  
        console.log(multiplier);
        return "<div id=\"UnitMultiplier\">Multiplier=" +
            "  <input id=\"unitMultiplierTextBox\" type=\"text\" placeholder=\"" +
            multiplier+"\" autofocus value="+multiplier+">" +
            "</div>";
    },



formatFoodReportAmountPerServingSection: function formatFoodReportAmountPerServingSection() {
    return "<div id=\"AmountPerServing\">Amount per serving</div>";
},

formatFoodReportCalorieSection: function formatFoodReportCalorieSection(result, tab) {
    let calories = foodReport.getNutrient(result, 208);
    let cal = calories.value || 0;
    let calorieSection =
        "<div id=\"Calories\">" +
        "<div class=\"calorieText\">Calories</div>" +
        "<div class=\"calorieCount\">" +
        cal +
        "</div>";
    return calorieSection;
},

formatPercentDailyValueSection: function formatPercentDailyValueSection() {
    return "<p id=\"percentDailyValue\">% Daily Value*</p>";

},
formatTotalFatSection: function formatTotalFatSection(result, tab) {
    let line = foodReport.buildALine(result, tab, "Total Fat", "strong", 204, 65);
    return line;
},

formatSaturatedFatSection: function formatSaturatedFatSection(result, tab) {
    let line = foodReport.buildALine(result, tab, "Saturated Fat", "notStrong", 606, 20);
    return line;
},

formatTransFatSection: function formatTransFatSection(result, tab) {
    let line = foodReport.buildALine(result, tab, "Trans Fat", "notStrong", 605, -1);
    return line;
},

formatCholesterolSection: function formatCholesterolSection(result, tab) {
    let line = foodReport.buildALine(result, tab, "Cholesterol", "strong", 601, 300);
    return line;
},

formatSodiumSection: function formatSodiumSection(result, tab) {
    let line = foodReport.buildALine(result, tab, "Sodium", "strong", 307, 2400);
    return line;
},

formatTotalCarbsSection: function formatTotalCarbsSection(result, tab) {
    let line = foodReport.buildALine(result, tab, "Total Carbohydrates", "strong", 205, 300);
    return line;
},

formatDietaryFiberSection: function formatDietaryFiberSection(result, tab) {
    let line = foodReport.buildALine(result, tab, "Dietary Fiber", "notStrong", 291, 25);
    return line;
},

formatTotalSugarsSection: function formatTotalSugarsSection(result, tab) {
    let line = foodReport.buildALine(result, tab, "Total Sugars", "notStrong", 269, -1);
    return line;
},

formatProteinSection: function formatProteinSection(result, tab) {
    let line = foodReport.buildALine(result, tab, "Protein", "strong", 203, 50);
    return line;
},

formatVitaminDSection: function formatVitaminDSection(result, tab) {
    let line = foodReport.buildALine(result, tab, "Vitamin D", "notStrong", 324, 400);
    return line;
},

formatCalciumSection: function formatCalciumSection(result, tab) {
    let line = foodReport.buildALine(result, tab, "Calcium", "notStrong", 301, 400);
    return line;
},

formatIronSection: function formatIronSection(result, tab) {
    let line = foodReport.buildALine(result, tab, "Iron", "notStrong", 303, 400);
    return line;
},

formatPotassiumSection: function formatPotassiumSection(result, tab) {
    let line = foodReport.buildALine(result, tab, "Potassium", "notStrong", 306, 400);
    return line;
},

buildALine: function buildALine(result, tab, label, strong, nutrientId, dailyValue) {
    tab = tab || "";
    let line = "<div>" + tab;
    if (strong == "strong") {
        line += "<strong>" + label + "</strong> ";
    }
    else {
        line += label;
    }
    const nutrient = foodReport.getNutrient(result, nutrientId);

    let percentageDailyValue = 0;
    let fat = 0;

    if (nutrient) {
        fat = parseFloat(nutrient.value).toFixed(0);
        if (dailyValue > -1) {
            percentageDailyValue = parseFloat(100 * nutrient.value / dailyValue).toFixed(0);
        }
        else {
            percentageDailyValue = -1;
        }
        if (nutrient.unit) {
            line += "<span> " + fat + nutrient.unit + "</span>";
        }
        else if (label=="Vitamin D") {
            line += "<span> " + fat + " IU"+ "</span>";
        }
        else if (label=="Calcium" || label=="Iron" || label=="Potassium") {
            line += "<span> " + fat + "mg"+ "</span>";
        }
        
    }

    if (percentageDailyValue != -1) {
        line += "<span class=\"floatRight\">" + parseFloat(percentageDailyValue).toFixed(0) + "%" + "</span>";
    }
    return line;
},



getNutrient: function getNutrient(result, id) {
    const nutrients = result.foods[0].food.nutrients;
    const nutrient = nutrients.find(x => x.nutrient_id == id);
   
    if (nutrient) {
        return nutrient;
    }
    return {"value":0};
},

//getNutritionalValueAndUnit: function getNutritionalValueAndUnit(result, id) {
//    const nutrient = foodReport.getNutrient(result, id);

//    if (nutrient) {
//        let nutritionalValue = nutrient.value;
//        if (!nutritionalValue) {
//            nutritionalValue = 0;
//        }
//        return nutrient.name + " " + nutritionalValue + " " + nutrient.unit;
//    }
//    // return "---";
//    return "";
//},

displayTotal: function (usdaFoodList) {
    var index = usdaFoodList.indexOf('total');
    var total = usdaFoodList.slice(index + 8, 100);
    index = total.indexOf(',');
    total = total.slice(0, index);
    return total;
    },

multiplierValue:1

};