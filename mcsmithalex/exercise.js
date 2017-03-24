// Collaborated with Josh Wilson, had trouble getting 3 4 and 5 to fully implement

var input    = require('./digits.js');
var exercise = {};
var digarray =  [];
var halved = {};
exercise.one = function(data){
    
    var splitInput = input.split(",")
    var digits = [];
    var labels= [];  
    
    digits.push(splitInput[0]);

    for (var i = 1; i < splitInput.length; i++) {
    var part = splitInput[i];
    var label = part.slice(1, 2);
    var digit = part.slice(3, part.length);
    digits.push(digit);
    labels.push(label);    
};
    labels.push(input[input.length]);
    
    for (var i = 0; i < digits.length; i++){
        var newObject = {};
        newObject.digits = digits[i];
        newObject.label = labels[i];
        digarray.push(newObject);
    };
    
       



  


    return digarray;
};

exercise.two = function(data){





    var shuffle = function(data){
	for (var i=data.length-1; i>0; i--) {
		var z = Math.floor(Math.random()*(i+1));
		var temp = data[i];
		data[i] = data[z];
		data[z] = temp;
};

        var testarray = data.splice(0, Math.ceil(data.length/2));
	    var trainarray = data;
        halved = {'test':testarray, 'train':trainarray};
    };
    
    shuffle(digarray);
    return halved;
};

exercise.three = function(data, train, test){
    
var distance;

var getDistance = function(data, train, test) {
	console.log(data);
	var trainingPoint = data.train[train].digits.split(" ");
	var testingPoint = data.test[test].digits.split(" ");
	var sum = 0;
	var x,y;
	for (var i=0; i<trainingPoint.length; i++) {
		x = trainingPoint[i];
		xy = testingPoint[i];
		sum += Math.pow(x-y,2);
	}
	distance = Math.sqrt(sum);

	return distance;

};
exercise.four = function(data){
    var knn = function(Distances, k) {
	var tags = {'zero':0, 'one':0, 'two'  :0, 'three':0, 'four':0,
				'five':0, 'six':0, 'seven':0, 'eight':0, 'nine':0};
	var nearest = Distances.slice(0,k);
	for(var i=0; i<k; i++){
		var nearestTag = near[i].trainTag;
		if(nearestTag === '0') 	tags.zero  += 1;
		if(nearestTag === '1') 	tags.one   += 1;
		if(nearestTag === '2') 	tags.two   += 1;
		if(nearestTag === '3') 	tags.three += 1;
		if(nearestTag === '4') 	tags.four  += 1;
		if(nearestTag === '5') 	tags.five  += 1;
		if(nearestTag === '6') 	tags.six   += 1;
		if(nearestTag === '7') 	tags.seven += 1;
		if(nearestTag === '8') 	tags.eight += 1;
		if(nearestTag === '9') 	tags.nine  += 1;
	}
	var guess = {tag:false, count:0};
	for (var tag in tagList){
	    if (tags[tag] > guess.count) {
	    	guess.tag = tag;
	    	guess.count = tags[tag];
	    }
	}
	if(guess.tag === "zero")	newGuess = '0';
	if(guess.tag === "one")		newGuess = '1';
	if(guess.tag === "two")		newGuess = '2';
	if(guess.tag === "three")	newGuess = '3';
	if(guess.tag === "four")	newGuess = '4';
	if(guess.tag === "five")	newGuess = '5';
	if(guess.tag === "six")		newGuess = '6';
	if(guess.tag === "seven")	newGuess = '7';
	if(guess.tag === "eight")	newGuess = '8';
	if(guess.tag === "nine")	newGuess = '9';

	return newGuess;
};

var classify = function(data, k) {
	var myList = [];
	var successes = 0;
	var trials = 0;
	for (var i=0; i<data.test.length-1; i++) {
		var nextDist,nextTag;
		var NewList = [];
		for (var j=0; j<data.train.length-1; j++) {
			nextDist = getDistance(data, i, j);
			nextTag = data.train[j].tag;
			NewList.push({'dist':nextDist, 'trainTag':nextTag});
		}
		NewList.sort(function(a,b) {
			return a.dist-b.dist;
		});
		myList.push({
			"distList"     : NewList,
			"testTagGuess" : knn(NewList, k),
			"testTag"      : data.test[i].tag
		});
		if (myList[i].testTagGuess === myList[i].testTag) {
			successes++;
		}
		trials++;
	}
	return (successes/trials)*100;
};
};

exercise.five = function(data){
   var exfive = function() {
	var counter = 0;
	var myPoints = [];
	for (var i=1; i<=10; i++) {
		x = i;
		y = classify(tt, i);
		myPoints.push({"x":x, "y":y});
		counter++;
	}
	return myPoints;
};
};
};

module.exports = exercise;
