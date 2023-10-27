import React, {FC} from 'react';
import s from './deleteButton.module.scss'
import {TrashOutlined} from "../../../images/icons/trashOutlined/trashOutlined";

type DeleteButtonPropsType = {
    callback: () => void
}
export const DeleteButton: FC<DeleteButtonPropsType> = ({callback}) => {
    return (
        <div onClick={callback} className={s.delete_good}>
            <TrashOutlined/>
        </div>
    );
};
