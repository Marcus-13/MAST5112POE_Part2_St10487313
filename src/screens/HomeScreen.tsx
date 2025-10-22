import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, MenuItem } from '../types';

// define navigation prop type for HomeScreen
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// props interface defining what data the HomeScreen expects
interface Props {
  navigation: HomeScreenNavigationProp; //nav object for screen transitions
  menuItems: MenuItem[];                //array of menu items (recipes) to display
}

// main HomeScreen component that displays the menu/recipe list
export default function HomeScreen({ navigation, menuItems }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#B8E6E6" /> {/* set status bar style for consistent header appearance */}

      {/* header section - including the recipe count */}
      <View style={styles.header}>
        <Text style={styles.title}>CheffTingz</Text>
        <Text style={styles.subtitle}>My Menu </Text>
        <Text style={styles.count}>Total: {menuItems.length} recipes</Text>
      </View>

      {/*scrollable recipe list */}
      <ScrollView style={styles.recipeList} contentContainerStyle={styles.scrollContent}>
        {menuItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            {/* <Text style={styles.emptyText}>No recipes yet</Text>
            <Text style={styles.emptySubtext}>Tap "Add Recipe" to get started!</Text>  feedback if there are no recipes (not needed for now) */}
          </View>
        ) : (
          menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.recipeCard}
              // navigate to RecipeDetail screen when a recipe is tapped
              onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
            >
              <View style={styles.recipeHeader}>
                <Text style={styles.recipeName}>{item.dishName}</Text>
                {/* course badge with conditional styling based on course type */}
                <View style={[
                  styles.courseBadge,
                  item.course === 'Starter' && styles.starterBadge,
                  item.course === 'Main' && styles.mainBadge,
                  item.course === 'Dessert' && styles.dessertBadge,
                ]}>
                  <Text style={styles.courseText}>{item.course}</Text>
                </View>
              </View>
              <Text style={styles.recipeDescription} numberOfLines={2}> {/* line limit on description for consistent card height */}
                {item.description}
              </Text>
              <Text style={styles.recipePrice}>R{item.price}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* add recipe button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddRecipe')}
        >
          <Text style={styles.addButtonText}>+ Add Recipe</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// styles for HomeScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B8E6E6',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginTop: 5,
  },
  count: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  recipeList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  recipeCard: {
    backgroundColor: '#D4F1F1',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#94D4D4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  courseBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },


  // course badge colors
  starterBadge: {
    backgroundColor: '#4bbe94ff',
  },
  mainBadge: {
    backgroundColor: '#3a7d64ff',
  },
  dessertBadge: {
    backgroundColor: '#A8E6CF',
  },


  courseText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  recipeDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
    lineHeight: 20,
  },
  recipePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 30,
  },
  addButton: {
    backgroundColor: '#6BC5C5',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  addButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});