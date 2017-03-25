   var input    = require('./digits.js');
var exercise = {};

exercise.one = function(){
    //-------------------
    //---- Your Code ----
    //-------------------
    input=input.split(', ');
    //now the first int in each item in input, except for the first item, is the label of the previous item
    //create output list and put first object in
    output=[{label:input[1][0], digits:input[0]}];
    for (var i=1;i<input.length-2;i++){
        object={label:input[i+1][0],digits:input[i].slice(1,257)};
        output.push(object);
    }
    output.push({label:input[input.length-1],digits:input[input.length-2].slice(1,257)})
    return output;
};

exercise.two = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------

    for (var i = data.length - 1; i > 0; i -= 1) {
        var j = Math.floor(Math.random() * (i + 1))
        var temp = data[i];
        data[i] = data[j];
        data[j] = temp;
    }

    return {train: data.splice(0,Math.floor(data.length / 2)),test: data};

};

exercise.three = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    data.test.forEach(function(testPoint){
        var distances=[];
        data.train.forEach(function(trainPoint){
            var sumOfSquares=0;
            for( var i=0; i<trainPoint.digits.length;i++){
                sumOfSquares+=(testPoint.digits[i]-trainPoint.digits[i])*(testPoint.digits[i]-trainPoint.digits[i]);
            }
            distances.push({distance:Math.sqrt(sumOfSquares),label: trainPoint.label}); 
        });
        testPoint.distances=distances;
    });
    return data;
};


exercise.four = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    numCorrect=0;
    data.test.forEach(function(testPoint){
        testPoint.distances.sort(function(elm1,elm2){
            return elm1.distance-elm2.distance;
        });
        if (testPoint.distances[0].label===testPoint.label){
            numCorrect++;
        }      
    });
    data.test.corret=numCorrect;
    return data;
};

exercise.five = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    numCorrect=0;
    data.test.forEach(function(testPoint){
        testPoint.distances.sort(function(elm1,elm2){
            return elm1.distance-elm2.distance;
        });
        if (testPoint.distances[0].label===testPoint.label){
            numCorrect++;
        }      
    });
    data.test.corret=numCorrect;
    return data;
};
module.exports = exercise;
