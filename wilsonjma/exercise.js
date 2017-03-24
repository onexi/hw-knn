var input    = require('./digits.js');
var exercise = {};
//worked with Alex McCullumsmith on this pset 
var newArray = [];
var mixedParts = {};
exercise.one = function(){
    var split_in = input.split(",");
    
    var digits = [];
    var labels = [];
    digits.push(split_in[0]);
    for(var i =1; i< split_in.length; i++){
        var part = split_in[i];
        var label = part.slice(1,2);
        var digit = part.slice(3, part.length);
        digits.push(digit);
        labels.push(label);

    }
    labels.push(input[input.length]);
    
    for(var i=0; i<digits.length; i++){
        var newObject = {};
        newObject.digits = digits[i];
        newObject.labels = labels[i];
        newArray.push(newObject);
    }

    
    //-------------------
    //---- Your Code ----
    //-------------------
    
};

exercise.two = function(data){
   
    var randomness = function(data){
        for(var i = data.length-1; i>0; i--){
            var n = Math.floor(Math.random()*(i+1));
            var temporary = data[i];
            data[i] = data[n];
            data[n] = temporary;
        }
    var tested = data.splice(0, Math.ceil(data.length/2));
    var trained = data;
    mixedParts = {'test':tested, 'train':trained};
}
    
randomness(newArray);
return mixedParts;    
    
    //-------------------
    //---- Your Code ----
    //-------------------
    
};


exercise.three = function(data){
    var calcDist = function(data, train, test) {
	console.log(data);
	var pTrain = data.train.digits.split(" ");
	var pTest = data.test.digits.split(" ");
	var sum = 0;
	var x,y;
	for (var i=0; i<pTrain.length; i++) {
		x = pTrain[i];
		y = pTest[i];
		sum += Math.pow(x-y,2);
	}
	distance = Math.sqrt(sum);
	return distance;

};
   
    
    return calcDist(mixedParts, mixedParts.trained, mixedParts.tested);
    

   
    
};


exercise.four = function(data){
    var options = function(calcDists, k) {
	var possTags = {'zero':0, 'one':0, 'two'  :0, 'three':0, 'four':0,
				'five':0, 'six':0, 'seven':0, 'eight':0, 'nine':0};
	var near = calcDists.slice(0,k);
	for(var i=0; i<k; i++){
		var nearTag = near[i].trainTag;
		if(nearTag === '0') 	possTags.zero  += 1;
		if(nearTag === '1') 	possTags.one   += 1;
		if(nearTag === '2') 	possTags.two   += 1;
		if(nearTag === '3') 	possTags.three += 1;
		if(nearTag === '4') 	possTags.four  += 1;
		if(nearTag === '5') 	possTags.five  += 1;
		if(nearTag === '6') 	possTags.six   += 1;
		if(nearTag === '7') 	possTags.seven += 1;
		if(nearTag === '8') 	possTags.eight += 1;
		if(nearTag === '9') 	possTags.nine  += 1;
	}
	var guess = {tag:false, count:0};
	for (var tag in possTags){
	    if (possTags[tag] > guess.count) {
	    	guess.tag = tag;
	    	guess.count = possTags[tag];
	    }
	}
	if(guess.tag === "zero")	nextGuess = '0';
	if(guess.tag === "one")		nextGuess = '1';
	if(guess.tag === "two")		nextGuess = '2';
	if(guess.tag === "three")	nextGuess = '3';
	if(guess.tag === "four")	nextGuess = '4';
	if(guess.tag === "five")	nextGuess = '5';
	if(guess.tag === "six")		nextGuess = '6';
	if(guess.tag === "seven")	nextGuess = '7';
	if(guess.tag === "eight")	nextGuess = '8';
	if(guess.tag === "nine")	nextGuess = '9';

	return nextGuess;
};


};

exercise.five = function(data){
    var classify = function(data, k) {
	var newList = [];
	var successes = 0;
	var tries = 0;
	for (var i=0; i<data.test.length-1; i++) {
		var nextDistance,nextTag;
		var newList2 = [];
		for (var j=0; j<data.train.length-1; j++) {
			nextDistance = calcDist(data, i, j);
			nextTag = data.train[j].tag;
			newList2.push({'dist':nextDistance, 'trainTag':nextTag});
		}
		newList2.sort(function(a,b) {
			return a.dist-b.dist;
		});
		newList.push({
			"distList"     : newList2,
			"testTagGuess" : options(newList2, k),
			"testTag"      : data.test[i].tag
		});
		if (newList[i].testTagGuess === newList[i].testTag) {
			successes++;
		}
		tries++;
	}
    
	return successes;
   
};
    return classify(mixedParts);
};



module.exports = exercise;

