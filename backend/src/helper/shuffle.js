export const shuffleArray = (array) => {
    let shuffledArray = array.slice(); // Copy the array
    let currentIndex = shuffledArray.length;
    let randomIndex;
  
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // Swap elements
      [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
        shuffledArray[randomIndex],
        shuffledArray[currentIndex],
      ];
    }
  
    return shuffledArray;
  };