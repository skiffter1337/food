import React, {FC, ReactNode} from 'react';
import s from './IconButton.module.scss'

type IconButtonPropsType = {
    callback?: () => void
    children?: ReactNode
}
export const IconButton: FC<IconButtonPropsType> = ({callback, children}) => {
    return (
        <div onClick={callback} className={s.button}>
            {children}
        </div>
    );
};
