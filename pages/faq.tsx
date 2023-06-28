import { GetStaticProps } from 'next'
import React, {useState} from "react";
import Layout from '@/components/Layout';
import Container from '@/components/UI/Container';
import Head from "next/head";
import s from '@/styles/pages/Faq.module.scss'
import Text from "@/components/UI/Text";
import Dropdown from "@/components/UI/Dropdown";

const Faq: React.FC = () => {

  interface IDropdownArray {
    title: string;
    text: string;
  }

  const dropdownArray: IDropdownArray[] = [
    {
      title: 'Как вы производите доставку?',
      text: 'Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».\n' +
        'Окно автосклейлиться относительно количетсва текста!!!'
    },
    {
      title: 'Есть ли у вас сертификаты и документация?',
      text: 'Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».\n' +
        'Окно автосклейлиться относительно количетсва текста!!!'
    },
    {
      title: 'Как долго производится доставка при оптовом заказе?',
      text: 'Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».\n' +
        'Окно автосклейлиться относительно количетсва текста!!!'
    },
    {
      title: 'На какую сумму необходимо набрать товары, чтобы закупка являлась оптовой?',
      text: 'Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».\n' +
        'Окно автосклейлиться относительно количетсва текста!!!'
    },
    {
      title: 'Какие бренды продаются на вашем сайте?',
      text: 'Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».\n' +
        'Окно автосклейлиться относительно количетсва текста!!!'
    },
    {
      title: 'Какие бренды продаются на вашем сайте?',
      text: 'Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».\n' +
        'Окно автосклейлиться относительно количетсва текста!!!'
    },
    {
      title: 'Какие бренды продаются на вашем сайте?',
      text: 'Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».\n' +
        'Окно автосклейлиться относительно количетсва текста!!!'
    },
    {
      title: 'Какие бренды продаются на вашем сайте?',
      text: 'Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».\n' +
        'Окно автосклейлиться относительно количетсва текста!!!'
    },
    {
      title: 'Какие бренды продаются на вашем сайте?',
      text: 'Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».\n' +
        'Окно автосклейлиться относительно количетсва текста!!!'
    },
    {
      title: 'Какие бренды продаются на вашем сайте?',
      text: 'Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».\n' +
        'Окно автосклейлиться относительно количетсва текста!!!'
    },
    {
      title: 'Какие бренды продаются на вашем сайте?',
      text: 'Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».\n' +
        'Окно автосклейлиться относительно количетсва текста!!!'
    },
    {
      title: 'Какие бренды продаются на вашем сайте?',
      text: 'Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».\n' +
        'Окно автосклейлиться относительно количетсва текста!!!'
    },
    {
      title: 'Какие бренды продаются на вашем сайте?',
      text: 'Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».\n' +
        'Окно автосклейлиться относительно количетсва текста!!!'
    },
    {
      title: 'Какие бренды продаются на вашем сайте?',
      text: 'Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».\n' +
        'Окно автосклейлиться относительно количетсва текста!!!'
    },
  ]

  const [dropdowns, setDropdowns] = useState<boolean[]>(dropdownArray.map(() => false))

  const onDropdownClick = (elIndex: number) => {
    setDropdowns(dropdowns.map((_el, index: number) => {
      if(index === elIndex){
        return !dropdowns[index]
      }
      return false;
    }))
  }

  return (
    <Layout>
      <Head>
        <title>FAQ | Video-Electro</title>
        <meta name={"og:title"} content={"FAQ | Video-Electro"} />
        <meta property="description" content={'Ответы на все вопросы касаемо нашей компании.'} />
        <meta property="og:description" content={'Ответы на все вопросы касаемо нашей компании.'} />
        <meta property="og:url" content={'https://video-electro.ru/faq'} />
      </Head>
      <Container>
        <div className={s.faq}>
          <div className={s.faq__questions}>
            <div className={s.faq__questions__title}>
              <Text size={'bigger'} type={'h2'}>Вопросы и ответы</Text>
            </div>
            <div className={s.faq__questions__dropdowns}>
              {dropdownArray.map((el, index: number)=>{
                return <Dropdown title={el.title}
                                 open={dropdowns[index]}
                                 onClick={()=>onDropdownClick(index)}
                                 setDropdowns={setDropdowns}
                >{el.text}</Dropdown>
              })}
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {},
    revalidate: 10,
  }
}

export default Faq