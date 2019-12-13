"use strict";

// https://fdc.nal.usda.gov/


/* 
 * For additional support, please contact us. When contacting us, please tell us what API you're accessing and provide the following account details so we can quickly find you:
* Account Email: thomasgengel34@yahoo.com
* Account ID: d8d087ff-6c0c-4831-bb40-8ea14b8d65ad 
*/

const myNewHttp = {
    // this is generated from the original qunit_http_foodList.js
    // https://api.nal.usda.gov/ndb/V2/reports?ndbno=01009&type=b&format=json&api_key=sFtfcrVdSOKA4ip3Z1MlylQmdj5Uw3JoIIWlbeQm


    validFoodDetailsEndPointForBeets:"https://api.nal.usda.gov/fdc/v1/384502?api_key=DX0fAARW5SLpkKBpOdUbGovEftRe2ozlcdLpSayi",
    tryMe:"https://api.nal.usda.gov/fdc/v1/search?api_key=DX0fAARW5SLpkKBpOdUbGovEftRe2ozlcdLpSayi",
    oldKey: "sFtfcrVdSOKA4ip3Z1MlylQmdj5Uw3JoIIWlbeQm",
    newKey: "DX0fAARW5SLpkKBpOdUbGovEftRe2ozlcdLpSayi",
    newerKey:"8TeTbiQqUfsgbwf6ofTCaX7pMZznsp6cueWkcLRf",
    //ingredientSearchSubmit: async function ingredientSearchSubmit(search) {
    //    let searchUrl = foodList.buildSearchUrl(search);
    //    const responseJson = await httpFoodList.httpCall(searchUrl);
    //    return responseJson;
    //},

    res: { "status": -1 },

    httpCall: async function httpCall(searchUrl) {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default'
        };
      
        myNewHttp.res = await fetch(searchUrl, requestOptions).catch(function (error) { 
            console.log('There has been a problem with your fetch operation: ', error.message);
            console.log(myNewHttp);
        });
      
        if (myNewHttp.res && myNewHttp.res.status === 200) {
            const data = await myNewHttp.res.json();
          
            return data;
        }
        else {
            return "Failure";
        }
        //console.log(44);
        //console.log(myNewHttp);
        //return { "status": myNewHttp.res.status, "statusText": myNewHttp.res.statusText };
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
  rattleSnakePete: {
    "list": {
        "ds": "any",
        "end": 1,
        "group": "",
        "item": [
          {
              "ds": "LI",
              "group": "Branded Food Products Database",
              "manu": "Rainbow Games Inc",
              "name": "FAIRPORT BREWING COMPANY, RATTLESNAKE PETE'S ROOT BEER, UPC: 019962777776",
              "ndbno": "45362044",
              "offset": 0
          }
        ],
        "q": "rattlesnake",
        "sort": "r",
        "sr": "1",
        "start": 0,
        "total": 1
    }
  } ,

 beets : {
    "list": {
        "ds": "any",
        "end": 1,
        "group": "",
        "item": [
          {
              "ds": "LI",
              "group": "Branded Food Products Database",
              "manu": "G's Fresh Beets Incorporated",
              "name": "LOVE BEETS, BEET BAR, BEET, CHERRY, UPC: 850996004533",
              "ndbno": "45033812",
              "offset": 0
          }
        ],
        "q": "beets",
        "sort": "r",
        "sr": "1",
        "start": 0,
        "total": 397
    }
 },
peaches:{
    "list": {
        "ds": "any",
        "end": 1,
        "group": "",
        "item": [
          {
              "ds": "LI",
              "group": "Branded Food Products Database",
              "manu": "Big Y Foods, Inc.",
              "name": "LITE SLICED PEACHES, YELLOW CLING PEACHES IN A BLEND OF FRESH PEACH & PEAR JUICE FROM CONCENTRATE, UPC: 018894331360",
              "ndbno": "45264819",
              "offset": 0
          }
        ],
        "q": "peaches",
        "sort": "r",
        "sr": "1",
        "start": 0,
        "total": 1431
    }
}
}; 



