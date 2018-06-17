var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('Should generate a correct message object', () => {
    // setup state.
    let data = {from: 'Joe', text: 'Say hi to your mother for me!'}
    let res = generateMessage(data.from, data.text);
    
    // make our assertions, against our current state.
    expect(res.from).toBeA('string').toBe(data.from);
    expect(res.text).toBeA('string').toBe(data.text);
    expect(res.createdAt).toBeA('number').toBeLessThanOrEqualTo(Date.now());
  });
})