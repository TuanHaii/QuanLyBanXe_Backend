import { errorResponse } from '../utils/apiResponse.js'

const isString = (value) => typeof value === 'string'
const isNumber = (value) => typeof value === 'number' && Number.isFinite(value)
const isBoolean = (value) => typeof value === 'boolean'
const isArray = (value) => Array.isArray(value)

const validateFormat = (value, format) => {
    if (format === 'email') {
        return typeof value === 'string' && /.+@.+\..+/.test(value)
    }
    return true
}

const normalizeValue = (value, type) => {
    if (type === 'number' && typeof value === 'string') {
        const parsed = Number(value)
        return Number.isFinite(parsed) ? parsed : value
    }
    if (type === 'boolean' && typeof value === 'string') {
        return value === 'true' ? true : value === 'false' ? false : value
    }
    return value
}

const createValidator = (schema, source) => {
    return (req, res, next) => {
        const data = source === 'query' ? req.query || {} : source === 'params' ? req.params || {} : req.body || {}
        const errors = []

        Object.entries(schema).forEach(([field, rules]) => {
            let value = data[field]
            value = normalizeValue(value, rules.type)

            if (rules.required && (value === undefined || value === null || value === '')) {
                errors.push(`${field} is required`)
                return
            }

            if (value !== undefined && value !== null && value !== '') {
                switch (rules.type) {
                    case 'string':
                        if (!isString(value)) {
                            errors.push(`${field} must be a string`)
                            return
                        }
                        if (rules.minLength && value.length < rules.minLength) {
                            errors.push(`${field} must be at least ${rules.minLength} characters`)
                            return
                        }
                        if (rules.format && !validateFormat(value, rules.format)) {
                            errors.push(`${field} must be a valid ${rules.format}`)
                            return
                        }
                        break
                    case 'number':
                        if (!isNumber(value)) {
                            errors.push(`${field} must be a number`)
                            return
                        }
                        if (rules.min !== undefined && value < rules.min) {
                            errors.push(`${field} must be >= ${rules.min}`)
                            return
                        }
                        if (rules.max !== undefined && value > rules.max) {
                            errors.push(`${field} must be <= ${rules.max}`)
                            return
                        }
                        break
                    case 'boolean':
                        if (!isBoolean(value)) {
                            errors.push(`${field} must be a boolean`)
                            return
                        }
                        break
                    case 'array':
                        if (!isArray(value)) {
                            errors.push(`${field} must be an array`)
                            return
                        }
                        if (rules.itemsType) {
                            const invalidItem = value.find((item) => typeof item !== rules.itemsType)
                            if (invalidItem !== undefined) {
                                errors.push(`${field} must be an array of ${rules.itemsType}`)
                                return
                            }
                        }
                        break
                    default:
                        break
                }

                if (rules.enum && !rules.enum.includes(value)) {
                    errors.push(`${field} must be one of ${rules.enum.join(', ')}`)
                    return
                }
            }
        })

        if (errors.length > 0) {
            return errorResponse(res, 400, 'Validation failed', errors)
        }

        next()
    }
}

export const validateBody = (schema) => createValidator(schema, 'body')
export const validateQuery = (schema) => createValidator(schema, 'query')
export const validateParams = (schema) => createValidator(schema, 'params')
