import {zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z
    .object({
        email: z.string().trim().email('Invalid email').nonempty('Enter email'),
        password: z
            .string()
            .trim()
            .nonempty('Enter password')
            .min(3, 'Password must be at least 3 symbols')
            .max(30, 'Max password length is 30 symbols'),
        confirmPassword: z.string().trim(),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'The passwords did not match',
        path: ['confirmPassword'],
    })

type Form = z.infer<typeof schema>

export const useSignUpFrom = () => {
    return useForm<Form>({
        resolver: zodResolver(schema),
        defaultValues: { email: '', password: '', confirmPassword: '' },
        mode: 'onSubmit',
    })
}