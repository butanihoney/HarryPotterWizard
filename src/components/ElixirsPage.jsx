import React, { useState, useEffect, useCallback } from "react";
import ElixirFilter from "./ElixirFilter";
import ElixirTable from "./ElixirTable";
import { fetchElixirs } from "../api";

import "../../src/index.css";

const ElixirsPage = () => {
    const [filters, setFilters] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        return {
            name: params.get("name") || "",
            difficulty: params.get("difficulty") || "",
            ingredient: params.get("ingredient") || "",
            inventorFullName: params.get("inventorFullName") || "",
            manufacturer: params.get("manufacturer") || "",
        };
    });

    const [elixirs, setElixirs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const data = await fetchElixirs(filters);
            setElixirs(data);
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        const params = new URLSearchParams(
            Object.fromEntries(
                Object.entries(filters).filter(([_, value]) => value)
            )
        );
        window.history.replaceState(null, "", `?${params.toString()}`);
        fetchData();
    }, [filters, fetchData]);

    const handleFilterChange = (updatedFilters) => {
        setFilters(updatedFilters);
    };

    const resetFilters = () => {
        setFilters({
            name: "",
            difficulty: "",
            ingredient: "",
            inventorFullName: "",
            manufacturer: "",
        });
    };

    return (
        <div className="container mx-auto p-5 w-full">
            <h1 className="text-4xl text-center text-black mb-8">Elixirs</h1>
            <ElixirFilter
                filters={filters}
                onChange={handleFilterChange}
                onReset={resetFilters}
            />
            {loading && <p className="text-black">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && <ElixirTable elixirs={elixirs} />}
        </div>
    );
};

export default ElixirsPage;
