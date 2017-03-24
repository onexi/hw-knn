var input    = require('./digits.js');
var exercise = {};

exercise.one = function(){
    //-------------------
    //---- Your Code ----
    //-------------------
    //return 'Error: 1st function not implemented';

    var array_of_objects = [];

    //Remove all spaces in input string
    input = input.replace(/\s+/g, "").trim(); 

    var size = input.length;

    //A string to hold the digits of the current object
    var current_digit_string = '';

    for (var i=0; i<size; i++){

        //If chacater is not a comma, add it to digit string
        if (input[i] != ','){
            
            current_digit_string = current_digit_string + input[i];

        }

        else {
            
            //Get the label which is one entry after the current comma we are at
            var my_label = Number(input[i+1]);

            //Turn string into array of size 256
            var digits_array = current_digit_string.split("");

            //Since every entry in the string is a charcter with quotes, convert string into numerical string of 0 and 1
            digits_array = digits_array.map(Number);

            //Create our object containing the lable and array of digits
            var my_object = {label: my_label, digits: digits_array};

            //Store our object in an array
            array_of_objects.push(my_object);

            //Reset the current_digit_string for next number
            current_digit_string = '';

            //Update index by 1 to skip the label entry
            i++;

        } //closes else
 
        

    } //closes for loop

    return array_of_objects;

};

exercise.two = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    //return 'Error: 2nd function not implemented';

    //First we need to randomly shuffle our array 
    //This does in-place shuffle, so no need to store any return value
    shuffle(data);

    //Now 'data' is randomly shuffled and we can split it into 2 halves
    var half_length = Math.floor(data.length / 2);    

    var train_array = data.splice(0,half_length);  //This should be 796 in size
    var test_array  = data;                        //This should be 797 in size

    //Create new data object with train and test arrays
    data = {train: train_array, test: test_array};

    return data;





    //Helper function to randomly shuffle array
    function shuffle(my_array){

        var size = my_array.length - 1;

        for (var i=size; i>=0; i--){

            var random_index = Math.floor((Math.random()*i));
            var tmp = my_array[i];
            my_array[i] = my_array[random_index];
            my_array[random_index] = tmp;
        }

    }



}; //closes exercise.two




exercise.three = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    //return 'Error: 3rd function not implemented';

    //A function to measure distance between test and train data points
    //We will use the Euclidean distance in 256 dimensions since each number is 256 chacaters

    var train_data = data.train;
    var test_data  = data.test;
    
    var size_training = train_data.length;
    var size_testing  = test_data.length;

    var counter = 0;

    var total_calcs = size_training * size_testing;


    //Test loop (each unknown node in the test data needs to calculate its distance to every other known node in training data)
    for (var i=0; i<size_testing ; i++){

        var distance = [];

        //Get test digits
        var testing_array = test_data[i].digits;

        //Train loop
        for (var j=0; j<size_training; j++){

            //Get training digits
            var training_array = train_data[j].digits;

            //Calculate euclidean distance in 256 dimensions 
            var my_distance = euclidean_distance(testing_array, training_array);
            var test_node   = test_data[i].label;
            var train_node  = train_data[j].label;

            //To ease comparison of guess later on, store this info
            var info = {test_node: test_node, distance: my_distance, train_node: train_node};

            distance.push(info);
          
        }

         //Save the distances for this specific test node
         test_data[i].distance = distance;
    }




   //A helper function to calculate the Euclidean distance between two arrays of integers
   function euclidean_distance(a,b){

        //This should be 256
        var size = a.length;

        var sum = 0;

        for (var i=0; i<size; i++){

            x = a[i];
            y = b[i];

            sum = sum + ( (x-y)*(x-y) ) ;

        }

        result = Math.sqrt(sum);

        return result;

    }





       //Now sort every distance array 
       for (var i=0; i<size_testing; i++){

           var distance_array = test_data[i].distance;
           distance_array.sort(mySort);

       }

       //Ascending sort from small to large so we can later easily pick the k smallest distances
       function mySort(a,b){
           return a.distance - b.distance;
       }


    //Return data containing sorted distances
    return data;

};



//kNN
exercise.four = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    //return 'Error: 4th function not implemented';

    //Classify our test data using kNN
    var test_data  = data.test;
    var train_data = data.train;

    var size_training = train_data.length;
    var size_testing  = test_data.length;
    
    //The k value usually needs to be odd to break voting ties
    var k = 3;

    //For every test data, do kNN
    for (var i=0; i<size_testing; i++){

        //Initalize label counters to 0 for this current test data
	    var labels = {'0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0};

        //Get nearest neighbors (the closest 3 in this case since our distance array is sorted by smallest distance)
        nn = test_data[i].distance.slice(0,k);

        //Count labels in k nearest neighbors 
        for(var j=0; j<k; j++){

            //Get nearest neighbor label
            var nnLabel = nn[j].train_node;

            //Count the votes from the k nearest neighbors
            if(nnLabel === 0)   labels['0']  += 1;
            if(nnLabel === 1)   labels['1']  += 1;
            if(nnLabel === 2) 	labels['2']  += 1;
            if(nnLabel === 3)   labels['3']  += 1;
            if(nnLabel === 4)   labels['4']  += 1;
            if(nnLabel === 5) 	labels['5']  += 1;
            if(nnLabel === 6)   labels['6']  += 1;
            if(nnLabel === 7)   labels['7']  += 1;
            if(nnLabel === 8) 	labels['8']  += 1;
            if(nnLabel === 9) 	labels['9']  += 1;

        }

        //Find the highest count top-voted label
        var guess = {label : false, count : 0};

        for (var label in labels){

            if (labels[label] > guess.count) {

                guess.label = Number(label);
                guess.count = labels[label];

            }

        }


       //Save the guess results for comparison
       test_data[i].guess = guess;

    }

    //Return data array containing the guess results
    return data;

};





exercise.five = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    //return 'Error: 5th function not implemented';

    //Initalize counter
    data.correct = 0;

    var size_testing = data.test.length;

    //If actual label equals guessed label, then increment corret counter
    for (var i=0; i<size_testing; i++){

        if (data.test[i].label === data.test[i].guess.label){
            data.correct++;
        }

    }


    //Report correct gueses and accuracy
    var correct  = data.correct;
    var total    = data.test.length;
    var accuracy = Math.round ( (correct/total) * 100.0 );
    console.log('\nNumber of correct classifications is ' + correct + ' out of ' + total + ' with accuracy ' + accuracy + '%');



    //Return number of correct guesses
    return correct;

};

module.exports = exercise;


//sindimo I added this for debugging ease
//var data = exercise.one();
//console.log('Done exercise 1');

//Notice that exercise.two takes as input the 'data' result from exercise.one
//var data = exercise.two(data);
//console.log('Done exercise 2');

//Calculate distances
//var data = exercise.three(data);
//console.log('Done exercise 3');

//Classify your test digit data using nearest neighbors
//var data = exercise.four(data);
//console.log('Done exercise 4');

//Return the number of correct classifications
//var correct = exercise.five(data);

