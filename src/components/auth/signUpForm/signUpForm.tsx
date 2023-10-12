import {NavLink, useNavigate} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import s from './signUpForm.module.scss'
import {Card} from "../../ui/card/card";
import {Typography} from "../../ui/typography/typography";
import {Button} from "../../ui/button/button";
import {ControlledInput} from "../../ui/controlled/controlledInput";
import {useSignUpFrom} from "./useSignUpFrom";


export const SignUpForm = () => {
    const navigate = useNavigate()


    const { handleSubmit, control } = useSignUpFrom()
    const onSubmit = handleSubmit(data => {
        const { email, password } = data

        // signUp({ email, password })
        //     .unwrap()
        //     .then(() => {
        //         navigate('/login')
        //         toast.success('You are successfully signed up!', toastSuccess)
        //     })
        //     .catch(error => {
        //         if (isBadRequestError(error)) {
        //             toast(error.data.errorMessages[0], toastError)
        //         }
        //     })
    })


    return (
        <>
            <Card className={s.card}>
                <Typography variant={'large'} className={s.title}>
                    Sign Up
                </Typography>

                <form onSubmit={onSubmit}>
                    <ControlledInput
                        id="email"
                        label="Email"
                        control={control}
                        name={'email'}
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
                    <ControlledInput
                        id={'confirmPassword'}
                        label={'Confirm password'}
                        type={'password'}
                        control={control}
                        name={'confirmPassword'}
                        className={s.text_field_last}
                    />
                    <Button type={'submit'} fullWidth={true} className={s.submit_button}>
                        <Typography variant={'subtitle2'} className={s.submit_button_text}>
                            Sign Up
                        </Typography>
                    </Button>
                    <Typography variant={'body2'} className={s.have_account}>
                        {'Already have an account?'}
                    </Typography>
                    <div className={s.sign_in_button_container}>
                        <Button variant={'link'} as={NavLink} to={'/login'}>
                            <Typography variant={'subtitle1'} className={s.sign_in_button_text}>
                                Sign in
                            </Typography>
                        </Button>
                    </div>
                </form>
            </Card>
        </>
    )
}