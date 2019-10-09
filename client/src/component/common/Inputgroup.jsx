import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Inputgroup = ({ name, placeholder, value, icon, type, onChange, err }) => {
    return (
        <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text"><i className={icon}></i></span>
                </div>
                <input
                    type={type}
                    className={classnames("form-control form-control-lg",
                        { 'is-invalid': err })}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                {err && (<div className="invalid-feedback">{err}</div>)}
            </div>
        </div>
    )
}

Inputgroup.protoTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    icon: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    err: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};
Inputgroup.defaultProps = {
    type: 'text'
}
export default Inputgroup;