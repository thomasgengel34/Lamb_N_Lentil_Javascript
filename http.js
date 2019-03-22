"use strict";

const getKey = function () {
    const key = "sFtfcrVdSOKA4ip3Z1MlylQmdj5Uw3JoIIWlbeQm";
    return key;
};

const ingredientSearchSubmit = async function ingredientSearchSubmit(search) {
    let searchUrl = buildFoodListSearchUrl(search);
    const responseJson = await httpCall(searchUrl);
    return responseJson;
};

async function httpCall(searchUrl) { 
    const res = await fetch(searchUrl).catch(function (error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
    }); 

    if (res.status === 200) {
        const data = await res.json();  
        return data;
    } 
    return { "status": res.status, "statusText": res.statusText };
}

const getErrorMessage = function (searchQuery) { 
    const errorMessage = "<div id=\"errorMessage\">Sorry. Something went wrong with the search. Please review it and then try again. If that does not work,  call me or something and I will look into it.</div>";
    return errorMessage;
};

const checkForErrorReturned = function (json) { 
    let message = "";
    if (JSON.stringify(json).indexOf("error") !== -1) {
        message = getErrorMessage();
    }
    return message;
};

const foodReportSearchSubmit = async function (search) {
    let searchUrl = buildFoodReportSearchUrl(search);
    const responseJson = await httpCall(searchUrl);
    return responseJson;
};

 
