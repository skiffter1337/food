import React, {FC} from 'react';
import s from './menuList.module.scss'
import {Button} from "../../ui/button/button";
import {Typography} from "../../ui/typography/typography";
import {menuThunks, MenuType} from "../menu.slice";
import {useActions} from "../../../hooks/useActions";
import {TrashOutlined} from "../../../images/icons/trashOutlined/trashOutlined";
import {NoItems} from "../../ui/noItems/noItems";
import {current} from "@reduxjs/toolkit";

export type MenuListType = {
    menu: MenuType[]
    currentCategoryId: number
}

export const MenuList: FC<MenuListType> = ({menu, currentCategoryId}) => {

    const {deleteItem} = useActions(menuThunks)

    const filteredMenu = menu.filter(good => currentCategoryId === 0 ? good : good.categoryId === currentCategoryId)

    const mappedMenu = filteredMenu.map(good => {
        return (
            <div key={good.id} className={s.good}>
                <div className={s.header}>
                    <div>
                        <Typography variant={'h3'} className={s.text_color_white}>
                            {good.name}
                        </Typography>
                    </div>
                    <div onClick={() => deleteItem(good.id)}>
                        <TrashOutlined/>
                    </div>
                </div>
                <div className={s.body}>
                    <Typography variant={'subtitle2'} className={s.text_color_white}>
                        Цена: {good.price} руб.
                    </Typography>
                    <Typography variant={'subtitle2'} className={s.text_color_white}>
                        Кол-во: {`${good.weight} гр.`}
                    </Typography>
                    <Typography variant={'subtitle2'} className={s.text_color_white}>
                        Описание: {good.description ?? '-'}
                    </Typography>
                </div>
                <div className={s.buttons}>
                    <Button variant={'secondary'}>
                        <Typography variant={'subtitle2'} className={s.text_color_white}>
                            В стоп лист
                        </Typography>
                    </Button>
                    <Button variant={'primary'}>
                        <Typography variant={'subtitle2'} className={s.text_color_white}>
                            В заказ
                        </Typography>
                    </Button>
                </div>
            </div>
        )
    })
    return (
        menu.length ?
            <div className={s.goods}>
                {mappedMenu}
            </div>
            :
            <NoItems>
                Нет позиций
            </NoItems>
    );
};
