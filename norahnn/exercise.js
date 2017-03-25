var input    = require('./digits.js');
var exercise = {};

exercise.one = function(){
    //-------------------
    //---- Your Code ----
    //-------------------
    input=input.split(', ');
    //now the first int in each item in input, except for the first item, is the label of the previous item
    //create output list and put first object in
    output=[{label:input[1][0], digits:input[0]}];
    for (var i=1;i<input.length-2;i++){
        object={label:input[i+1][0],digits:input[i].slice(1,257)};
        output.push(object);
    }
    output.push({label:input[input.length-1],digits:input[input.length-2].slice(1,257)})
    return output;
};

exercise.two = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    return "abd".slice(1,3)
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
