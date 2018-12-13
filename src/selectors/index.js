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
    if (!swagger || !selectedLanguage) {
      return codeExamples;
    }
    Object.entries(swagger.paths).forEach(([_, path]) => {
      Object.entries(path).forEach(([_, operation]) => {
        const languageExamples = operation['x-sdk-operations']['request-examples'][selectedLanguage];
        let exampleName = '';
        let exampleCode = '';

        if (languageExamples && languageExamples[0]) {
          exampleName = languageExamples[0]['name'];
          exampleCode = JSON.stringify(
            languageExamples[0]['example'][0]['source'],
            null,
            2,
          );
        }

        const example = {
          operationId: operation.operationId,
          name: exampleName,
          code: exampleCode,
          summary: operation.summary,
        };
        codeExamples.push(example);
      });
    });
    return codeExamples;
  },
);
