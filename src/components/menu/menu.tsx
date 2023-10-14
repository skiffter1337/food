import React, {useEffect, useState} from 'react';
import s from './menu.module.scss'
import {MenuPanel} from "./menuPanel/menuPanel";
import {MenuList} from "./menuList/menuList";
import {useActions} from "../../hooks/useActions";
import {menuThunks} from "./menu.slice";
import {selectIsLoggedIn} from "../auth/auth.selector";
import {useAppSelector} from "../../hooks/useAppSelector";
import {selectMenu} from "./menu.selectors";
import {categoriesThunks} from "./menuList/categories/categories.slice";
import {selectCategories} from "./menuList/categories/categories.selector";

export const Menu = () => {

    const [currentCategoryId, setCurrentCategoryId] = useState(0)


    const menu = useAppSelector(selectMenu)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const {getMenu} = useActions(menuThunks)
    const {getCategories} = useActions(categoriesThunks)

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        getCategories({})
        getMenu({})
    }, []);

    return (
        <div className={s.menu}>
            <MenuPanel setCurrentCategoryId={setCurrentCategoryId} currentCategoryId={currentCategoryId}/>
            <MenuList menu={menu} currentCategoryId={currentCategoryId}/>
        </div>
    );
};
