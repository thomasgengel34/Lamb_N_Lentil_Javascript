"use strict";

const jsonManipulation = {
    appendArray: function appendArray(baseObject, list) {
        if (!baseObject) {
            return null;
        }
        if (typeof baseObject == "string" ||
            typeof baseObject == "number" ||
            typeof baseObject == "boolean" ||
            typeof baseObject == "symbol") { 
            return baseObject;
        }
        let obj = JSON.stringify(baseObject).replace('}', ',"list":');
        if (list && Array.isArray(list)) {
            const arr = JSON.stringify(list);
            obj += arr + '}';
            const appended = JSON.parse(obj);
            return appended;
        }
        return baseObject;
    }
};