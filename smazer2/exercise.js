var input    = require('./digits.js');
var exercise = {};

exercise.one = function(){

    var data = [];
    input = input.replace(/,/g,'');
    input = input.split(" ");

    //console.log(input);
    var counter = 0;
    for(var i = 0; i<input.length; i=i+257)
    {
        data.push({digits: input.slice(i,i+256).map(Number), label: Number(input[i+256])});
        //data.push({digits: input.slice(i,i+256).map(Number), label: Number(counter)});
        counter++;
    }
console.log(data);
   return data;
};

exercise.two = function(data){
    
    var indexes = [];

    var n =0;

    var i = 0;
   while(i < data.length/2)
    {
        n = Math.floor(Math.random()*data.length);

        if(indexes.includes(n))
        {
            
        }
        else
        {
            indexes.push(n);
            i++;
        }
    }

    var data1 = [];
    var data2 = [];

    for(var i = 0; i<data.length; i++)
    {
        if(indexes.includes(i))
        {
            data1.push(data[i]);
        }
        else
        {
            data2.push(data[i]);
        }
    }

    

    return {test: data1, train: data2};    
};

exercise.three = function(data){
    var sum = 0;
    var distance = function(a,b)
    {
        return ((Number(a)-Number(b))*(Number(a)-Number(b)));
    }

    var distanceSum = [];

    for(var i = 0; i < data.test.length; i++)
    {
        if(i < data.train.length)
        {
            distanceSum[i]=[];
            data.train[i]
            for(var k = 0; k<data.test[i].digits.length; k++)
            {
                distanceSum[i][k]=0;
                if(k < data.train[i].digits.length)
                {
                    for(var j = 0; j<data.test[k].digits.length; j++)
                    {
                        distanceSum[i][k] = distanceSum[i][k] + distance(data.train[i].digits[k], data.test[k].digits[j]);
                    }
                }
            }
            data.test[i].distance = distanceSum[i];
        }
    }
    //console.log(data.test);
    for(var i = 0; i<distanceSum.length; i++)
    {
        data.test[i].distance = (data.test[i].distance).map(Math.sqrt);
    }
    //console.log(distanceSum);
    return data; 
    
};


exercise.four = function(data){

    var minIndex = [];
    var minValue = 100000;
    var minLabel = [];
    var minTestLabel = [];
    var minTrainLabel = [];

    for(var i = 0; i<data.test[i].distance.length; i++)
    {
        minValue = 100000;
        minIndex[i]= 0;
        minTestLabel[i] = 0;
        minTrainLabel[i] = 0;

        for(var k = 0; k<data.test[i].distance.length; k++)
        {
            if(data.test[i].distance[k] <= minValue)
            {
                minValue = data.test[i].distance[k];
                minIndex[i] = k;
            }
            else
            {
            }
        //console.log(data.test[i].distance[k] <= minValue);    
        }
        //console.log(minValue);
        minTestLabel.push(data.test[minIndex[i]].label);
        minTrainLabel.push(data.train[minIndex[i]].label);
        
    }

    
    return {test: minTestLabel, train: minTrainLabel, original: data.test};
};

exercise.five = function(data){
    // k=1
    var correctCount = 0;
    
    for(var i = 0; i<data.test.length; i++)
    {
        if(data.test[i]===data.train[i])
        {
            correctCount++;
        }
    }
    //console.log(data.Test);
    //console.log(data.original.length);
    console.log(correctCount);
    
    return correctCount;
};

module.exports = exercise;
