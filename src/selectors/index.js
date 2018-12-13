import {createSelector} from 'reselect';

export const getSwagger = state => state.swagger;
export const getSelectedLanguage = state => state.selectedLanguage;

export const getLanguages = createSelector(
  [getSwagger],
  swagger => {
    if (swagger && swagger.info) {
      return swagger.info['x-sdk-supported-languages'];
    }
    return [];
  },
);

export const getEndpointExamples = createSelector(
  [getSwagger, getSelectedLanguage],
  (swagger, selectedLanguage) => {
    const endpointExamples = [];
    if (!swagger || !selectedLanguage) {
      return endpointExamples;
    }
    Object.entries(swagger.paths).forEach(([path, pathInfo]) => {
      Object.entries(pathInfo).forEach(([method, methodInfo]) => {
        const languageExamples =
          methodInfo['x-sdk-operations']['request-examples'][selectedLanguage];
        let examples = [];

        if (languageExamples) {
          languageExamples.forEach(example => {
            const exampleName = example['name'];
            const exampleCode = JSON.stringify(
              example['example'][0]['source'],
              null,
              2,
            );
            examples.push({
              name: exampleName,
              code: exampleCode,
            });
          });
        }

        // show blank example for user to add a new one in the
        // case there's nothing there
        if (examples.length === 0) {
          examples.push({
            name: 'none',
            code: '',
          });
        }

        const endpoint = {
          path,
          method,
          operationId: methodInfo.operationId,
          summary: methodInfo.summary,
          examples,
        };
        endpointExamples.push(endpoint);
      });
    });
    return endpointExamples;
  },
);
