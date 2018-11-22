"use strict";

QUnit.test("ui hello test", function (assert) {
    assert.ok(1 ===  1 , "Passed!");
}); 

var getButter = function () {
    const  butter =
        {
            "list": {
                "q": "butter",
                "sr": "Legacy",
                "ds": "any",
                "start": 0,
                "end": 25,
                "total": 4415,
                "group": "",
                "sort": "n",
                "item": [
                    {
                        "offset": 0,
                        "group": "Branded Food Products Database",
                        "name": "ABBOTT, EAS, MYOPLEX 30 BUILD MUSCLE BAR, CHOCOLATE PEANUT BUTTER, UPC: 791083622813",
                        "ndbno": "45258948",
                        "ds": "LI"
                    },
                    {
                        "offset": 1,
                        "group": "Branded Food Products Database",
                        "name": "ABC, PEANUT BUTTER, UPC: 837991219186",
                        "ndbno": "45166992",
                        "ds": "LI"
                    }]
            }
        };
    return butter;
}; 
 