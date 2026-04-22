const contactRequests = []

export const getSupportItems = () => {
    return [
        {
            id: 'support-001',
            title: 'Trung tâm hỗ trợ',
            description: 'Xem câu hỏi thường gặp và hướng dẫn sử dụng.',
            type: 'support_center',
        },
        {
            id: 'support-002',
            title: 'Liên hệ chúng tôi',
            description: 'Gửi yêu cầu hỗ trợ hoặc tư vấn nhanh.',
            type: 'contact',
        },
        {
            id: 'support-003',
            title: 'Về ứng dụng',
            description: 'Thông tin phiên bản và chính sách.',
            type: 'about',
        },
    ]
}

export const submitSupportContact = ({ name, email, message }) => {
    const request = {
        id: `contact-${Date.now()}`,
        name,
        email,
        message,
        status: 'pending',
        created_at: new Date().toISOString(),
    }
    contactRequests.push(request)
    return request
}

export const getSupportContacts = ({ email, status } = {}) => {
    let results = [...contactRequests]
    if (email) {
        results = results.filter(
            (request) => request.email.toLowerCase() === email.toLowerCase(),
        )
    }
    if (status) {
        results = results.filter(
            (request) => request.status === status,
        )
    }
    return results
}

export const getSupportRequestById = (id) => {
    return contactRequests.find((request) => request.id === id)
}
