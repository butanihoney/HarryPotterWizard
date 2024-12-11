const apiUrl = import.meta.env.VITE_API_URL;

export const fetchElixirs = async (filters) => {
    const params = new URLSearchParams(
        Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value)
        )
    );
    const url = `${apiUrl}/elixirs?${params.toString()}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch elixirs");
    return await response.json();
};