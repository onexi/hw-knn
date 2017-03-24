var input = require('./digits.js');
var exercise = {};

exercise.one = function(){
    var result = [];
    var temp = input.split(',');
    for(var i=0; i<temp.length-1; i++){
        var object = {};
        object.label = temp[i+1][1];
        if (i===0){
            object.digits = temp[i].split(' ');
        }
        else {
            object.digits = temp[i].split(' ').slice(2);
        }
        result.push(object);
    }
    return result;
};

exercise.two = function(data){
    //shuffle the data array randomly
    function shuffleArray(array){
        for(var i = array.length-1; i>0; i--){
            var j = Math.floor(Math.random() * (i+1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    data = shuffleArray(data);

    //split the data array evenly into two arrays: trainPoints and testPoints
    var half_length = Math.ceil(data.length / 2);
    var train = data.slice(0,half_length);
    var test = data.slice(half_length,data.length);
    var result = {train:train, test:test};
    return result;
};

exercise.three = function(data){
    //This function calculate the distance between two points in the 256 dimensional plate
    function calculateDistance(testpoint,trainpoint){
        var dist_square = 0;
        for(var i=0; i<testpoint.digits.length;i++){
            dist_square += Math.pow(testpoint.digits[i] - trainpoint.digits[i],2);
        }
        return Math.sqrt(dist_square);
    }

    //For each test point, calculate its distance from each of the training point
    //The result is stored in an array called testPoints.distance. For each test
    //point, testPoints.distance records:
    // 1)the index of each training point
    // 2)the label of each training point
    // 3)the distance from the test point to each training point
    data.test.forEach(function(testpoint){
        testpoint.distance = [];
        data.train.forEach(function(trainpoint, index){
            var obj = {};
            obj.index_of_trainpoint = index;
            obj.label_of_trainpoint = trainpoint.label;
            obj.distance = calculateDistance(testpoint,trainpoint);
            testpoint.distance.push(obj);
            // testpoint.distance.push(calculateDistance(testpoint,trainpoint));
        });
    });

    return data;
};


exercise.four = function(data){
    // sort the distance object by distance
    function sortByDistance(distance){
        distance.sort(function(trainpointA, trainpointB){
            return trainpointA.distance - trainpointB.distance;
        });
        return distance;
    }

    data.test.forEach(function(testpoint){
        testpoint.distance = sortByDistance(testpoint.distance);
    });
    
    // guess type
    var k = 50;
    data.test.forEach(function(testpoint){
        // initialize the 10 types of possible labels
        var types = {'0':0, '1':0, '2':0, '3':0, '4':0, '5':0, '6':0, '7':0, '8':0, '9':0};
        var nn = testpoint.distance.slice(0,k);
        for (var i=0; i<k; i++){
            var nnType = nn[i].label_of_trainpoint;
            if (nnType === '0'){types[0] +=1;}
            if (nnType === '1'){types[1] +=1;}
            if (nnType === '2'){types[2] +=1;}
            if (nnType === '3'){types[3] +=1;}
            if (nnType === '4'){types[4] +=1;}
            if (nnType === '5'){types[5] +=1;}
            if (nnType === '6'){types[6] +=1;}
            if (nnType === '7'){types[7] +=1;}
            if (nnType === '8'){types[8] +=1;}
            if (nnType === '9'){types[9] +=1;}
        }
        var guess = {type: false, count:0};
        for (var type in types){
            if (types[type] > guess.count){
                guess.type = type;
                guess.count = types[type];
            }
        }
        testpoint.guess = guess.type;
    });
    return data;
};

exercise.five = function(data){
    data.test.correct = 0;
    data.test.forEach(function(testpoint){
        if (testpoint.label === testpoint.guess){
            data.test.correct += 1;
        }
    });
    return data;
};

module.exports = exercise;
