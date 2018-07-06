var input    = require('./digits.js');
var exercise = {};

exercise.one = function(){
    //---- My Code ----
    var interval = 258;//number of digits of 16x16 with the comma and label at the end
    var result = [];
    var myArr = input.split(' ').join('');
    for (var i=0; i<myArr.length; i+=interval){
        result.push(myArr.substring (i, i+interval)); //build array of blocks of data including it's label
    }
    var splitResult = result.map(function(strings){
        return strings.split(','); //split off the label past the comma, and build new array.  
    });
                //now we have an array of arrays of the digits and labels.  need to put these digits and lables in objects
    var target = splitResult.map(function toObject(arr) {
        var objects = {};
        objects.digits = arr[0];
        objects.digits = objects.digits.split('');
        objects.label = arr[1];
        return objects;
    });       
    return target; 
};

exercise.two = function(data){
    //---- My Code ----
    var iterations = data.length;
    var randomTarget = [];
    var getRandomIndex = function(min, max) { //this is the randomizer index function
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    };

    var randomIndex = getRandomIndex(0, data.length-1); //call the randomizer and push those indexes into neww array
    for (var i=0; i<iterations; i++){
        randomTarget.push(data[randomIndex]);
        data.splice(randomIndex, 1);
    }
    var train = randomTarget;
    var test = train.splice(0, Math.ceil(train.length / 2)); //cut randomized array in half
    var targetSplit = {};
    targetSplit.train = train;
    targetSplit.test = test;

    return targetSplit;
};

exercise.three = function(data){
    //---- My Code ----

    var trainArr = data.train;
    var testArr = data.test;

    for (var i=0; i<testArr.length; i++){ //iterate through the testArr 

        var testObj = testArr[i]; //returning a long list of objects...need to fix
        for (var j=0; j<trainArr.length; j++){ //iterate through the trainArr

            var trainObj = trainArr[j]; //returning a long list of objects...need to fix
            //var trainLabelArr = trainObj.label;
            
            var testDigitsArr = testObj.digits;//this isn't working because testObject

            var trainDigitsArr = trainObj.digits;//this isn't working because trainObject

            var sum = testDigitsArr.reduce(function(total, element, index){ //iterate through all indexes of the digits arrays
                return total + Math.pow(Number(element)-Number(trainDigitsArr[index]),2); 
            });
            return {distance: Math.sqrt(sum), type: trainObj.label};
        }

    }

};

exercise.four = function(data){//If I had gotten exercise.three to work, i would work off of what was done during in-class active learning
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

};

module.exports = exercise;
