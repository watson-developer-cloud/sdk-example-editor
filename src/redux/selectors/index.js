import { createSelector } from 'reselect';

const getSelectedLanguage = (state) => state.selectedLanguage;
const getSelectedSwagger = (state) => state.byId[state.selectedId];

export const getIsJson = (state) =>
  state.selectedId && state.selectedId.split('.').pop() === 'json';

export const getIsSwagger = createSelector([getSelectedSwagger], (swagger) => {
  return !!swagger?.info;
});

const emptyArray = [];
export const getLanguages = createSelector([getSelectedSwagger], (swagger) => {
  return swagger?.info?.['x-sdk-supported-languages'] ?? emptyArray;
});

export const getEndpointExamples = createSelector(
  [getSelectedSwagger, getSelectedLanguage, getIsSwagger],
  (swagger, selectedLanguage, isSwagger) => {
    const endpointExamples = [];

    if (!isSwagger) {
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

        const language = isSwagger
          ? selectedLanguage
          : Object.keys(sdkExamples['request-examples'])[0];

        if (
          sdkExamples &&
          sdkExamples['request-examples'] &&
          sdkExamples['request-examples'][selectedLanguage]
        ) {
          sdkExamples['request-examples'][language].forEach((example) => {
            if (!example.example) {
              return;
            }
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
  }
);
