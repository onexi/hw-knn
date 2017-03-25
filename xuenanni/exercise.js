var input    = require('./digits.js');
var exercise = {};

exercise.one = function(){
    var split = input.split(',');
    var array = [];


    array.push({label:0,digits: split[0]});
    for (var i=1;i<split.length-1;i++){
        array.push({label:split[i+1].slice(1,2),digits:split[i].slice(2,split[i].length)});
    }
    
    return array;

      
};

exercise.two = function(data){
    
    
    var train =[];
    var test = [];
    var num= [];
    var len = data.length;
    var randomnumber=Math.floor(Math.random()*len);
    
    num.push(randomnumber);
    train.push(data[randomnumber]);
    
     
    for (var i=1;train.length<Math.floor(len/2);i++){
        var randomnum=Math.floor(Math.random()*len);
        num.push(randomnum);
        var numslice=num.slice(1,num.length-1);
        if (numslice.includes(num[i])){
            test.push(data[num[i]]);
        }
        else{
            train.push(data[num[i]]);
        }
    }
    var check=[];
    var test1=[];
    for (var j=0; j<len;j++){
        if (num.includes(j)){
            check.push(j);
        }
        else{
            test1.push(data[j]);
        }
    }
    
    
    return {'train': train,'test':test1};

    
};

exercise.three = function(data){
    data.test.forEach(function(testItem){
        var distance = [];

        data.train.forEach(function(trainItem){

            var sum = 0;
            var length = trainItem.digits.length;
            for(var i =0;i<length;i++){
                var delta = testItem.digits[i] - trainItem.digits[i];
                sum += Math.abs(delta);
            }
            distance.push({sum:sum,label:trainItem.label});
        });

        testItem.distance = distance;
    });
    return data;
    
};


exercise.four = function(data){
    return exercise.five(data);

};


exercise.sortByDistance = function(distance){
    distance.sort(function(a,b){
        return a.sum - b.sum;
    });
    return distance;
};


exercise.five = function(data){
    var count = 0;
    data.test.forEach(function(testItem){
        
        exercise.sortByDistance(testItem.distance);
        if(testItem.label === testItem.distance[0].label){
           // console.log('equal');
            count++;
        }

    });
    
    data.test.correct = count;
    return data;
};

module.exports = exercise;
