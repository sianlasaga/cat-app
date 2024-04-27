import React from 'react';
import { Form, FormLabel } from 'react-bootstrap';
import FormSelect, { FormSelectProps } from 'react-bootstrap/FormSelect';

interface AppSelectProps extends FormSelectProps {
  options: { value: string; label: string }[];
  placeholder?: string;
}

const AppSelect: React.FC<AppSelectProps> = ({
  options,
  placeholder,
  ...rest
}) => {
  return (
    <Form>
      <FormLabel>Breed</FormLabel>
      <FormSelect {...rest}>
        {placeholder && <option>{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value || 'default-option'} value={option.value}>
            {option.label}
          </option>
        ))}
      </FormSelect>
    </Form>
  );
};

export default AppSelect;
