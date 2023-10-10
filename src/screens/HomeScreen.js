import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import WordListScreen from './WordListScreen';
import HistoryScreen from './HistoryScreen';
import FavoritesScreen from './FavoritesScreen';

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  return (
    <>
      <Tab.Navigator screenOptions={{ tabBarLabelStyle: { fontSize: 16 } }}>
        <Tab.Screen name="Word List" component={WordListScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
      </Tab.Navigator>
    </>
  );
}

export default HomeScreen;