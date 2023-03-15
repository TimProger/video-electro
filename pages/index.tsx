import { GetStaticProps } from 'next'
import React, {useState} from "react";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Modal from "@/components/Modal";
import Input from "@/components/Input";
import Card from "@/components/Card";

interface IMainProps {
}

const Main: React.FC<IMainProps> = () => {

  const [showModal, setShowModel] = useState<boolean>(false)
  const [value, setValue] = useState<string>('')

  return (
    <div>
      <Button
        onClick={()=>setShowModel(true)}
        style={'filled'}
        error={true}
        size={'medium'}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.7955 13.8111L19 19M16 8.5C16 12.6421 12.6421 16 8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1C12.6421 1 16 4.35786 16 8.5Z" stroke="#898989" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
        Каталог
      </Button>
      <Text
        size={'small'}
        type={'link'}
        external
      >
        Title
      </Text>
      <Modal showModal={showModal} closeHandler={()=>setShowModel(false)}>
        <h1>Test</h1>
        <Input type={'text'}
               full={true}
               value={value}
               onChange={(e)=>setValue(e.target.value)}
               key={'key'}
               placeholder={'Введите текст'}
               icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M13.7955 13.8111L19 19M16 8.5C16 12.6421 12.6421 16 8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1C12.6421 1 16 4.35786 16 8.5Z" stroke="#898989" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
               </svg>}
        />
        <Button
          onClick={()=>setShowModel(false)}
          style={'filled'}
          full={true}
          size={'medium'}><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.7955 13.8111L19 19M16 8.5C16 12.6421 12.6421 16 8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1C12.6421 1 16 4.35786 16 8.5Z" stroke="#898989" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
          Каталог
        </Button>
      </Modal>
      <Input type={'text'}
             error={true}
             value={value}
             onChange={(e)=>setValue(e.target.value)}
             key={'key'}
             placeholder={'Введите текст'}
             icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M13.7955 13.8111L19 19M16 8.5C16 12.6421 12.6421 16 8.5 16C4.35786 16 1 12.6421 1 8.5C1 4.35786 4.35786 1 8.5 1C12.6421 1 16 4.35786 16 8.5Z" stroke="#898989" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>}
      />
      <Card />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {},
    revalidate: 10,
  }
}

export default Main