QUnit.test("qunit_http_foodList_r1 1", function (assert) {
    assert.equal(qunit_default.greeting, "Hello World", "Expect rattlesnakeJoe");
});
  
QUnit.test("qunit_http_foodList_r1 2 Rattlesnake Pete", function (assert) {
    let done = assert.async(); 
    // this was copied as the go-by on the fdc website on 11/29/2019 https://api.nal.usda.gov/fdc/v1/search?api_key=MY_API_KEY
    //works:
   const searchUrl = "https://api.nal.usda.gov/ndb/search?format=json&q=rattlesnake&max=50&offset=0&api_key="+myNewHttp.newKey;
    // tried - does not work
   // const searchUrl = "https://api.nal.usda.gov/fdc/v1/search?api_key="+myNewHttp.newKey;
   
    setTimeout(async function () {
        let returned = await innerTest1();
        const expected =  myNewHttp.rattleSnakePete;
        done();
        QUnit.assert.deepEqual(returned, expected);
    }); 
    async function innerTest1() { 
        const response = await myNewHttp.httpCall(searchUrl);
        return response;
    }
});


QUnit.test("qunit_http_foodList_r1 4 Beets", function (assert) {
    let done = assert.async(); 
      const searchUrl = "https://api.nal.usda.gov/ndb/search?format=json&q=beets&max=1&offset=0&api_key="+myNewHttp.newKey;
    
    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = myNewHttp.beets;
        done();
        QUnit.assert.deepEqual(returned, expected);
    });
 
    async function innerTest1() { 
        const response = await myNewHttp.httpCall(searchUrl);
        return response;
    }
});

QUnit.test("qunit_http_foodList_r1 4 Peaches", function (assert) {
    let done = assert.async(); 
    // this works
     const searchUrl = "https://api.nal.usda.gov/ndb/search?format=json&q=peaches&max=1&offset=0&api_key="+myNewHttp.newKey;
    // this does not work
    //const searchUrl = "https://fdc.nal.usda.gov/fdc-app.html#/?query=peach&api_key=" + myNewHttp.newKey;// + "&generalSearchInput=beets";
    // this does not work
  //  const searchUrl ="https://api.nal.usda.gov/fdc/v1/search?api_key="+myNewHttp.newKey;
    // this does not work
    //   const searchUrl = "https://api.nal.usda.gov/fdc/search?query=peach&api_key=" + myNewHttp.newKey + "&generalSearchInput=beets";
 // this does not work
  //  const searchUrl = "https://api.nal.usda.gov/fdc/v1/search?api_key=" + myNewHttp.newKey;
   
    setTimeout(async function () {
        let returned = await innerTest1();
      
        const expected = myNewHttp.peaches;
        done();
        QUnit.assert.deepEqual(returned, expected);
    });
 
    async function innerTest1() { 
        const response = await myNewHttp.httpCall(searchUrl);
        return response;
    }
});  

QUnit.test("qunit_http_foodList_r1 5 Peaches with Kerosene", function (assert) {
    let done = assert.async(); 
    //  
    //const searchUrl = "https://api.nal.usda.gov/ndb/search?format=json&q=peaches&max=1&offset=0&api_key="+myNewHttp.newKey;
    const searchUrl = "https://api.nal.usda.gov/ndb/search?format=json&q=peaches&max=1"
       // +"&ingredients=kerosene"  // doesn't make a difference
       //+"&brandowner=DelMonte" // doesn't make a difference
      // +"includeDataTypes=-branded"  // Failure!
     //  +"includeDataTypes=branded"  // 
        +"&offset=0&api_key="
        +myNewHttp.newKey;
    
   
    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = myNewHttp.peaches;
        console.log(220);
        console.log(returned);
        done();
        QUnit.assert.deepEqual(returned, expected);
    });
 
    async function innerTest1() { 
        const response = await myNewHttp.httpCall(searchUrl);
        return response;
    }
});  