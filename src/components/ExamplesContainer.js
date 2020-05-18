import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Accordion, AccordionItem } from 'carbon-components-react';

import ExampleCode from './ExampleCode';

import { getEndpointExamples } from '../redux/selectors';
import { updateExample } from '../redux/ducks';

import { convertToDisplayString } from '../utils/utils';

import './ExamplesContainer.scss';

const ExamplesContainer = () => {
  const dispatch = useDispatch();

  const { endpointExamples, selectedLanguage } = useSelector(
    (state) => ({
      endpointExamples: getEndpointExamples(state),
      selectedLanguage: state.selectedLanguage,
    }),
    shallowEqual
  );

  const onCodeChange = (endpoint, example, index) => (e) => {
    const codeExample = convertToDisplayString(example.code);
    const newCodeExample = e.target.value;
    if (newCodeExample !== codeExample) {
      dispatch(
        updateExample({
          path: endpoint.path,
          method: endpoint.method,
          language: selectedLanguage,
          index: index,
          newCodeExample,
        })
      );
    }
  };

  return (
    <div>
      <Accordion>
        {endpointExamples.map((endpoint) => (
          <AccordionItem
            key={endpoint.operationId}
            title={endpoint.operationId}
          >
            <div className="examples-container__endpoint">
              {endpoint.examples.map((example, index) => (
                <ExampleCode
                  key={example.name}
                  code={example.code}
                  name={example.name}
                  language={selectedLanguage}
                  onCodeChange={onCodeChange(endpoint, example, index)}
                />
              ))}
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ExamplesContainer;
