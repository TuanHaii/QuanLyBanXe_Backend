import { randomUUID } from 'crypto'

const now = () => new Date().toISOString()

export const users = [
    {
        id: 'admin-001',
        name: 'Admin Demo',
        email: 'admin@mock.com',
        password: '123456',
        phone: '0987654321',
        role: 'admin',
        avatar: null,
        token: 'mock-token-admin',
        preferences: {
            dark_mode: true,
            follow_system: true,
        },
        created_at: now(),
        updated_at: now(),
    },
]

export const mallProducts = [
    {
        id: 'mall-001',
        brand: 'Toyota',
        model: 'Camry',
        category: 'Xe mới',
        year: 2024,
        price: 1250000000,
        stock: 4,
        rating: 4.8,
        status: 'available',
        image_url: 'https://via.placeholder.com/300x180.png?text=Toyota+Camry',
        badge_label: 'Hot',
        badge_color: '#E0B54E',
        description: 'Xe sedan hạng D với tiện nghi cao cấp và vận hành êm ái.',
        created_at: now(),
        updated_at: now(),
    },
    {
        id: 'mall-002',
        brand: 'Honda',
        model: 'Civic',
        category: 'Xe cũ',
        year: 2023,
        price: 870000000,
        stock: 2,
        rating: 4.6,
        status: 'available',
        image_url: 'https://via.placeholder.com/300x180.png?text=Honda+Civic',
        badge_label: 'Giảm giá',
        badge_color: '#4EA0E0',
        description: 'Honda Civic nhập khẩu, thiết kế thời thượng và tiết kiệm nhiên liệu.',
        created_at: now(),
        updated_at: now(),
    },
    {
        id: 'mall-003',
        brand: 'Mercedes',
        model: 'C300',
        category: 'Xe sang',
        year: 2024,
        price: 2100000000,
        stock: 1,
        rating: 4.9,
        status: 'available',
        image_url: 'https://via.placeholder.com/300x180.png?text=Mercedes+C300',
        badge_label: 'Luxury',
        badge_color: '#8C6BE0',
        description: 'Xe sang trọng với nhiều trang bị an toàn và hệ thống giải trí cao cấp.',
        created_at: now(),
        updated_at: now(),
    },
]

export const sales = [
    {
        id: 'sale-001',
        car_name: 'Toyota Camry 2024',
        car_id: 'mall-001',
        customer_name: 'Nguyễn Văn A',
        customer_id: 'cust-001',
        customer_phone: '0912345678',
        customer_email: 'nguyenvana@example.com',
        sale_price: 1250000000,
        discount: 50000000,
        deposit: 200000000,
        sale_date: new Date().toISOString(),
        notes: 'Khách thanh toán trước 20%',
        status: 'completed',
        created_at: now(),
        updated_at: now(),
    },
    {
        id: 'sale-002',
        car_name: 'Honda Civic 2023',
        car_id: 'mall-002',
        customer_name: 'Trần Thị B',
        customer_id: 'cust-002',
        customer_phone: '0987766554',
        customer_email: 'tranthib@example.com',
        sale_price: 870000000,
        discount: 30000000,
        deposit: 150000000,
        sale_date: new Date(Date.now() - 86400000).toISOString(),
        notes: 'Khách yêu cầu giao xe sau 2 tuần',
        status: 'pending',
        created_at: now(),
        updated_at: now(),
    },
]

export const cars = [
    {
        id: 'car-001',
        name: 'Toyota Camry 2024',
        brand: 'Toyota',
        model: 'Camry',
        year: 2024,
        color: 'Đen',
        price: 1250000000,
        mileage: 0,
        description: 'Xe mới, chạy êm, trang bị đầy đủ.',
        fuel_type: 'Xăng',
        transmission: 'Tự động',
        images: [
            'https://via.placeholder.com/400x240.png?text=Toyota+Camry',
        ],
        status: 'available',
        created_at: now(),
        updated_at: now(),
    },
    {
        id: 'car-002',
        name: 'Honda Civic 2023',
        brand: 'Honda',
        model: 'Civic',
        year: 2023,
        color: 'Trắng',
        price: 870000000,
        mileage: 5000,
        description: 'Xe cũ nhập khẩu, bảo dưỡng định kỳ.',
        fuel_type: 'Xăng',
        transmission: 'Tự động',
        images: [
            'https://via.placeholder.com/400x240.png?text=Honda+Civic',
        ],
        status: 'available',
        created_at: now(),
        updated_at: now(),
    },
]

