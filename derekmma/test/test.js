var expect = require('chai').expect;
// var assert = require('assert');
var ex = require('../exercise.js');

// describe('There are no tests for this HW', function() {
// 	it('no tests available', function() {
// 	    assert.deepEqual(1, 1);
// 	});
// 	it('testing', function() {
// 	    assert.deepEqual(1, 2);
// 	});
// });

// describe('Mock test', function() {
// 	it('should fail', function() {
// 	    assert.deepEqual(2, 1);
// 	});
// 	it('should pass', function() {
// 	    assert.deepEqual(2, 2);
// 	});
// });

describe('There are no tests for this HW', function() {
	it('no tests available', function() {
	    expect(1).to.equal(1);
	});
	it('testing', function() {
	    expect(1).to.equal(2);
	});
});

describe('Mock test', function() {
	it('should fail', function() {
	    expect(2).to.equal(1);
	});
	it('should pass', function() {
	    expect(2).to.equal(2);
	});
});
