import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Heading, VStack, Icon, useTheme, KeyboardAvoidingView } from 'native-base';
import { Envelope, Key } from 'phosphor-react-native';
import { Input } from './input';
import { Button } from './button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { colors } = useTheme();

  function handleLogin() {
    if (!email || !password) {
      return Alert.alert('Entrar', 'Informe email e senha!');
    }

    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setIsLoading(false);

        auth()
          .createUserWithEmailAndPassword(email, password)
          .catch((error) => {
            return Alert.alert('Entrar', 'Não foi possível entrar');
          })
      })
  }

  return (
    <KeyboardAvoidingView
      flex={1}
      bg="gray.100"
      behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
    >
      <VStack flex={1} alignItems="center" px="8" pt="24">
        <Heading color="white" fontSize="xl" mt="20" mb="6">
          Acesse sua conta
        </Heading>
        <Input
          placeholder="E-mail"
          mb={4}
          InputLeftElement={
            <Icon
              as={<Envelope color={colors.gray[300]} />}
              ml={4}
            />
          }
          onChangeText={setEmail}
        />
        <Input
          placeholder="Senha"
          secureTextEntry
          mb={8}
          InputLeftElement={
            <Icon
              as={<Key color={colors.gray[300]} />}
              ml={4}
            />
          }
          onChangeText={setPassword}
        />
        <Button
          title="Entrar"
          w="full"
          isLoading={isLoading}
          onPress={handleLogin}
        />
      </VStack>
    </KeyboardAvoidingView>
  )
}
