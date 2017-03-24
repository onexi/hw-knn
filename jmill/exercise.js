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
    // JM added below:
    data.forEach(function (item) {
        item.sort(function (a, b) { return a.dist - b.dist; });
    });

    var k = 3;
    var matches = [];
    data.forEach(function (item) {
        var classification = {};
        for (var i = 0; i < k; i++) { //loop through train nums k times
            classification[item[i].trainNumber] = (classification[item[i].trainNumber] || 0) + 1;
        }

        var keyNum = 11; //11 is for error checking
        var max = 0;
        for (var key in classification) {
            if (classification[key] > max) {
                keyNum = key;
                max = classification[key];
            }
        }
        matches.push({ actual: item[0].testNumber, guess: keyNum });
    });

    return matches;
};

exercise.five = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    // JM added here:
    var correct=data.reduce(function(total,item){
        if(item.actual==item.guess){
            total+=1;
        }
        return total;
    },0);

    return {correct:correct,length:data.length};
};

module.exports = exercise;
