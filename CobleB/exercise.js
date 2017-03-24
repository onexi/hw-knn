var input    = require('./digits.js');
var _ = require('lodash');
var exercise = {};

exercise.one = function(){
 
    //get rid of all commas and spaces:
    var cleanString = input.split(' ').join('').split(',').join('');
    
    //convert cleanString to an array called digitsArray:
    var digitsArray = [];

    for(var i=0; i<cleanString.length;i++){
        digitsArray.push(Number(cleanString[i]));
    }

    //add blocks of digits from digitsArray into a new array:
    var tempArray = [];
    for(var j=0;j<digitsArray.length;j+=257){
        tempArray.push(digitsArray.slice(j,j+257));
    }

    //create objects for each block of digits and add it to a new array:
    var completeArray = [];
    tempArray.forEach(function(item,index){
        var label = item[256];
        var digits = item.slice(0,256);
        completeArray[index] = {label: label, digits: digits};
    });

    return _.shuffle(completeArray);
    //console.log(JSON.stringify(completeArray[800]));
};

exercise.two = function(data){

    var points = exercise.one();

    var testAndTrain = {train: [], test: []};

    testAndTrain.train = points.slice(0, points.length/2);
    testAndTrain.test = points.slice(points.length/2, points.length);

    return testAndTrain;
};

exercise.three = function(data){

    var points = exercise.two();

    var train = points.train;
    var test = points.test;

    var distancesFromTest = [];

    for(var j=0; j<test.length;j++){

        distancesFromTest[j] = {TestLabel: test[j].label, Distances: []};

        for(var k=0; k<train.length;k++){
            var totalDiff = 0;

            for(var i=0;i<256;i++){
                var distance = Math.sqrt((train[k].digits[i]-test[j].digits[i])*(train[k].digits[i]-test[j].digits[i]));
                totalDiff += distance;
            }
            distancesFromTest[j].Distances[k] = {Label: train[k].label, Distance: totalDiff};
        }
    }

    return distancesFromTest;
    
};


exercise.four = function(data){
        
    var pointDistances = exercise.three();

    pointDistances.forEach(function(item){
        item.Distances.sort(function(a,b){
            return a.Distance-b.Distance;
        });
    });
    //return pointDistances;

    var k = 5;

    pointDistances.forEach(function(item){
        item.Distances = item.Distances.slice(0,k);
    });
     
     //console.log(pointDistances[0]);

    var votes = [{Tag: 0, Count: 0},
                {Tag: 1, Count: 0},
                {Tag: 2, Count: 0},
                {Tag: 3, Count: 0},
                {Tag: 4, Count: 0},
                {Tag: 5, Count: 0},
                {Tag: 6, Count: 0},
                {Tag: 7, Count: 0},
                {Tag: 8, Count: 0},
                {Tag: 9, Count: 0},];

    var votedArray = [];

    for(var j = 0; j<pointDistances.length; j++){
        for(var i = 0; i<k; i++){
            if(pointDistances[j].Distances[i].Label===0) votes[0].Count++;
            if(pointDistances[j].Distances[i].Label===1) votes[1].Count++;
            if(pointDistances[j].Distances[i].Label===2) votes[2].Count++;
            if(pointDistances[j].Distances[i].Label===3) votes[3].Count++;
            if(pointDistances[j].Distances[i].Label===4) votes[4].Count++;
            if(pointDistances[j].Distances[i].Label===5) votes[5].Count++;
            if(pointDistances[j].Distances[i].Label===6) votes[6].Count++;
            if(pointDistances[j].Distances[i].Label===7) votes[7].Count++;
            if(pointDistances[j].Distances[i].Label===8) votes[8].Count++;
            if(pointDistances[j].Distances[i].Label===9) votes[9].Count++;
        }
        votedArray[j] = {TestLabel: pointDistances[j].TestLabel, Voting: votes};

        votes = [{Tag: 0, Count: 0},
                {Tag: 1, Count: 0},
                {Tag: 2, Count: 0},
                {Tag: 3, Count: 0},
                {Tag: 4, Count: 0},
                {Tag: 5, Count: 0},
                {Tag: 6, Count: 0},
                {Tag: 7, Count: 0},
                {Tag: 8, Count: 0},
                {Tag: 9, Count: 0},];    
    }

    //console.log(votedArray[0]);

    votedArray.forEach(function(item){
        item.Voting.sort(function(a,b){
            return b.Count-a.Count;
        });
    });

    //console.log(votedArray[0]);
    return votedArray;
};

exercise.five = function(data){

    var array = exercise.four();

    var numCorrect = 0;

    array.forEach(function(item){

        if(item.TestLabel === item.Voting[0].Tag){
            numCorrect++;
        }
    });

    return numCorrect+' correct out of '+array.length;
};

module.exports = exercise;
