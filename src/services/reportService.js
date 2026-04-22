import { dashboardSummary, dashboardTransactions } from './dataStore.js'

export const getReportSummary = () => {
    return {
        summary: dashboardSummary,
        goals: {
            revenue_target: '5.0M',
            achieved_rate: '84%',
            progress_text: 'Hoàn thành 84% mục tiêu tháng',
        },
        recent_transactions: dashboardTransactions,
    }
}

export const getReportGoals = () => {
    return {
        revenue_target: '5.0M',
        achieved_rate: '84%',
        progress_text: 'Hoàn thành 84% mục tiêu tháng',
        suggestions: [
            'Tăng số lượng giao dịch 10% trong tuần tới',
            'Nâng cao tỷ lệ chốt đơn cho Mazda và Toyota',
            'Giữ mức tồn kho hợp lý để tránh cảnh báo tồn kho',
        ],
    }
}
