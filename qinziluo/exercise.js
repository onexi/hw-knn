var input = require('./digits.js');
var exercise = {};

exercise.one = function () {
    //-------------------
    //---- Your Code ----
    //-------------------
    var split = input.split(',');

    split = split.map(function (element) {
        element = element.trim();
        element = element.split(' ');
        element = element.map(function (i) {
            return Number(i);
        });
        return element;

    });
    var labels = [];
    for (var i = 1; i < split.length; i++) {
        var arr = split[i];
        labels[i - 1] = arr.splice(0, 1);
    }

    labels = labels.map(function (i) {
        return i.toString();


    });
    split.splice(split.length - 1, split.length);

    var newArr = [];
    for (var i = 0; i < labels.length; i++) {
        var obj = {};
        obj.label = labels[i];
        obj.digits = split[i];
        newArr[i] = obj;
    
    };
    
    return newArr;
};

exercise.two = function (data) {
    //-------------------
    //---- Your Code ----
    //-------------------
    n = data.length;
  

    var index = [];
    for (var i = 0; i < n; i++) {
        index[i] = i;
    }
    index.sort(function () {
        return 0.5 - Math.random();
    })
    
    var train = [];
    var test = [];
    for (var i = 0; i < 796; i++) {
        train.push(data[index[i]]);
    }
    for (var i = 796; i < n; i++) {
        test.push(data[index[i]]);
    }

    var obj = {};
    obj.train = train;
    obj.test = test;
    
    return obj;
};



exercise.three = function (data) {
    //-------------------
    //---- Your Code ----
    //-------------------
    var testPoints = data.test;
    var trainPoints = data.train;
   
    dimension = 256;
    CalculateDistance = function (testPoint, trainPoint) {
        testdigits = testPoint.digits;
        traindigits = trainPoint.digits;
        
        var sum = 0;
        for (var i = 0; i < dimension; i++) {
            sum += Math.pow((testdigits[i] - traindigits[i]), 2);
        }
        var distance = Math.sqrt(sum);
        return distance;
    }

    var distanceArr = [];
    for (var j = 0; j < testPoints.length; j++) {
        var distance = [];
        for (var i = 0; i < trainPoints.length; i++) {
            distance[i] = CalculateDistance(testPoints[j], trainPoints[i]);

        }
        distanceArr[j] = distance;

    }
    
    data.distanceArr=distanceArr;

    return data;
};
//


exercise.four = function (data) {
    //-------------------
    //---- Your Code ----
    //-------------------

    function indexOfMin(arr) {
       
        var min = arr[0];
        var minIndex = 0;
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                minIndex = i;
                min = arr[i];
            }
        }
        return minIndex;
    }
    

    var index = [];
    for (var i = 0; i < data.distanceArr.length; i++) {
        index[i] = indexOfMin(data.distanceArr[i]);
    }
 
    data.index=index;  
    return data;
};

exercise.five = function (data) {
    //-------------------
    //---- Your Code ----
    //-------------------
    
    var correct = 0;
    var testPoints = data.test;
    var trainPoints = data.train;
     
    for (var i = 0; i < data.index.length; i++) {
         
        if (testPoints[i].label === trainPoints[data.index[i]].label) {
            correct += 1;
        }

    }
    
    return correct;
};

module.exports = exercise;
