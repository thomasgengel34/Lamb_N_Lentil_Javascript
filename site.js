"use strict";

$(document).ready(function () {
  displayHomePage();
});


$("#ingredientSearchSubmit").click(function () {
    var searchTerm = $('#ingredientsSearch').val();
    fetchSearch(searchTerm);
});

$('#home').click(displayHomePage); 

$('#about').click(displayAboutPage); 

function displayHomePage() {
    var text = " <h3>Search For Ingredients</h3>" +
        "<input type=\"text\" id=\"ingredientsSearch\" />" +
        "<input type=submit id=\"ingredientSearchSubmit\" />";
    $("article#setup").html(text);
}

function displayAboutPage() {
    var text = "<h2>USDA Ingredient Database</h2>" +
        "<p>Look up ingredients on :<a href=\"https://ndb.nal.usda.gov/ndb\" target=\"_blank\">the USDA nutritional site</a></p>" +
        "<p>Ingredients vary and information concerning them is constantly changing.  Information should be used with caution. Using this tool intelligently requires that you become informed about nutrition.</p>" +
        "<p>What an individual should eat or does eat in a typical meal will of course vary with the individual.  There are many excellent tools available for computing this.  The present tool only helps in a general way.</p>" +
        "<h2>Regarding Serving Sizes in General</h2>" +
        "<p>Few people eat exactly one serving of anything,unless it is something like drinking one can of soda.  Bottle sizes vary, too, and someone may not finish a bottle, or may drink a bottle and a half. Efforts will be made to ease the computation of serving sizes as this thing develops. </p>" +
        "<h2>Regarding NLEA servings:</h2>" +
        "<h3>NLEA=Nutrition Labeling and Education Act </h3>" +
        "<p>A serving size must be based on the amount of food we typically eat, not what we should eat. </p>" +
        "<ul>"+
           " <li>a serving size of fruit is usually 1 medium whole fruit or ½ cup cooked, canned or dried fruit</li>"+
            "<li>a serving size of vegetables is usually one cup of raw or cooked leafy greens or ½ cup of higher calorie vegetables like carrots.</li>"+
            "<li>a serving size of potatoes, pasta or grains is ½ cup or one slice of bread</li>"+
            "<li>a serving of dairy is one cup of skim milk or yogurt or 1.5 ounces of cheese</li>"+
            "<li>a serving size of meat, fish or poultry is about 3 ounces</li>"+
            "<li> a serving size of oil or salad dressing is 2 teaspoons</li>"+
            "<li>A serving size of alcohol depends on the drink that you choose.A serving of wine is 4 ounces, a serving of beer is 12 ounces and a serving of liquor is 1.5 ounces  </li>"+
        "</ul>" +
        "<p>Source:  <a href=\"https://www.verywell.com/what-is-serving-size-3496390\" target=\"_blank\">https://www.verywell.com/what-is-serving-size-3496390</a></p>" +
        "<h2>American Diabetes Association Information</h2>" +
        "<p>" +
        "Much helpful information (even if you or someone you know is not diabetic) can be found at:<br>" +
        "<a href=\"http://www.diabetes.org/\" target=\"_blank\">American Diabetes Association</a>" +
        "</p>" +
        " <h2>Juvenile Diabetes Research Foundation</h2>" +
        " <p>  Information about juvenile diabetes can be found at: " +
        "<a href=\"http://www.jdrf.org/\" target=\"_blank\">Juvenile Diabetes Research Foundation</a>" +
        "</p>"
        ;   
      
    $("article#setup").html(text);
}

var key = "sFtfcrVdSOKA4ip3Z1MlylQmdj5Uw3JoIIWlbeQm";

var errorMessage = "Sorry. Something went wrong with the search. Please review it and then try again. If that does not work,  call me or something and I will look into it.";

