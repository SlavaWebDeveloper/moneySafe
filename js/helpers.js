export const convertStringNumber = (str) => {
  const noSpaceStr = str.replace(/\s+/g, ''); //замена всех пробелов
  const num = parseFloat(noSpaceStr);

  if (!isNaN(num) && isFinite(num)){
    return num;
  } else {
    return false;
  }
};

export const reformatDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-");
  return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`;
};

// export const animationNumberOld = (element, number) => {
//   const fps = 60;
//   const duration = 1000;
//   const frameDuration = duration / fps;
//   const totalFrame = Math.round(duration / frameDuration);

//   let currenFrame = 0;

//   const initalNumber = parseInt(element.textContent.replace(/[^0-9.-]+/g, ''));
  
//   const increment = Math.trunc((number - initalNumber) / totalFrame);

//   const intervalId = setInterval(() => {
//     currenFrame+= 1;
    
//     const newNumber = initalNumber + increment * currenFrame;

//     element.textContent = `${newNumber.toLocaleString("RU-ru")} ₽`;

//     if (currenFrame == totalFrame) {
//       clearInterval(intervalId);
//       element.textContent = `${number.toLocaleString("RU-ru")} ₽`;
//     }
//   }, frameDuration);
// };

export const animationNumber = (element, number) => {
  const fps = 60;
  const duration = 1000;
  const frameDuration = duration / fps;
  const totalFrame = Math.round(duration / frameDuration);

  let currenFrame = 0;

  const initalNumber = parseInt(element.textContent.replace(/[^0-9.-]+/g, ''));
  
  const increment = Math.trunc((number - initalNumber) / totalFrame);

  const animate = () => {
    currenFrame +=1;
    const newNumber = initalNumber + increment * currenFrame;
    element.textContent = `${newNumber.toLocaleString("RU-ru")} ₽`;

    if ( currenFrame < totalFrame ) {
      requestAnimationFrame(animate);
    } else {
      element.textContent = `${number.toLocaleString("RU-ru")} ₽`;
    }
  }
  requestAnimationFrame(animate);
};