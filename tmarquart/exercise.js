var input = require('./digits.js');
var exercise = {};

exercise.one = function () {
    //-------------------
    //---- Your Code ----
    //-------------------
    //return 'Error: 1st function not implemented';

    //var processed=
    //console.log(input);
    var dataObj = [];
    var data1 = input.split(' ');
    // for (var i=250;i<275;i++){
    //     console.log(data2[i]);
    // }

    for (var i = 0; i < data1.length / 257; i++) {
        var dummyArr = [];
        for (var j = 0; j < 256; j++) {
            dummyArr[j] = parseInt(data1[i * 257 + j]);
            // var newDummy=[];
            // for(var k=0;k<16;k++){
            //     newDummy[k]=data1[i*257]
            // }
        }
        var label = parseInt(data1[(i + 1) * 257 - 1]);
        dataObj[i] = { label: label, digits: dummyArr };
    }

    // Clever way of making an array 2D
    // var long1=dataObj[500].digits    
    // var newArr1=[];
    // while(long1.length) newArr1.push(long1.splice(0,16).toString());
    // console.log(newArr1);

    //console.log(dataObj);
    //console.log(data.pop());

    return dataObj;

};

exercise.two = function (data) {
    //-------------------
    //---- Your Code ----
    //-------------------
    //return 'Error: 2nd function not implemented';

    var training = [];
    var test = [];
    var flip = true;
    var rando;
    // while(data.length){
    //     rando=Math.floor(data.length*Math.random());
    //     if (flip){
    //         training.push(data.splice(rando,1));
    //         flip=false;
    //     } else{
    //         test.push(data.splice(rando,1));
    //         flip=true;
    //     }
    // }

    var newdata = data.sort(function (a, b) {
        return .5 - Math.random();
    });

    var half = Math.floor(newdata.length / 2);
    training = newdata.splice(0, half);
    test = newdata;

    console.log(training);
    return { train: training, test: test };

};

exercise.three = function (data) {
    //-------------------
    //---- Your Code ----
    //-------------------
    //return 'Error: 3rd function not implemented';

    //bool

    var grandMatrix = [];
    var numMatrix = [];

    data.test.forEach(function (testNums, testIndex) {
        var tempMat = [];
        var tempNumMat = [];
        data.train.forEach(function (trainNums, trainIndex) {
            var tempSum = 0;
            testNums.digits.forEach(function (num, i) {
                var delta = num - trainNums.digits[i];
                tempSum += delta * delta;
            });
            tempSum = Math.sqrt(tempSum);
            tempMat.push({ test: testIndex, train: trainIndex, dist: tempSum, testNum: testNums.label, trainNum: trainNums.label })
            //tempMat.push(Math.sqrt(tempSum));
            //numMatrix.push(tempNumMat);
        });
        grandMatrix.push(tempMat);
        // observation.digits.forEach(function (image, j) {
        //     var delta = item - data.train[j].digits[i];
        //     tempSum += delta * delta;
        // });
        // console.log(Math.sqrt(tempSum));
    });

    // data.test[0].digits.forEach(function (item, i) {
    //     var delta = item - data.train[0].digits[i];
    //     tempSum += delta * delta;
    // });

    return grandMatrix;

    //data.test.points[0].map(function(item,i){

    // });


};


exercise.four = function (data) {
    //-------------------
    //---- Your Code ----
    //-------------------
    //return 'Error: 4th function not implemented';

    data.forEach(function (item) {
        item.sort(function (a, b) { return a.dist - b.dist; });
    });

    var k = 3;

    //for(var i=0;i<data.length;i++){ //loop through test nums
    var matches = [];
    data.forEach(function (item) {
        var classification = {};
        for (var i = 0; i < k; i++) { //loop through train nums k times
            classification[item[i].trainNum] = (classification[item[i].trainNum] || 0) + 1;
        }

        var keyNum = 11; //11 is for error checking
        var max = 0;
        for (var key in classification) {

            if (classification[key] > max) {
                keyNum = key;
                max = classification[key];
            }
            //console.log(key);
            //console.log(classification[key]);
        }



        matches.push({ actual: item[0].testNum, guess: keyNum });
                console.log(item);
    });


    //}
    // console.log(classification);
    // for (key in classification) {
    //     console.log(key);
    //     console.log(classification[key]);
    // }

   // console.log(matches);

    //return data;

    return matches;

};

exercise.five = function (data) {
    //-------------------
    //---- Your Code ----
    //-------------------
    //return 'Error: 5th function not implemented';
    var correct=data.reduce(function(total,item){
        if(item.actual==item.guess){
            total+=1;
        }
        return total;
    },0)

    return {correct:correct,length:data.length};

};

module.exports = exercise;
