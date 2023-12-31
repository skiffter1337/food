import React, {useEffect, useState} from 'react';
import s from './menu.module.scss'
import {MenuPanel} from "./menuPanel/menuPanel";
import {MenuList} from "./menuList/menuList";
import {useActions} from "../../hooks/useActions";
import {menuThunks} from "./menu.slice";
import {useAppSelector} from "../../hooks/useAppSelector";
import {selectMenu} from "./menu.selectors";
import {categoriesThunks} from "./menuList/categories/categories.slice";
import {selectIsLoading} from "../../app/app.selector";
import CircularProgress from "@mui/material/CircularProgress";
import {selectCategories} from "./menuList/categories/categories.selector";

export const Menu = () => {
    const isLoading = useAppSelector(selectIsLoading)
    const [currentCategoryId, setCurrentCategoryId] = useState(0)
    const [searchText, setSearchText] = useState('');
    const menu = useAppSelector(selectMenu)
    const {getMenu} = useActions(menuThunks)
    const {getCategories} = useActions(categoriesThunks)
    const categories = useAppSelector(selectCategories)

    useEffect(() => {
        getCategories({})
        getMenu({})
    }, []);

    return (
        <>
            {isLoading ? <CircularProgress color="secondary" /> :
                <div className={s.menu}>
                    <MenuPanel
                        categories={categories}
                        setCurrentCategoryId={setCurrentCategoryId}
                        currentCategoryId={currentCategoryId}
                        setSearchText={setSearchText}
                        searchText={searchText}
                    />
                    <MenuList menu={menu} currentCategoryId={currentCategoryId} searchText={searchText}/>
                </div>
            }
        </>
    );
};
