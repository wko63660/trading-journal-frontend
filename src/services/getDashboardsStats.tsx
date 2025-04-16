import api from "./api";

export const getDashboardsStats = async () => {
    const response = await api.get("/dashboard");
    return response.data;
}