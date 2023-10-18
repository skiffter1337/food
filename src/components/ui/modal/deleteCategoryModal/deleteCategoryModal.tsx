import React, {FC, ReactNode, useState} from 'react';
import {Modal} from "../modal";
import {ControlledInput} from "../../controlled/controlledInput";
import {Button} from "../../button/button";
import {Typography} from "../../typography/typography";
import s from './deleteCategoryModal.module.scss'
import {useActions} from "../../../../hooks/useActions";
import {categoriesThunks} from "../../../menu/menuList/categories/categories.slice";

type DeleteCategoryModalType = {
    width: 'wide' | 'narrow'
    trigger: ReactNode
    currentCategoryName: string
    currentCategoryId: number
}
export const DeleteCategoryModal: FC<DeleteCategoryModalType> = ({width, trigger, currentCategoryName, currentCategoryId}) => {

    const [isOpen, setIsOpen] = useState(false)

    const {deleteCategory} = useActions(categoriesThunks)
    const onOpenChange = () => setIsOpen(!isOpen)

    const deleteCategoryHandler = () => {
        deleteCategory(currentCategoryId)
        setIsOpen(false)
    }
    return (
        <Modal.Root
            width={width}
            trigger={trigger}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isSeparator={false}
        >
                <Modal.Body>
                    <Typography variant={'h2'} className={s.modal_text}>
                        {`Удалить категорию ${currentCategoryName} и всё её содержимое?`}
                    </Typography>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={'primary'} type={'submit'} onClick={deleteCategoryHandler}>
                        <Typography variant={'subtitle2'}>
                            Удалить
                        </Typography>
                    </Button>
                    <Button variant={'secondary'} onClick={() => setIsOpen(false)}>
                        <Typography variant={'subtitle2'}>
                            Отмена
                        </Typography>
                    </Button>
                </Modal.Footer>
        </Modal.Root>
    );
};
