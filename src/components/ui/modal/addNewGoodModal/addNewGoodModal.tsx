import React, {FC, ReactNode, useEffect, useState} from 'react';
import {Modal} from "../modal";
import {Typography} from "../../typography/typography";
import {Button} from "../../button/button";
import {ControlledInput} from "../../controlled/controlledInput";
import {useAddNewGood} from "./useAddNewGood";
import s from './addNewGoodModal.module.scss'
import {Select} from "../../select/select";
import {useAppSelector} from "../../../../hooks/useAppSelector";
import {selectCategories} from "../../../menu/menuList/categories/categories.selector";
import {useActions} from "../../../../hooks/useActions";
import {menuThunks} from "../../../menu/menu.slice";
import {login} from "../../../auth/auth.slice";

type AddNewGoodModal = {
    width: 'wide' | 'narrow'
    trigger: ReactNode
}
export const AddNewGoodModal: FC<AddNewGoodModal> = ({width, trigger}) => {
    const categories = useAppSelector(selectCategories)
    const mappedCategories = categories.map((cat, index) => ({id: index, value: cat.id, title: cat.categoryName, disabled: false}))

    const { handleSubmit, control, reset } = useAddNewGood()
    const {addItem} = useActions(menuThunks)

    const [categoryId, setCategoryId] = useState(categories[0]?.id)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setCategoryId(categories[0]?.id)
    }, [categories])
    const onOpenChange = () => setIsOpen(!isOpen)

    const onSubmit = handleSubmit(data => {
        addItem({...data, categoryId})
        reset()
        setIsOpen(false)
    })
    return (
        <Modal.Root
            width={width}
            title={'Добавить новый товар'}
            trigger={trigger}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <form onSubmit={onSubmit}>
                <Modal.Body>
                    <Select
                        label={'Категория'}
                        selectItems={mappedCategories}
                        onSelect={(value) => setCategoryId(+value)}
                        size={'large'}
                        isFullWidth={true}/>
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
                        <Typography variant={'subtitle2'} className={s.text_color_white}>
                            Добавить
                        </Typography>
                    </Button>
                    <Button variant={'secondary'} onClick={() => setIsOpen(false)}>
                        <Typography variant={'subtitle2'} className={s.text_color_white}>
                            Отмена
                        </Typography>
                    </Button>
                </Modal.Footer>
            </form>
        </Modal.Root>
    );
};
