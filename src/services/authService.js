import { createUser, findUserByEmail, findUserByToken, updateUser } from './dataStore.js'

export const getUserByToken = (token) => {
    return findUserByToken(token)
}

export const loginUser = ({ email, password }) => {
    const user = findUserByEmail(email)
    if (!user || user.password !== password) {
        return null
    }
    return user
}

export const registerUser = ({ name, email, password, phone }) => {
    const existing = findUserByEmail(email)
    if (existing) {
        return null
    }
    return createUser({ name, email, password, phone })
}

export const updateProfile = (user, updates) => {
    return updateUser(user, updates)
}

export const updateSettings = (user, settings) => {
    return updateUser(user, {
        preferences: {
            ...user.preferences,
            ...settings,
        }
    })
}

export const buildUserResponse = (user) => {
    const { password, ...safeUser } = user
    return safeUser
}
