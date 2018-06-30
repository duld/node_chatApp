const expect = require('expect');

const {isRealString} = require('./validation');

describe('realString', () => {
  it('Should return true for valid name and room', () => {
    const name = 'Jeffco';
    const room = 'actualRoom'
    expect(isRealString(name)).toBeTruthy();
    expect(isRealString(room)).toBeTruthy();
  });

  it('Should return false for valid name but invalid room', () => {
    const name = 'Jeffco';
    const room = '            '
    expect(isRealString(name)).toBeTruthy();
    expect(isRealString(room)).toBeFalsy();
  });

  it('Should return false for invalid name but valid room', () => {
    const name = '   ';
    const room = 'actualRoom'
    expect(isRealString(name)).toBeFalsy();
    expect(isRealString(room)).toBeTruthy();
  });

  it('Should return false for invalid name room', () => {
    const name = '';
    const room = '';
    expect(isRealString(name)).toBeFalsy();
    expect(isRealString(room)).toBeFalsy();
  });
})