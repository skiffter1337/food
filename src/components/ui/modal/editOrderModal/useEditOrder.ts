import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {z} from 'zod'
import {useEffect} from "react";
import {MenuType} from "../../../menu/menu.slice";
import {ModalValuesType} from "./editOrderModal";


const schema = z.object({
    items: z.array(z.object({
        id: z.number(),
        name: z.string(),
        count: z.number({
            required_error: 'Введите количество',
            invalid_type_error: 'Введите число'
        }).positive('Значение должно быть положительным')
    })),
    comment: z.string(),
})

type Form = z.infer<typeof schema>

export const useEditOrder = (modalValues: ModalValuesType) => {
    const {handleSubmit, control, reset} = useForm<Form>({
        resolver: zodResolver(schema),
        defaultValues: {
            items: modalValues.items,
            comment: modalValues.comment
        },
        mode: 'onChange',

    })

    useEffect(() => {
        reset({
            items: modalValues.items,
            comment: modalValues.comment
        });
    }, [modalValues.items, modalValues.comment, reset]);

    return {
        handleSubmit,
        control,
        reset,
    };
};

