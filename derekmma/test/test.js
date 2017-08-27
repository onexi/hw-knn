var expect = require('chai').expect;
var ex = require('../exercise.js');

describe('There are no tests for this HW', function() {
	it('local2 no tests available', function() {
	    expect(1).to.equal(1);
	});
	it('local2 testing', function() {
	    expect(1).to.equal(2);
	});
});

describe('Mock test', function() {
	it('local2 should fail', function() {
	    expect(2).to.equal(1);
	});
	it('local2 should pass', function() {
	    expect(2).to.equal(2);
	});
});