function fetchSearch(searchTerm) {
    var defaultCount = 5;
    alert("entering fetchSearch");

    var string1 = " https://api.nal.usda.gov/ndb/search?format=json&q=";
    var string2 = "&max=" + defaultCount + "&offset=0&api_key=";
    alert("waystation 1");
    var searchUrl = string1.concat(searchTerm, string2, key);

    alert("waystation 2");  
    $.ajax({
        url: searchUrl,
        cache: false,
        dataType: "json",
        type: "GET",
        success: function (data) {
            alert("before parsing:  " +data);

            var result = JSON.parse(data);
            alert("after parsing");
            if (result.list) {
                if (result.list.q) {
                    alert("foo");
                    var toScreen = "Search Term : " + result.list.q +
                        "<br/>Number of Items Found: " + result.list.total +
                        "<br/>Number of Items Shown: " + defaultCount;
                    for (var i = 0; i < result.list.item.length; i++) {
                        alert(result.list.item[i].ndbno);
                        var result1 = fetchFoodReport(result.list.item[i].ndbno);
                        alert("post fetchFoodReport");
                        //                    //   result1 = '{"foods":[{"food":{"sr":"July, 2018","type":"b","desc":{"ndbno":"45066323","name":"REFRIED BEANS, UPC: 605388186744","ds":"Label Insight","manu":"WAL-MART STORES, INC.","ru":"g"},"ing":{"desc":"COOKED BEANS, WATER, CONTAINS LESS THAN 2% OF: SALT, TOMATO PASTE, CHILI PEPPER, SUGAR, ONION POWDER, GARLIC POWDER, SPICE, YEAST EXTRACT.","upd":"03/11/2018"},"nutrients":[{"nutrient_id":"208","name":"Energy","derivation":"LCCS","group":"Proximates","unit":"kcal","value":"81","measures":[{"label":"cup","eqv":124.0,"eunit":"g","qty":0.5,"value":"100"}]},{"nutrient_id":"203","name":"Protein","derivation":"LCCS","group":"Proximates","unit":"g","value":"5.65","measures":[{"label":"cup","eqv":124.0,"eunit":"g","qty":0.5,"value":"7.01"}]},{"nutrient_id":"204","name":"Total lipid (fat)","derivation":"LCCD","group":"Proximates","unit":"g","value":"0.00","measures":[{"label":"cup","eqv":124.0,"eunit":"g","qty":0.5,"value":"0.00"}]},{"nutrient_id":"205","name":"Carbohydrate, by difference","derivation":"LCCS","group":"Proximates","unit":"g","value":"15.32","measures":[{"label":"cup","eqv":124.0,"eunit":"g","qty":0.5,"value":"19.00"}]},{"nutrient_id":"291","name":"Fiber, total dietary","derivation":"LCCS","group":"Proximates","unit":"g","value":"4.8","measures":[{"label":"cup","eqv":124.0,"eunit":"g","qty":0.5,"value":"6.0"}]},{"nutrient_id":"269","name":"Sugars, total","derivation":"LCCS","group":"Proximates","unit":"g","value":"0.81","measures":[{"label":"cup","eqv":124.0,"eunit":"g","qty":0.5,"value":"1.00"}]},{"nutrient_id":"301","name":"Calcium, Ca","derivation":"LCCD","group":"Minerals","unit":"mg","value":"32","measures":[{"label":"cup","eqv":124.0,"eunit":"g","qty":0.5,"value":"40"}]},{"nutrient_id":"303","name":"Iron, Fe","derivation":"LCCD","group":"Minerals","unit":"mg","value":"1.16","measures":[{"label":"cup","eqv":124.0,"eunit":"g","qty":0.5,"value":"1.44"}]},{"nutrient_id":"306","name":"Potassium, K","derivation":"LCCS","group":"Minerals","unit":"mg","value":"355","measures":[{"label":"cup","eqv":124.0,"eunit":"g","qty":0.5,"value":"440"}]},{"nutrient_id":"307","name":"Sodium, Na","derivation":"LCCS","group":"Minerals","unit":"mg","value":"387","measures":[{"label":"cup","eqv":124.0,"eunit":"g","qty":0.5,"value":"480"}]},{"nutrient_id":"401","name":"Vitamin C, total ascorbic acid","derivation":"LCCD","group":"Vitamins","unit":"mg","value":"0.0","measures":[{"label":"cup","eqv":124.0,"eunit":"g","qty":0.5,"value":"0.0"}]},{"nutrient_id":"318","name":"Vitamin A, IU","derivation":"LCCD","group":"Vitamins","unit":"IU","value":"0","measures":[{"label":"cup","eqv":124.0,"eunit":"g","qty":0.5,"value":"0"}]},{"nutrient_id":"606","name":"Fatty acids, total saturated","derivation":"LCCD","group":"Lipids","unit":"g","value":"0.000","measures":[{"label":"cup","eqv":124.0,"eunit":"g","qty":0.5,"value":"0.000"}]},{"nutrient_id":"645","name":"Fatty acids, total monounsaturated","derivation":"LCCS","group":"Lipids","unit":"g","value":"0.000","measures":[{"label":"cup","eqv":124.0,"eunit":"g","qty":0.5,"value":"0.000"}]},{"nutrient_id":"646","name":"Fatty acids, total polyunsaturated","derivation":"LCCS","group":"Lipids","unit":"g","value":"0.000","measures":[{"label":"cup","eqv":124.0,"eunit":"g","qty":0.5,"value":"0.000"}]},{"nutrient_id":"605","name":"Fatty acids, total trans","derivation":"LCCS","group":"Lipids","unit":"g","value":"0.000","measures":[{"label":"cup","eqv":124.0,"eunit":"g","qty":0.5,"value":"0.000"}]},{"nutrient_id":"601","name":"Cholesterol","derivation":"LCCD","group":"Lipids","unit":"mg","value":"0","measures":[{"label":"cup","eqv":124.0,"eunit":"g","qty":0.5,"value":"0"}]}],"footnotes":[]}}],"count":1,"notfound":0,"api":2.0}';
                        //                  //  alert(result1);
                        //                  // var report = JSON.parse(result1); 
                        //                     var report = JSON.parse(result1, function (key, value) { return "Horse!"; }); 

                        //                    alert(report);

                        //                    var ingredients = report;
                        //                  //  var ingredients = report.foods.ing.desc;
                        //                    alert("foobar");
                        //                     toScreen = toScreen.concat("<hr/>" + result.list.item[i].name + "<br/> Ingredients: " + ingredients); 
                        //                }
                        //                document.getElementById("results").innerHTML = toScreen;
                        //            }
                        //            // else alert(document.getElementById("results").innerHTML = errorMessage + " 1");
                        //        }
                        //        else document.getElementById("results").innerHTML = errorMessage;
                        //    }
                    }
                }
            }
        },
        error: function () { document.getElementById("results").innerHTML = errorMessage; }
        //xhttp.open("GET", url, true);
        //xhttp.send();
    });
    alert("Exiting fetchSearch");
}


