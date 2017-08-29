var input    = require('./digits.js');
var exercise = {};

exercise.one = function(){
    var datastrings = input.split(',');
    var newArray = [];
    //console.log(datastrings[datastrings.length-1]);

    datastrings.forEach(function(item){
        var digitStringArray = item.trim().split(' ');
        var digitArray = [];
        digitStringArray.forEach(function(elem){
            digitArray.push(Number(elem));
        });
        newArray.push(digitArray);
        
    });
    //console.log(newArray); 

    var objArray = [];


    for (var i = 0; i<newArray.length-1; i++){
        var newObj = {};
        var labelindex = newArray[i+1];
        newObj.label = labelindex[0];
        newObj.digits = newArray[i];
        objArray.push(newObj);  
    }
    //console.log('pre slice:'+objArray[1].digits.length);

    for (var j = 1; j<objArray.length; j++){
        objArray[j].digits.shift();
    }

    //console.log('postslice:'+objArray[1].digits.length);

    return objArray;
};

exercise.two = function(data){

    var fraction = Math.random();
    var dataLength = data.length;
    var Train = Math.ceil(dataLength*fraction);

    var splitData = {};
    splitData.train = data.slice(0,Train);
    splitData.test = data.slice(Train);

    return splitData;
};

exercise.three = function(data){

// writing logic for single element in array to understand calculating distance:

    // var train = data.train[0];
    // var test = data.test[0];
    // var delta = [];

    // for (var i = 0; i<256; i++){
    //     delta[i] = (train.digits[i]-test.digits[i])^2;
    // }
    // var sum = delta.reduce(function(prev, curr){
    //     return prev + curr;
    // });

    // var distance = Math.sqrt(sum);
    // console.log(distance);

/////////// now using above logic to loop through test & train data

    var train = data.train;
    var test = data.test;
    var delta = [];
    var sum = [];
    var distance = [];

    train.forEach(function(trainitem){
        test.forEach(function(testitem, j){
            for (var i = 0; i<256; i++){
                delta[i] = (trainitem.digits[i]-testitem.digits[i])*(trainitem.digits[i]-testitem.digits[i]);
            }
            sum[j] = delta.reduce(function(prev, curr){
                return prev + curr;
            });
            distance[j] = Math.sqrt(sum[j]);
        });
    });

    //console.log(distance);
    return distance;
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
