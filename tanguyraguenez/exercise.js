var input    = require('./digits.js');
var exercise = {};

exercise.one = function(){
    // We first exctract from the string an array of numbers (siza 409401, 257 * 1593)
    var numberPattern = /\d+/g;

    var split = input.match(numberPattern).map(function(item){
        return Number(item);
    });
    // We then split the array into arrays of size 257, each being the concatenation of 256 digits and a label.
    var numbers = [];
    for (var i = 0; i < split.length/257; i++){
        numbers.push(split.slice(257*i, 257*(i+1)));
    }  

    // We extract the labels and digits from each array and form seperate arrays out of them.
    var labels = numbers.map(function(item){
        return item[256];
    });

    var digits = numbers.map(function(item){
        return item.slice(0,256);
    });
    // Finally we form data as an arry of 1593 objects.
    var data = [];
    for (var j = 0; j < labels.length; j++){
        data.push({label: labels[j], digits: digits[j]});
    }

    

    return data;
    
};

exercise.two = function(data){
    var training = [];
    var testing = [];

    // We randomly form testing by choosing a random object from data until we have 796 objects in testing.
    while (testing.length < 796){
        var random = Math.round(Math.random()*1592);
        if (testing.includes(data[random])){

        }
        else {
            testing.push(data[random]);
        }
        
    }
    // We form training as the complementary of testing in the original data array.
    for (var j = 0; j < data.length; j++){
        if (testing.includes(data[j])){

        }
        else {
            training.push(data[j]);
        }
    }
    
    data = {train: training, test: testing};
   
    return data;
};

exercise.three = function(data){
    // This function calculates the distance between two arrays of the same length (here 256).
    var distance = function(arr1, arr2){
        var count = 0;
        for (var i = 0; i < arr1.length; i++){
            count += (arr1[i]-arr2[i])*(arr1[i]-arr2[i]);
        }
        return Math.sqrt(count);
    };
    
    var calculateDistances = function(item){
        var distancewithtrain = [];
        for (var j = 0; j < data.train.length; j++){
            distancewithtrain.push({label: data.train[j].label, d: distance(item.digits, data.train[j].digits)});
        }
        return distancewithtrain;
    };
    // This returns an array of the distances between the item and each element of the training array and adds it as a property to the test[i] object. The property is an array of objects.
    for (var i = 0; i < data.test.length; i++){
        data.test[i].distance = calculateDistances(data.test[i]);
    }
    // This returns the previously described array for each element in testing.
    return data;
};


exercise.four = function(data){
    // The previous code gives for each element of the training array its respective distance 
    // with each element of the testing array. Therefore, by searching the closest points in test, we can guess which label the element has.
    
    var k = 10;

    // The following sorts the distances for each testing point to each of the testing points and returns an array of the k closest neighbours to the point.
    for (var i = 0; i < data.test.length; i++){
        var list = [];
        data.test[i].distance.sort(function(a,b){
            return a.d - b.d;
        });
        list = data.test[i].distance.slice(0,k);
        data.test[i].closest = list;
    }

    // We know guess the label using the k closest neighbours.
    
    
    for (var j = 0; j < data.test.length; j++){

        var types = {label0: 0, label1: 0, label2: 0, label3: 0, label4: 0, label5: 0, label6: 0, label7: 0, label8: 0, label9: 0};

        for (var l = 0; l<k; l++){
            var nnType = data.test[j].closest[l].label;

            if (nnType === 0) types.label0 +=1;
            if (nnType === 1) types.label1 +=1;
            if (nnType === 2) types.label2 +=1;
            if (nnType === 3) types.label3 +=1;
            if (nnType === 4) types.label4 +=1;
            if (nnType === 5) types.label5 +=1;
            if (nnType === 6) types.label6 +=1;
            if (nnType === 7) types.label7 +=1;
            if (nnType === 8) types.label8 +=1;
            if (nnType === 9) types.label9 +=1;
            
        }
        var guessing = {type: false, count: 0};
        for (var type in types){
            if (types[type] > guessing.count){
                guessing.type = type;
                guessing.count = types[type];
            }
        }
        data.test[j].guess = guessing;
    }

    return data;
};

exercise.five = function(data){
    var correctGuesses = 0;
    for (var i = 0; i < data.test.length; i++){
        if ('label'+data.test[i].label === data.test[i].guess.type){
            correctGuesses += 1;
        }
    }
    data.test.correct = correctGuesses;
    return  data;
};

module.exports = exercise;
