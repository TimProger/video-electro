import { GetStaticProps } from 'next'
import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import Button from "@/components/Button";

interface IMainProps {
}

const Main: React.FC<IMainProps> = () => {

  return (
    <div>
      <Button
        style={'filled'}
        size={'small'}>
        Text
      </Button>
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