'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useAppState, useActions } from "./../overmind";
import { useEffect } from 'react'
import { RegionSearch } from '@/components/molecules/RegionSearch';
import { TimeframeSearch } from '@/components/molecules/TimeframeSearch';
import { Flex, Container, Spacer } from '@chakra-ui/react';


export default function Home(): React.JSX.Element {
  const { carbonReduction } = useAppState().analytics
  const { getCarbonReduction } = useActions().analytics
  useEffect(() => {
    getCarbonReduction()
  }, [])
  return (
    <main style={{ height: "200vh" }} className={styles.main}>
      <div style={{ position: "sticky" }} className={styles.description}>
        <p>
          Get started by editing&nbsp;
          <code className={styles.code}>src/app/page.tsx</code>
        </p>
        {carbonReduction &&
          <p>Active Project: {carbonReduction.activeProjects}</p>
        }
      </div>

      <Flex width={"100%"}>
        <Container marginTop={"40px"} flex={1} variant="cardSection" >
          <Flex margin={"24px"} alignItems={"center"}>
            <RegionSearch />
            <Spacer />
            <TimeframeSearch />
          </Flex>
          <Flex marginX={"24px"}>
            my data
          </Flex>
        </Container>
      </Flex>


    </main>
  )
}
