import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isFunction, isNil } from 'lodash';
import { Stepper, VerticalStepperContainer } from '@bubbles-ui/components';

function Setup({ labels, steps, values, editable, onSave, useObserver, ...props }) {
  const [sharedData, setSharedData] = useState(values || {});
  const [active, setActive] = useState(0);

  const { subscribe, unsubscribe } = useObserver();

  const [callOnSave, setCallOnSave] = useState(false);

  useEffect(() => {
    if (callOnSave) {
      if (isFunction(onSave)) onSave(sharedData, callOnSave);
      setCallOnSave(false);
    }
  }, [callOnSave]);

  useEffect(() => {
    if (!isNil(values) && JSON.stringify(sharedData) !== JSON.stringify(values)) {
      setSharedData(values);
    }
  }, [values]);

  useEffect(() => {
    const f = (event) => {
      if (event === 'saveData') {
        setCallOnSave('edit');
      }
    };

    subscribe(f);

    return () => unsubscribe(f);
  }, []);

  // ·······························································
  // HANDLERS

  const handleOnNext = () => {
    if (active < steps.length - 1) {
      setActive(active + 1);
    } else {
      setCallOnSave('library');
    }
  };

  const handleOnPrev = () => {
    if (active > 0) {
      setActive(active - 1);
    }
  };

  // ----------------------------------------------------------------
  // COMPONENT

  return (
    <VerticalStepperContainer {...props} data={steps}>
      {
        steps.map((item) =>
          React.cloneElement(item.content, {
            ...item.content.props,
            onNext: handleOnNext,
            onPrevious: handleOnPrev,
            setSharedData,
            sharedData,
            editable,
          })
        )[active]
      }
    </VerticalStepperContainer>
  );
}

Setup.defaultProps = {
  labels: {},
  values: {},
  editable: true,
};
Setup.propTypes = {
  labels: PropTypes.object,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      description: PropTypes.string,
      content: PropTypes.node,
    })
  ),
  values: PropTypes.object,
  editable: PropTypes.bool,
  onNext: PropTypes.func,
  onPrev: PropTypes.func,
  onSave: PropTypes.func,
  useObserver: PropTypes.func,
};

// eslint-disable-next-line import/prefer-default-export
export { Setup };
