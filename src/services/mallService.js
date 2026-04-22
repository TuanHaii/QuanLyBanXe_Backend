import { mallProducts } from './dataStore.js'

export const getMallProducts = ({ category, query }) => {
    let products = [...mallProducts]

    if (category) {
        products = products.filter((product) =>
            product.category.toLowerCase().includes(category.toLowerCase()),
        )
    }

    if (query) {
        const normalized = query.toLowerCase()
        products = products.filter((product) =>
            product.brand.toLowerCase().includes(normalized) ||
            product.model.toLowerCase().includes(normalized) ||
            product.description?.toLowerCase().includes(normalized) ||
            product.category.toLowerCase().includes(normalized),
        )
    }

    return products
}
