var exercise = require('./exercise.js');

var data = exercise.one();
//console.log(data);
console.log(data.length);

var data = exercise.two(data);
//console.log(data);
console.log('train:'+data.train.length+'  test:'+data.test.length);

var funcdist = exercise.three(data);
//console.log(data);
console.log(Object.keys(data).length);

var data = exercise.four(data,funcdist);
//console.log(data);
console.log(Object.keys(data).length);

var data = exercise.five(data);
//console.log(data);
console.log(data.test.correct + ' correct out of ' + data.test.length);