var input    = require('./digits.js'); //Pay attention to the passing of the viarable!
var exercise = {};

exercise.one = function(){
    var array = []
    var input_a = input.split(', ');  
    var raw = input_a.map(function(item){
        return item.split(' ');    
    });

    var raw_number = raw.map(function(item){              //forEach does not work here;
       var item_number = item.map(function(element){
           return Number(element);
       });
       return item_number; 
    });


    for(var i = 0; i< raw.length; i++){
        if(raw_number[i].length === 256){
            var data = {};                             //It is important to initialize data here, a global data will result in an array with same objects;
            data.label = raw_number[i+1][0];
            data.digits = raw_number[i];            
            array.push(data);
        }
        if(raw_number[i].length > 256){
            var data = {};
            data.label = raw_number[i+1][0];
            data.digits = raw_number[i].slice(1, raw_number[i].length);
            // console.log(data);
            array.push(data);
        }       
    }

    return array;
    /* this part is used for testing if my result is right. 
    console.log(array.length)
    var test =array.map(function(item){
        return item.digits.length;
    });
    var count = 0;
    for(var i=0; i<test.length; i++){
        if(test[i]!= 256){
            count+=1;            
        }       
    }
    */
};

var train_and_test;
exercise.two = function(data){
    // data = exercise.one();
    var train = [];
    var test = [];
    var index = [];
    var count = data.length;
    object = {};
    for(var i=0; i< data.length; i++){
        index.push(i);
    };
    
    

    index.sort(function(){           //this is a standard function
        return 0.5 - Math.random();
    });


    for(var i = 0; i< data.length;i++){
        if(i<Math.floor(data.length/2))
        train.push(data[index[i]]);
        else{
        test.push(data[index[i]]);
        }
    }

    object.train = train;
    object.test = test;
    train_and_test = object;
    return object;
};

exercise.three = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    distance = function(array1, array2){
        var dist = 0; 
        for(var i=0; i< array1.length; i++){
            dist += (array1[i]-array2[i])*(array1[i]-array2[i]); 
        }
        var dist_sqrt = Math.sqrt(dist);
        return dist_sqrt;
    };

   
    distance_arr = [];
    distance_eachpoint = [];

    // data = exercise.two();
    for(var i=0; i<data.test.length; i++ ){
        // console.log(i);
        for (var j =0; j< data.train.length; j++){
            var point_train = data.train[j].digits;
            var point_test = data.test[i].digits;
            var dist = distance(point_train, point_test);
            distance_eachpoint.push(dist);
        }
        distance_arr.push(distance_eachpoint);
        distance_eachpoint = [];
    }
    // console.log(distance_arr.length);
    // console.log(distance_arr.length);
    return distance_arr;
};


exercise.four = function(data){
    //-------------------
    //---- Your Code ----          
    //-------------------
    var find_min = function(array){
        var min = array[0];
        for(var i=0; i<array.length; i++){
            if(array[i] < min) min = array[i];   //need to handle multiple mins
        }
        return min;
    };
    var object = train_and_test;
    // var object = exercise.two();
    // data = exercise.three(); //distances


    min_index_arr = [];
    match = [];
    for(var i=0; i<data.length; i++){
        label_test = object.test[i].label;
        min = find_min(data[i]);

        min_index = data[i].indexOf(min);
        min_index_arr.push(min_index);
        if (min_index>795){console.log('false!')};
        label_train = object.train[min_index].label;
        if(label_test === label_train){
            // console.log('equal:', label_test, label_train);
            match.push(object.test[i])}
        }

    // console.log(match.length);
    return match;
};

exercise.five = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    // data = exercise.four();
    console.log(data.length);
    return data.length;
};

module.exports = exercise;
