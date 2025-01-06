import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';

// Import your components
import Home from './components/home';
import TelaFilmes from './components/filmes';
import EditProduct from './components/editProduct';
import Notificacoes from './components/notificacoes';
import TelaAddFilmes from './components/criarProduto';
import CriarNotificacao from './components/criarNotifications';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Define your screen components
function FilmesNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TelaFilmes" component={TelaFilmes} />
      <Stack.Screen name="EditProduct" component={EditProduct} />
      <Stack.Screen name="TelaAddFilmes" component={TelaAddFilmes} />
    </Stack.Navigator>
  );
}

function NotificacaoNavigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Notificacoes" component={Notificacoes} />
      <Stack.Screen name="CriarNotificacao" component={CriarNotificacao} />
    </Stack.Navigator>
  );
}

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#FFFFFF',
            drawerStyle: {
              backgroundColor: 'red',
            },
            drawerActiveTintColor: '#FFFFFF',
            drawerInactiveTintColor: '#000000',
          }}
        >
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Filmes" component={FilmesNavigation} />
          <Drawer.Screen name="Notificação" component={NotificacaoNavigation} />
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
