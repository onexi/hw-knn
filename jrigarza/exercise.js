var input    = require('./digits.js');
var exercise = {};

var testData = [];

exercise.one = function(){
    //-------------------
    //---- Your Code ----
    //-------------------

    //Creating 
    var data = [];
    var labels = [];
    var parts = input.split(',');

    var cleanParts = parts.map(function(element){
        return element.split(' ').join('');
    });

    cleanParts.forEach(function(element, index){
        if (index !== 0) labels.push(element[0]);
    });

    for(var i = 1; i < cleanParts.length; i++){
       cleanParts[i] = cleanParts[i].slice(1);
    }

    cleanParts.splice(cleanParts.length-1);

    cleanParts.forEach(function(element, index){
        data.push({digits: element.split(''), label: labels[index]});
    });

    return data;
};

exercise.two = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------

    var length = data.length;
    var randomizedData = [];

    function getRandomIndex(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    for(var i = 0; i < length; i++){
        var randomIndex = getRandomIndex(0,data.length-1);
        randomizedData.push(data[randomIndex]);
        data.splice(randomIndex,1);
    }

    var trainingData = randomizedData.splice(Math.ceil(length/2));

    testData = randomizedData;

    return {train: trainingData, test: randomizedData};
};

exercise.three = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------

    var distancesArray = data.test.map(function(element, index){
        
        var distancesSubArray = data.train.map(function(subelement, subindex){
            
            var sumDifference = subelement.digits.reduce(function(total, stringDigit, digitIndex){

                return total + Math.pow(Number(stringDigit)-Number(element.digits[digitIndex]),2);

            });

            return {distance: Math.sqrt(sumDifference), type: subelement.label};

        });
        
        return distancesSubArray;
    });

    return distancesArray;
};


exercise.four = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------

    data.forEach(function(element, index){
        element.sort(function(a,b){
            return a.distance-b.distance;
        });
    });


    var classify = function(sorted, k){

        var types = {zero: 0, one: 0, two: 0, three: 0, four: 0, five: 0, six: 0, seven: 0, eight: 0, nine: 0};
        var nn = sorted.slice(0,k);

        for(var i = 0; i < k; i++){
            var nnType = nn[i].type;

            if(nnType === '0') types.zero += 1;
            if (nnType === '1') types.one +=1;
            if(nnType === '2') types.two +=1;
            if(nnType === '3') types.three += 1;
            if (nnType === '4') types.four +=1;
            if(nnType === '5') types.five +=1;
            if(nnType === '6') types.six += 1;
            if (nnType === '7') types.seven +=1;
            if(nnType === '8') types.eight +=1;
            if(nnType === '9') types.nine +=1;
        }

        var guess = {type: false, count: 0};

        for (var type in types){
            if(types[type] > guess.count) {
                guess.type = type;
                guess.count = types[type];
            }
        }

    return guess;
    };

    var guessArray = data.map(function(element){
        return classify(element,11);
    });
    
    return guessArray;
};

exercise.five = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------

    var correct = 0;
    
    for(var i = 0; i < data.length; i++){

        var guessType = data[i].type;
        var guessLabel = 0;

        if(guessType === 'zero') guessLabel = '0';
        if(guessType === 'one') guessLabel = '1';
        if(guessType === 'two') guessLabel = '2';
        if(guessType === 'three') guessLabel = '3';
        if(guessType === 'four') guessLabel = '4';
        if(guessType === 'five') guessLabel = '5';
        if(guessType === 'six') guessLabel = '6';
        if(guessType === 'seven') guessLabel = '7';
        if(guessType === 'eight') guessLabel = '8';
        if(guessType === 'nine') guessLabel = '9';

        if(guessLabel === testData[i].label) correct += 1;
        console.log('' + guessLabel + ' vs ' + testData[i].label); 
    }
    
    return correct;
};

module.exports = exercise;
