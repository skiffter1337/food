import React, {FC, MouseEventHandler, ReactNode, useEffect, useState} from 'react';
import {Modal} from "../modal";
import {Typography} from "../../typography/typography";
import {Button} from "../../button/button";
import {ControlledInput} from "../../controlled/controlledInput";
import {useEditOrder} from "./useEditOrder";
import {OrdersResponseType} from "../../../orders/order.api";
import s from './editOrderModal.module.scss'
import {Select, SelectItemsType} from "../../select/select";
import {useAppSelector} from "../../../../hooks/useAppSelector";
import {selectMenu} from "../../../menu/menu.selectors";
import {useActions} from "../../../../hooks/useActions";
import {orderThunks} from "../../../orders/orders.slice";
import {useFieldArray} from "react-hook-form";
import {MenuType} from "../../../menu/menu.slice";

type EditOrderModalPropsType = {
    width: 'wide' | 'narrow'
    trigger: ReactNode
    order: OrdersResponseType
}

export type ModalValuesType = {
    items: MenuType[]
    comment: string
}
export const EditOrderModal: FC<EditOrderModalPropsType> = ({width, trigger, order}) => {

    const menu = useAppSelector(selectMenu)
    const [selectedMenuItemId, setSelectedMenuItemId] = useState<number | null>(null)
    const [modalValues, setModalValues] = useState<ModalValuesType>({} as ModalValuesType)
    const [orderName, setOrderName] = useState('')

    useEffect(() => {
        setModalValues({items: order.items, comment: order.comment})
        setOrderName(orderName)
    }, []);
    const {changeOrder} = useActions(orderThunks)
    const [isOpen, setIsOpen] = useState(false)

    const {handleSubmit, control, reset} = useEditOrder(modalValues)
    const { fields, append, remove } = useFieldArray({name: 'items', control});

    const addItemToOrder: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault()
        setSelectedMenuItemId(null)
        const newItem = menu.find(item => item.id === selectedMenuItemId)
        append({id: newItem!.id, name: newItem!.name, count: 1})
    }
    console.log(fields)
    const deleteItemFromOrder = (id: number) => {
        remove(id)
    }

    const onSubmit = handleSubmit(data => {
        console.log(data)
        // const modalValuesCopy = {...modalValues}
        // modalValuesCopy.items = modalValuesCopy.items.map((item, index) => ({
        //     ...item,
        //     count: data.count[index],
        // }))
      changeOrder({...order, items: order.items.flatMap((item, index) => ({...item, count: data.items[index].count})), comment: data.comment})
        setIsOpen(false)
    })
    const mappedMenu: SelectItemsType[] = [{
        id: 0,
        value: 0,
        title: 'Выберете товар',
        disabled: true
    },...menu.map(item => ({
        id: item.id,
        value: item.id,
        title: item.name,
        disabled: item.isEmpty || modalValues.items?.some(el => el.id === item.id)
    }))]

    const onOpenChange = () => setIsOpen(!isOpen)


    const mappedItems = fields.map((item, index) => {

        return (
            <div key={item.id} className={s.item}>
                <ControlledInput
                    className={s.field}
                    id={`items.${index}`}
                    label={item.name}
                    control={control}
                    type='number'
                    name={`items.${index}.count`}
                    placeholder={'Количество'}
                />
                <div className={s.delete}>
                    <Button fullWidth as={'div'} onClick={() => deleteItemFromOrder(item.id)}>
                        <Typography variant={'subtitle2'}>
                            Удалить
                        </Typography>
                    </Button>
                </div>
            </div>
        )
    })
    return (
        <Modal.Root
            width={width}
            title={`Отредактировать заказ № ${orderName}`}
            trigger={trigger}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <form onSubmit={onSubmit}>
                <Modal.Body>
                    {mappedItems}
                    <Select onSelect={(value) => setSelectedMenuItemId(+value)} selectItems={mappedMenu} size='large' placeholder='test' defaultValue={`${0}`}/>
                    <Button onClick={addItemToOrder} disabled={!selectedMenuItemId}>
                        <Typography variant={'subtitle2'}>
                            Добавить
                        </Typography>
                    </Button>
                    <ControlledInput
                        id="comment"
                        label="Комментарий"
                        control={control}
                        name="comment"
                        placeholder={'Комментарий'}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'primary'} type={'submit'}>
                        <Typography variant={'subtitle2'}>
                            Изменить
                        </Typography>
                    </Button>
                    <Button variant={'secondary'} onClick={() => setIsOpen(false)}>
                        <Typography variant={'subtitle2'}>
                            Отмена
                        </Typography>
                    </Button>
                </Modal.Footer>
            </form>
        </Modal.Root>
    );
};
