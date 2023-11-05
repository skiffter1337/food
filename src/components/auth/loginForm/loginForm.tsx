import {useNavigate} from 'react-router-dom'
import s from './loginForm.module.scss'
import {Typography} from "../../ui/typography/typography";
import {Button} from '../../ui/button/button';
import {useLoginForm} from "./useLoginForm";
import {ControlledInput} from "../../ui/controlled/controlledInput";
import {useActions} from "../../../hooks/useActions";
import {authThunks} from "../auth.slice";
import {Card} from "../../ui/card/card";


export const LoginForm = () => {
    const navigate = useNavigate()
    const {login} = useActions(authThunks)
    const {handleSubmit, control} = useLoginForm()

    const onSubmit = handleSubmit(async data => {
        await login(data)
        navigate('/')
    })

    return (
        <>
            <Card className={s.card}>
                <Typography variant={'large'} className={s.title}>
                    Авторизация
                </Typography>

                <form onSubmit={onSubmit}>
                    <ControlledInput
                        id="login"
                        label="Логин"
                        control={control}
                        name={'login'}
                        className={s.text_field}
                    />
                    <ControlledInput
                        id={'password'}
                        label={'Пароль'}
                        type={'password'}
                        control={control}
                        name={'password'}
                        className={s.text_field}
                    />
                    <Button type={'submit'} fullWidth={true} className={s.submit_button}>
                        <Typography variant={'subtitle2'} className={s.submit_button_text}>
                            Войти
                        </Typography>
                    </Button>
                    <Typography variant={'body2'} className={s.dont_have_account}>
                        {`Нет аккаунта?`}
                    </Typography>
                    {/*<div className={s.sign_up_button_container}>*/}
                    {/*    <Button variant={'link'} as={NavLink} to={'/signUp'}>*/}
                    {/*        <Typography variant={'subtitle1'} className={s.sign_up_button_text}>*/}
                    {/*            Регистрация*/}
                    {/*        </Typography>*/}
                    {/*    </Button>*/}
                    {/*</div>*/}
                </form>
            </Card>
        </>
    )
}