export const notificationSchemas = {
    listNotifications: {
        category: { type: 'string', required: false },
        is_read: { type: 'string', required: false },
    },
    countNotifications: {
        is_read: { type: 'string', required: false },
    },
    getNotificationById: {
        id: { type: 'string', required: true },
    },
    markRead: {
        id: { type: 'string', required: true },
    },
}
