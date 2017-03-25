var _ = require('lodash'); 
var input    = require('./digits.js');
var exercise = {};

exercise.one = function(){
    //-------------------
    //---- Your Code ----
    //-------------------
    arrayOfObjects =[];
    var digits = [];

    var i =0; 
    while (i < input.length)
    {   
        
        if (input[i] != ',' && input[i] != ' ') {
            digits.push(input[i]);
            i++;
        }
        else if (input[i] === ',') 
        {
            i+=2; 
            var label = input[i];
            i++;
            var object = {'label': label, 'digits': digits};
            arrayOfObjects.push(object);
            digits = [];
        }
        else i++;
        
    }
    return arrayOfObjects;
};

exercise.two = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------

    var shuttledData = _.shuffle(data);
    
    var train = shuttledData.slice(0,796);
    var test = shuttledData.slice(796);

    var index = {'train': train, 'test':test};

    return index;
};

exercise.three = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------

    var distances = [];

    for(var i=0; i < data.test.length; i++)
    {
        var nDistances = [];
        for(var j=0; j < data.train.length; j++)
        {
            var total = 0;
            for(var k=0; k < 256; k++)
            {
                total += Math.pow(data.test[i].digits[k] - data.train[j].digits[k], 2);
            }
            nDistances.push( { d: Math.sqrt(total), id: j });
        }
        distances.push(nDistances);
    }
    var index = {'train': data.train, 'test':data.test, 'distances':distances};
    return index;
};


exercise.four = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------

    var K = 7;

    for(var i=0; i < data.test.length; i++)
    {
        var nDistances = data.distances[i]
        nDistances = _.sortBy(nDistances, ['d']);
        var labels = [];
        for(var j=0; j < K; j++)
        {
            var indexOfTrainingPoint = nDistances[j].id;
            trainingPoint = data.train[indexOfTrainingPoint];
            labels.push(trainingPoint.label);
        }
        labels = _.countBy(labels);
        var bestLabel = 0;
        var majority = 0;
        _.forEach(labels, function(value,key){
            if (value > majority) {
                bestLabel = key;
                majority = value;
            }
        });
        data.test[i].classification = bestLabel;
    }
    

    return data;
};

exercise.five = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    var correct = 0;
    for(var i=0; i < data.test.length; i++)
    {
        if (data.test[i].label === data.test[i].classification) {
            correct ++;
        }
    }

    var index = {'test':data.test, 'correct':correct, 'length':data.test.length};

    return index;
};

module.exports = exercise;
