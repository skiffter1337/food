import { NavLink } from 'react-router-dom'

import { Error404Image } from '../../images/icons/error404/error404Image'

import s from './error404.module.scss'
import {Typography} from "../ui/typography/typography";
import {Button} from "../ui/button/button";
export const Error404 = () => {
    return (
        <div className={s.container}>
            <Error404Image className={s.image} />
            <Typography variant={'body1'} className={s.text}>
                Sorry! Page not found!
            </Typography>
            <Button variant={'primary'} as={NavLink} to={'/'}>
                <Typography variant={'subtitle2'} className={s.button_text}>
                    Back to home page
                </Typography>
            </Button>
        </div>
    )
}