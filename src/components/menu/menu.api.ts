import {instance} from "../../common/api/common.api";

export const menuApi = {
    getMenu() {
        return instance.get('/menu')
    },
    addItem(item: any) {
        return instance.post('/menu', item)
    },
    deleteItem(id: number) {
        return instance.delete('/menu/' + id)
    }
}