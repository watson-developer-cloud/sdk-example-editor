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
