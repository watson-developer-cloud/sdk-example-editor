export const languageToExtension = {
  java: '.java',
  node: '.js',
  python: '.py',
  ruby: '.rb',
  go: '.go',
};

/**
 * Converts code example String displayed in the UI to a JSON array
 * to be manipulated internally.
 *
 * @param {String} displayString the String representing the code
 * example in the UI
 */
export const convertToJSON = displayString => displayString.split('\n');

/**
 * Converts JSON representation of code example to a String to be
 * displayed in the UI.
 *
 * @param {Object} json JSON array of the lines of the code example
 */
export const convertToDisplayString = json =>
  json.map(line => line.replace('\n', '').replace('\\', '')).join('\n');

/**
 * Converts a Swagger object into a file to be downloaded by the user.
 *
 * @param {Object} swagger the Swagger object representing the file being modified
 */
export const buildSwaggerFile = swagger => {
  const swaggerFile = new File(
    [new Blob([JSON.stringify(swagger, null, 2)], {type: 'application/json'})],
    'new-swagger.json',
    {type: 'application/json'},
  );
  return swaggerFile;
};
