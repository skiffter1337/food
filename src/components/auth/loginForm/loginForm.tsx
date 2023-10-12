import {NavLink, useNavigate} from 'react-router-dom'
import s from './loginForm.module.scss'
import {Typography} from "../../ui/typography/typography";
import {Button} from '../../ui/button/button';
import {Card} from "../../ui/card/card";
import {useLoginForm} from "./useLoginForm";
import {ControlledInput} from "../../ui/controlled/controlledInput";
import {useActions} from "../../../hooks/useActions";
import {authThunks} from "../auth.slice";


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
                    Sign In
                </Typography>

                <form onSubmit={onSubmit}>
                    <ControlledInput
                        id="login"
                        label="Login"
                        control={control}
                        name={'login'}
                        className={s.text_field}
                    />
                    <ControlledInput
                        id={'password'}
                        label={'Password'}
                        type={'password'}
                        control={control}
                        name={'password'}
                        className={s.text_field}
                    />
                    <Button type={'submit'} fullWidth={true} className={s.submit_button}>
                        <Typography variant={'subtitle2'} className={s.submit_button_text}>
                            Sign in
                        </Typography>
                    </Button>
                    <Typography variant={'body2'} className={s.dont_have_account}>
                        {`Don't have an account?`}
                    </Typography>
                    <div className={s.sign_up_button_container}>
                        <Button variant={'link'} as={NavLink} to={'/signUp'}>
                            <Typography variant={'subtitle1'} className={s.sign_up_button_text}>
                                Sign up
                            </Typography>
                        </Button>
                    </div>
                </form>
            </Card>
        </>
    )
}