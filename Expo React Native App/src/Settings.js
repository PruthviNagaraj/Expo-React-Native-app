import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Checkbox from 'expo-checkbox';
import { useSelector, useDispatch } from 'react-redux';
import { setNotificationPreference } from './redux/actions';

const Settings = () => {
  const { settingsNotification } = useSelector(state => state.settingsReducer);
  const dispatch = useDispatch()

  const onCheckboxSelect = (each) => {
    const tempData = { ...settingsNotification }
    tempData[each] = !tempData[each]
    dispatch(setNotificationPreference(tempData));
  }

  console.log(settingsNotification)

  return (
    <View style={styles.tasksWrapper}>
      <Text style={styles.sectionTitle}>Notification Preference</Text>
      {['SMS', 'Push', 'Email'].map((each, index) => (
        <View style={styles.item} key={index}>
          <View style={styles.itemLeft}>
            <Checkbox
              value={settingsNotification[each]}
              onValueChange={() => onCheckboxSelect(each)}
              color={'black'}
            />
            <Text style={styles.itemText}>{each}</Text>
          </View>
        </View>
      ))}

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
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
    marginLeft: 15
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
});

export default Settings