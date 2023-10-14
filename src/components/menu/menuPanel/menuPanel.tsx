import React, {FC} from 'react';
import s from './menuPanel.module.scss'
import {Button} from "../../ui/button/button";
import {Typography} from "../../ui/typography/typography";
import {Input} from "../../ui/input/input";
import {TabSwitcher} from "../../ui/tabSwitcher/tabSwitcher";
import {Cart} from "../../../images/icons/cart/cart";
import {NoItems} from "../../ui/noItems/noItems";
import {AddNewCategoryModal} from "../../ui/modal/addNewCategoryModal/addNewCategoryModal";
import {DeleteCategoryModal} from "../../ui/modal/deleteCategoryModal/deleteCategoryModal";
import {useAppSelector} from "../../../hooks/useAppSelector";
import {selectCategories} from "../menuList/categories/categories.selector";

type MenuPanelPropsType = {
    setCurrentCategoryId: (id: number) => void
    currentCategoryId: number
}
export const MenuPanel: FC<MenuPanelPropsType> = ({setCurrentCategoryId, currentCategoryId}) => {


    const categories = useAppSelector(selectCategories)
    const currentCategoryName = '123' // TODO fix error, добавить id в табы, а value сделать именем категории

    const tabs = categories.length > 0 && [{
        value: '0',
        title: 'Все',
        disabled: false
    }, ...categories.map(el => ({
        key: el.id,
        value: `${el.id}`,
        title: el.categoryName,
        disabled: false
    }))]

    return (
        <div className={s.menu}>
            <div className={s.manage_categories_buttons}>
                <Input placeholder={'Поиск'} search={true}/>
                <AddNewCategoryModal
                    width={'narrow'}
                    trigger={<Button variant={'secondary'}>
                        <Typography variant={'subtitle2'} className={s.text_color_white}>
                            Добавить категорию
                        </Typography>
                    </Button>
                    }/>
                <DeleteCategoryModal
                    width={'narrow'}
                    trigger={<Button variant={'secondary'} disabled={!tabs}>
                        <Typography variant={'subtitle2'} className={s.text_color_white}>
                            Удалить категорию
                        </Typography>
                    </Button>}
                    currentCategoryName={currentCategoryName}
                    currentCategoryId={currentCategoryId}
                />
                <Button variant={'secondary'}>
                    <Cart color={'var(--color-light-100)'}/>
                    <Typography variant={'subtitle2'} className={s.text_color_white}>
                        Заказ
                    </Typography>
                </Button>
            </div>
            {tabs ?
                <TabSwitcher tabs={tabs} defaultValue={'0'} callback={(value) => setCurrentCategoryId(parseInt(value))}/>
                :
                <NoItems>
                    Нет категорий
                </NoItems>
            }
        </div>
    );
};

