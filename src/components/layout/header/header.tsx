import LOGO from '../../../images/png_jpg/logo.jpg'
import s from './header.module.scss'
import {Button} from "../../ui/button/button";
import {Typography} from "../../ui/typography/typography";
import {NavLink, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsLoggedIn} from "../../auth/auth.selector";
import {useActions} from "../../../hooks/useActions";
import {authThunks} from "../../auth/auth.slice";


export const Header= () => {

    const navigate = useNavigate()
    const {logout} = useActions(authThunks)
    const handleLogout = async  () => {
        await logout({isLoggedIn: false})
        navigate('/login')
    }
    const isLoggedIn = useSelector(selectIsLoggedIn)

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
                                    Меню
                                </Typography>
                            </Button>
                            <Button variant={'link'} as={NavLink} to={'/orders'}>
                                <Typography variant={'h3'} className={s.button_text}>
                                    Заказы
                                </Typography>
                            </Button>
                            <Button variant="primary" onClick={handleLogout}>
                                <Typography variant={'subtitle2'} className={s.button_text}>
                                    Выйти
                                </Typography>
                            </Button>
                        </>
                        :
                        <Button variant="primary" as={NavLink} to={'/login'}>
                            <Typography variant={'subtitle2'} className={s.button_text}>
                                Войти
                            </Typography>
                        </Button>
                    }
                </div>
            </div>
        </div>
    )
}