import {instance} from "../../common/api/common.api";

export const menuApi = {
    getMenu() {
        return instance.get('/menu')
    },
    deleteItem(id: number) {
        return instance.delete('/menu/' + id)
    }
}