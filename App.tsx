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
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Add image field 
interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: string;
  image: string; // URL to image
}


// Predefined sample menu items with images
const SAMPLE_MENU: MenuItem[] = [
  {
    id: 'sample-1',
    dishName: 'Garlic Butter Shrimp',
    description: 'Juicy shrimp sautéed in garlic butter sauce.',
    course: 'Starters',
    price: '80',
    image: 'https://media.istockphoto.com/id/182033707/photo/shrimp-scampi.jpg?s=612x612&w=0&k=20&c=sXCyAmVOIG9866CDbDdgxI_438eV2QHfakwDqqgxgzA=',
  },
  {
    id: 'sample-2',
    dishName: 'Grilled Ribeye Steak',
    description: 'Tender steak grilled to perfection with herbs and love.',
    course: 'Mains',
    price: '165',
    image: 'https://media.istockphoto.com/id/587207508/photo/sliced-grilled-steak-ribeye-with-herb-butter.jpg?s=612x612&w=0&k=20&c=gm6Kg6rHYH0xWTF5oszm6NZ-hp9aPRbk9V1kvCr8MQI=',
  },
  {
    id: 'sample-3',
    dishName: 'Chocolate Cake',
    description: 'Warm chocolate cake with molten center and custard.',
    course: 'Dessert',
    price: '120',
    image: 'https://img.freepik.com/free-photo/front-view-delicious-cake-with-copy-space_23-2148769299.jpg',
  },
];
const App = () => {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starters');
  const [price, setPrice] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const courses = ['Starters', 'Mains', 'Dessert'];

  const addCustomMenuItem = () => {
    if (!dishName.trim() || !description.trim() || !price.trim()) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    // Provide a default image for custom items
    const newItem: MenuItem = {
      id: `custom-${Date.now()}`,
      dishName: dishName.trim(),
      description: description.trim(),
      course,
      price: price.trim(),
      image: 'https://cdn-icons-png.flaticon.com/512/3075/3075715.png', // generic food icon
    };

    setMenuItems([...menuItems, newItem]);
    setDishName('');
    setDescription('');
    setPrice('');
    setCourse('Starters');
  };

  const addSampleItem = (item: MenuItem) => {
    const newItem = { ...item, id: `added-${Date.now()}` };
    setMenuItems([...menuItems, newItem]);
  };

  // Reusable render function for menu items
  const renderMenuItem = (item: MenuItem) => (
    <View key={item.id} style={styles.menuItem}>
      <Text style={styles.dishName}>{item.dishName}</Text>
      {/* Image below dish name */}
      <Image source={{ uri: item.image }} style={styles.dishImage} />
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.course}>Course: {item.course}</Text>
      <Text style={styles.price}>Price: R{item.price}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.title}>Christoffel's Menu Manager</Text>

          {/* Custom item form */}
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
              placeholder="Price (e.g., R129)"
            />
            <Button
              title="Add to Menu"
              onPress={addCustomMenuItem}
              color="#007AFF"
            />
          </View>

          {/* Sample menu options */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sample Dishes</Text>
            {SAMPLE_MENU.map((item) => (
              <View key={item.id} style={styles.sampleItem}>
                <Text style={styles.dishName}>{item.dishName}</Text>
                {/*  Image below dish name */}
                <Image source={{ uri: item.image }} style={styles.dishImage} />
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.course}>Course: {item.course}</Text>
                <Text style={styles.price}>Price: R{item.price}</Text>
                <Button
                  title="Add to Menu"
                  onPress={() => addSampleItem(item)}
                  color="#28A745"
                />
              </View>
            ))}
          </View>

          {/* Total items */}
          <View style={styles.totalItems}>
            <Text style={styles.totalText}>
              Total Items in Menu: {menuItems.length}
            </Text>
          </View>

          {/* User final menu */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Menu ({menuItems.length} items)</Text>
            {menuItems.length === 0 ? (
              <Text style={styles.emptyText}>Your menu is empty. Add dishes above!</Text>
            ) : (
              <View style={styles.menuList}>
                {menuItems.map(renderMenuItem)}
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
    marginBottom: 6, // Add space below name
  },
  //  New image style
  dishImage: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    marginVertical: 6,
    borderRadius: 8,
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