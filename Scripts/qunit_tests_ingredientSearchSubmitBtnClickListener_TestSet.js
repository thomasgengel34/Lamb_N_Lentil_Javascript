"use strict";


QUnit.test("ingredientSearchSubmitBtnClickListener_TestSet A Hello World Test", function (assert) {
    assert.equal(qunit_default.greeting, "Hello World", "Expect greeting of Hello World. Tests that qunit is working.");
});

const QUnitTestSet = {
    getTestSet: function getTestSet() {
        return {
            "list": {
                "q": "",
                "sr": "1",
                "ds": "any",
                "start": 0,
                "end": 12,
                "total": 12,
                "group": "",
                "sort": "r",
                "item": [
                    {
                        "name": "TestSetA1"
                    },
                    {
                        "name": "TestSetA2"
                    },
                    {
                        "name": "TestSetA3"
                    },
                    {
                        "name": "TestSetAB1"
                    },
                    {
                        "name": "TestSetAB2"
                    },
                    {
                        "name": "TestSetAB3"
                    },
                    {
                        "name": "TestSetB1"
                    },
                    {
                        "name": "TestSetB2"
                    },
                    {
                        "name": "TestSetB3"
                    },
                    {
                        "name": "TestSetC1"
                    },
                    {
                        "name": "TestSetC2"
                    },
                    {
                        "name": "TestSetC3"
                    }
                ]
            }
        };
    },
    getTestSetContainingA: function getTestSet() {
        return {
            "list": {
                "q": "",
                "sr": "1",
                "ds": "any",
                "start": 0,
                "end": 12,
                "total": 12,
                "group": "",
                "sort": "r",
                "item": [
                    {
                        "name": "TestSetA1"
                    },
                    {
                        "name": "TestSetA2"
                    },
                    {
                        "name": "TestSetA3"
                    },
                    {
                        "name": "TestSetAB1"
                    },
                    {
                        "name": "TestSetAB2"
                    },
                    {
                        "name": "TestSetAB3"
                    }
                ]
            }
        };
    },
    getNoneFound: function getNoneFound() {
        return "<div>Your search for  <span style=\"font-weight: bold; color:green\">" +
            "</span> found 0 items. </div> <div><div></div>";
    },

    getTestSetReturned: function getTestSetReturned() {
        return "<div>Your search for  <span style=\"font-weight: bold; color:green\">" +
            "</span> found 12 items. </div>" +
            " <div><div>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetA1</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetA2</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetA3</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetAB1</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetAB2</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetAB3</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetB1</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetB2</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetB3</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetC1</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetC2</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetC3</a>" +
            "</div>";
    },


    getTestSetReturnedContainingA: function getTestSetReturnedContainingA() {
        return "<div>Your search for  <span style=\"font-weight: bold; color:green\">" +
            "</span> found 6 items. </div> <div><div>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetA1</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetA2</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetA3</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetAB1</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetAB2</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetAB3</a>" +
            "</div>";

    }
};


QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 1 ( \"\",  \"\",    false,   false)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const correct = QUnitTestSet.getTestSetReturned();
        done();
        QUnit.assert.equal(returned, correct);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("", "", false, false, testSearchFunction);
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.getTestSet();
        return returned;
    };
});



QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 2 ( \"\",  \"\",    true,   false)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const correct = QUnitTestSet.getNoneFound();

        done();
        QUnit.assert.equal(returned, correct);
    });

    async function innerTest1() {
        const response = await  foodList.ingredientSearchSubmitBtnClickListener("", "", true, false, testSearchFunction);
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.getTestSet();
        return returned;
    };
});

QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 3   ( \"\",  \"A\",    true,   false)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = "<div>Your search for  <span style=\"font-weight: bold; color:green\">" +
            "</span> found 6 items. </div>" +
            " <div><div>"+
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetB1</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetB2</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetB3</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetC1</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetC2</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetC3</a>" +
            "</div>";

        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("", "A", true, false, testSearchFunction);
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.getTestSet();
        return returned;
    };
});


QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 4 ( \"\",  \"A\",   false,   false)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const correct = "<div>Your search for  <span style=\"font-weight: bold; color:green\">" +
            "</span> found 6 items. </div>" +
            " <div><div>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetA1</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetA2</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetA3</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetAB1</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetAB2</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetAB3</a>" +
            "</div>";

        done();
        QUnit.assert.equal(returned, correct);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("", "A", false, false, testSearchFunction);
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.getTestSet();
        return returned;
    };
});


QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 5 ( \"\",  \"D\",   false,   false)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.getNoneFound();
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("", "D", false, false, testSearchFunction);
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.getTestSet();
        return returned;
    };
});


QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 6 ( \"\",  \"D\",  true,   false)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.getTestSetReturned();
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("", "D", true, false, testSearchFunction);
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.getTestSet();
        return returned;
    };
});


QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 7 ( \"A\",  \"\", false,   false)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.getTestSetReturnedContainingA();
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("A", "", false, false, testSearchFunction);
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.getTestSetContainingA();
        return returned;
    };
});

QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 8 ( \"A\",  \"\", true,   false)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.getNoneFound();
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("A", "", true, false, testSearchFunction);
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.getTestSetContainingA();
        return returned;
    };
});


QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 9 ( \"A\",  \"A\", false,   false)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.getTestSetReturnedContainingA();
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("A", "A", false, false, testSearchFunction);
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.getTestSetContainingA();
        return returned;
    };
});

QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 10 ( \"A\",  \"A\", true,   false)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.getNoneFound();
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("A", "A", true, false, testSearchFunction); 
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.getTestSetContainingA(); 
        return returned;
    };
});

QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 11 ( \"A\",  \"B\",false,   false)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = "<div>Your search for  <span style=\"font-weight: bold; color:green\">" +
            "</span> found 3 items. </div> <div><div>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetAB1</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetAB2</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetAB3</a>" +
            "</div>";
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("A", "B", false, false, testSearchFunction); 
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.getTestSetContainingA(); 
        return returned;
    };
});

QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 12 ( \"A\",  \"B\"true,   false)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = "<div>Your search for  <span style=\"font-weight: bold; color:green\">" +
            "</span> found 3 items. </div> <div><div>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetA1</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetA2</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetA3</a>" +
            "</div>";
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("A", "B",true, false, testSearchFunction);
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.getTestSetContainingA();
        return returned;
    };
});

QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 13 ( \"A\",  \"C\",false,   false)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.getNoneFound();
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("A", "C",false, false, testSearchFunction); 
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.getTestSetContainingA(); 
        return returned;
    };
});


QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 14 ( \"A\",  \"C\",true,   false)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.getTestSetReturnedContainingA();
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("A", "C", true, false, testSearchFunction); 
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.getTestSetContainingA(); 
        return returned;
    };
});


QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 15 ( \"D\",  \"\",false,   false)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.getNoneFound();
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("D", "", false, false, testSearchFunction); 
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.getNoneFound(); 
        return returned;
    };
});

QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 16 ( \"D\",  \"\", true,   false)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.getNoneFound();
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("D", "", true, false, testSearchFunction); 
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.getNoneFound(); 
        return returned;
    };
});

QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 17 ( \"D\",  \"\", false,   false)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.getNoneFound();
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("D", "", false, false, testSearchFunction); 
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.getNoneFound(); 
        return returned;
    };
});


QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 18 ( \"Test\",  \"est\", false,   false)", function (assert) {
    let done = assert.async();  
    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.getTestSetReturned();
        done(); 
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("Test", "est", false, false, testSearchFunction); 
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.getTestSet(); 
        return returned;
    };
});