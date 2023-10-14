import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import {Input, InputPropsType} from "../input/input";



type ControlledInputPropsType<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'rules' | 'defaultValue'
> &
  Omit<InputPropsType, 'onChange' | 'value' | 'ref'>
export const ControlledInput = <T extends FieldValues>({
  control,
  name,
  ...rest
}: ControlledInputPropsType<T>) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  return (
    <Input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      {...rest}
      errorMessage={error?.message}
    />
  )
}
