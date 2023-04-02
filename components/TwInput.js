import React from "react";

export default function TwInput({
  type,
  name,
  value,
  handleInputChange,
  placeholder,
}) {
  return (
    <div>
      <label className="label" htmlFor={name}>
        <span className="label-text">{`${name
          .charAt(0)
          .toUpperCase()}${name.slice(1)}`}</span>
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        className="input input-bordered w-full"
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </div>
  );
}
