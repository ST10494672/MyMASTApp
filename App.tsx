import React, { useState } from 'react';
import {
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: string;
}

// Predefined sample menu items 
const SAMPLE_MENU: MenuItem[] = [
  {
    id: 'sample-1',
    dishName: 'Garlic Shrimp',
    description: 'Juicy shrimp sautéed in garlic butter sauce.',
    course: 'Starters',
    price: '12.50',
  },
  {
    id: 'sample-2',
    dishName: 'Grilled Ribeye Steak',
    description: 'Tender steak grilled to perfection with herbs.',
    course: 'Mains',
    price: '28.00',
  },
  {
    id: 'sample-3',
    dishName: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center.',
    course: 'Dessert',
    price: '9.50',
  },
];

const App = () => {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starters');
  const [price, setPrice] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]); // ✅ Only user-added items

  const courses = ['Starters', 'Mains', 'Dessert'];

  // ✅ Add a custom menu item
  const addCustomMenuItem = () => {
    if (!dishName.trim() || !description.trim() || !price.trim()) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    const newItem: MenuItem = {
      id: `custom-${Date.now()}`,
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: price.trim(),
    };

    setMenuItems([...menuItems, newItem]);
    setDishName('');
    setDescription('');
    setPrice('');
    setCourse('Starters');
  };

  // ✅ Add a sample item to the menu
  const addSampleItem = (item: MenuItem) => {
    // Give it a new ID to avoid conflicts
    const newItem = { ...item, id: `added-${Date.now()}` };
    setMenuItems([...menuItems, newItem]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.title}>Christoffel's Menu Manager</Text>

          {/* ========== CUSTOM ITEM FORM ========== */}
          <View style={styles.form}>
            <Text>Add Your Own Dish</Text>
            <TextInput
              style={styles.input}
              value={dishName}
              onChangeText={setDishName}
              placeholder="Dish name"
            />
            <TextInput
              style={[styles.input, styles.descriptionInput]}
              value={description}
              onChangeText={setDescription}
              placeholder="Description"
              multiline
              numberOfLines={3}
            />
            <Text>Select Course:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={course}
                onValueChange={(value) => setCourse(value)}
                style={styles.picker}
              >
                {courses.map((c) => (
                  <Picker.Item key={c} label={c} value={c} />
                ))}
              </Picker>
            </View>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              placeholder="Price (e.g., 12.99)"
            />
            <Button
              title="Add to Menu"
              onPress={addCustomMenuItem}
              color="#007AFF"
            />
          </View>

          {/* ========== SAMPLE MENU OPTIONS ========== */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sample Dishes (Add Individually)</Text>
            {SAMPLE_MENU.map((item) => (
              <View key={item.id} style={styles.sampleItem}>
                <Text style={styles.dishName}>{item.dishName}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.course}>Course: {item.course}</Text>
                <Text style={styles.price}>Price: ${item.price}</Text>
                <Button
                  title="Add to Menu"
                  onPress={() => addSampleItem(item)}
                  color="#28A745"
                />
              </View>
            ))}
          </View>

          {/* ========== TOTAL ITEMS ========== */}
          <View style={styles.totalItems}>
            <Text style={styles.totalText}>
              Total Items in Menu: {menuItems.length}
            </Text>
          </View>

          {/* ========== USER'S FINAL MENU ========== */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Menu ({menuItems.length} items)</Text>
            {menuItems.length === 0 ? (
              <Text style={styles.emptyText}>Your menu is empty. Add dishes above!</Text>
            ) : (
              <View style={styles.menuList}>
                {menuItems.map((item) => (
                  <View key={item.id} style={styles.menuItem}>
                    <Text style={styles.dishName}>{item.dishName}</Text>
                    <Text style={styles.description}>{item.description}</Text>
                    <Text style={styles.course}>Course: {item.course}</Text>
                    <Text style={styles.price}>Price: ${item.price}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={{ height: 30 }} />
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  safeArea: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  form: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    height: 50,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  sampleItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  menuList: {
    marginTop: 10,
  },
  menuItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
  },
  course: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28A745',
  },
  totalItems: {
    backgroundColor: '#e8f4fd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    marginTop: 10,
  },
});

export default App;