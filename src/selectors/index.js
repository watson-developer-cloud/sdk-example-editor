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
        // this is something we don't want, like a parameters array
        if (Array.isArray(methodInfo)) {
          return;
        }

        const sdkExamples = methodInfo['x-sdk-operations'];
        let examples = [];

        if (
          sdkExamples &&
          sdkExamples['request-examples'] &&
          sdkExamples['request-examples'][selectedLanguage]
        ) {
          sdkExamples['request-examples'][selectedLanguage].forEach(example => {
            const exampleName = example['name'];
            const codeArray = example['example'][0]['source'];

            examples.push({
              name: exampleName,
              code: codeArray,
            });
          });
        }

        // show blank example for user to add a new one in the
        // case there's nothing there
        if (examples.length === 0) {
          examples.push({
            name: 'none',
            code: [],
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
