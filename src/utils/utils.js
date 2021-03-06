export const languageToExtension = {
  java: '.java',
  node: '.js',
  python: '.py',
  ruby: '.rb',
  go: '.go',
  swift: '.swift',
  dotnet: '.cs',
  'c#': '.cs',
  php: '.php',
  'dotnet-standard': '.cs',
};

/**
 * Converts code example String displayed in the UI to a JSON array
 * to be manipulated internally.
 *
 * @param {String} displayString the String representing the code
 * example in the UI
 */
export const convertToJSON = (displayString) => {
  const displayStringArray = displayString.split('\n');
  return displayStringArray.map((line, index) => {
    if (index === displayStringArray.length - 1) {
      return line;
    }
    return `${line}\n`;
  });
};

/**
 * Converts JSON representation of code example to a String to be
 * displayed in the UI.
 *
 * @param {Object} json JSON array of the lines of the code example
 */
export const convertToDisplayString = (json) => {
  return json
    .map((line) => line.replace('\n', '').replace('\\\\', '\\'))
    .join('\n');
};
