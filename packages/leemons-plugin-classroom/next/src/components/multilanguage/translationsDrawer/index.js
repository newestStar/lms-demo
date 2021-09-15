import { useState } from 'react';
import { Drawer, useDrawer, Button } from 'leemons-ui';
import { XIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import TranslateIcon from './translateIcon';
import Tabs from './tabs';

export function useTranslationsDrawer(config = {}) {
  const [drawer, toggleDrawer] = useDrawer({ size: 'right', ...config });
  const [warnings, setWarnings] = useState({});
  return {
    drawer,
    toggleDrawer,
    warnings,
    setWarnings: (value) => setWarnings((oldValue) => ({ ...oldValue, ...value })),
    warningDefault: config?.warningDefault || false,
  };
}

export function TranslationsDrawer({
  drawer,
  toggleDrawer: toggleTranslations,
  warnings,
  setWarnings,
  warningDefault,
  children,

  onSave,
  onCancel,
}) {
  return (
    <Drawer {...drawer}>
      <div className="p-6 max-w-sm relative">
        <Button
          className="btn-circle btn-xs ml-8 bg-transparent border-0 absolute top-1 right-1"
          onClick={toggleTranslations}
        >
          <XIcon className="inline-block w-4 h-4 stroke-current" />
        </Button>
        <section>
          <TranslateIcon />
          <h2 className="text-secondary text-xl">Level translation</h2>
          <Tabs
            panel={children}
            warnings={warnings}
            setWarnings={setWarnings}
            warningDefault={warningDefault}
          />
          <div className="flex justify-between my-16">
            <Button color="primary" className="btn-link" onClick={onCancel}>
              Cancel
            </Button>
            <Button color="primary" onClick={onSave}>
              Save
            </Button>
          </div>
        </section>
      </div>
    </Drawer>
  );
}
TranslationsDrawer.propTypes = {
  drawer: PropTypes.object,
  toggleDrawer: PropTypes.func,
  warnings: PropTypes.object,
  setWarnings: PropTypes.func,
  warningDefault: PropTypes.bool,
  children: PropTypes.element,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};