export const notifications = [
    {
        id: 'notif-001',
        category: 'Giao dịch',
        title: 'Giao dịch thành công',
        message: 'Toyota Camry 2024 đã được bán cho Nguyễn Văn A - 1.2 tỷ đồng',
        icon: 'success',
        is_read: false,
        created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    },
    {
        id: 'notif-002',
        category: 'Kho hàng',
        title: 'Cảnh báo tồn kho',
        message: 'Mercedes C200 chỉ còn 3 xe. Cần nhập thêm hàng ngay.',
        icon: 'warning',
        is_read: false,
        created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    {
        id: 'notif-003',
        category: 'Báo cáo',
        title: 'Báo cáo tuần',
        message: 'Báo cáo doanh thu tuần này đã sẵn sàng. Tổng doanh thu $4.2M, tăng 14%.',
        icon: 'report',
        is_read: true,
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'notif-004',
        category: 'Khuyến mãi',
        title: 'Chương trình khuyến mãi',
        message: 'Giảm 5% cho tất cả xe Mazda trong tháng này. Cập nhật giá ngay.',
        icon: 'offer',
        is_read: true,
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'notif-005',
        category: 'Khách hàng',
        title: 'Khách hàng mới',
        message: 'Lê Văn C đã đăng ký tư vấn cho BMW X3 2024.',
        icon: 'customer',
        is_read: true,
        created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'notif-006',
        category: 'Phân tích',
        title: 'Phân tích thị trường',
        message: 'Xu hướng xe điện tăng 35% trong quý này. Xem báo cáo đầy đủ.',
        icon: 'analytics',
        is_read: true,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'notif-007',
        category: 'Hệ thống',
        title: 'Cập nhật hệ thống',
        message: 'Hệ thống sẽ bảo trì vào 23:00 tối nay. Thời gian bảo trì 1 giờ.',
        icon: 'system',
        is_read: true,
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
]

export const dashboardSummary = {
    totalCars: 1248,
    carsSold: 412,
    inStock: 836,
    totalRevenue: 4200000,
    revenueTrend: '+14%',
    totalRevenueLabel: '$4.2M',
    salesTrend: '+8.2%',
}

export const dashboardTransactions = [
    {
        id: 'tx-001',
        customer_name: 'Nguyễn Văn A',
        car_name: 'Toyota Camry 2024',
        amount: '1.2 tỷ',
        time_ago: '2 giờ trước',
        status: 'completed',
    },
    {
        id: 'tx-002',
        customer_name: 'Trần Thị B',
        car_name: 'Honda CR-V 2024',
        amount: '990 triệu',
        time_ago: '5 giờ trước',
        status: 'completed',
    },
    {
        id: 'tx-003',
        customer_name: 'Lê Văn C',
        car_name: 'Mazda CX-5 2024',
        amount: '880 triệu',
        time_ago: 'Hôm qua',
        status: 'pending',
    },
]

export const findUserByEmail = (email) => {
    return users.find((user) => user.email.toLowerCase() === email.toLowerCase())
}

export const findUserByToken = (token) => {
    return users.find((user) => user.token === token)
}

export const createUser = ({ name, email, password, phone }) => {
    const id = randomUUID()
    const token = `token-${id}`
    const newUser = {
        id,
        name,
        email: email.toLowerCase(),
        password,
        phone,
        role: 'user',
        avatar: null,
        preferences: {
            dark_mode: true,
            follow_system: true,
        },
        token,
        created_at: now(),
        updated_at: now(),
    }
    users.push(newUser)
    return newUser
}

export const updateUser = (user, updates) => {
    const allowed = ['name', 'phone', 'avatar', 'preferences']
    Object.keys(updates).forEach((key) => {
        if (allowed.includes(key) && updates[key] !== undefined) {
            user[key] = updates[key]
        }
    })
    user.updated_at = now()
    return user
}

export const findNotificationById = (id) => {
    return notifications.find((notification) => notification.id === id)
}

export const markNotificationRead = (id) => {
    const notification = findNotificationById(id)
    if (!notification) {
        return null
    }
    notification.is_read = true
    return notification
}

export const generateToken = (user) => {
    if (!user.token) {
        user.token = `token-${user.id}`
    }
    return user.token
}
