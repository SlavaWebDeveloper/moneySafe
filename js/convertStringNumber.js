export const convertStringNumber = (str) => {
  const noSpaceStr = str.replace(/\s+/g, ''); //замена всех пробелов
  const num = parseFloat(noSpaceStr);

  if (!isNaN(num) && isFinite(num)){
    return num;
  } else {
    return false;
  }
};