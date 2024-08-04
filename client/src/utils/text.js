export const textSlicer = (text, minLength) => {
  if (minLength === null) {
    return text;
  }
  return text.length > minLength ? text.slice(0, minLength) + "..." : text;
};
