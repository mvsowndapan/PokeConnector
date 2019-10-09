import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextArea = ({ name, placeholder, value, onChange, err, info }) => {
    return (
        <div>
            <div className="form-group">
                <textarea
                    className={classnames("form-control form-control-lg",
                        { 'is-invalid': err })}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                {info && (<small className="form-text text-muted">{info}</small>)}
                {err && (<div className="invalid-feedback">{err}</div>)}
            </div>
        </div>
    )
}

TextArea.protoTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    err: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};

export default TextArea;