import { GetStaticProps } from 'next'
import React, {useState} from "react";
import Button from "@/components/Button";
import Text from "@/components/Text";
import Modal from "@/components/Modal";

interface IMainProps {
}

const Main: React.FC<IMainProps> = () => {

  const [showModal, setShowModel] = useState<boolean>(false)

  return (
    <div>
      <Button
        onClick={()=>setShowModel(true)}
        style={'outlined'}
        size={'small'}>
        Text
      </Button>
      <Text
        size={'small'}
        type={'link'}
        external
      >
        Title
      </Text>
      <Modal showModal={showModal} closeHandler={()=>setShowModel(false)}>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
        <h1>Hello</h1>
      </Modal>
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