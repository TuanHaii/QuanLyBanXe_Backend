import { getDashboardSummary } from './dashboardService.js'

export const getReportSummary = async () => {
    const dashboard = await getDashboardSummary()

    return {
        summary: dashboard.summary,
        goals: {
            revenue_target: '5.0M',
            achieved_rate: '84%',
            progress_text: 'Hoàn thành 84% mục tiêu tháng',
        },
        recent_transactions: dashboard.recent_transactions,
    }
}

export const getReportGoals = async () => {
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
