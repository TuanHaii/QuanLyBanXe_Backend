import { notifications, markNotificationRead } from './dataStore.js'

export const getNotifications = ({ category, is_read } = {}) => {
    let results = [...notifications]

    if (category) {
        results = results.filter((notification) =>
            notification.category.toLowerCase() === category.toLowerCase(),
        )
    }

    if (is_read !== undefined) {
        const normalized =
            typeof is_read === 'string'
                ? is_read.toLowerCase() === 'true'
                : Boolean(is_read)
        results = results.filter((notification) => notification.is_read === normalized)
    }

    return results
}

export const getNotificationById = (id) => {
    return notifications.find((notification) => notification.id === id)
}

export const getNotificationCount = ({ is_read } = {}) => {
    let results = [...notifications]
    if (is_read !== undefined) {
        const normalized =
            typeof is_read === 'string'
                ? is_read.toLowerCase() === 'true'
                : Boolean(is_read)
        results = results.filter((notification) => notification.is_read === normalized)
    }
    return results.length
}

export const readNotification = (id) => {
    return markNotificationRead(id)
}
