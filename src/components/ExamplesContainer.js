import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Accordion, AccordionItem } from 'carbon-components-react';
import ExampleCode from './ExampleCode';

import { getEndpointExamples } from '../redux/selectors';

import { updateExample } from '../redux/ducks';

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
                  onCodeChange={(newCodeExample) =>
                    dispatch(
                      updateExample({
                        path: endpoint.path,
                        method: endpoint.method,
                        language: selectedLanguage,
                        index: index,
                        newCodeExample: newCodeExample.target.value,
                      })
                    )
                  }
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
