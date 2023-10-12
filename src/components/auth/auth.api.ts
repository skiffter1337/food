import {instance} from '../../common/api/common.api'

export const authApi = {
    login(data: LoginParamsType) {
        return instance.post('auth/login', data)
    }
}


export type LoginParamsType = {
    login: string
    password: string
}