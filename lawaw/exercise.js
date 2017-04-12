var input    = require('./digits.js');
var exercise = {};

exercise.one = function(){
    // split input into blocks of data
    var strings = [];
    for(var i=0; i<input.length; i+=515){
        var string = input.slice(i, i+515);
        strings.push(string);
    }
    // further split the blocks of data into digits (before comma) and label (after comma)
    // convert to numbers
    var dataArray = [];
    for(var j=0; j<strings.length; j++){
        var object = {};
        var split = strings[j].split(',');
        object.label = Number(split[1]);
        object.digits = split[0].split(' ').map(Number);
        dataArray.push(object);
    }
    return dataArray;
};

exercise.two = function(data){
    // create function to shuffle an array randomly
    function shuffleArray(array){
        for(var i=array.length-1; i>0; i--){
            var j = Math.floor(Math.random()*(i+1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    // shuffle data array and split into train (796) and test set (797)
    var shuffled = shuffleArray(data);
    var object = {};
    object.train = [];
    object.test = [];
    for(var a=0; a<Math.floor(shuffled.length/2); a++){
        object.train.push(shuffled[a]);
    }
    for(var b=Math.floor(shuffled.length/2); b<shuffled.length; b++){
        object.test.push(shuffled[b]);
    }
    return object;
};

exercise.three = function(data){
    // create function to find the distance between points in 2 n-dimensional arrays
    function distance(p1, p2){
        var sqDist = 0;
        for(var i=0; i<p1.length; i++){
            sqDist += (p2[i]-p1[i])*(p2[i]-p1[i]);
        }
        return Math.sqrt(sqDist);
    }
    // for each test data point, find distance from every training data point
    for(var j=0; j<data.test.length; j++){
        data.test[j].distance = [];
        for(var k=0; k<data.train.length; k++){
            var obj = {dist: null, trainlabel: null};
            data.test[j].distance.push(obj);
            var dist = distance(data.test[j].digits, data.train[k].digits);
            data.test[j].distance[k].dist = dist;
            data.test[j].distance[k].trainlabel = data.train[k].label;
        }
    }
    return data;
};


exercise.four = function(data){
    // set k value for k-Nearest Neighbor classification
    var k = 3;
    // for each test data point, sort distances from training data points in ascending order
    for(var i=0; i<data.test.length; i++){
        data.test[i].distance.sort(function(a, b){
            return a.dist - b.dist;
        });
        // take the k closest distances and push their corresponding training data labels into an array
        var nn = data.test[i].distance.slice(0, k);
        var trainLabels = [];
        for(var j=0; j<k; j++){
            trainLabels.push(nn[j].trainlabel);
        }
        // from the array, find the label with the highest frequency and its count
        // that will be the classification for this particular test data point
        var freq = {};
        var max = 0;
        var result;
        for(var v in trainLabels){
            freq[trainLabels[v]] = (freq[trainLabels[v]] || 0) + 1;
            if(freq[trainLabels[v]] > max){
                max = freq[trainLabels[v]];
                result = trainLabels[v];
            }
        }
        data.test[i].classification = {class: result, count: max};
    }
    return data;
};

exercise.five = function(data){
    // compare classifications with test data labels to find number of correct classifications
    data.test.correct = 0;
    for(var i=0; i<data.test.length; i++){
        if(data.test[i].label === data.test[i].classification.class){
            data.test.correct += 1;
        }
    }
    return data;
};

module.exports = exercise;