//// not there yet 
function fetchFoodReport(ndbno) {
    alert("Entering fetchFoodReport");
    //    var http = "https://api.nal.usda.gov/ndb/V2/reports/?ndbno=";
    //    var apiKey = "&type=f&format=json&api_key=";
    //    var foodsUrl = http.concat(ndbno, apiKey, key);   
    //    var x= $.ajax({
    //        url: foodsUrl,
    //        type: 'GET'    // needs error handling and bad food report handling
    //    });
    //    alert("getFoodReport(" + ndbno + ") almost done");
    //    var report = JSON.parse(x, function (key, value) { return "Horse!"; }
    //    alert(report);
    //    return x;
    //var report;
    //var xhttp = new XMLHttpRequest();
    //xhttp.onerror = function () { document.getElementById("results").innerHTML = errorMessage };
    //xhttp.onreadystatechange = function () {
    //    if (this.readyState === 4 && this.status === 200) {
    //        report = JSON.parse(this.responseText); 
    //    } 
    //};

    // document.getElementById("results").innerHTML = foodsUrl;
    // document.getElementById("results").innerHTML =  report.food[0].sr;
    //alert("foo");

    //xhttp.open("GET", foodsUrl, true);
    //xhttp.send();
    //alert(report);
    //return report;
    alert("Exiting fetchFoodReport");
} 