var input    = require('./digits.js');
var exercise = {};

exercise.one = function(){

    var result = [];
    // clean the array and split on the ,
    var array = input.split(' ').join('').split(',');
    for (var i = 0; i < array.length - 1; i++) {
        var object = {};
        if (i === 0) {
            object.digits = array[i];
        }
        else {
            // slice off the first digit if not the first item
            object.digits = array[i].slice(1,257);
        }
        
        // convert the string to digits 
        object.digits = object.digits.split("");
        object.digits = object.digits.map(Number);

        // assign the label digit from the next array item
        object.label = array[i+1][0]; 
        result.push(object);
    }

    return result;
    
    
};

//exercise.one();

exercise.two = function(data){

    // randomize the sort
    data.sort(function(a, b){
        return 0.5 - Math.random();
    });
    
    // split the data into two equally sized arrays
    var train = [];
    var test = [];
    data.forEach(function(item, i){
        if (i < 797) { // should fix this so that it splits smarter
            train.push(item);
        }
        else {
            test.push(item);
        }
    });

    // return an object with the training and testing arrays
    return {train : train, test : test};
};

//exercise.two(exercise.one());

exercise.three = function(data){

    var resultArray = [];
   
    for (var i = 0; i < data.test.length; i++) {
        var distanceArray = [];
        for (var j = 0; j < data.train.length; j++) {
            // calculate the distance between all of the points within test & training
            // calculate distance between data.test[i] and data.train[j]
            var distanceSum = 0;
            
            // loop through all of the digits and sum distances
            for (var k = 0; k < 256; k++) {
                var existingPoint = data.test[i].digits[k];
                var newPoint = data.train[j].digits[k];
                var distance = Math.sqrt((newPoint - existingPoint)*(newPoint - existingPoint));
                distanceSum += distance;
            }

            distanceArray.push({trainLabel: data.train[j].label, distance: distanceSum});

        }

        // add the distances into an object with the corresponding label
        var result = {testLabel : data.test[i].label, distances : distanceArray};
        resultArray.push(result);
    }

    //console.log(resultArray[0]);
    return resultArray;
};

//exercise.three(exercise.two(exercise.one()));

exercise.four = function(data){
    
    // order the distances for each label
    // returns an array of objects in the format {label : 6, distances [sorted]}
    data.forEach(function(item){
        //console.log(item.distances);
        item.distances.sort(function(a,b) {
            return a.distance - b.distance;
        });
    });


    // TO TEST SORT
    // data[0].distances.forEach(function(item){
    //     console.log(item.distance);
    // });

    var k = 5;
    var voting = [];

    // set the k nearest neighbors
    data.forEach(function(item){
    
        var nn = item.distances.slice(0,k);

        var types = [{tag:0, count:0},
                    {tag:1, count:0},
                    {tag:2, count:0},
                    {tag:3, count:0},
                    {tag:4, count:0},
                    {tag:5, count:0},
                    {tag:6, count:0},
                    {tag:7, count:0},
                    {tag:8, count:0},
                    {tag:9, count:0}];
        
        // count the trainLabel as tag for nearest neighbors
        for (var i = 0; i < k; i++) {
            var nnLabel = Number(nn[i].trainLabel);
            for (var j = 0; j < 10; j++) {
                // count the labels of the nearest numbers
                if (nnLabel === j) types[j].count +=1;
            }
        }

        voting.push({testLabel: Number(item.testLabel), voting : types});   
    
    });

    //console.log(voting[0]);
    return voting;
};

//exercise.four(exercise.three(exercise.two(exercise.one())));


exercise.five = function(data){

    var correct = 0;

    // identify the highest count of trainLabels for each testLabel
    data.forEach(function(item){
        var guess = {prediction : 0, count : 0}
        item.voting.forEach(function(row){
            if (row.count > guess.count){
                guess.count = row.count;
                guess.prediction = row.tag;
            }
        });
        
        // if the testLabel matches the prediction, increase correct
        if (item.testLabel === guess.prediction) {
            correct += 1;
        }
    });

    //console.log('# correct ' + correct + ' total length ' + data.length + ' percentage ' + (correct/data.length*100));
    return correct;

};

//exercise.five(exercise.four(exercise.three(exercise.two(exercise.one()))));

module.exports = exercise;
