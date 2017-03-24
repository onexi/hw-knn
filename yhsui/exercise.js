var input    = require('./digits.js');
var exercise = {};

exercise.sortByDistance = function(distance){
   distance.sort(function(a,b){
      return a.sum - b.sum;
   });
   return distance;
};

exercise.one = function(){
    var split = input.split(",");
    var data = [];
    for (i = 0; i < split.length - 1; i++){
       //trim: delete the blank from string
       if (i == 0) {
          var digits = split[i].trim().split(" ");
       }
       else {
         var digits = split[i].trim().split(" ");
          digits = digits.slice(1, digits.length);
       }

       digits = digits.map(Number);

       var labelNum = split[i+1].trim().split(" ")[0]
       var label = Number(labelNum[0]);
       data.push({label:label,digits:digits});
    }
   // console.log(data[data.length - 1]);
   // console.log(data.length);
    return data;
};

exercise.two = function(data){
    var length = data.length;
    var mid = Math.floor(length/2);
    var currentIndex = length, temp, randomIndex;
    while (0 != currentIndex) {
       randomIndex = Math.floor(Math.random() * currentIndex);
       currentIndex -= 1;
       temp = data[currentIndex];
       data[currentIndex] = data[randomIndex];
       data[randomIndex] = temp;
    }
    var train = data.slice(0,mid);
    var test = data.slice(mid,length);
   //  console.log(length);
   //  var train = [];
   //  var test = [];
   //  for (var i = 0; i < length; i++){
   //     var index = Math.random();
   //     console.log(index);
   //     if (index <= 0.5){
   //        train.push(data[i]);
   //     }
   //     else{
   //        test.push(data[i]);
   //     }
   //  }
   //  console.log(train.length);
   //  console.log(test.length);
    return {train:train,test:test};
};

exercise.three = function(data){
   //Write a function to measure the distance between test and training data points.
    //var train = data.train;
    //var test = data.test;
    
    data.test.forEach(function(testItem){
       var distance = [];
       data.train.forEach(function(trainItem,index){

       var sum = 0;
       var length = trainItem.digits.length;
       for (var i =0; i<length;i++){
          var delta = testItem.digits[i] - trainItem.digits[i];
          sum += Math.sqrt(delta*delta);
       }
       distance.push({sum:sum,label:trainItem.label});
    });
    testItem.distance = distance;
    });
   //  testPoint.forEach(function(){
   //     trainPoint.forEach(function(){
   //        var distance = Math.sqrt(Math.pow(testPoint[]))
   //     })
   //  })
   //  var distance = Math.sqrt(Math.pow(p2.x - p1.x, 2)) + Math.pow(p2.y - p1.y, 2)
    return data;
};


exercise.four = function(data){
    //Classify your test digit data using nearest neighbors.
   //  var test = data[1];
   //  test.forEach(function(testPoint){
   //       var dx = testPoint.x - newPoint.x;
   //       var dy = testPoint.y - newPoint.y;
   //       testPoint.distance = Math.sqrt(dx*dx + dy*dy);
   //  });
    //var test = data.test;
    return data;//exercise.sortByDistance();
};

exercise.five = function(data){
    //Return the number of correct classifications
      // var test = data.test;
      var counter = 0;
      data.test.forEach(function(item){
         var label = item.label;
         exercise.sortByDistance(item.distance);
         if(item.label === item.distance[0].label){
            console.log("equal");
            counter++;
         }
    });
    console.log(counter + "counter out of " + data.test.length);
    data.test.correct = counter;
    return data;
};

module.exports = exercise;
