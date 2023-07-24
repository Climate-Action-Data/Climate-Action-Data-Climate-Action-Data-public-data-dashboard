import { Grid, GridItem, Skeleton, Stack, StackDivider, Text, VStack } from '@chakra-ui/react'

const CreditsHistorySkeleton = () => {
  return (
    <Grid
      id={`issued-retired-chart-header`}
      templateAreas={[`'chart''stats'`, null, `'stats chart'`]}
      gridTemplateRows={[`1fr`]}
      gridTemplateColumns={[`1fr`, null, `1fr 3fr`]}
      alignItems={`center`}
      width={`100%`}
    >
      <GridItem area={`stats`} padding={`10px`}>
        <Stack direction={[`row`, null, `column`]} divider={<StackDivider borderBottomColor={`lightGray.400`} borderBottomWidth={`1px`} />}>
          <VStack width={[`50%`, null, `auto`]}>
            <Skeleton height={[`40px`, null, `64px`]} aspectRatio={2} />
            <Text>{`Issued`}</Text>
          </VStack>
          <VStack width={[`50%`, null, `auto`]}>
            <Skeleton height={[`40px`, null, `64px`]} aspectRatio={2} />
            <Text>{`Retired`}</Text>
          </VStack>
        </Stack>
      </GridItem>
      <GridItem area={`chart`} height={`300px`} minW={0}>
        <Skeleton width={`100%`} height={`300px`} />
      </GridItem>
    </Grid>
  )
}

export default CreditsHistorySkeleton
