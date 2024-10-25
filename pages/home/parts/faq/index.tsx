import React, { useState } from 'react'
import Text from "@/components/UI/Text/Text";
import Button from "@/components/UI/Button/Button";
import s from './styles.module.scss'
import Dropdown from '@/components/UI/Dropdown/Dropdown';

interface IFaqProps {
    dropdownArray: IDropdownArray[]
}

interface IDropdownArray {
    title: string;
    text: string;
}

const Faq: React.FC<IFaqProps> = ({dropdownArray}) => {

    const [dropdowns, setDropdowns] = useState<boolean[]>(dropdownArray.map(() => false))

    const onDropdownClick = (elIndex: number) => {
        setDropdowns(dropdowns.map((_el: boolean, index: number) => {
        if(index === elIndex){
            return !dropdowns[index]
        }
        return false;
        }))
    }

    return <div className={s.questions}>
        <div className={s.questions__title}>
            <Text size={'bigger'} type={'h2'}>Часто задаваемые вопросы</Text>
        </div>
        <div className={s.questions__dropdowns}>
            {dropdownArray.map((el, index: number)=>{
                return <Dropdown title={el.title}
                                open={dropdowns[index]}
                                onClick={()=>onDropdownClick(index)}
                                setDropdowns={setDropdowns}
                >{el.text}</Dropdown>
            })}
            <Button type={'link'} href={'/faq'} size={'bigger'}>Смотреть все</Button>
        </div>
    </div>
}

export default Faq