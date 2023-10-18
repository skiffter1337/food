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
    const [searchText, setSearchText] = useState('');
    const menu = useAppSelector(selectMenu)
    const {getMenu} = useActions(menuThunks)
    const {getCategories} = useActions(categoriesThunks)

    useEffect(() => {
        getCategories({})
        getMenu({})
    }, []);
    return (
        <div className={s.menu}>
            <MenuPanel setCurrentCategoryId={setCurrentCategoryId} currentCategoryId={currentCategoryId} setSearchText={setSearchText} searchText={searchText}/>
            <MenuList menu={menu} currentCategoryId={currentCategoryId} searchText={searchText}/>
        </div>
    );
};
