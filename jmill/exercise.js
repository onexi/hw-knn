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
    var randomIndex = Math.floor(Math.random() * data.length);
    var trainList = [];
    var testList = [];

    trainList = data.slice(0,randomIndex);
    testList = data.slice(randomIndex, data.length);
    //console.log(trainList.length + ' ' + testList.length);

    return { train: trainList, test: testList};

};

exercise.three = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    //JM added here:
    //?
    var arrayOfDistances = [];

    data.test.forEach(function (testNumbers, testIndex) {
        var tempMat = [];
        var tempNumMat = [];
        data.train.forEach(function (trainNumbers, trainIndex) {
            var temporarySum = 0;
            for (var i = 0, length = testNumbers.digits.length; i < length; i++){
                var delta = testNumbers.digits[i] - trainNumbers.digits[i];
                dualdelta = delta * delta;
                var temporarySum = temporarySum + dualdelta;
            };
            var tempSumSqrt = Math.sqrt(temporarySum);
            tempMat.push({ 
                test: testIndex, 
                train: trainIndex, 
                dist: tempSumSqrt, 
                testNumber: testNumbers.label, 
                trainNumber: trainNumbers.label 
            });
        });
        arrayOfDistances.push(tempMat);
    });
    return arrayOfDistances;
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
