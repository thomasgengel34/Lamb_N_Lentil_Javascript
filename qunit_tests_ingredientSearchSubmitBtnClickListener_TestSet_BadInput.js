"use strict";


QUnit.test("ingredientSearchSubmitBtnClickListener_TestSet_BadInput A Hello World Test", function (assert) {
    assert.equal(qunit_default.greeting, "Hello World", "Expect greeting of Hello World. Tests that qunit is working.");
});

const QUnitTestButtonTestSetFirstLineReturned_BadInput = {
    NoSearchText: "<div class=\"foodListBoxWrapper\">" +
        "<div id=\"listHeaderDiv\" >Your search for  <span style=\"font-weight: bold; color:green\">-- no text --"
 ,
 
    noneFound: "<div id=\"listHeaderDiv\" class=\"foodListBoxWrapper\" >Your search for -- no text -- found 0 items. </div>",
    noneFoundMinus: "<div id=\"listHeaderDiv\" class=\"foodListBoxWrapper\" >Your search for -- no text -- found 0 items. </div>"
};

QUnit.test("ingredientSearchSubmitBtnClickListener_BadInput TestSet 1 ( \"-\",  \"\", include,  ascend)", function (assert) {
    let done = assert.async();

    setTimeout(async function () {
        let returned = await innerTest1();
        const expected = QUnitTestButtonTestSetFirstLineReturned_BadInput.noneFoundMinus;
        done();
        QUnit.assert.equal(returned, expected);
    });

    async function innerTest1() {
        const response = await foodList.ingredientSearchSubmitBtnClickListener("-", "", ui.excludeInclude.include, ui.ascendDescend.ascend, testSearchFunction);
        return response;
    }

    const testSearchFunction = async function () {
        const returned = QUnitTestSet.noneFoundMinus;
        return returned;
    };
});