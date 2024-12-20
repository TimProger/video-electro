import React, {useEffect} from "react";
import Container from '@/components/UI/Container/Container';
import s from './styles.module.scss'
import Text from "@/components/UI/Text/Text";
import {useTypedSelector} from "@/hooks/useTypedSelector";
import Card from "@/components/Card/Card";
import Button from "@/components/UI/Button/Button";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {setFavsProducts} from "@/store/Slices/Favs.slice";
import {animated, useTrail} from "react-spring";
import { setHeader } from '@/store/Slices/Profile.slice';

interface IFavsProps {
}

const Favs: React.FC<IFavsProps> = () => {

  const dispatch = useAppDispatch()
  const { products } = useTypedSelector(state => state.favs)

  const trailProducts = useTrail(products.length, {
    from: { opacity: 0, transform: 'translate3d(0, 40px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0px, 0)' },
  });

  const onClear = () => {
    dispatch(setFavsProducts([]))
  }

  useEffect(()=>{
  }, [])

  const profile = useTypedSelector(state => state.profile)

  return (
    <Container>
      <div className={s.favs}>
        <div className={s.container}>
          <div className={s.container__header}>
            <Text size={'bigger'} type={'h1'}>Избранное</Text>
            {products.length > 0 && <Button onClick={onClear}
                                            style={'borderless'}
                                            size={'medium'}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4 4L16 16M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                  stroke="#898989" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Удалить все</Button>}
          </div>
          <div className={s.container__cards}>
            {trailProducts.length > 0 ? trailProducts.map((styles, index)=>{
              return <animated.div className={s.container__cards__animated} key={products[index].id} style={styles}>
                <Card favs type={'long'} product={products[index]} />
              </animated.div>
            }) : <div className={s.container__noCards}>
              <Text size={'small'} type={'p'}>В избранном нет товаров</Text>
              <Button size={'medium'}
                      onClick={() => {
                        dispatch(setHeader(!profile.headerShow))
                      }}
              >В каталог</Button>
            </div>}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Favs