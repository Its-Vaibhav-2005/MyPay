import { useCallback, useState } from "react";
import { API_URL } from "../constants/api";
console.log("API_URL in useTransaction:", API_URL);
export const useTransactions = (userId) => {
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState({
        balance: 0,
        income: 0,
        expense: 0
    })
    const [isLoading, setIsLoading] = useState(true);

    const fetchTransactions = useCallback(async () => {
        try{
            const response = await fetch(`${API_URL}/transactions/${userId}`);
            const data = await response.json();
            setTransactions(data.transactions || [])
        }catch(error){
            console.log("Failed to fetch transactions:", error);
        }
    }, [userId]);

    const fetchSummary = useCallback(async () => {
        const URI = `${API_URL}/transactions/summary/${userId}`;
        console.log("URI SUMMARY:", URI);
        try{
            // const response = await fetch(`${API_URL}/transactions/summary/${userId}`);
            const response = await fetch(URI);
            const data = await response.json();
            setSummary(data)
        }catch(error){
            console.log("Failed to fetch summary:", error);
        }
    }, [userId]);

    const loadData = useCallback(async () => {
        if (!userId) return;
        setIsLoading(true);
        try{
            await Promise.all([fetchTransactions(), fetchSummary()]);
        }
        catch(error){
            console.log("Failed to load data:", error);
        }
        finally{
            setIsLoading(false);
        }

    },[fetchTransactions, fetchSummary, userId]);

    const deleteTransaction = async (id) => {
        try{
            const response = await fetch(`${API_URL}/transactions/${id}`, {method: 'DELETE'});
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            loadData();
            return { success: true };
        }catch(error){
            console.log("Failed to delete transaction:", error);
            return { success: false, error: error.message };
        }
    }

    return {
        transactions,
        summary,
        isLoading,
        loadData,
        deleteTransaction
    }
}