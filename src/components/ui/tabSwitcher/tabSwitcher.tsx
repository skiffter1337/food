import { FC } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import s from './tabSwitcher.module.scss'
import {Typography} from "../typography/typography";

export type TabsType = {
  value: string
  title: string
  disabled?: boolean
}

type TabSwitcherPropsType = {
  label?: string
  tabs: TabsType[]
  defaultValue: string
  callback: (value: string) => void
}

export const TabSwitcher: FC<TabSwitcherPropsType> = ({
  tabs,
  label,
  defaultValue,
  callback,
}) => {
  return (
    <>
      <Typography variant={'body2'} className={s.label}>
        {label}
      </Typography>
      <Tabs.Root className={s.root} defaultValue={defaultValue} onValueChange={(value) => callback(value)}>
        <Tabs.List className={s.list}>
          {tabs.map(tab => (
            <Tabs.Trigger
              key={tab.value}
              className={s.trigger}
              value={tab.value}
              disabled={tab.disabled}
            >
              <Typography as={'label'} variant={'body1'} className={s.trigger_text}>
                {tab.title}
              </Typography>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
    </>
  )
}
