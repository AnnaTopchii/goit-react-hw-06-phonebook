import PropTypes from 'prop-types';
import { Field, Input } from './Filter.styled';

export const Filter = ({ value, onChange }) => (
  <Field>
    Find contacts by name
    <Input type="text" value={value} onChange={onChange} />
  </Field>
);

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
