import {FC} from 'react'
import LOGO from '../../../images/png_jpg/logo.jpg'
import s from './header.module.scss'
import {Button} from "../../ui/button/button";
import {Typography} from "../../ui/typography/typography";
import {NavLink} from "react-router-dom";


export type HeaderPropsType = {
    isLoggedIn?: boolean
    logout: () => void
}
export const Header: FC<HeaderPropsType> = ({logout, isLoggedIn}) => {
    const handleLogout = () => logout()

    return (
        <div className={s.header}>
            <div className={s.container}>
                <NavLink to={'/'}>
                    <img src={LOGO} className={s.logo}/>
                </NavLink>
                <div className={s.buttons}>
                    {isLoggedIn ?
                        <>
                            <Button variant={'link'} as={NavLink} to={'/menu'}>
                                <Typography variant={'h3'} className={s.button_text}>
                                    Menu
                                </Typography>
                            </Button>
                            <Button variant={'link'} as={NavLink} to={'/orders'}>
                                <Typography variant={'h3'} className={s.button_text}>
                                    Orders
                                </Typography>
                            </Button>
                            <Button variant="primary" as={NavLink} to={'/login'}>
                                <Typography variant={'subtitle2'} className={s.button_text}>
                                    Logout
                                </Typography>
                            </Button>
                        </>
                        :
                        <Button variant="primary" as={NavLink} to={'/login'}>
                            <Typography variant={'subtitle2'} className={s.button_text}>
                                Sign in
                            </Typography>
                        </Button>
                    }
                </div>
            </div>
        </div>
    )
}