import React from 'react';
import {Typography} from "../ui/typography/typography";
import s from './main.module.scss'
import {useAppSelector} from "../../hooks/useAppSelector";
import {selectIsLoggedIn} from "../auth/auth.selector";
import {useNavigate} from "react-router-dom";

export const Main = () => {
    const navigate = useNavigate()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    if(!isLoggedIn) navigate('/login')

    return (
        <div className={s.main}>
            <Typography variant={'h2'} className={s.hello}>
                {`Привет!`}
            </Typography>
        </div>
    );
};

