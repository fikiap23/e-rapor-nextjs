import React, { useState } from 'react'
const useInputs = ({ label }) => {
  const [inputs, setInputs] = useState([{ id: 0, value: '', label }])

  const handleAddInput = (index) => {
    const values = [...inputs]
    values.splice(index + 1, 0, {
      id: index + 1,
      value: '',
      label,
    })
    setInputs(values)
  }

  const handleInputChange = (index, value) => {
    const values = [...inputs]
    values[index].value = value
    setInputs(values)
  }

  const handleRemoveInput = (index) => {
    const values = [...inputs]
    values.splice(index, 1)
    setInputs(values)
  }

  return {
    inputs,
    handleAddInput,
    handleInputChange,
    handleRemoveInput,
  }
}
const DynamicInput = ({
  id,
  value,
  onChange,
  onAdd,
  onRemove,
  showRemoveButton,
  label,
}) => (
  <div className="form-group">
    <label htmlFor={`input-${id}`} className="control-label">
      {label} {id + 1}
    </label>
    <div className="input-group" style={{ width: '50%' }}>
      <input
        type="text"
        name={`input-${id}`}
        className="form-control"
        value={value}
        onChange={onChange}
        placeholder="Masukan data"
        required
      />
      <div className="input-group-append">
        <button
          style={{
            marginTop: '10px',
            backgroundColor: 'green',
            borderRadius: '10px',
          }}
          className="btn btn-sm btn-outline-secondary"
          type="button"
          onClick={onAdd}
        >
          <i
            style={{ color: 'white' }}
            className="fa fa-plus"
            aria-hidden="true"
          ></i>
        </button>
        {showRemoveButton && (
          <button
            style={{
              marginTop: '10px',
              marginLeft: '10px',
              backgroundColor: 'red',
              borderRadius: '10px',
            }}
            className="btn btn-sm btn-outline-secondary"
            type="button"
            onClick={onRemove}
          >
            <i
              style={{ color: 'white' }}
              className="fa fa-trash"
              aria-hidden="true"
            ></i>
          </button>
        )}
      </div>
    </div>
  </div>
)

export { useInputs, DynamicInput }
