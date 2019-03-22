 "use strict";
 


QUnit.test("foodList_filter-1 A Hello World Test", function (assert) {
    assert.equal(greeting, "Hello World", "Expect greeting of Hello World. Tests that qunit is working.");
});



QUnit.test("foodList_filter_apple-2 verify a filtered list with a filter and IsChecked not checked works", function (assert) {
   
    const numberOfAssertions =3;
    assert.expect(numberOfAssertions);
    var done = assert.async();
    const foodList = getFoodList();
    const fixture = document.getElementById("qunit-fixture");
    const node = document.createElement("div");
    node.setAttribute("id", "results");
    fixture.appendChild(node);
 
    let filterText = "apple";
    let IsChecked = false; 
    let correct = [
        {
            "name": "apple pie"
        },
        {
            "name": "apple tree"
        } 
    ];
   
    setTimeout(async function (assert) {
       let returned = await innerTest1();
       done(); 
        QUnit.assert.equal(returned[0].valueOf, correct[0].valueOf, "0");  // TODO: verify these are correct
       QUnit.assert.equal(returned[1].valueOf, correct[1].valueOf, "1"); 
       QUnit.assert.equal(returned.length, correct.length, "length"); 
    });
 
    function innerTest1() {
      let response = filterList(foodList, filterText, IsChecked); 
        return response;
    }
}, 3000); 
 


QUnit.test("foodList_filter-apple-3 verify a filtered list with a filter and IsChecked is checked works", function (assert) {
    const testNumber = 5;
    assert.expect(testNumber);
    var done = assert.async();
    const foodList = getFoodList();
    const fixture = document.getElementById("qunit-fixture");
    const node = document.createElement("div");
    node.setAttribute("id", "results");
    fixture.appendChild(node);

    let filterText = "apple pie";
    let IsChecked = true;

    let correct = [ 
        { "name": "apple tree" },
        { "name": "banana bread" },
        { "name": "black bread" },
        { "name": "blueberry bush" },
        { "name": "cherry bush" },
        { "name": "cherry pie" },
        { "name": "egg plant" }];

    setTimeout(async function (assert) {
        let returned = await innerTest1();
        QUnit.assert.equal(returned[0].valueOf, correct[0].valueOf, "0");  // TODO: verify these are correct
        QUnit.assert.equal(returned[1].valueOf, correct[1].valueOf, "1");
        QUnit.assert.equal(returned[2].valueOf, correct[2].valueOf, "2");
        QUnit.assert.equal(returned[3].valueOf, correct[3].valueOf, "3");
        QUnit.assert.equal(returned.length, correct.length, "length");
        done();
    });

    function innerTest1() {
        let response = filterList(foodList, filterText, IsChecked);
        return response;
    }
}, 3000);

/*
 * Not sure any of the following tests are correctly reporting success. .valueOf is tricky sometimes.  Need to do whatI did above - check every value.
// */
 
 

QUnit.test("foodList_filter-6  filter \'apple pie\' with reverse sort", function (assert) { 
       
    const numberOfTests = 2;
    assert.expect(numberOfTests);
    var done = assert.async();
    const foodList = getFoodList(); 
    const fixture = document.getElementById("qunit-fixture");
    const node = document.createElement("div");
    node.setAttribute("id", "results");
    fixture.appendChild(node);

    let filterText = "apple pie";
    let IsChecked = false;
  
    let correct = [ { "name": "apple pie" }];
       
    setTimeout(async function (assert) {
        let returned = await innerTest1(); 
       
        returned = sortList(returned, false);   
       QUnit.assert.ok(returned[0].name === correct[0].name, "0  " + returned[0].name + " " + correct[0].name ); 
        QUnit.assert.ok(returned.length === correct.length, "length" + returned.length + " " + correct.length);  
        done();
          
        function innerTest1() {
            let response = filterList(foodList, filterText, IsChecked);
            return response;
        } 
    }
    );
});

//TODO: same tests but with a numeric instead of alphabetical filter.  Also should have a longer filter tested.

 