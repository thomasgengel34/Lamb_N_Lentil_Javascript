"use strict";

QUnit.test("ui hello test", function (assert) {
    assert.ok(1 === 1, "Passed!");
});

//QUnit.test("ui-1 clicking search button on home page returns a result on search ff", function (assert) {
//    const done = assert.async(2);
//    const fixture = $("#qunit-fixture");
//    let passOrFail = false;
//    fixture.append("<input id=\"foodsSearchTextBox\" type=\"text\" placeholder=\"Search\" autofocus  />");
//    fixture.append("<button id=\"foodsSearchSubmitBtn\" type=\"submit\" class=\"btn btn -default \">Search</button>");
//    fixture.append(" <div id=\"results\"></div>");

//    let textbox = $("#qunit-fixture:first");
//    textbox.val("ff");
//    let search = textbox.val();

//    $("#qunit-fixture:last").click(async function () { 
//       await setTimeout(""); 
//    });

//    $("#qunit-fixture:last").click();

//     setTimeout(async function () {
//    let returned = await innerTest1();
//        assert.equal(returned, true, "Call returned query successfully for name from search on ff");
//     done();
//    });


//    setTimeout(async function () {
//        let returned = await innerTest2();
//        assert.equal(returned, true, "Call returned 50 items");
//        done();
//    });

//    async function innerTest1() {
//        console.log(79);
//        console.log(search);
//        const response = await ingredientSearchSubmitBtnClickListener(search); 
//        console.log(80);
//        console.log(response);
//        console.log(81);
//        if (response.list.q === search) {
//            passOrFail = true;
//        } 
//        return passOrFail;
//    }

//    async function innerTest2() {
//        const response = await ingredientSearchSubmitBtnClickListener(search); 
//        if (response.list.end === 50) {
//            passOrFail = true;
//        } 
//        return passOrFail;
//    }

//});

//// TODO: check search for qq: verify it results in an error

//QUnit.test("ui-2 clicking search button on home page populates result div for ff", function (assert) {
  
//    const done = assert.async();
//    const fixture = $("#qunit-fixture");
//    let passOrFail = false;
//    fixture.append("<input id=\"foodsSearchTextBox\" type=\"text\" placeholder=\"Search\" autofocus  />");
//    fixture.append("<button id=\"foodsSearchSubmitBtn\" type=\"submit\" class=\"btn btn -default \">Search</button>");
//    fixture.append(" <div id=\"results\"></div>"); 
//    let textbox = $("#qunit-fixture:first");
//    textbox.val("ff");
//    let search = textbox.val();

//    $("#qunit-fixture:last").click(async function () {
//        await setTimeout("");
//    });

//    $("#qunit-fixture:last").click();

//    setTimeout(async function () {

//        let returned = await innerTest1();
//        assert.equal(returned, true, "Call returned query successfully for name from search on ff");
//        done();
//    });

     

//    async function innerTest1() {
//        const response = await ingredientSearchSubmitBtnClickListener(search);
//     //   console.log(response);
//        const value = $('#results').val();
//        console.log(1); 
//        console.log(value);
//        console.log(2);
//        if (value !== null) {
//            passOrFail = true;
//        }
//     //   console.log(passOrFail);
//        return passOrFail;
//    }

//});
