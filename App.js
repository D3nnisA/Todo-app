import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Header from './components/header';
import TodoItem from './components/todoitem';
import AddTodo from './components/addTodo';

export default function App() {

  const [todos, setTodos] = useState([

    { text: 'do work', key: '1' },
    { text: 'feed dogs', key: '2' },
    { text: 'fix ps4', key: '3' }
  ]);

  const pressHandler = (key) => {

    setTodos((prevTodos) => {
      return prevTodos.filter(todo => todo.key != key);

    });
  }

  const submitHandler = (text) => {

    if (text.length > 3) {
      setTodos((prevTodos) => {
        return [

          { text: text, key: Math.random().toString() },
          ...prevTodos]
      })
    } else {
      Alert.alert('OOPS', 'Todo must be over 3 chars long', [{ text: 'Understood', onPress: () => console.log('alert closed') }])
    }

  }

  return (

    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>

      <View style={styles.container}>

        {/* header */}
        <Header />

        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />

          {/* to form */}

          <View style={styles.list}>

            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />

              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff09',

  },
  content: {
    flex: 1,
    padding: 40,
  },
  list: {
    flex: 1,
    marginTop: 20,
  }

});
