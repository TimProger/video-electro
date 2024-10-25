import React from 'react'
import Text from "@/components/UI/Text/Text";
import Button from "@/components/UI/Button/Button";
import s from './styles.module.scss'
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setHeader } from '@/store/Slices/Profile.slice';
import { animated, useTrail } from 'react-spring';
import Card from '@/components/Card/Card';
import welcome from "@/public/images/pages/main/welcome.jpg"

interface IMainProps {
  products: any[]
}

const Main: React.FC<IMainProps> = ({products}) => {

    const profile = useTypedSelector(state => state.profile)
    const dispatch = useAppDispatch()

    const trailProducts = useTrail(products.length, {
      from: { opacity: 0, transform: 'translate3d(0, 40px, 0)' },
      to: { opacity: 1, transform: 'translate3d(0, 0px, 0)' }
    });

    return <div className={s.main}>
        <div className={s.welcome} style={{backgroundImage: `url(${welcome.src})`}}>
            <Text bold={false} size={'bigger'} type={'h1'}>Время приобрести электрику <span>в <Text colored size={'bigger'} type={'span'}>Video-Electro</Text></span></Text>
            <Button className={'btn_'} onClick={() => {
                dispatch(setHeader(!profile.headerShow))
            }} size={'bigger'}>В каталог</Button>
        </div>
        <div className={s.catalog}>
            <div className={s.catalog__header}>
                <Text size={'bigger'} type={'h2'}>Каталог</Text>
            </div>
            <div className={s.catalog__cards}>
                {trailProducts.map((styles, index)=>{
                    return <animated.div  key={products[index].id} style={styles}>
                        <Card product={products[index]} />
                    </animated.div>
                })}
            </div>
        </div>
    </div>
}

export default Main