import { GetStaticProps } from 'next'
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import Button from "@/components/Button";
import Text from "@/components/Text";

interface IMainProps {
}

const Main: React.FC<IMainProps> = () => {

  return (
    <div>
      <Button
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