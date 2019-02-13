"use strict";


const sortList = function (sortSelected, filteredList) {  
    if ( !Array.isArray(filteredList)) {  
        return filteredList;
    }
    else
        if (typeof sortSelected === "function") { 
        return sortSelected(filteredList); 
    }
        else { 
        return ascending(filteredList); // shouldn't this just return the list?
    }
};
 

let ascending = function (filteredList) { 
    return filteredList.sort();
};

let descending = function (filteredList) {  
    const f = filteredList.sort(); 
    const s = f.reverse();  
    return s; 
};