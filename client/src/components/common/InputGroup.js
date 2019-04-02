import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

function InputGroup({ name, error, placeholder, value, onChange, icon }) {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span
          className="input-group-text justify-content-center"
          style={{ width: '48px' }}
        >
          <i className={icon} />
        </span>
      </div>
      <input
        className={classnames('form-control form-control-lg', {
          'is-invalid': error,
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

InputGroup.defaultProps = {
  type: 'text',
};

export default InputGroup;
