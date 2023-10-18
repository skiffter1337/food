import React, {FC} from 'react';
import s from './menuList.module.scss'
import {Button} from "../../ui/button/button";
import {Typography} from "../../ui/typography/typography";
import {menuThunks, MenuType} from "../menu.slice";
import {useActions} from "../../../hooks/useActions";
import {TrashOutlined} from "../../../images/icons/trashOutlined/trashOutlined";
import {NoItems} from "../../ui/noItems/noItems";

export type MenuListType = {
    menu: MenuType[]
    currentCategoryId: number
    searchText: string
}

export const MenuList: FC<MenuListType> = ({menu, currentCategoryId, searchText}) => {

    const {deleteItem} = useActions(menuThunks)

    const filteredMenu = menu.filter((good) => {
        if (currentCategoryId === 0 || good?.categoryId === currentCategoryId) {
            if (searchText) {
                return good.name.toLowerCase().includes(searchText.toLowerCase())
            }
            return true
        }
        return false
    })

    const mappedMenu = filteredMenu.map(good => {
        return (
            <div key={good.id} className={s.good}>
                <div className={s.header}>
                    <div>
                        <Typography variant={'h3'}>
                            {good.name}
                        </Typography>
                    </div>
                    <div onClick={() => deleteItem(good.id)} className={s.delete_good}>
                        <TrashOutlined/>
                    </div>
                </div>
                <div className={s.body}>
                    <Typography variant={'subtitle2'}>
                        Цена: {good.price} руб.
                    </Typography>
                    <Typography variant={'subtitle2'}>
                        Кол-во: {`${good.weight} гр.`}
                    </Typography>
                    <Typography variant={'subtitle2'}>
                        Описание: {good.description ?? '-'}
                    </Typography>
                </div>
                <div className={s.buttons}>
                    <Button variant={'secondary'}>
                        <Typography variant={'subtitle2'}>
                            В стоп лист
                        </Typography>
                    </Button>
                    <Button variant={'primary'}>
                        <Typography variant={'subtitle2'}>
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
