// 1. 先将一个数 根据小数点进行切割
// 2. 整数部分的转换 取余数 直到0
// 3. 小数部分一直乘下去 直到为0
// 4. 转换的进制都用括号包括如(1) (63)表示

const hexadecimalConversion = (number, radix, maxPrecision = 5) => {
  const numberArr = `${number}`.split('.')
  const intNumber = Number(numberArr[0])
  let intStr = ''
  const dealInt = (number) => {
    const nextDivisor = Math.floor(number / radix)
    const remainder = number % radix
    intStr = `(${remainder})` + intStr
    if (nextDivisor !== 0) {
      dealInt(nextDivisor)
    }
  }

  dealInt(intNumber)
  if (numberArr.length === 2) {
    // 处理小数部分
    const floatNumber = Number(`0.${numberArr[1]}`)
    let floatStr = ''
    const dealFloat = (number) => {
      if (maxPrecision <= 0) {
        return
      }
      --maxPrecision
      const product = number * radix
      if (product < 0) {
        floatStr = floatStr + `(0)`
      } else {
        const arr = `${product}`.split('.')
        const intItem = arr[0]
        floatStr = floatStr + `(${intItem})`
        if (arr.length === 2) {
          dealFloat(Number(`0.${arr[1]}`))
        }
      }
    }
    dealFloat(floatNumber)
    return `${intStr}.${floatStr}`
  }
  return intStr
}

test('hexadecimalConversion', () => {
  expect(hexadecimalConversion(3, 2)).toBe("(1)(1)")
  expect(hexadecimalConversion(1, 2)).toBe("(1)")
  expect(hexadecimalConversion(0, 2)).toBe("(0)")
  expect(hexadecimalConversion(2, 2)).toBe("(1)(0)")
  expect(hexadecimalConversion(0.5, 2)).toBe("(0).(1)")
  expect(hexadecimalConversion(0.25, 2)).toBe("(0).(0)(1)")
  expect(hexadecimalConversion(0.12, 2, 3)).toBe("(0).(0)(0)(0)")
  expect(hexadecimalConversion(0.12, 2)).toBe("(0).(0)(0)(0)(1)(1)")

  // 转64位
  expect(hexadecimalConversion(1,64)).toBe("(1)")
  expect(hexadecimalConversion(64,64)).toBe("(1)(0)")
  expect(hexadecimalConversion(65,64)).toBe("(1)(1)")
  expect(hexadecimalConversion(0.1,64)).toBe("(0).(6)(25)(38)(25)(38)")
  expect(hexadecimalConversion(0.1,64)).toBe("(0).(6)(25)(38)(25)(38)")
  expect(hexadecimalConversion(0.015625,64)).toBe("(0).(1)")
  expect(hexadecimalConversion(0.015625,64)).toBe("(0).(1)")
  expect(hexadecimalConversion(0.03125,64)).toBe("(0).(2)")
  expect(hexadecimalConversion(1.03125,64)).toBe("(1).(2)")


})
