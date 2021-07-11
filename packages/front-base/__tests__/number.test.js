test('toFixed', () => {
  expect(1.234.toFixed(2)).toBe("1.23")
  expect(1.235.toFixed(2)).toBe("1.24")
  expect(1.004.toFixed(2)).toBe("1.00")
  // 为什么这里 不进一位?
  expect(1.005.toFixed(2)).toBe("1.00")
  expect(1.0051.toFixed(2)).toBe("1.01")
  expect(1.0050.toFixed(2)).toBe("1.00")
  expect(1.015.toFixed(2)).toBe("1.01")
  expect(1.025.toFixed(2)).toBe("1.02")
  expect(1.025.toFixed(2)).not.toBe("1.03")
  expect(1.006.toFixed(2)).toBe("1.01")
})

test('toPrecision', () => {
  expect(20.234.toPrecision(1)).toBe("2e+1")
  expect(20.234.toPrecision(2)).toBe("20")
  expect(20.234.toPrecision(3)).toBe("20.2")


  expect(1.234.toPrecision(1)).toBe("1")
  expect(1.234.toPrecision(2)).toBe("1.2")
  expect(1.234.toPrecision(3)).toBe("1.23")
  expect(1.234.toPrecision(4)).toBe("1.234")
  expect(1.234.toPrecision(5)).toBe("1.2340")
  expect(1.234.toPrecision(5)).toBe("1.2340")
  expect(1.234.toPrecision(18)).toBe("1.23399999999999999")

  expect(0.001.toPrecision(1)).toBe("0.001")
  expect(0.001.toPrecision(2)).toBe("0.0010")

})