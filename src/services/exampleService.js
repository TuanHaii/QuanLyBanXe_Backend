import { getExampleSchema } from '../models/exampleModel.js'

export const getExampleData = () => {
    return {
        example: true,
        name: 'BE_QLBX Example',
        config: getExampleSchema(),
    }
}
