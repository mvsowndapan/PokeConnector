import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectList = ({ name, value, onChange, err, info, options }) => {
    const choice = options.map(op => (
        <option key={op.label} value={op.value}>
            {op.label}
        </option>
    ));
    return (
        <div>
            <div className="form-group">
                <select
                    className={classnames("form-control form-control-lg",
                        { 'is-invalid': err })}
                    name={name}
                    value={value}
                    onChange={onChange}
                >{choice}
                </select>
                {info && (<small className="form-text text-muted">{info}</small>)}
                {err && (<div className="invalid-feedback">{err}</div>)}
            </div>
        </div>
    )
}

SelectList.protoTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    err: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
};

export default SelectList;