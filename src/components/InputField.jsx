import React from "react";

const InputField = ({ name, value, onChange, placeholder }) => {
    return (
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="p-2 rounded border border-gray-600 text-black w-full"
        />
    );
};

export default InputField;
