import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import {Select, SelectPropsType} from "../select/select";



type ControlledSelectProps<T extends FieldValues> = UseControllerProps<T> &
    Omit<SelectPropsType, 'value' | 'onValueChange'>

export const ControlledSelect = <T extends FieldValues>({
                                                            name,
                                                            control,
                                                            ...restProps
                                                        }: ControlledSelectProps<T>): JSX.Element => {
    const {
        field: { value, onChange },
    } = useController({
        name,
        control,
    })

    return <Select {...restProps} selectItems={value} onSelect={onChange} />
}