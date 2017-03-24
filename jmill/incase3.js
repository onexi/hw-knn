var input    = require('./digits.js');
var exercise = {};

exercise.one = function(){
    var obj = [{
        digits:'' ,
        label :0
    }];

    for (var i=0; i<input.length; i+=515){
        obj.push({ digits: input.slice(i, i+511), label: input[i+513] });
    }
    obj[0].digits=input.slice(0, 511);
    obj[0].label=input[513];

    //console.log('digits: '+obj[0].digits);
    //console.log('label: '+obj[0].label);

   // console.log('manual slice: ' +input.slice(0, 511));

    return obj;
};


exercise.two = function(data){
    var obj = {
        test: [],
        train :[]
    };

    data.forEach( function (index){
        var rand = Math.floor(100*Math.random())%2;
        if (rand==0) obj.test.push(index);
        else obj.train.push(index);
        return;
    });

   // if (obj.test.length > obj.train.length) obj.test = obj.test.slice(0, obj.train.length);
   // if (obj.train.length > obj.test.length) obj.train = obj.train.slice(0, obj.test.length);
    //console.log('test: '+obj.test);
        //console.log('test: '+obj.test[obj.test.length-1]);
        //console.log('train: '+obj.train[obj.train.length-1]);
    //console.log('test length: '+obj.test.length);
    //console.log('train length: '+obj.train.length);
    return obj;
};

exercise.three = function(data){

    data.test.forEach(function (TestIndex, count) {
        //console.log('Q3 test label outside for loop: '+index.label);
        
        TestIndex['score'] = [{distance:0, label:0}];
        
        data.train.forEach(function (TrainIndex,j){
            var dist =0;

            for (var i=0; i<=TestIndex.digits.length; i+=2){
                var testDigit = TestIndex.digits[i];
                var trainDigit = TrainIndex.digits[i];
                dist += (testDigit-trainDigit) * (testDigit-trainDigit);
                //console.log('[Q3 for loop] test: '+testDigit + ' train: ' +trainDigit + ' dist: ' +dist + ' count: ' +count);
            }
            dist = Math.sqrt(dist).toFixed(2);
            if (j==0)  {TestIndex.score[0].distance=dist; TestIndex.score[0].label=TrainIndex.label;}
            else TestIndex.score.push({ distance:dist, label:TrainIndex.label});

            //console.log('Q3 index.label: '+ TestIndex.score[j].label + '   dist : '+TestIndex.score[j].distance  + ' j: ' +j);

        });

        //console.log('Q3 index.label: '+ TestIndex.label + '   index score : '+TestIndex.score + ' count: ' +count);

    });
    //console.log('Q3 distance: '+data.test[3].score[0].distance);

    return data;
};


exercise.four = function(data){
    var k = 7;
    
    //sort
   
    data.test.forEach(function (TestIndex){
        TestIndex.score.sort(function (a,b){
            return a.distance - b.distance;
        });
       // TestIndex.score.forEach(function (scoreIndex) {
            //console.log('Q4 TestIndex Loop, score: '+ scoreIndex[2].distance);
          //  scoreIndex.sort (function (a,b){
          //      return a.distance - b.distance;
          //  });
       // }); 
        TestIndex.score = TestIndex.score.slice(0,k);
        console.log('Q4 After sort: '+ TestIndex.score[0].distance +' '+ TestIndex.score[0].label+' '+ TestIndex.score[1].distance +' '+ TestIndex.score[1].label+' '+ TestIndex.score[2].distance+' '+ TestIndex.score[2].label);
        
        var LabelCounter = {one:0, two:0, three:0, four:0, five:0, six:0, seven:0, eight:0, nine:0};
        for (var i=0; i<k; i++){
            var LabelNum = Number(TestIndex.score[i].label);
            if (LabelNum === 1) LabelCounter.one+=1;
            if (LabelNum === 2) LabelCounter.two+=1;
            if (LabelNum === 3) LabelCounter.three+=1;
            if (LabelNum === 4) LabelCounter.four+=1;
            if (LabelNum === 5) LabelCounter.five+=1;
            if (LabelNum === 6) LabelCounter.six+=1;
            if (LabelNum === 7) LabelCounter.seven+=1;
            if (LabelNum === 8) LabelCounter.eight+=1;
            if (LabelNum === 9) LabelCounter.nine+=1;
        }

        TestIndex['guess'] = {type: false, count: 0};
        //var guess = {type: false, count: 0};

        for (var j in LabelCounter) {
            console.log(j+ ' LabelCounter[j]: '+ LabelCounter[j]);

            if (LabelCounter[j] >TestIndex.guess.count){
                TestIndex.guess.type = j;
                TestIndex.guess.count = LabelCounter[j];
            }
        }
        console.log('guess : ' +TestIndex.guess.type);
    });
     
    return data;
};

exercise.five = function(data){
    var correct =0;      
    data.test.forEach(function (TestIndex){
        if (TestIndex.guess.type == 'one' & TestIndex.label == 1) correct+=1;
        if (TestIndex.guess.type == 'two' & TestIndex.label == 2) correct+=1;
        if (TestIndex.guess.type == 'three' & TestIndex.label == 3) correct+=1;
        if (TestIndex.guess.type == 'four' & TestIndex.label == 4) correct+=1;
        if (TestIndex.guess.type == 'five' & TestIndex.label == 5) correct+=1;
        if (TestIndex.guess.type == 'six' & TestIndex.label == 6) correct+=1;
        if (TestIndex.guess.type == 'seven' & TestIndex.label == 7) correct+=1;
        if (TestIndex.guess.type == 'eight' & TestIndex.label == 8) correct+=1;
        if (TestIndex.guess.type == 'nine' & TestIndex.label == 9) correct+=1;
    });

    console.log('correct: ' +correct);
    data.test['correct'] = correct;
    return data;
};

module.exports = exercise;