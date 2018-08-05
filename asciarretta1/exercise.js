var input = require('./digits.js');
var exercise = {};

var split = input.split(',');

var shuffle = function(array){
    var currentIndex = array.length, temp, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
};

var SortByDistance = function(distance){
    distance.sort(function(a,b){
        return a.sum - b.sum;
    });
};


exercise.one = function(){
    var data = [];
    for(var i=0; i<split.length-1; i++){
        var num = split[i].split(' ');
        if (i>0){
            num.pop();
            num.shift();
        }
        for(var j=0; j<num.length; j++){
            num[j] = Number(num[j]);
        }
        var object = {label: Number(split[i+1][1]), digits: num};
        data.push(object);
    }
    return data;
};

exercise.two = function(data){
    var ShuffleData = shuffle(data);
    return ShuffleData;
};       

exercise.three = function(data){
    var ShuffleData = shuffle(data);
    var length = data.length;
    var test = ShuffleData.slice(0, length/2);
    var train = ShuffleData.slice(length/2, length);
    return {test: test, train: train};
};

exercise.four = function(data){
    data.test.forEach(function(testItem){
        var distance = [];
        data.train.forEach(function(trainItem){
            var sum = 0;
            var length = trainItem.digits.length;
            for(var i=0; i<length; i++){
                var delta = testItem.digits[i] - trainItem.digits[i];
                sum += Math.sqrt(delta*delta);
            }
            distance.push({sum: sum, label: trainItem.label});
        });
        testItem.distance = distance;
    });
    return data;
};

exercise.five = function(data){
    var Count = 0;
    data.test.forEach(function(item){
        var label = item.label;
        SortByDistance(item.distance);
        if(label === item.distance[0].label){
            console.log('equal');
            Count++;
        }
    });
    console.log(Count + ' correct out of ' + data.test.length);
    data.test.correct = Count;
    return data;
};

module.exports = exercise;
