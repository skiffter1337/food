import {instance} from "../../common/api/common.api";
import {MenuType} from "./menu.slice";

export const menuApi = {
    getMenu() {
        return instance.get('/menu')
    },
    addItem(item: any) {
        return instance.post('/menu', item)
    },
    deleteItem(id: number) {
        return instance.delete('/menu/' + id)
    },
    changeItem(item: MenuType) {
        return instance.put('/menu/' + item.id, item)
    },
}