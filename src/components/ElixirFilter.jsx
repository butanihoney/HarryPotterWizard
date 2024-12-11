import React, { useState, useCallback } from "react";
import { debounce } from "lodash";
import InputField from "./InputField";

const ElixirFilter = ({ filters, onChange, onReset }) => {
    const [inputValues, setInputValues] = useState(filters);

    const fields = [
        { name: "name", placeholder: "Name" },
        { name: "difficulty", placeholder: "Difficulty" },
        { name: "ingredient", placeholder: "Ingredient" },
        { name: "inventorFullName", placeholder: "Inventor" },
        { name: "manufacturer", placeholder: "Manufacturer" },
    ];

    const handleDebouncedChange = useCallback(
        debounce((updatedFilters) => {
            onChange(updatedFilters);
        }, 500),
        [onChange]
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputValues((prev) => ({ ...prev, [name]: value }));
        handleDebouncedChange({ ...inputValues, [name]: value });
    };

    const handleReset = () => {
        setInputValues({});
        onReset();
    };

    return (
        <div className="flex gap-2 justify-between items-center mb-6 w-full sm:flex-wrap">
            <div className="flex flex-row gap-2 w-full sm:w-10/12">
                {fields.map((field) => (
                    <InputField
                        key={field.name}
                        name={field.name}
                        value={inputValues[field.name] || ""}
                        onChange={handleInputChange}
                        placeholder={field.placeholder}
                    />
                ))}
            </div>
            <button
                onClick={handleReset}
                className="mt-4 sm:mt-0 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
                Reset Filters
            </button>
        </div>
    );
};

export default ElixirFilter;
