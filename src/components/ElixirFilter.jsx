import React, { useState, useCallback } from "react";
import { debounce } from "lodash";
import InputField from "./InputField";

const ElixirFilter = ({ filters, onChange, onReset }) => {
    const [inputValues, setInputValues] = useState(filters);

    const fields = [
        { name: "name", placeholder: "Name" },
        { name: "ingredient", placeholder: "Ingredient" },
        { name: "inventorFullName", placeholder: "Inventor" },
        { name: "manufacturer", placeholder: "Manufacturer" },
    ];

    const difficulty = [
        { value: "", label: "Select Difficulty" },
        { value: "Unknown", label: "Unknown" },
        { value: "Advanced", label: "Advanced" },
        { value: "Moderate", label: "Moderate" },
        { value: "Beginner", label: "Beginner" },
        { value: "OrdinaryWizardingLevel", label: "OrdinaryWizardingLevel" },
        { value: "OneOfAKind", label: "OneOfAKind" },
    ]

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

    const handleSelectChange = (e) => {
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
                <div className="flex flex-col">
                    <select
                        name="difficulty"
                        value={inputValues.difficulty || ""}
                        onChange={handleSelectChange}
                        className="p-3 rounded border border-gray-600 bg-transparent text-black"
                    >
                        {difficulty.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
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
