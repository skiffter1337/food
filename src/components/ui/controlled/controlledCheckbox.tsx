import { FieldValues, useController, UseControllerProps } from 'react-hook-form'
import {CheckboxItem, CheckBoxPropsType} from "../checkbox/checkbox";



type ControlledCheckboxPropsType<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'rules' | 'defaultValue'
> &
  Omit<CheckBoxPropsType, 'onChange' | 'value'>
export const ControlledCheckbox = <T extends FieldValues>({
  control,
  name,
  shouldUnregister,
  ...rest
}: ControlledCheckboxPropsType<T>) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    shouldUnregister,
  })
  const handleChange = onChange as (value: boolean) => void

  return <CheckboxItem checked={value} onChange={handleChange} {...rest} />
}
