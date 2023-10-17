import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
    categoryName: z
        .string()
        .trim()
        .nonempty('Введите название категории')
        .min(3, 'Название категории должно быть больше 3 символов')
        .max(20, 'Название категории не должно быть больше 20 символов'),
})

type Form = z.infer<typeof schema>

export const useAddNewCategory = () => {
    return useForm<Form>({
        resolver: zodResolver(schema),
        defaultValues: { categoryName: ''},
        mode: 'onSubmit',
    })
}
