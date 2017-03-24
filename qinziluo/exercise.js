var input = require('./digits.js');
var exercise = {};

exercise.one = function () {
    //-------------------
    //---- Your Code ----
    //-------------------
    var split = input.split(',');
    //var arr= split.
    //console.log(split);
    split = split.map(function (element) {
        element = element.trim();
        //console.log(element);
        element = element.split(' ');
        element = element.map(function (i) {
            return Number(i);
        });
        //console.log(element);
        //console.log(element);
        return element;

    });
    //console.log(split);


    //var split2= split.split(1,split.length-1);
    var labels = [];
    for (var i = 1; i < split.length; i++) {
        var arr = split[i];
        labels[i - 1] = arr.splice(0, 1);
    }

    labels = labels.map(function (i) {
        return i.toString();


    });
    //console.log(labels[0]);
    split.splice(split.length - 1, split.length);
    //console.log(split);
    //console.log(split[split.length - 1]);

    //console.log(split[0].length)
    //console.log(split[split.length-1].length);

    var newArr = [];
    for (var i = 0; i < labels.length; i++) {
        var obj = {};
        obj.label = labels[i];
        //console.log(labels[i]);
        obj.digits = split[i];
        newArr[i] = obj;
        //console.log(newArr[i]);
    };
    //console.log(newArr.length);
    return newArr;
};

exercise.two = function (data) {
    //-------------------
    //---- Your Code ----
    //-------------------
    n = data.length;
    //console.log(n)

    var index = [];
    for (var i = 0; i < n; i++) {
        index[i] = i;
    }
    index.sort(function () {
        return 0.5 - Math.random();
    })
    //console.log(index);
    var train = [];
    var test = [];
    for (var i = 0; i < 796; i++) {
        train.push(data[index[i]]);
    }
    for (var i = 796; i < n; i++) {
        test.push(data[index[i]]);
    }
    //console.log(test);
    var obj = {};
    obj.train = train;
    obj.test = test;
    //console.log(obj.train.digits.length);
    //console.log(obj.test.digits.length);
    return obj;
};

// var testPoints;
// var trainPoints;

exercise.three = function (data) {
    //-------------------
    //---- Your Code ----
    //-------------------
    var testPoints = data.test;
    var trainPoints = data.train;
    //console.log(trainPoints);
    dimension = 256;
    CalculateDistance = function (testPoint, trainPoint) {
        testdigits = testPoint.digits;
        traindigits = trainPoint.digits;
        //console.log(testdigits);
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
    //console.log(distanceArr.length);
    data.distanceArr=distanceArr;

    return data;
};
//


exercise.four = function (data) {
    //-------------------
    //---- Your Code ----
    //-------------------

    function indexOfMin(arr) {
        /*if (arr.length === 0) {
            return -1;
        }
*/
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
    //console.log(data.distance);

    var index = [];
    for (var i = 0; i < data.distanceArr.length; i++) {
        index[i] = indexOfMin(data.distanceArr[i]);
    }
   // console.log(index);
    data.index=index;  
    return data;
};

exercise.five = function (data) {
    //-------------------
    //---- Your Code ----
    //-------------------
    // exercise.three();
    var correct = 0;
    var testPoints = data.test;
    var trainPoints = data.train;
    //console.log(testPoints); 
    for (var i = 0; i < data.index.length; i++) {
         //console.log(testPoints[i].label); 
        //console.log(trainPoints[data.index[i]].label);
        if (testPoints[i].label === trainPoints[data.index[i]].label) {
            correct += 1;
        }

    }
    data.test.correct=correct;
    console.log(correct);
    return data;
};

module.exports = exercise;
