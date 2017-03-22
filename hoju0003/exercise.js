var input    = require('./digits.js');
var exercise = {};


exercise.one = function(){
    //-------------------
    //---- Your Code ----
    //-------------------

    var fullArray = input.split(' ');
    var objectArray= [];


    fullArray.forEach(function(item,i,wholething){
        
        
        var tempArray=[];
        var tempObject={};
        var tempLabel=0;

        if (item.includes(',')){
            
           

            
            tempLabel=fullArray[i+1];

            for(var count = 0; count < 256; count++)
            {
                tempArray[count]=fullArray[i-255+count].replace(',','');
            }


            tempObject= {label: tempLabel, digits:tempArray};            
            objectArray.push(tempObject);
                
        }

        


    });

    return objectArray;


};

exercise.two = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    
    var trainArray=[];
    var testArray=[];
    data.forEach(function(item,i,wholething){

        if(i%2===0) {testArray.push(item);}
        else {trainArray.push(item);}

    });

    //testArray.pop();

    var splitData= {train:trainArray, test:testArray};

   
    return splitData;
    //return 'Error: 2nd function not implemented';
};

exercise.three = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------

    //input data.test[x] or data.train[x]
    var findDistance = function(pt1,pt2){
        var array1=pt1.digits;
        var array2=pt2.digits;
        var distArray= [];
        

        array1.forEach(function(item,i,wholething){
            
            distArray.push(Math.abs(array1[i]-array2[i]));

        });

        return distArray.reduce(function(prev,curr){
            return prev+curr;
        },0);
    };
   
    return findDistance;


};


exercise.four = function(data,findDistance){
    //-------------------
    //---- Your Code ----
    //-------------------
   
    var count=0;
    
    data.test.forEach(function(item,i,wholething){
        //data.test[i].correct=0;
        data.train.forEach(function(item2,i2,wholething2){

            item2.dist=findDistance(data.test[i],data.train[i2]);
        });

        data.train.sort(function(a,b){
            return a.dist-b.dist;
        });
        
        if(data.train[0].label===item.label){
            
            count+=1;
        }

    });
    //console.log(count);
    
    data.test.correct=count;
    
    return data;



};

exercise.five = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    

    return data;

    //return 'Error: 5th function not implemented';
};

module.exports = exercise;
