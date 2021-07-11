
test('typeof', () => {
  expect(typeof 1).toBe('number')
  expect(typeof '1').toBe('string')
  expect(typeof true).toBe('boolean')
  expect(typeof new Date()).toBe('object')
  expect(typeof null).toBe('object') // not null
  expect(typeof undefined).toBe('undefined')
  expect(typeof {}).toBe('object')
  expect(typeof (() => { })).toBe('function')
  expect(typeof Symbol('test')).toBe('symbol')
})

test('instanceof', () => {
  class Test {

  }
  const t = new Test()
  expect(t instanceof Test).toBeTruthy()
  expect(t instanceof Object).toBeTruthy()
  expect(1 instanceof Number).toBeFalsy()
  expect(new Number(1) instanceof Number).toBeTruthy()
  expect('222' instanceof String).toBeFalsy()
  expect(new String('222') instanceof String).toBeTruthy()

})

test('toString', () => {
  const getType = (value) => {
    return Object.prototype.toString.call(value)
      .replace(']', '')
      .split(' ')[1]
      .toLocaleLowerCase()
  }
  class Test {

  }
  const t = new Test()
  expect(getType(1)).toBe('number')
  expect(getType('1')).toBe('string')
  expect(getType(true)).toBe('boolean')

  expect(getType([])).toBe('array')
  expect(getType(new RegExp())).toBe('regexp')
  expect(getType(new Date())).toBe('date')
  expect(getType(null)).toBe('null')
  expect(getType(undefined)).toBe('undefined')
  expect(getType({})).toBe('object')
  expect(getType(t)).toBe('object')

  expect(getType((() => { }))).toBe('function')
  expect(getType(Symbol('test'))).toBe('symbol')
})