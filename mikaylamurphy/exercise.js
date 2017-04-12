var input    = require('./digits.js');
var exercise = {};

exercise.one = function(){
    //-------------------
    //---- Your Code ----
    //-------------------
    input = input.replace(/,/g, '')
    var array = input.split(" ").map(Number);
    var i = 0;
    var ans = [];
    while (i < array.length){
        ans.push({'label': array[i+256], 'digits': array.slice(i, i + 256)});
        i += 257}
    return ans;    
};

exercise.two = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    test  = data.filter(function(obj){return data.indexOf(obj)%2 == 0});
    training = data.filter(function(obj){return data.indexOf(obj)%2 == 1});

    return [test, training]
};

exercise.three = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    test = data[0];
    training = data[1];
    test_distance = test.map(function(obj){
        var sums = [];
        for (j = 0; j < training.length; j++){
            arr = training[j]['digits']
            sums.push(exercise.distance(obj['digits'], arr))
        }
        return sums
    })
    return [test_distance, data]
};

exercise.distance = function(test_arr, training_arr){
    var sum = 0;
    for (i = 0; i < test_arr.length; i++){
        sum += Math.pow((test_arr[i] - training_arr[i]), 2)
    };
    return sum;
};

exercise.four = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    var distances = data[0];
    var test = data[1][0];
    var training = data[1][1];
    // k = 1
    var min_distances = distances.map(function(arr){return arr.indexOf(Math.min.apply(Math, arr))})
    var projected = min_distances.map(function(dist){return training[dist]['label']})

    return [projected, test];
};

exercise.five = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    var projected = data[0];
    var test = data[1];
    var correct = 0;
    for (l = 0; l < projected.length; l++){
        if (projected[l] == test[l]['label']){
            correct += 1
        }
    }
    return correct;
};

module.exports = exercise;
