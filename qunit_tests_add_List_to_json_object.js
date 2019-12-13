"use strict";

const qunit_tests_add_List_to_json_object = {
    baseObject: { "ichi": 0, "ni": 1, "san": "a" },
    listToAdd: ["eins", "zwo", "zuppa"],
    correctObject: { "ichi": 0, "ni": 1, "san": "a", "list": ["eins", "zwo", "zuppa"] }
};


QUnit.test("qunit_tests_add_List_to_json_object.js - A Hello World Test", function (assert) {
    assert.equal(qunit_default.greeting, "Hello World", "Expect greeting of Hello World. Tests that qunit is working.");
});

QUnit.test("qunit_tests_add_List_to_json_object.js - Test 1", function (assert) {
    const returned = jsonManipulation.appendArray(qunit_tests_add_List_to_json_object.baseObject, qunit_tests_add_List_to_json_object.listToAdd);
    assert.deepEqual(returned, qunit_tests_add_List_to_json_object.correctObject);
});

QUnit.test("qunit_tests_add_List_to_json_object.js - Test 2  null base object", function (assert) {
    const returned = jsonManipulation.appendArray(null, qunit_tests_add_List_to_json_object.listToAdd);
    assert.deepEqual(returned, null);
});

QUnit.test("qunit_tests_add_List_to_json_object.js - Test 3 null array", function (assert) {
    const returned = jsonManipulation.appendArray(qunit_tests_add_List_to_json_object.baseObject, null);
    assert.deepEqual(returned, qunit_tests_add_List_to_json_object.baseObject);
});

QUnit.test("qunit_tests_add_List_to_json_object.js - Test 4 base object is string", function (assert) {
    const stringValue = "Hey there I am a string!";
    const returned = jsonManipulation.appendArray(stringValue, qunit_tests_add_List_to_json_object.listToAdd);
    assert.deepEqual(returned, stringValue);
});

QUnit.test("qunit_tests_add_List_to_json_object.js - Test 5 list is string", function (assert) {
    const stringValue = "Hey there I am a string!";
    const returned = jsonManipulation.appendArray(qunit_tests_add_List_to_json_object.baseObject, stringValue);
    assert.deepEqual(returned, qunit_tests_add_List_to_json_object.baseObject);
});

QUnit.test("qunit_tests_add_List_to_json_object.js - Test 6 both variables are null", function (assert) {
    const returned = jsonManipulation.appendArray(null, null);
    assert.deepEqual(returned, null);
});


QUnit.test("qunit_tests_add_List_to_json_object.js - Test 7 object is a number, list is an array", function (assert) {

    const testValue = 70707;
    const returned = jsonManipulation.appendArray(testValue, qunit_tests_add_List_to_json_object.listToAdd);

    console.log(returned);
    assert.deepEqual(returned, testValue);
});


QUnit.test("qunit_tests_add_List_to_json_object.js - Test 8 object is a boolean , list is an array", function (assert) {
    const testNumber = 2;
    assert.expect(testNumber);
    const testValue = true;
    const returnedTrue = jsonManipulation.appendArray(testValue, qunit_tests_add_List_to_json_object.listToAdd);
    const returnedFalse = jsonManipulation.appendArray(-testValue, qunit_tests_add_List_to_json_object.listToAdd);

    assert.deepEqual(returnedTrue, testValue);
    assert.deepEqual(returnedFalse, -testValue);
});

QUnit.test("qunit_tests_add_List_to_json_object.js - Test 9 object is a undefined, list is an array", function (assert) {
    const testNumber = 1;
    assert.expect(testNumber);
    let testValue;
    const returned = jsonManipulation.appendArray(testValue, qunit_tests_add_List_to_json_object.listToAdd);

    assert.deepEqual(returned,null);
});

QUnit.test("qunit_tests_add_List_to_json_object.js - Test 10 object is a symbol, list is an array", function (assert) {
    const testNumber = 1;
    assert.expect(testNumber);
    let testValue = Symbol("testMe");
    const returned = jsonManipulation.appendArray(testValue, qunit_tests_add_List_to_json_object.listToAdd);

    assert.deepEqual(returned, testValue);
});
// string, number, boolean, null, undefined, symbol 
 