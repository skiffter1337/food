import React, {FC, useState} from 'react';
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
import {AddNewGoodModal} from "../../ui/modal/addNewGoodModal/addNewGoodModal";
import {OrderPreview} from "../orderPreview/orderPreview";

type MenuPanelPropsType = {
    setCurrentCategoryId: (id: number) => void
    currentCategoryId: number
    setSearchText: (value: string) => void
    searchText: string
}
export const MenuPanel: FC<MenuPanelPropsType> = ({setCurrentCategoryId, currentCategoryId, setSearchText, searchText}) => {

    const categories = useAppSelector(selectCategories)
    const currentCategoryName = categories.filter(cat => cat.id === currentCategoryId)[0]?.categoryName

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
                <Input placeholder={'Поиск'} search={true} onChange={(value) => setSearchText(value as string)} value={searchText}/>
                <AddNewCategoryModal
                    width={'narrow'}
                    trigger={<Button variant={'secondary'}>
                        <Typography variant={'subtitle2'}>
                            Добавить категорию
                        </Typography>
                    </Button>
                    }/>
                <DeleteCategoryModal
                    width={'narrow'}
                    trigger={<Button variant={'secondary'} disabled={!tabs || currentCategoryId === 0}>
                        <Typography variant={'subtitle2'}>
                            Удалить категорию
                        </Typography>
                    </Button>}
                    currentCategoryName={currentCategoryName}
                    currentCategoryId={currentCategoryId}
                />
                <AddNewGoodModal
                    width={'wide'}
                    trigger={
                        <Button variant={'secondary'} disabled={categories.length === 0}>
                            <Typography variant={'subtitle2'}>
                                Добавить товар
                            </Typography>
                        </Button>
                    }
                />
                    <OrderPreview />
            </div>
            {tabs ?
                <TabSwitcher tabs={tabs} defaultValue={'0'}
                             callback={(value) => setCurrentCategoryId(parseInt(value))}/>
                :
                <NoItems>
                    Нет категорий
                </NoItems>
            }
        </div>
    );
};

