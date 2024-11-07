import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Alert, StyleSheet } from 'react-native';

const ClockScreen = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchRunning, setStopwatchRunning] = useState(false);
  const [alarmHour, setAlarmHour] = useState('');
  const [alarmMinute, setAlarmMinute] = useState('');
  const [alarmSet, setAlarmSet] = useState(false);
  const [timerDuration, setTimerDuration] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let stopwatchInterval;
    if (stopwatchRunning) {
      stopwatchInterval = setInterval(() => {
        setStopwatchTime(prev => prev + 1);
      }, 1000);
    } else if (!stopwatchRunning && stopwatchTime !== 0) {
      clearInterval(stopwatchInterval);
    }
    return () => clearInterval(stopwatchInterval);
  }, [stopwatchRunning]);

  useEffect(() => {
    if (alarmSet && parseInt(alarmHour) === currentTime.getHours() && parseInt(alarmMinute) === currentTime.getMinutes()) {
      Alert.alert("Alarme", "Hora do show!");
      setAlarmSet(false);
    }
  }, [currentTime, alarmHour, alarmMinute, alarmSet]);

  useEffect(() => {
    let timerInterval;
    if (timerRunning && timerDuration > 0) {
      timerInterval = setInterval(() => {
        setTimerDuration(prev => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            Alert.alert("O tempo acabou!");
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!timerRunning) {
      clearInterval(timerInterval);
    }
    return () => clearInterval(timerInterval);
  }, [timerRunning, timerDuration]);

  const formatTime = date => `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  const formatStopwatchTime = time => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const formatTimerDuration = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleSetAlarm = () => {
    if (alarmHour && alarmMinute) {
      setAlarmSet(true);
      Alert.alert('Alarme Definido', `Alarme definido para ${alarmHour}:${alarmMinute}`);
    } else {
      Alert.alert('Entrada Inválida', 'Por favor, defina uma hora e minuto válidos para o alarme.');
    }
  };

  const handleStartTimer = () => {
    if (timerDuration > 0) {
      setTimerRunning(true);
    } else {
      Alert.alert('Entrada Inválida', 'Por favor, defina uma duração válida para o contador.');
    }
  };

  const handleResetTimer = () => {
    setTimerRunning(false);
    setTimerDuration(0);
  };

  return (
    <View style={styles.container}>
      {/* Clock */}
      <View style={styles.clockContainer}>
        <Text style={styles.header}>Hora Atual</Text>
        <Text style={styles.currentTime}>{formatTime(currentTime)}</Text>
      </View>

      {/* Stopwatch */}
      <View style={styles.stopwatchContainer}>
        <Text style={styles.header}>Cronômetro</Text>
        <Text style={styles.stopwatchTime}>{formatStopwatchTime(stopwatchTime)}</Text>
        <View style={styles.stopwatchButtons}>
          <Button title={stopwatchRunning ? "Pausar" : "Iniciar"} onPress={() => setStopwatchRunning(!stopwatchRunning)} />
          <Button title="Resetar" onPress={() => { setStopwatchTime(0); setStopwatchRunning(false); }} />
        </View>
      </View>

      {/* Alarm */}
      <View style={styles.alarmContainer}>
        <Text style={styles.header}>Definir Alarme</Text>
        <TextInput
          placeholder="Hora (formato 24h)"
          placeholderTextColor="#000"
          returnKeyType="done"
          keyboardType="numeric"
          value={alarmHour}
          onChangeText={setAlarmHour}
          style={styles.input}
        />
        <TextInput
          placeholder="Minuto"
          placeholderTextColor="#000"
          keyboardType="numeric"
          returnKeyType="done"
          value={alarmMinute}
          onChangeText={setAlarmMinute}
          style={styles.input}
        />
        <Button title="Definir Alarme" onPress={handleSetAlarm} />
      </View>

      {/* Timer */}
      <View style={styles.timerContainer}>
        <Text style={styles.header}>Contagem regressiva</Text>
        <TextInput
          placeholder="Definir contagem regressiva (segundos)"
          placeholderTextColor="#000"
          keyboardType="numeric"
          returnKeyType="done"
          value={timerDuration.toString()}
          onChangeText={text => setTimerDuration(parseInt(text))}
          style={styles.input}
        />
        <View style={styles.timerButtons}>
          <Button title="Iniciar contagem " onPress={handleStartTimer} />
          <Button title="Resetar contagem" onPress={handleResetTimer} />
        </View>
        <Text style={styles.timerDisplay}>{formatTimerDuration(timerDuration)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  clockContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  currentTime: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  stopwatchContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  stopwatchTime: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  stopwatchButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 10,
  },
  alarmContainer: {
    marginBottom: 30,
  },
  timerContainer: {
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  timerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginTop: 10,
  },
  timerDisplay: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
});

export default ClockScreen;