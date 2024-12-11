import React from "react";

const ElixirTable = ({ elixirs }) => {
    if (elixirs.length === 0) return <p>No elixirs found</p>;

    return (
        <table className="w-full mt-5 border-separate border-spacing-0.5">
            <thead>
                <tr>
                    <th className="border border-gray-300 px-2 py-1">Name</th>
                    <th className="border border-gray-300 px-2 py-1">Ingredients</th>
                    <th className="border border-gray-300 px-2 py-1">Inventors</th>
                    <th className="border border-gray-300 px-2 py-1">Manufacturer</th>
                    <th className="border border-gray-300 px-2 py-1">Difficulty</th>
                </tr>
            </thead>
            <tbody>
                {elixirs.map((elixir) => (
                    <tr key={elixir.id}>
                        <td className="border border-gray-300 px-2 py-1">{elixir.name}</td>
                        <td className="border border-gray-300 px-2 py-1">
                            {elixir.ingredients.map((ingredient) => ingredient.name).join(", ") || "-"}
                        </td>
                        <td className="border border-gray-300 px-2 py-1">
                            {elixir.inventors.length > 0
                                ? elixir.inventors.map((inventor) => inventor.firstName + " " + inventor.lastName).join(", ")
                                : "-"}
                        </td>
                        <td className="border border-gray-300 px-2 py-1">{elixir.manufacturer || "-"}</td>
                        <td className="border border-gray-300 px-2 py-1">{elixir.difficulty || "-"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ElixirTable;
