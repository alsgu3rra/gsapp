import { useState } from 'react';
import { Alert } from 'react-native';
import { VStack, Select, CheckIcon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Input } from './input';
import { Button } from './button';
import { Header } from './header';
import { services } from './services';

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);

  const [service, setService] = useState('');
  const [description, setDescription] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const navigation = useNavigation();

  function handleNewRegister() {
    if (!service || !description) {
      return Alert.alert('Registrar', 'Preencha todos os campos!');
    }

    setIsLoading(true);

    firestore()
      .collection('orders')
      .add({
        service,
        whatsapp,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação registrada com sucesso');
        return navigation.goBack();
      })
      .catch((error) => {
        console.log(error)
        setIsLoading(false);

        return Alert.alert('Solicitação', 'Não foi possível registrar o pedido');
      })
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova Solicitação" />
      <Select
        selectedValue={service}
        minWidth="200"
        placeholder="Selecionar Serviço"
        _selectedItem={{
          bg: "white",
          endIcon: <CheckIcon size="5" />,
        }}
        mt={1}
        onValueChange={(itemValue) => setService(itemValue)}
      >
        {services.map((service, index) => (
          <Select.Item label={service.name} value={service.name} />
        ))}
      </Select>
      <Input
        onChangeText={setWhatsapp}
        placeholder="Número do Whatsapp"
        mt={4}
      />
      <Input
        onChangeText={setDescription}
        placeholder="Descrição do Serviço (Incluir Metro, Quantidade etc)"
        flex={1}
        mt={5}
        multiline
        textAlignVertical="top"
      />
      <Button
        title="Cadastrar"
        isLoading={isLoading}
        onPress={handleNewRegister}
        mt={5}
      />
    </VStack>
  );
}
