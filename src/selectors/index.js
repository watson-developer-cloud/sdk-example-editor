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

export const getCodeExamples = createSelector(
  [getSwagger, getSelectedLanguage],
  (swagger, selectedLanguage) => {
    const codeExamples = [];
    console.log(swagger, selectedLanguage);
    if (!swagger || !selectedLanguage) {
      return codeExamples;
    }
    Object.entries(swagger.paths).forEach(([_, path]) => {
      Object.entries(path).forEach(([_, operation]) => {
        const example = {
          operationId: operation.operationId,
          code: JSON.stringify(
            operation['x-sdk-operations']['request-examples'][selectedLanguage],
            null,
            2,
          ),
          summary: operation.summary,
        };
        codeExamples.push(example);
      });
    });
    return codeExamples;
  },
);
