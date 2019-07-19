"use strict";

const httpFoodList = { 
   
    key:"sFtfcrVdSOKA4ip3Z1MlylQmdj5Uw3JoIIWlbeQm",

    ingredientSearchSubmit: async function ingredientSearchSubmit(search) { 
        let searchUrl = foodList.buildSearchUrl(search);
        const responseJson = await httpFoodList.httpCall(searchUrl); 
        return responseJson;
    },

    res: { "status": -1 },

    httpCall: async function httpCall(searchUrl) {  
       const requestOptions = {
             method: 'GET',
           headers: { 'Content-Type': 'application/json' },  
           mode: 'cors',
           cache: 'default'
        }; 
        httpFoodList.res = await fetch(searchUrl, requestOptions).catch(function (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        }); 
     
        if (httpFoodList.res && httpFoodList.res.status === 200) { 
            const data = await httpFoodList.res.json(); 
            return data;
        } 
        return { "status": httpFoodList.res.status, "statusText": httpFoodList.res.statusText };
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
    } 
};