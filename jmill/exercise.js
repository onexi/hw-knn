var input    = require('./digits.js');
var exercise = {};

exercise.one = function(){
    //-------------------
    //---- Your Code ----
    //-------------------
    // JM added here:

    var digitstructure = [];

    var trimput = input.slice(0,input.length);
    //var trimput = input.replace(/ /g,''); //remove whitespace
    
    while (trimput.indexOf(',') != -1){
        var commaIndex = trimput.indexOf(',');
        var onesAndZeroes = trimput.slice(0,commaIndex);
        var theLabel = trimput.slice(commaIndex+2, commaIndex+3);

        digitstructure.push({
            label: theLabel,
            digits: onesAndZeroes
        });
        trimput = trimput.slice(commaIndex+4, trimput.length);
    };
    return digitstructure;

};

exercise.two = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    // JM added here:

    var shuffleArray = data.slice(0,data.length);
    var shuffled = {};

    var shuffle = function(arrayToShuffle){
        for (var i = arrayToShuffle.length - 1; i > 0; i--){
            var n = Math.floor(Math.random() * (i + 1));
            var temporary = arrayToShuffle[i];
            arrayToShuffle[i] = arrayToShuffle[n];
            arrayToShuffle[n] = temporary;
        };
        var testingData = arrayToShuffle.splice(0, Math.ceil(arrayToShuffle.length / 2));
        var trainingData = arrayToShuffle;
        shuffled = {
            'test' : testingData, 
            'train': trainingData};
    };
    
    shuffle(shuffleArray); // Warning: directly modifies the array passed in.
    return shuffled;    
};


exercise.three = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    //JM added here:

    // return distances;
    var arrayOfDistances = [];

    data.test.forEach(function (testNumbers, testIndex) {
        var tempMat = [];
        var tempNumMat = [];

        data.train.forEach(function (trainNumbers, trainIndex) {
            // initialize sum
            var temporarySum = 0;

            for (var i = 0, length = testNumbers.digits.length; i < length; i++){
                var delta = testNumbers.digits[i] - trainNumbers.digits[i];
                var dualdelta = delta * delta;
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
        // Go through the training data k times
        for (var i = 0; i < k; i++) { 
            classification[item[i].trainNumber] = (classification[item[i].trainNumber] || 0) + 1;
        };

        // Colleague: Set high number for error checking
        var keyNumber = 11; 

        var max = 0;
        for (var key in classification) {
            if (classification[key] > max) {
                keyNumber = key;
                max = classification[key];
            };
        };

        matches.push({ 
            actual: item[0].testNumber, 
            claimed: keyNumber 
        });
    });

    return matches;
};

exercise.five = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    // JM added here:

    var correct=data.reduce(function(total,item){
        if (item.actual == item.claimed){
            total += 1;
        };
        return total;
    },0);

    return {
        correct: correct,
        length: data.length
    };
};

module.exports = exercise;
