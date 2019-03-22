"use strict";

const getFoodList_numbers = function () {
    const foodList_numbers = {
        "list": {
            "item": [
                { "name": "apple pie  12" },
                { "name": "apple 123tree" },
                { "name": "banana341233 bread" },
                { "name": "black312 bread" },
                { "name": "12blueberry bush" },
                { "name": "che2312rry bush" },
                { "name": "cherry pie" },
                { "name": "eg12g plant" }]
        }
    };
    return foodList_numbers;
};


QUnit.test("foodList_filter_numbers_1 A Hello World Test", function (assert) {
    assert.equal(greeting, "Hello World", "Expect greeting of Hello World. Tests that qunit is working.");
});



QUnit.test("foodList_filter_numbers-2 verify a filtered list with a filter and IsChecked not checked works", function (assert) {
   
    const numberOfAssertions =5;
    assert.expect(numberOfAssertions);
    var done = assert.async();
    const foodList_numbers = getFoodList_numbers();
    const fixture = document.getElementById("qunit-fixture");
    const node = document.createElement("div");
    node.setAttribute("id", "results");
    fixture.appendChild(node);
 
    let filterText = "12";
    let IsChecked = false; 
    let correct = [
        { "name": "apple pie  12" },
        { "name": "apple 123tree" },
        { "name": "banana341233 bread" },
        { "name": "black312 bread" },
        { "name": "12blueberry bush" },
        { "name": "che2312rry bush" }, 
        { "name": "eg12g plant" }
    ];
   
    setTimeout(async function (assert) {
       let returned = await innerTest1();
        done();  
        QUnit.assert.equal(returned[0].valueOf, correct[0].valueOf, "0");  // TODO: verify these are correct
       QUnit.assert.equal(returned[1].valueOf, correct[1].valueOf, "1");
        QUnit.assert.equal(returned[2].valueOf, correct[2].valueOf, "2");
        QUnit.assert.equal(returned[3].valueOf, correct[3].valueOf, "3");
       QUnit.assert.equal(returned.length, correct.length, "length"); 
    });
 
    function innerTest1() { 
      let response = filterList(foodList_numbers, filterText, IsChecked); 
        return response;
    }
}, 3000); 
 


QUnit.test("foodList_filter_numbers-3 verify a filtered list with a filter and IsChecked is checked works", function (assert) {
    const testNumber = 2;
    assert.expect(testNumber);
    var done = assert.async();
    const foodList = getFoodList_numbers();
    const fixture = document.getElementById("qunit-fixture");
    const node = document.createElement("div");
    node.setAttribute("id", "results");
    fixture.appendChild(node);

    let filterText = "12";
    let IsChecked = true;

    let correct = [ 
        { "name": "cherry pie" }];

    setTimeout(async function (assert) {
        let returned = await innerTest1();
        QUnit.assert.equal(returned[0].valueOf, correct[0].valueOf, "0");  // TODO: verify these are correct
        //QUnit.assert.equal(returned[1].valueOf, correct[1].valueOf, "1");
        //QUnit.assert.equal(returned[2].valueOf, correct[2].valueOf, "2");
        //QUnit.assert.equal(returned[3].valueOf, correct[3].valueOf, "3");
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
 

QUnit.test("foodList_filter_numbers-4  filter \'12\' with reverse sort", function (assert) { 
       
    const numberOfTests = 8;
    assert.expect(numberOfTests);
    var done = assert.async();
    const foodList = [
        { "name": "apple pie  12" },
        { "name": "apple 123tree" },
        { "name": "banana341233 bread" },
        { "name": "black312 bread" },
        { "name": "12blueberry bush" },
        { "name": "che2312rry bush" },
        { "name": "cherry pie" },
        { "name": "eg12g plant" }];
    const fixture = document.getElementById("qunit-fixture");
    const node = document.createElement("div");
    node.setAttribute("id", "results");
    fixture.appendChild(node);

    let filterText = "12";
    let IsChecked = false;
   
    let correct =
        [ 
            {
                "name": "eg12g plant"
            },
            {
                "name": "che2312rry bush"
            },
            
            {
                "name": "black312 bread"
            },
            {
                "name": "banana341233 bread"
            },
            
            {
                "name": "apple pie  12"
            },
            {
                "name": "apple 123tree"
            },
            {
                "name": "12blueberry bush"
            } 
        ];

   
       
    setTimeout(async function (assert) {
        let returned = await innerTest1();  
        returned = sortList(returned, true);    
       QUnit.assert.ok(returned[0].name === correct[0].name, "0  " + returned[0].name + " " + correct[0].name );
       QUnit.assert.ok(returned[1].name === correct[1].name, "1  " + returned[1].name + " " + correct[1].name );
       QUnit.assert.ok(returned[2].name === correct[2].name, "0  " + returned[2].name + " " + correct[2].name );
      QUnit.assert.ok(returned[3].name === correct[3].name, "0  " + returned[3].name + " " + correct[3].name); 
      QUnit.assert.ok(returned[4].name === correct[4].name, "0  " + returned[4].name + " --- " + correct[4].name); 
      QUnit.assert.ok(returned[5].name === correct[5].name, "0  " + returned[5].name + " --- " + correct[5].name); 
         QUnit.assert.ok(returned[6].name === correct[6].name, "0  " + returned[6].name + " " + correct[6].name); 
        QUnit.assert.ok(returned.length ===correct.length, "length "+ returned.length+" "+correct.length);  
        done();
          
        function innerTest1() {
            let response = filterList(foodList, filterText, IsChecked);
            return response;
        }

    }
    );
});

 

 