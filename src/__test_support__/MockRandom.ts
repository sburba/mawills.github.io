const isDecimal = (number: number) => number === 0 || number % 1 !== 0;
function failOnBrokenContract(values: number[]) {
  for (let value of values) {
    if (!isDecimal(value)) {
      throw new Error(
        `${value} is not a decimal, and would never be returned by random`
      );
    }
  }
}

const mathCopy = Object.create(global.Math);
export const resetMockRandom = () => (global.Math = mathCopy);

function randomMock(returnValues: number[]) {
  let index = 0;

  return () => {
    if (returnValues.length === 0) {
      throw new TypeError("The value list must contain some value");
    }
    failOnBrokenContract(returnValues);
    if (index >= returnValues.length) {
      throw new Error(
        `${index} values requested, but only ${returnValues.length} provided for mockRandom`
      );
    }
    return returnValues[index++];
  };
}

export function mockRandom(values: number[]) {
  const mockMath = Object.create(global.Math);
  mockMath.random = randomMock(values);
  global.Math = mockMath;
}
