import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
    login: z.string().trim().nonempty('Enter login'),
    password: z
        .string()
        .trim()
        .nonempty('Введите пароль')
        .min(3, 'Пароль должен быть больше 3 символов')
        .max(30, 'Максимальная длинна пароля 30 символов'),
    rememberMe: z.boolean().optional(),
})

type Form = z.infer<typeof schema>

export const useLoginForm = () => {
    return useForm<Form>({
        resolver: zodResolver(schema),
        defaultValues: { login: '', password: '', rememberMe: false },
        mode: 'onSubmit',
    })
}