var exercise = {};

exercise.one = function(){

    //get rid of all commas and spaces:
    var cleanString = input.split(' ').join('').split(',').join('');

    //convert cleanString to an array called digitsArray:
    var digitsArray = [];

    for(var i=0; i<cleanString.length;i++){
        digitsArray.push(Number(cleanString[i]));
    }

    //add blocks of digits from digitsArray into a new array:
    var tempArray = [];
    for(var j=0;j<digitsArray.length;j+=257){
        tempArray.push(digitsArray.slice(j,j+257));
    }

    //create objects for each block of digits and add it to a new array:
    var completeArray = [];
    tempArray.forEach(function(item,index){
        var label = item[256];
        var digits = item.slice(0,256);
        completeArray[index] = {label: label, digits: digits};
    });

    return _.shuffle(completeArray);
    //console.log(JSON.stringify(completeArray[800]));
};

exercise.two = function(data){

    var points = exercise.one();

    var testAndTrain = {train: [], test: []};

    testAndTrain.train = points.slice(0, points.length/2);
    testAndTrain.test = points.slice(points.length/2, points.length);

    // console.log(testAndTrain.test.length);
    // console.log(testAndTrain.train.length);

    return testAndTrain;
};

exercise.three = function(data){

   // console.log('Part 3');

    var points = exercise.two();

    var train = points.train;
    var test = points.test;

    var distancesFromTest = [];
    var distanceInfo = {TestLabel: 0, Distances:[]};

    for(var j=0; j<test.length;j++){

        distanceInfo.TestLabel = test[j].label;

        for(var k=0; k<train.length;k++){
            var totalDiff = 0;
            for(var i=0;i<256;i++){
                var distance = Math.sqrt((train[k].digits[i]-test[j].digits[i])*(train[k].digits[i]-test[j].digits[i]));
                totalDiff += distance;
            }
            distanceInfo.Distances[k] = {};
            distanceInfo.Distances[k].Label = train[k].label;
            distanceInfo.Distances[k].Distance = totalDiff;
        }
        distancesFromTest.push(distanceInfo);
    }

    return distancesFromTest;

};


exercise.four = function(data){

    var pointDistances = exercise.three();

    pointDistances.forEach(function(item){
        item.Distances.sort(function(a,b){
            return a.Distance-b.Distance;
        });
    });

    return pointDistances;
};

exercise.five = function(data){

    var array = exercise.four();
    //console.log(array[0]);
    // console.log(array[0].TestLabel);
    // console.log(array[0].Distances[0].Label);

        //var correctArray = [];
        var numCorrect = 0;

    //array.forEach(function(item){
        // if(item.TestLabel === item.Distances[0].Label){
        //     correctArray.push(1);
        // }
   // });

for(var i=0;i<300;i++){
    console.log(array[i].TestLabel+', '+array[i].Distances[0].Label);
    if(array[i].TestLabel === array[i].Distances[0].Label){
            console.log(1);
    }else{
        console.log(0);
    }
};
   

    // correctArray.reduce(function(prev,curr){
    //     return prev+curr;
    // });

   // console.log(numCorrect);

    return numCorrect;
};