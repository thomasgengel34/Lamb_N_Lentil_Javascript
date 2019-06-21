"use strict";


QUnit.test("ingredientSearchSubmitBtnClickListener_TestSet A Hello World Test", function (assert) {
    assert.equal(qunit_default.greeting, "Hello World", "Expect greeting of Hello World. Tests that qunit is working.");
});

const QUnitTestSet = {
    testSet: {
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
    },
    testSetContainingA: {
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
    },
    noneFound: "<div>Your search for  <span style=\"font-weight: bold; color:green\">" +
        "</span> found 0 items. </div> <div><div></div>"
    ,

    testSetReturned:
        "<div>Your search for  <span style=\"font-weight: bold; color:green\">" +
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
        "</div>"
    ,

    testSetReturnedContainingA:
        "<div>Your search for  <span style=\"font-weight: bold; color:green\">" +
        "</span> found 6 items. </div> <div><div>" +
        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetA1</a>" +
        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetA2</a>" +
        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetA3</a>" +
        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetAB1</a>" +
        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetAB2</a>" +
        "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetAB3</a>" +
        "</div>"
};


QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 1 ( \"\",  \"\",     include ,  ascend)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const correct = QUnitTestSet.testSetReturned;
        done();
        QUnit.assert.equal(returned, correct);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("", "", ui.excludeInclude.include, ui.ascendDescend.ascend, testSearchFunction);
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.testSet;
        return returned;
    };
});



QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 2 ( \"\",  \"\",    exclude  ,  descend )", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const correct = QUnitTestSet.noneFound;
        done();
        QUnit.assert.equal(returned, correct);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("", "", ui.excludeInclude.exclude, ui.ascendDescend.descend, testSearchFunction);

        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.testSet;

        return returned;
    };
});

QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 3   ( \"\",  \"A\",     exclude ,  ascend )", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = "<div>Your search for  <span style=\"font-weight: bold; color:green\">" +
            "</span> found 6 items. </div>" +
            " <div><div>" +
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
        const response = await foodList.ingredientSearchSubmitBtnClickListener("", "A", ui.excludeInclude.exclude, ui.ascendDescend.ascend, testSearchFunction);
        return response
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.testSet;
        return returned;
    };
});


QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 4 ( \"\",  \"A\",  include,   ascending)", function (assert) {
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
        const response = await foodList.ingredientSearchSubmitBtnClickListener("", "A", ui.excludeInclude.include, ui.ascendDescend.ascend, testSearchFunction);
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.testSet;
        return returned;
    };
});


QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 5 ( \"\",  \"D\",    exclude  ,   ascending )", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.noneFound;
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("", "D", ui.excludeInclude.exclude, ui.ascendDescend.ascend, testSearchFunction);
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.noneFound;
        return returned;
    };
});


QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 6 ( \"\",  \"D\",   exclude,   ascending)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.testSetReturned;
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("", "D", ui.excludeInclude.exclude, ui.ascendDescend.ascend, testSearchFunction);
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.testSet;
        return returned;
    };
});


QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 7 ( \"A\",  \"\", include,   ascending)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.testSetReturnedContainingA;
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("A", "", ui.excludeInclude.include, ui.ascendDescend.ascend, testSearchFunction);
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.testSetContainingA;
        return returned;
    };
});

QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 8 ( \"A\",  \"\", exclude ,   ascending )", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.noneFound;
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("A", "", ui.excludeInclude.exclude, ui.ascendDescend.ascend, testSearchFunction);
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.testSetContainingA;
        return returned;
    };
});


QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 9 ( \"A\",  \"A\", include,   ascending)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.testSetReturnedContainingA;
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("A", "A", ui.excludeInclude.include, ui.ascendDescend.ascend, testSearchFunction);
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.testSetContainingA;
        return returned;
    };
});

QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 10 ( \"A\",  \"A\",  exclude,   descending)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.noneFound;
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("A", "A", ui.excludeInclude.exclude, ui.ascendDescend.descend, testSearchFunction);
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.testSetContainingA;
        return returned;
    };
});

QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 11 ( \"A\",  \"B\", include ,  ascending )", function (assert) {
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
        const response = await foodList.ingredientSearchSubmitBtnClickListener("A", "B", ui.excludeInclude.include, ui.ascendDescend.ascend, testSearchFunction);
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.testSetContainingA;
        return returned;
    };
});

QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 12 ( \"A\",  \"B\",  excluding , descending)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = "<div>Your search for  <span style=\"font-weight: bold; color:green\">" +
            "</span> found 3 items. </div> <div><div>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetA3</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetA2</a>" +
            "<a href=\"#\" id=\"fetchReportBtn\"  type=\"submit\" class=\"fetchReportBtn\"   onclick=fetchReport(undefined)>TestSetA1</a>" +
            "</div>";
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("A", "B", ui.excludeInclude.exclude, ui.ascendDescend.descend, testSearchFunction);
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.testSetContainingA;
        return returned;
    };
});

QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 13 ( \"A\",  \"C\", include ,  ascending )", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.noneFound;
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("A", "C", ui.excludeInclude.include, ui.ascendDescend.ascend, testSearchFunction); 
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.testSetContainingA ; 
        return returned;
    };
});


QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 14 ( \"A\",  \"C\",exclude  ascend)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.testSetReturnedContainingA ;
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("A", "C", ui.excludeInclude.exclude, ui.ascendDescend.ascend, testSearchFunction); 
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.testSetContainingA; 
        return returned;
    };
});


QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 15 ( \"D\",  \"\",include,  descend)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.noneFound;
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("D", "", ui.excludeInclude.include, ui.ascendDescend.descend, testSearchFunction); 
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.noneFound; 
        return returned;
    };
});

QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 16 ( \"D\",  \"\", exclude, ascend)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.noneFound;
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("D", "", ui.excludeInclude.exclude, ui.ascendDescend.ascend, testSearchFunction); 
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.noneFound; 
        return returned;
    };
});

QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 17 ( \"D\",  \"\", include,  ascend)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.noneFound;
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("D", "", ui.excludeInclude.include, ui.ascendDescend.ascend, testSearchFunction); 
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.noneFound; 
        return returned;
    };
});


QUnit.test("ingredientSearchSubmitBtnClickListener TestSet 18 ( \"Test\",  \"est\", include,   ascend)", function (assert) {
    let done = assert.async();  
    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestSet.testSetReturned;
        done(); 
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("Test", "est", ui.excludeInclude.include, ui.ascendDescend.ascend, testSearchFunction); 
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.testSet; 
        return returned;
    };
});
 