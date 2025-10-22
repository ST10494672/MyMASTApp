import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: string;
}

const App = () => {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starters');
  const [price, setPrice] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const courses = ['Starters', 'Mains', 'Dessert'];

  const addMenuItem = () => {
    if (!dishName.trim() || !description.trim() || !price.trim()) {
      Alert.alert('Error', 'Please fill in dish name, description, and price.');
      return;
    }

    const newItem: MenuItem = {
      id: Date.now().toString(),
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

  // predefined sample menu 
  const loadSampleMenu = () => {
    const sample: MenuItem[] = [
      {
        id: '1',
        dishName: 'Garlic Shrimp',
        description: 'Juicy shrimp sautéed in garlic butter sauce.',
        course: 'Starters',
        price: '12.50',
      },
      {
        id: '2',
        dishName: 'Grilled Ribeye Steak',
        description: 'Tender steak grilled to perfection with herbs.',
        course: 'Mains',
        price: '28.00',
      },
      {
        id: '3',
        dishName: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with molten center.',
        course: 'Dessert',
        price: '9.50',
      },
    ];
    setMenuItems(sample);
  };

  const renderMenuItem = ({ item }: { item: MenuItem }) => (
    <View style={styles.menuItem}>
      <Text style={styles.dishName}>{item.dishName}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.course}>Course: {item.course}</Text>
      <Text style={styles.price}>Price: ${item.price}</Text>
    </View>
  );

  const renderCourseButtons = () =>
    courses.map((c) => (
      <TouchableOpacity
        key={c}
        style={[styles.courseButton, course === c && styles.courseButtonSelected]}
        onPress={() => setCourse(c)}
      >
        <Text style={[styles.courseButtonText, course === c && styles.courseButtonTextSelected]}>
          {c}
        </Text>
      </TouchableOpacity>
    ));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chef Menu Manager</Text>

      {/* Form */}
      <View style={styles.form}>
        <Text>Dish Name:</Text>
        <TextInput
          style={styles.input}
          value={dishName}
          onChangeText={setDishName}
          placeholder="e.g., Caesar Salad"
        />

        <Text>Description:</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          placeholder="Fresh romaine with croutons..."
          multiline
        />

        <Text>Course:</Text>
        <View style={styles.courseButtonContainer}>
          {renderCourseButtons()}
        </View>

        <Text>Price ($):</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          placeholder="12.99"
        />

        <Button title="Add Menu Item" onPress={addMenuItem} color="#007AFF" />
      </View>

      {/* Menu Display */}
      <View style={styles.homeSection}>
        <Text style={styles.sectionTitle}>Menu Items ({menuItems.length})</Text>
        {menuItems.length === 0 ? (
          <Text style={styles.emptyText}>No items yet. Add one or load sample menu.</Text>
        ) : (
          <FlatList
            data={menuItems}
            renderItem={renderMenuItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
        )}
      </View>

      {/* Button */}
      <View style={styles.buttonContainer}>
        <Button
          title="Load Sample Menu (Part 2)"
          onPress={loadSampleMenu}
          color="#28A745"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  form: {
    marginBottom: 20,
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
  courseButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  courseButton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 2,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    alignItems: 'center',
  },
  courseButtonSelected: {
    backgroundColor: '#007AFF',
  },
  courseButtonText: {
    fontSize: 14,
    color: '#333',
  },
  courseButtonTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  homeSection: {
    flex: 1,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    marginTop: 20,
  },
  list: {
    flex: 1,
  },
  menuItem: {
    padding: 15,
    backgroundColor: '#fff',
    marginVertical: 5,
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
  buttonContainer: {
    marginTop: 10,
  },
});

export default App;