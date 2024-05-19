import { HStack, VStack, IconButton, useTheme, Text, Heading, FlatList, Center } from 'native-base';
import { ChatTeardropText, SignOut } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Button } from './button';
import { Image } from 'react-native';
import { Loading } from './loading';
import { Order, OrderProps } from './order';
import { dateFormat } from './firestoreDateFormat';

export default function Home() {
  const [statusSelected, setStatusSelected] = useState<'open' | 'closed'>('open');
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<OrderProps[]>([]);

  const navigation = useNavigation();
  const { colors } = useTheme();

  function handleNew() {
    // @ts-ignore
    navigation.navigate('register');
  }

  function handleOpenDetails(id: string) {}

  function handleLogOut() {
    auth()
      .signOut()
      .catch((error) => {
        console.log(error);
        return Alert.alert('Sair', 'Não foi possível sair.')
      });
  }

  useEffect(() => {
    setIsLoading(true);

    const subscriber = firestore()
      .collection('orders')
      .where('status', '==', statusSelected)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => {
          const { service, description, status, created_at } = doc.data();

          return {
            id: doc.id,
            service,
            description,
            status,
            when: dateFormat(created_at)
          }
        });

        setOrders(data);
        setIsLoading(false);
      });

    return subscriber;
  }, [statusSelected])

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}
      >
        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleLogOut}
        />
      </HStack>
      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading color="gray.700">Chamados</Heading>
        </HStack>
        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Order data={item} onPress={() => handleOpenDetails(item.id)} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText size={40} color={colors.green[300]} />
                <Text color="gray.100" fontSize="xl" mt={6} textAlign="center">
                  Você ainda não tem {"\n"}
                  solicitações{" "}
                  {statusSelected === "open" ? "em andamento" : "finalizadas"}
                </Text>
              </Center>
            )}
          />
        )}
        <Button title="Nova solicitação" onPress={handleNew} />
      </VStack>
    </VStack>
  );
}
