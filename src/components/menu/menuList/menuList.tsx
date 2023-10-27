import React, {FC} from 'react';
import s from './menuList.module.scss'
import {menuThunks, MenuType} from "../menu.slice";
import {useActions} from "../../../hooks/useActions";
import {NoItems} from "../../ui/noItems/noItems";
import {MenuItem} from "./menuItem/menuItem";

export type MenuListType = {
    menu: MenuType[]
    currentCategoryId: number
    searchText: string
}

export const MenuList: FC<MenuListType> = ({menu, currentCategoryId, searchText}) => {

    const {deleteItem} = useActions(menuThunks)

    const filteredMenu = menu && menu.filter((good) => {
        if (currentCategoryId === 0 || good?.categoryId === currentCategoryId) {
            if (searchText) {
                return good.name.toLowerCase().includes(searchText.toLowerCase())
            }
            return true
        }
        return false
    })


    return (
        filteredMenu.length ?
            <div className={s.goods}>
                {filteredMenu.map(good => <MenuItem
                    good={good}
                    key={good.id}
                    id={good.id}
                    name={good.name}
                    price={good.price}
                    weight={good.weight}
                    description={good.description}
                    isEmpty={good.isEmpty}
                    deleteItem={deleteItem}
                />)}
            </div>
            :
            <NoItems>
                Нет позиций
            </NoItems>
    );
};
