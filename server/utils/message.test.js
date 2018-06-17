var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

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
});

describe('generateLocationMessage', () => {
  let maps_url = 'https://google.com/maps?q='
  it('Should generate a correct location object', () => {
    // setup state
    let loc = {from: 'Jeff', lat: 33, lon: 44};
    let locMessage = generateLocationMessage(loc.from, loc.lat, loc.lon);

    // make our assertions
    expect(locMessage.from).toBe(loc.from);
    expect(locMessage.url).toBe(`${maps_url}${loc.lat},${loc.lon}`);
  });
});