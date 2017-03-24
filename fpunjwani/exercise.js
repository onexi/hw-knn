var input    = require('./digits.js');
var exercise = {};

exercise.one = function(){
    var modified_input=input.split(',');
    var data_arrays=[];
    data_arrays.push(modified_input[0].split(" ").map(Number));
    var labels=[];
    for (var i=1; i<modified_input.length; i++){
        var inp = modified_input[i].trim();
        labels.push(Number(inp.substring(0, 1)));
        if (i != modified_input.length - 1) {
            data_arrays.push(inp.substring(2).split(" ").map(Number));
        }
    }
    var arr_input=[];
    for (var l=0; l<labels.length; l++){
        var obj={
            'label': labels[l],
            'digits': data_arrays[l]
        };
        arr_input.push(obj);
    }
    return arr_input;

};


exercise.two = function(data){
    var array1= exercise.one();
    var array2 = array1.splice(0, Math.ceil(array1.length / 2));
    var object1= {'train': array1, 'test': array2};

    return object1;

};

exercise.three = function(data){
    var object1=exercise.two();
    var test = object1.test;
    var train = object1.train;
    data.distance_container=[];
    test.forEach(function(testdata){
        train.forEach(function(traindata){
            for (var i=0; i<testdata.length; i++){
                for (var j=0; j<traindata.length; j++){
                    var distance_k=[];
                    for (var k=0; k<testdata[i].digits.length; k++){
                        distance_k.push(testdata[i].digits[k]*testdata[i].digits[k] - traindata[j].digits[k]*traindata[j].digits[k]);
                    }
                    var distance_squared=0;
                    for (var m = distance_k.length; !!m--;){
                        distance_squared += distance_k[m];
                    }
                    var distance = Math.sqrt(distance_squared);
                    var obj={
                        'test': testdata[i],
                        'train': traindata[j],
                        'distance': distance
                    };
                    data.distance_container.push(obj);
                }     
            }
        });
    });
    //test and train are arrays of multiple objects with label and digits
    //-------------------
    //---- Your Code ----
    //-------------------
    return data.distance_container;
};


exercise.four = function(data){
    data.sort(function(a,b){
        return a.distance_container - b.distance_container;
    });

    return data;
};

    //-------------------
    //---- Your Code ----
    //-------------------

exercise.five = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    return 'Error: 5th function not implemented';
};

module.exports = exercise;
