var input    = require('./digits.js');
var exercise = {};

exercise.one = function(){
    //-------------------
    //---- Your Code ----
    //-------------------

var x = [];
x = input.replace(/ /g,'')  //removes all spaces in the array
var y = []
y = x.split(""); //splits the data from 010101 to 0,1,0,1

var t = []
// this loop puts it into the format required of [label: X, digits = [array(256 items)]]
for(i=257;i<y.length;i=i+258){
   var w = {}
   w.label = Number(y[i]);
   var dig = []
   for(p=257;p>1;p--){
      dig.push(Number(y[i-p]))
   }
   w.digits = dig;
   t.push(w)
}
    return t;
};

exercise.two = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------

  // This code was used from a search within google 
  // for javascript code to randomly shuffle numbers
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
var arr = shuffle(data);

arr.train= arr.slice(0,796)
arr.test= arr.slice(796)

    return arr;
};

exercise.three = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
   var data = exercise.two(data);

    var sum = 0;
    for(i=0;i<data.train.length;i++){
        for(j=0;j<256;j++){
        sum = sum + (data.train[i].digits[j]-data.test[i].digits[j])*(data.train[i].digits[j]-data.test[i].digits[j])
    }
}
    var x = Math.sqrt(sum);
    console.log(x)
    return x;
};


exercise.four = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    return 'Error: 4th function not implemented';
};

exercise.five = function(data){
    //-------------------
    //---- Your Code ----
    //-------------------
    return 'Error: 5th function not implemented';
};

module.exports = exercise;
