import {instance} from "../../../../common/api/common.api";

export const categoriesApi = {
    getCategories() {
        return instance.get('/categories')
    },
    addCategory(data: {categoryName: string}) {
        return instance.post('/categories', data)
    },
    deleteCategory(id: number) {
        return instance.delete('/categories/' + id)
    }
}