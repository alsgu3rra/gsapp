import { useState, useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { NativeBaseProvider, StatusBar, useTheme } from 'native-base';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { NavigationContainer } from '@react-navigation/native';
import { appTheme } from './src/theme';
import Home from './src/home';
import Login from './src/login';
import Register from './src/register';
import { Loading } from './src/loading';

const { Navigator, Screen } = createNativeStackNavigator();

function AppRoutes() {
  const { colors } = useTheme();

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="register" component={Register} />
    </Navigator>
  )
}

function Routes() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  useEffect(() => {
    const subscriber = auth()
      .onAuthStateChanged(response => {
        setUser(response);
        setLoading(false);
      });

    return subscriber;
  }, []);

  if (loading) {
    return <Loading />
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <Login />}
    </NavigationContainer>
  )
}

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <NativeBaseProvider theme={appTheme}>
       <StatusBar
        translucent
        barStyle='light-content'
        backgroundColor='transparent'
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}
