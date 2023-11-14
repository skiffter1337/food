import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {useEffect} from "react";


const schema = z.object({
    count: z.array(z.number({
        required_error: 'Введите количество',
        invalid_type_error: 'Введите число'
    }).positive('Значение должно быть положительным')),
    comment: z.string(),
})

type Form = z.infer<typeof schema>

export const useEditOrder = (itemsCount: number[], comment: string) => {
    const { handleSubmit, control, reset } = useForm<Form>({
        resolver: zodResolver(schema),
        defaultValues: {
            count: itemsCount,
            comment,
        },
        mode: 'onSubmit',
    });

    useEffect(() => {
        reset({
            count: itemsCount,
            comment,
        });
    }, [itemsCount, comment, reset]);

    return {
        handleSubmit,
        control,
        reset,
    };
};

