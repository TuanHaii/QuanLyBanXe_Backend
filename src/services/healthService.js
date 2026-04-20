export const healthCheck = () => {
    return {
        status: 'healthy',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    }
}
