import { Box, Circle, HStack, Text, useTheme, VStack, Pressable, IPressableProps } from 'native-base';
import { ClockAfternoon, Hourglass, CircleWavyCheck } from 'phosphor-react-native';

export type OrderProps = {
  id: string;
  service: string;
  when: string;
  status: 'open' | 'closed';
}

type Props = IPressableProps & {
  data: OrderProps;
}

export function Order({ data, ...rest }: Props) {
  const { colors } = useTheme();

  const colorStatus = data.status === 'open' ? colors.primary[700] : colors.green[300];

  return (
    <Pressable {...rest}>
      <HStack
        bg="gray.400"
        mb={4}
        alignItems="center"
        justifyContent="space-between"
        rounded="sm"
        overflow="hidden"
      >
        <Box h="full" w={2} bg={colorStatus} />
        <VStack flex={1} w={2} my={5} ml={5}>
          <Text color="white" fontSize="md">
            Serviço: {data.service}
          </Text>

          <HStack alignItems="center">
            <ClockAfternoon size={15} color={colors.gray[300]} />
            <Text color="gray.200" fontSize="xs" ml={1}>
              {data.when}
            </Text>
          </HStack>
        </VStack>
        <Circle bg="gray.300" h={12} w={12} mr={5}>
          {
            data.status === 'open'
              ? <Hourglass size={24} color={colorStatus} />
              : <CircleWavyCheck size={24} color={colorStatus} />
          }
        </Circle>
      </HStack>
    </Pressable>
  )
}
