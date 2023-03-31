export const getChunks = (arr: any[], size: number) => {
  let prevArr = arr;
  let newArr = [];

  while (prevArr.length > 0) {
    newArr.push(prevArr.splice(0, size));
  }
  return newArr;
};
