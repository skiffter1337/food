import React, {FC, ReactNode} from 'react';
import {Typography} from "../typography/typography";
import s from './noItems.module.scss'

type NoItems = {
    children: ReactNode
}
export const NoItems: FC<NoItems> = ({children}) => {
    return (
        <Typography variant={'h2'} className={s.no_goods}>
            {children}
        </Typography>
    );
};
