var input    = require('./digits.js');
var exercise = {};

//-----------------------------------------------------------------
exercise.one = function(){
    // eliminate the spaces
    var numbersOnly = input.replace(/\s/g, '');

    // put each digit in an array
    var strData = numbersOnly.split('');

    // remove the elements that are commas 
    strData = strData.filter(function(item){
        return item !== ',';
    });

    // make each array entry which was a string into a numbers
    var numData = strData.map(function(item){
        return Number(item);
    });

    var numSamples = numData.length/257;

    // create new array that contains elements that each contain a sliced version 
    // of the data that is 257 characters long
    var allNumbers = [];
    for (var i=0; i< numSamples; i++){
        allNumbers.push(numData.slice(257*i, 257*(i+1)));
    }
    
    // assign the first 256 digits of the array to be called the digits
    var digits = allNumbers.map(function(item){
        return item.slice(0,256);

    });

    // assign the 257th number of the array to the label and store these labels in an array
    var labels = allNumbers.map(function(item){
        return item[256];
    });

    // create an array of objects, where each object contains the label and digits
    var data = [];
    for (var s = 0; s<labels.length; s++){
        data.push({label: labels[s], digits: digits[s]});
    }

    return data;

};

//-----------------------------------------------------------------
exercise.two = function(data){
    // I used this to check that I divided the samples correctly
    var data1 = exercise.one();
    var count = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (var x = 0; x<data1.length; x++){
        for (var y = 0; y<10; y++){
            if (data1[x].label == y){
                count[y] += 1;
            }
        }
    }

    // randomize the order of the elements of the array using Durstenfeld shuffle found online
    var i = 0;
    var j = 0;
    var temp = null;

    for (i = data.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = data[i];
        data[i] = data[j];
        data[j] = temp;
    }
    return data;

};
//-----------------------------------------------------------------
exercise.three = function(data){
// divide the randomly shuffled array into two arrays that are of equal length,
// and add these as the train and test arrays
    var length = data.length;
    var half = length/2;

    var splitArray = {train: null, test: null};
    splitArray.train = data.slice(0,half);
    splitArray.test = data.slice(half);

    return splitArray;
};

//-----------------------------------------------------------------
exercise.four = function(data){
//For testPoint in testPoints:
	//For trainPoint in trainPoints:
		//CalculateDistance(testPoint, trainPoint)
		//StoreCalculatedDistanceSomewhere()
    
    data.test.forEach(function(testItem){

        var distance = [];

        data.train.forEach(function(trainItem){

            var sum = 0;
            var length = trainItem.digits.length;
            for (var i = 0; i<length; i++){
                var delta = testItem.digits[i] - trainItem.digits[i];
                sum += Math.sqrt(delta*delta);
            }
            distance.push({sum: sum, label:trainItem.label});
        });

        testItem.distance = distance;
        //console.log(testItem.distance);
    });
    return data;
};

//-----------------------------------------------------------------
// sort distance function
exercise.sortByDistance = function(distance){
    distance.sort(function(a,b){
        return a.sum - b.sum;
    });
    return distance;
};

// check results function that will be used in part five
exercise.checkResults = function(data){
    var counter = 0;
    data.test.forEach(function(item){
       // var label = item.label;
        exercise.sortByDistance(item.distance);
        if(item.label === item.distance[0].label){
            //console.log('equal');
            counter ++;
        }
    });
    console.log(counter + ' correct out of ' + data.test.length);
    console.log('the knn classification has an accuracy of ' + 100*(counter/data.test.length).toFixed(2) + '%');
    data.test.correct = counter;
    return data;
};

exercise.five = function(data){
    return exercise.checkResults(data);

};
//-----------------------------------------------------------------
module.exports = exercise;
