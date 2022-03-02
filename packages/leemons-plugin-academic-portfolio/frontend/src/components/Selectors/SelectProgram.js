import React, { useEffect, useState, forwardRef, useMemo } from 'react';
import { useApi } from '@common';
import PropTypes from 'prop-types';
import { Select } from '@bubbles-ui/components';
import { listProgramsRequest } from '../../request';

// EN: Parse data fetched from the server
// ES: Procesar datos obtenidos del servidor
async function getData(center) {
  const {
    data: { items },
  } = await listProgramsRequest({
    page: 0,
    size: 9999,
    center,
  });

  return items.map(({ id, name }) => ({ label: name, value: id }));
}

const SelectProgram = forwardRef(
  ({ center, value: userValue, onChange, ensureIntegrity, ...props }, ref) => {
    const [value, setValue] = useState(userValue);

    // EN: Get programs from API on center change
    // ES: Obtener programas desde API en cambio de centro
    const [data, , loading] = useApi(getData, center);

    const handleChange = (newValue) => {
      if (newValue !== value) {
        // EN: Do not update value if it is a controlled input
        // ES: No actualizar el valor si es un input controlado
        if (userValue === undefined) {
          setValue(newValue);
        }

        // EN: Notify the parent component about the change
        // ES: Notificar al componente padre sobre el cambio
        if (typeof onChange === 'function') {
          onChange(newValue);
        }
      }
    };

    // EN: Update the value when controlled value changes
    // ES: Actualizar el valor cuando el valor controlado cambia
    useEffect(() => {
      setValue(userValue);
    }, [userValue]);

    // EN: Ensure that the value is valid (exists in the data)
    // ES: Asegurar que el valor es válido (existe en los datos)
    useEffect(() => {
      if (ensureIntegrity && !loading) {
        const { length } = data;

        for (let i = 0; i < length; i++) {
          if (data[i].value === value) {
            return;
          }
        }
        handleChange(null);
      }
    }, [data, loading, value]);

    return (
      <Select
        {...props}
        ref={ref}
        data={data}
        disabled={!data.length}
        onChange={handleChange}
        value={value}
      />
    );
  }
);

SelectProgram.displayName = '@academic-portfolio/components/SelectProgram';
SelectProgram.propTypes = {
  center: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  ensureIntegrity: PropTypes.bool,
};

export { SelectProgram };
export default SelectProgram;
