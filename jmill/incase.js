var input = require('./digits.js');
var exercise = {};


exercise.one = function () {
    //-------------------
    //---- Your Code ----
    //-------------------
    var idxComma = [];

    for (var i = 0; i < input.length; i++) {
        if (input[i] === ',') idxComma.push(i + 2);
    }
    var arrStr = [];
    idxComma.reduce(function (pre, cur) {
        var str = input.slice(pre, cur + 1).split(',');
        var bin = str[0].split(' ').map((el) => {
            return Number(el);
        });
        var label = Number(str[1]);

        arrStr.push({ label: label, digits: bin });
        return cur;
    }, 0);

    return arrStr;
};

exercise.two = function (data) {
    //-------------------
    //---- Your Code ----
    //-------------------

    //create index array
    var indices = [];
    for (let i = 0; i < data.length; i++) {
        indices.push(i);
    }

    //shuffling function
    var shuffle = (arr) => {
        for (let i = arr.length; i > 0; i--) {
            let idx = Math.floor(Math.random() * i);
            [arr[i - 1], arr[idx]] = [arr[idx], arr[i - 1]]
        }
    };


    shuffle(indices);

    var shuffledArr = indices.map((el) => {
        return data[el]
    });

    var trainCount = Math.floor(shuffledArr.length / 2);
    return { train: shuffledArr.slice(0, trainCount), test: shuffledArr.slice(trainCount, shuffledArr.length) };
};

exercise.three = function (data) {

    //cal dist between a b
    var calcDist = (a, b) => {
        var res = a.digits.reduce((acc, val, i) => {
            return acc += Math.abs(val - b.digits[i]);
        }, 0);
        return res;
    };

    data.test.forEach((testElem, i) => {
        distArr = [];

        data.train.forEach((trainElem, j) => {
            distArr.push({ label: trainElem.label, dist: calcDist(testElem, trainElem) })
        });

        testElem.nns = distArr;
    });
};


exercise.four = function (data, k) {
    if (k === undefined) k = 7; //set default k as 7

    //sort accd. dist
    data.test.forEach((point, i) => {
        //sort nns of test point
        point.nns.sort((a, b) => a.dist - b.dist);

        //slice k nns {label, dist}
        var selected = point.nns.slice(0, k);
        var rank = {};
        selected.forEach((el, i) => {
            rank[el.label] ? rank[el.label]++ : rank[el.label] = 1;
        });

        var prediction = {label:null, count:0};
        for (var label in rank){
            if (rank[label] > prediction.count) {
                prediction.label = label;
                prediction.count = rank[label]
            }
        }
        point.prediction = prediction;
    });

    return data;
};

exercise.five = function (data) {
    data.test.correct = 0;
    data.test.forEach((el, i)=>{
        Number(el.prediction.label) === el.label ? data.test.correct++ : 0;  
    })
    return data.test;
};

module.exports = exercise;

// var data = exercise.one();
// var dataSuffled = exercise.two(data);
// exercise.three(dataSuffled);
// exercise.four(dataSuffled); //with k as 7
// res = exercise.five(dataSuffled);
// console.log(":  "+ res.correct);


