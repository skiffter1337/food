import React from 'react';
import s from './main.module.scss'
import {Typography} from "../ui/typography/typography";

export const Main = () => {
    return (
        <>
            <Typography variant={'h2'} className={s.text_color_white}>
                Hello
            </Typography>
        </>
    );
};

