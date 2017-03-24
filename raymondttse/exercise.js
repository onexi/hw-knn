var input    = require('./digits.js');
var exercise = {};

exercise.one = function(){
    var temp = input.split(' ');
    var objectarray = [];
    temp.forEach(function(item, index){
        var temparray = [];
        if(item.includes(',')){
            item.replace(',', '');
            for(var num=0; num<256; num++){
                temparray[num] = temp[index-255+num];
            }
            var label = temp[index+1];
            objectarray.push({label:label, digits:temparray});
        }
    });
    return objectarray;
};

exercise.two = function(data){
    var testtrain = {train: [], test: []};
    data.forEach(function(item){
        if(testtrain.test.length === 797){
            testtrain.train.push(item);
        }
        else if(testtrain.train.length === 796){
            testtrain.test.push(item);
        }
        else {
            var rand = Math.floor((Math.random() * 2));
            if(rand===0){
                testtrain.train.push(item);
            }
            else{
                testtrain.test.push(item);
            }
        }
    });
    return testtrain;
};

exercise.three = function(data){
    var distance = function(array1, array2){
        var tempsum = 0;
        for(var i=0; i<array1.length-1; i++){
            array1[i].replace(',', '');
            array2[i].replace(',', '');
            tempsum += (array1[i]-array2[i])*(array1[i]-array2[i]);
        }
        return Math.sqrt(tempsum);
    };
    
    var distances = [];
    
    for(var i=0; i<data.test.length; i++){
        var testpointdist = [];
        for(var j=0; j<data.train.length; j++){
            testpointdist.push({actualtype:data.test[i].label, type:data.train[j].label, distance:distance(data.train[j].digits, data.test[i].digits)});
        }
        distances.push(testpointdist);
    }
    
    return distances;
};


exercise.four = function(data){
    var k = 5;
    var guesses = [];

    for(var i=0; i<data.length; i++){
        var nnTypes = {'0':0, '1':0, '2':0, '3':0, '4':0, '5':0, '6':0, '7':0, '8':0, '9':0};
        var sorted = data[i].sort(function(a,b){
            return a.distance - b.distance;
        });

        var nn = sorted.slice(0, k);

        for(var j=0; j<k; j++){
            var nnType = nn[j].type;
            if (nnType === '0') nnTypes['0'] += 1;
            if (nnType === '1') nnTypes['1'] += 1;
            if (nnType === '2') nnTypes['2'] += 1;
            if (nnType === '3') nnTypes['3'] += 1;
            if (nnType === '4') nnTypes['4'] += 1;
            if (nnType === '5') nnTypes['5'] += 1;
            if (nnType === '6') nnTypes['6'] += 1;
            if (nnType === '7') nnTypes['7'] += 1;
            if (nnType === '8') nnTypes['8'] += 1;
            if (nnType === '9') nnTypes['9'] += 1;
        }

        var guess = {actualtype: nn[0].actualtype, type:false, count:0};

        for (var type in nnTypes){
            if (nnTypes[type] > guess.count){
                guess.type = type;
                guess.count = nnTypes[type];
            }
        }
        guesses.push(guess);
    }
    return guesses;
};

exercise.five = function(data){
    var correct = 0;
    for(var i=0; i<data.length; i++){
        if(data[i].type === data[i].actualtype){
            correct += 1;
        }
    }
    return correct;
};

module.exports = exercise;
