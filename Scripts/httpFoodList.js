"use strict";

const httpFoodList = { 

    key:"sFtfcrVdSOKA4ip3Z1MlylQmdj5Uw3JoIIWlbeQm",

    ingredientSearchSubmit: async function ingredientSearchSubmit(search) {
        let searchUrl = foodList.buildFoodListSearchUrl(search);
        const responseJson = await httpFoodList.httpCall(searchUrl);
        return responseJson;
    },

    httpCall: async function httpCall(searchUrl) {
        const res = await fetch(searchUrl).catch(function (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });

        if (res.status === 200) {
            const data = await res.json();
            return data;
        }
        return { "status": res.status, "statusText": res.statusText };
    },

    getErrorMessage: function (searchQuery) {
        const errorMessage = "<div id=\"errorMessage\">Sorry. Something went wrong with the search. Please review it and then try again. If that does not work,  call me or something and I will look into it.</div>";
        return errorMessage;
    },

    checkForErrorReturned: function (json) {
        let message = "";
        if (JSON.stringify(json).indexOf("error") !== -1) {
            message = this.getErrorMessage();
        }
        return message;
    },
    foodReportSearchSubmit: async function (search) {
        let searchUrl = buildFoodReportSearchUrl(search);
        const responseJson = await httpCall(searchUrl);
        return responseJson;
    }
};

