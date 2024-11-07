import React, { useState, useCallback,useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';
import {useObra} from '../database/useObra'
import {CalendarItem} from '../components/CalendarItem'
const CalendarScreen = () => {
  const [enderecos, setEnderecos] = useState({});
  const {list} =useObra();
  
  useEffect(() => {
    const load = async () =>{
      const {result} = await list()
      const groupedEnderecos = result.reduce((acc,curr)=>{
        const {data} = curr;
        if(!acc[data]) {
          acc[data]=[];
        }
        acc[data].push(curr)
        return acc;
      },{})
      setEnderecos(groupedEnderecos)
    }
    
    load()
  }, []);

  //https://www.npmjs.com/package/react-native-calendars/v/1.1286.0
  return (
    <View style={styles.container}>
      <Agenda
        items={enderecos}
        renderItem={(item, firstItemInDay) => {
          return <CalendarItem item={item}/>
        }}
        renderEmptyDate={() => (
          <View style={styles.emptyDate}>
            <Text>Sem endereços</Text>
          </View>
        )}
        renderEmptyData={() => (
          <View style={styles.emptyDate}>
            <Text>Nada encontrado</Text>
          </View>
        )}
        showClosingKnob={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  emptyDate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default CalendarScreen;
