import { dashboardSummary, dashboardTransactions } from './dataStore.js'

export const getDashboardSummary = () => {
    return {
        summary: dashboardSummary,
        recent_transactions: dashboardTransactions,
    }
}
