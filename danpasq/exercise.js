var input    = require('./digits.js');
var exercise = {};




exercise.one = function(){
    //-------------------
    //---- Your Code ----
    //-------------------
    var newArrays = [];
    var allChars = input.split("");
    var chars = [];
    var labels = [];
    function noPunc(item){
        if (item !== ',' && item !== ' '){
            chars.push(parseInt(item));
        }
    };
    allChars.forEach(noPunc);
    
    for (i = 256; i < chars.length; i+= 257){
        labels.push(chars[i]);
    }
    var j = 0;
    for (i = 0; i < chars.length; i+=257){
        newArrays[j] = chars.slice(i, i+256);
        j++;
    
        
    }
    /*
    var foo = function(){
        chars.split(" ");
        newArray.push(chars[1]);
    };
    var bar = function(){
        chars.split(" ");
        newArray.digits.push(chars[3]);
    }
    chars.forEach(foo);
    chars.forEach(bar);
    */
    //console.log(labels);
    var newLabels = labels.map(function(label){
        return {'label': label};
    });
    var final = [];
    for (i=0; i<1593; i++){
        final[i] = {'label':labels[i], 'digits':newArrays[i]}        
    }
     
    
    /*
    newArrays.forEach(function(item){
        newLabels.push({'digits': item});
    });*/
    return final;
};

exercise.two = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    var trainIndex = [];
    while (trainIndex.length < 796){
        var num = (Math.floor(Math.random()*10000));
        if (num < 1593 && trainIndex.includes(num) === false){
            trainIndex.push(num);
        }

    }
    var testIndex = [];
    
    for (i=0; i<1593; i++){
        if (trainIndex.includes(i) === false){
            testIndex.push(i);
        }
        
            
    }
    
    //console.log(testIndex);
    //console.log(trainIndex);
    //data = exercise.one();
    var trainData = [];
    for (i = 0; i < trainIndex.length; i++){
        trainData.push(data[trainIndex[i]]);
    }
    var testData = [];
    for (i = 0; i < testIndex.length; i++){
        testData.push(data[testIndex[i]]);
    }

    return {'train': trainData, 'test': testData};
};

exercise.three = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    var allDistances = [];
    for(k = 0; k< 796; k++){
        var eachTestPtDistanceFromTrainPt = [];
        for (i = 0; i < 796; i++){
            var distances = [];
            for (j = 0; j < 255; j++){
                distances.push(((data.test[i].digits[j] - data.train[k].digits[j]) * (data.test[i].digits[j] - data.train[k].digits[j]) ));
            }
            //console.log(distances[254]);
            var sumDist = distances.reduce(function(previous,current){
                //console.log(previous);
                //console.log(current);
                return previous + current;
            },0);
            //console.log(sumDist);
            eachTestPtDistanceFromTrainPt[i] = Math.sqrt(sumDist);
        }

        allDistances.push(eachTestPtDistanceFromTrainPt);
    }
    //console.log(data.test[1].digits.length)
    return allDistances;
};


exercise.four = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    var copy = [];
    var indicies = [];
    var dataCopy = data.forEach(function(item){
        copy.push(item);
    });
    for (i=0; i<data.length; i++){
        var foo = copy[i];
        var test = foo.sort(function(a,b){
            return a - b;
        })
        var item = test[0];
        var ind = data[i].indexOf(item);
        indicies.push(ind);
    }
    //console.log(data[1][795]);
    return data;
};

exercise.five = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    
    return 'I got stuck on the 4th part of the problem. I was trying to get a list of the original training data indicies so that I could match the nearest neighbor point label with the training label.';
};

module.exports = exercise;
