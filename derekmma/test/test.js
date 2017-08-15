var expect = require('chai').expect;
var ex = require('../exercise.js');

describe('There are no tests for this HW', function() {
	it('local no tests available', function() {
	    expect(1).to.equal(1);
	});
	it('local testing', function() {
	    expect(1).to.equal(2);
	});
});

describe('Mock test', function() {
	it('local should fail', function() {
	    expect(2).to.equal(1);
	});
	it('local should pass', function() {
	    expect(2).to.equal(2);
	});
});
