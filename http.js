"use strict";

var ingredientSearchSubmit = async function (search) {
    let searchUrl = buildFoodListSearchUrl(search);
    console.log("bracket 1 begin");
    console.log(searchUrl);
    var responseJson = await httpCall(searchUrl);
    console.log("bracket 1 end " + responseJson);
    return responseJson;
};

var ingredientSearchSubmitReturn = function () {
    console.log(JSON.stringify(myJson));
};

 var httpCall= function(searchUrl){
    fetch(searchUrl)
        .then(function (response) {
            console.log(response);
        //   return  response; //we only get here if there is no error 
        //})
        //.then(function (myJson) { return mJson.json;})
        //.catch( error => {
        //    console.log("catch called");
        //    console.log(error.message);
            getErrorMessage();
        });
};

//var tryThis =async function (searchUrl) {
//    console.log("entering tryThis");
//    var foo = await httpCall(searchUrl);
//    console.log("middle tryThis");
//    console.log(foo);
//    console.log("leaving tryThis");

//    return foo;
//};



var getErrorMessage = function () {
    const errorMessage = "Sorry. Something went wrong with the search. Please review it and then try again. If that does not work,  call me or something and I will look into it.";
    console.log("getErrorMessage()");
    console.log(errorMessage);
    console.log("errorMessage gotten");
    return errorMessage;
};

var checkForErrorReturned = function (json) {
    var message = "";
    if (JSON.stringify(json).indexOf("error") !== -1) {
        message = getErrorMessage();
    }
    return message;
};


function showNutrientDetailsClickListener(z) {   ///////////////////////////convert to fetch().  Replace z with something helpful.  Separate this from UI  calls.
    var searchUrl = buildFoodReportSearchUrl(z);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var result = formatFoodReport(this.responseText);
            $("#results").empty();
            $("#results").append(result);
        }
    };
    xhttp.open('GET', searchUrl);
    xhttp.send();
}

async function fetchUsers(searchUrl) {
    const res = await fetch(searchUrl);
    const data = await res.json();
 //   console.log(data); // this was successful
    return data;

}