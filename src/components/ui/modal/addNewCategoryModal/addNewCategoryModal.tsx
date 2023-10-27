import React, {FC, ReactNode, useState} from 'react';
import {Modal} from '../modal';
import s from './addNewCategoryModal.module.scss'
import {ControlledInput} from "../../controlled/controlledInput";
import {Button} from "../../button/button";
import {Typography} from "../../typography/typography";
import {useAddNewCategory} from "./useAddNewCategory";
import {useActions} from "../../../../hooks/useActions";
import {categoriesThunks} from "../../../menu/menuList/categories/categories.slice";

type AddNewCategoryModalType = {
    width: 'narrow' | 'wide'
    trigger: ReactNode
}
export const AddNewCategoryModal: FC<AddNewCategoryModalType> = ({width, trigger}) => {
    const [isOpen, setIsOpen] = useState(false)

    const {addCategory} = useActions(categoriesThunks)
    const onOpenChange = () => setIsOpen(!isOpen)

    const { handleSubmit, control, reset } = useAddNewCategory()

    const onSubmit = handleSubmit(data => {
        addCategory(data.categoryName)
        reset()
        setIsOpen(false)
    })

    return (
        <Modal.Root
            width={width}
            title={'Добавить новую категорию'}
            trigger={trigger}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
        >
            <form onSubmit={onSubmit}>
                <Modal.Body>
                    <ControlledInput
                        id="categoryName"
                        label="Навзание категории"
                        control={control}
                        name="categoryName"
                        placeholder={'Название'}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'primary'} type={'submit'}>
                        <Typography variant={'subtitle2'}>
                            Добавить
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
