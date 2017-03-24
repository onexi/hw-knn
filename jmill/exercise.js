var input    = require('./digits.js');
var exercise = {};

exercise.one = function(){
    //-------------------
    //---- Your Code ----
    //-------------------
    // JM added here:
    var digitstructure = [];
    var trimput = input.replace(/ /g,''); //remove whitespace
    
    while (trimput.indexOf(',') != -1){
        var commaIndex = trimput.indexOf(',');
        var onesAndZeroes = trimput.slice(0,commaIndex);
        var theLabel = trimput.slice(commaIndex+1, commaIndex+2);
        console.log(theLabel);
        digitstructure.push({
            label: theLabel,
            digits: onesAndZeroes
        });
        trimput = trimput.slice(commaIndex+3, trimput.length);
    };
    return digitstructure;

};

exercise.two = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    // JM added here:
    
};

exercise.three = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    return 'Error: 3rd function not implemented';
};


exercise.four = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    return 'Error: 4th function not implemented';
};

exercise.five = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    return 'Error: 5th function not implemented';
};

module.exports = exercise;
