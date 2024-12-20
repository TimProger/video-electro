import React from "react";
import Text from "@/components/UI/Text/Text";
import Container from '@/components/UI/Container/Container';
import s from './styles.module.scss'
import certificate0 from "../../../public/images/pages/about/documents/certificate0.png"
import Image from "next/image";
import {useTypedSelector} from "@/hooks/useTypedSelector";

interface IAboutProps {
}

const About: React.FC<IAboutProps> = () => {

  const {width} = useTypedSelector(state => state.profile)

  return (
    <Container>
      <div className={s.about}>
        <div className={s.content}>
          <div className={s.content__left}>
            <Text type={'h1'} size={'bigger'}>О компании</Text>
            <Text>Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».</Text>
            <Text>Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».</Text>
            <Image unoptimized width={225} height={225} src={'about.src'} alt=""/>
          </div>
          <div className={s.content__right}>
            {width !== 'mobile' && <Image unoptimized width={225} height={225} src={'about.src'} alt=""/>}
            <Text type={'h2'} size={'big+'}>Что мы делаем?</Text>
            <Text>Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».</Text>
            <Text type={'h2'} size={'big+'}>Почему стоит выбрать нас?</Text>
            <Text>Все виды выполняемых нами электромонтажных работ лицензированы. Потенциал компании позволяет реализовывать проекты любой сложности: от небольших частных заказов до крупных объектов в промышленной сфере до предоставления комплексного решения заказчику. В нашем активе более 250 крупных проектов, среди которых международный деловой центр «Москва-Сити».</Text>
            {width === 'mobile' && <Image unoptimized width={225} height={225} src={'about.src'} alt=""/>}
          </div>
        </div>
        <div className={s.documents}>
          <Text type={'h2'} size={'bigger'}>Документы</Text>
          <div className={s.documents__list}>
            <a target={'_blank'} href='https://drive.google.com/file/d/1K0_dOTAjf_FqgjL72d1LZvzhQIweWsAf/view?usp=sharing'>
              <div className={s.documents__list__item}>
                <Image unoptimized width={225} height={650} src={certificate0.src} alt="Сертификат.docx"/>
                <div className={s.documents__list__item__text}>
                  <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M30.5 4H12C10.8954 4 10 4.89543 10 6V43C10 44.1046 10.8954 45 12 45H39C40.1046 45 41 44.1046 41 43V12.9995L30.5 4Z" fill="#1929BC"/>
                    <path d="M30.2991 14.3376C29.6448 14.4194 29.0919 13.8567 29.1851 13.2039L30.5001 3.99835L41 13L30.2991 14.3376Z" fill="#160E74"/>
                    <path d="M17.1818 30H14.7173V22.7273H17.2315C17.9536 22.7273 18.5739 22.8729 19.0923 23.1641C19.6132 23.4529 20.0133 23.8684 20.2926 24.4105C20.572 24.9527 20.7116 25.6013 20.7116 26.3565C20.7116 27.1141 20.5708 27.7652 20.2891 28.3097C20.0097 28.8542 19.6061 29.272 19.0781 29.5632C18.5526 29.8544 17.9205 30 17.1818 30ZM16.0348 28.8601H17.1179C17.6245 28.8601 18.0471 28.7678 18.3857 28.5831C18.7242 28.3961 18.9787 28.1179 19.1491 27.7486C19.3196 27.3769 19.4048 26.9129 19.4048 26.3565C19.4048 25.8002 19.3196 25.3385 19.1491 24.9716C18.9787 24.6023 18.7266 24.3265 18.3928 24.1442C18.0613 23.9595 17.6494 23.8672 17.157 23.8672H16.0348V28.8601ZM28.462 26.3636C28.462 27.1473 28.3152 27.8184 28.0217 28.3771C27.7305 28.9335 27.3327 29.3596 26.8285 29.6555C26.3266 29.9515 25.7572 30.0994 25.1204 30.0994C24.4835 30.0994 23.913 29.9515 23.4087 29.6555C22.9068 29.3572 22.5091 28.9299 22.2156 28.3736C21.9244 27.8149 21.7788 27.1449 21.7788 26.3636C21.7788 25.58 21.9244 24.91 22.2156 24.3537C22.5091 23.795 22.9068 23.3677 23.4087 23.0717C23.913 22.7758 24.4835 22.6278 25.1204 22.6278C25.7572 22.6278 26.3266 22.7758 26.8285 23.0717C27.3327 23.3677 27.7305 23.795 28.0217 24.3537C28.3152 24.91 28.462 25.58 28.462 26.3636ZM27.1374 26.3636C27.1374 25.812 27.051 25.3468 26.8782 24.968C26.7077 24.5869 26.471 24.2992 26.168 24.1051C25.8649 23.9086 25.5157 23.8104 25.1204 23.8104C24.725 23.8104 24.3758 23.9086 24.0728 24.1051C23.7698 24.2992 23.5318 24.5869 23.359 24.968C23.1886 25.3468 23.1033 25.812 23.1033 26.3636C23.1033 26.9152 23.1886 27.3816 23.359 27.7628C23.5318 28.1416 23.7698 28.4292 24.0728 28.6257C24.3758 28.8198 24.725 28.9169 25.1204 28.9169C25.5157 28.9169 25.8649 28.8198 26.168 28.6257C26.471 28.4292 26.7077 28.1416 26.8782 27.7628C27.051 27.3816 27.1374 26.9152 27.1374 26.3636ZM35.9327 25.1811H34.6046C34.5667 24.9633 34.4969 24.7704 34.3951 24.6023C34.2933 24.4318 34.1666 24.2874 34.0151 24.169C33.8636 24.0507 33.6908 23.9619 33.4966 23.9027C33.3049 23.8411 33.0977 23.8104 32.8752 23.8104C32.4798 23.8104 32.1294 23.9098 31.824 24.1087C31.5186 24.3052 31.2795 24.594 31.1067 24.9751C30.9339 25.3539 30.8475 25.8168 30.8475 26.3636C30.8475 26.92 30.9339 27.3887 31.1067 27.7699C31.2819 28.1487 31.521 28.4351 31.824 28.6293C32.1294 28.821 32.4786 28.9169 32.8716 28.9169C33.0894 28.9169 33.293 28.8885 33.4824 28.8317C33.6742 28.7725 33.8458 28.6861 33.9973 28.5724C34.1512 28.4588 34.2802 28.3191 34.3844 28.1534C34.4909 27.9877 34.5643 27.7983 34.6046 27.5852L35.9327 27.5923C35.883 27.938 35.7753 28.2623 35.6096 28.5653C35.4462 28.8684 35.2319 29.1359 34.9668 29.3679C34.7016 29.5975 34.3915 29.7775 34.0364 29.9077C33.6813 30.0355 33.2871 30.0994 32.8539 30.0994C32.2147 30.0994 31.6441 29.9515 31.1422 29.6555C30.6403 29.3596 30.245 28.9323 29.9561 28.3736C29.6673 27.8149 29.5229 27.1449 29.5229 26.3636C29.5229 25.58 29.6685 24.91 29.9597 24.3537C30.2509 23.795 30.6474 23.3677 31.1493 23.0717C31.6512 22.7758 32.2194 22.6278 32.8539 22.6278C33.2587 22.6278 33.6351 22.6847 33.9831 22.7983C34.3311 22.9119 34.6413 23.0788 34.9135 23.299C35.1858 23.5168 35.4095 23.7843 35.5847 24.1016C35.7623 24.4164 35.8783 24.7763 35.9327 25.1811Z" fill="white"/>
                  </svg>
                  <Text>Договор о сотрудничестве</Text>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default About