import {
  View, Text, KeyboardAvoidingView, Platform,
  StyleSheet, TextInput, TouchableOpacity, Keyboard, ScrollView
} from 'react-native';
import React, { useState } from 'react';
import ListItem from './ListItem';

const Todo = () => {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Add items to the list 
  const handleAddTask = () => {
    Keyboard.dismiss();
    (task.length > 0) && setTaskList([...taskList, task])
    setTask('');
  }

  const onTaskComplete = (index) => {
    let tempcomplete = [...completedTasks];
    let itemsCopy = [...taskList];
    let completedTask = itemsCopy.splice(index, 1); // delete item from the to-do list

    if (completedTask.length > 0) {
      tempcomplete.push(completedTask[0]) // add item to the completed list
    }
    // console.log(tempcomplete);
    setTaskList(itemsCopy);
    setCompletedTasks(tempcomplete);
  }

  const deleteTask = (index, isComplete) => {
    // console.log(isComplete)
    if (isComplete) {
      let itemsCopy = [...completedTasks];
      itemsCopy.splice(index, 1);
      setCompletedTasks(itemsCopy);
    } else {
      let itemsCopy = [...taskList];
      itemsCopy.splice(index, 1);
      setTaskList(itemsCopy);
    }
  }

  const ListElement = (index, item, isComplete = false) => (
    <ListItem
      key={index}
      text={item}
      onCheckboxSelect={() => onTaskComplete(index)}
      onDeleteTask={() => deleteTask(index, isComplete)}
      selected={!taskList.includes(item)}
    />
  )

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          overflow: 'auto'
        }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Today's tasks</Text>
          <View style={styles.items}>
            {taskList.map((item, index) => (ListElement(index, item)) )}
          </View>
          {
            (completedTasks.length > 0) && (
              <>
                <Text style={styles.sectionTitle}>Completed tasks</Text>
                <View style={styles.items}>
                  {completedTasks.map((item, index) => (ListElement(index, item, true)))}
                </View>
              </>
            )
          }
        </View>
      </ScrollView>
      {/* Write a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Tasks to do'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});

export default Todo
