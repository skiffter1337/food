import React, {FC, ReactNode, useEffect, useState} from 'react';
import {Modal} from "../modal";
import {Typography} from "../../typography/typography";
import {Button} from "../../button/button";
import {ControlledInput} from "../../controlled/controlledInput";
import {EditGoodDefaultValuesType, useEditGood} from "./useEditGood";
import s from './addNewGoodModal.module.scss'
import {Select} from "../../select/select";
import {useAppSelector} from "../../../../hooks/useAppSelector";
import {selectCategories} from "../../../menu/menuList/categories/categories.selector";
import {useActions} from "../../../../hooks/useActions";
import {menuThunks, MenuType} from "../../../menu/menu.slice";
import {login} from "../../../auth/auth.slice";

type EditGoodModal = {
    width: 'wide' | 'narrow'
    trigger: ReactNode
    good: MenuType
}
export const EditGoodModal: FC<EditGoodModal> = ({width, trigger, good: {id, name, weight, price, description, isEmpty, categoryId }}) => {


    const {handleSubmit, control, reset} = useEditGood({name, weight, price, description})
    const {editItem} = useActions(menuThunks)

    const [isOpen, setIsOpen] = useState(false)

    const onOpenChange = () => setIsOpen(!isOpen)

    const onSubmit = handleSubmit(data => {
        editItem({...data, id, isEmpty, categoryId})
        reset()
        setIsOpen(false)
    })
    return (
        <Modal.Root
            width={width}
            title={'Отредактировать карточку товара'}
            trigger={trigger}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <form onSubmit={onSubmit}>
                <Modal.Body>
                    <ControlledInput
                        id="name"
                        label="Навзание товара"
                        control={control}
                        name="name"
                        placeholder={'Название'}
                    />
                    <ControlledInput
                        type='number'
                        id="price"
                        label="Цена товара в руб."
                        control={control}
                        name="price"
                        placeholder={'Цена'}
                    />
                    <ControlledInput
                        type='number'
                        id="weight"
                        label="Вес товара в гр."
                        control={control}
                        name="weight"
                        placeholder={'Вес'}
                    />
                    <ControlledInput
                        id="description"
                        label="Описание товара"
                        control={control}
                        name="description"
                        placeholder={'Описание'}
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
