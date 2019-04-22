const Mocha             = require('mocha');

function runMocha(studRepoTestFilePath){
    // programatically run mocha
    var mocha = new Mocha({
        reporter: 'json'
    });
    
    // mocha.addFile('./hw-knn/derekmma/test/test.js')//debug
    mocha.addFile(studRepoTestFilePath);

    console.log('run-pre');
    return new Promise(function(resolve, reject) {
        mocha.run()
        .on('test', function(test) {
            console.log('Test started: '+test.title);
        })
        .on('test end', function(test) {
            console.log('Test done: '+test.title);
        })
        .on('pass', function(test) {
            console.log('Test passed');
            // console.log(test);
        })
        .on('fail', function(test, err) {
            console.log('Test fail' + err);
            // console.log(test);
        })
        .on('end', function() {
            // console.log('testing');//debug
            console.log('run-post');
            result = this.testResults;
            // console.log(result.stats.start);
            result.stats.start = result.stats.start.toString();
            result.stats.end = result.stats.end.toString();
            resolve(result);
        });
    });
}

runMocha('./test/test.js');