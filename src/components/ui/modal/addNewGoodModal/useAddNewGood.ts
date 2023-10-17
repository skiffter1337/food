import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

const schema = z.object({
    name: z
        .string({required_error: 'Введите название товара'})
        .trim()
        .min(3, 'Название товара должно быть больше 3 символов')
        .max(20, 'Название товара не должно быть больше 20 символов'),
    price: z
        .number({required_error: 'Введите цену товара', invalid_type_error: 'Введите число'})
        .positive('Значение должно быть положительным'),
    weight: z
        .number({required_error: 'Введите вес товара', invalid_type_error: 'Введите число'})
        .positive('Значение должно быть положительным'),
    description: z.string({required_error: 'Введите описание товара'})
        .min(3, 'Описание товара должно быть больше 3 символов')
        .max(100, 'Описание товара не должно быть больше 100 символов'),


})

type Form = z.infer<typeof schema>

export const useAddNewGood = () => {
    return useForm<Form>({
        resolver: zodResolver(schema),
        defaultValues: {name: '', weight: 0, price: 0, description: ''},
        mode: 'onSubmit',
    })
}
