/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Voice from '@react-native-community/voice';

export default function TextToSpeech() {
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);

  useEffect(() => {
    function onSpeechStart(e) {
      console.log('onSpeechStart: ', e);
      setStarted('√');
    }
    function onSpeechEnd(e) {
      console.log('onSpeechEnd: ', e);
      setEnd('√');
    }

    function onSpeechError(e) {
      console.log('onSpeechError: ', e);
      setError(e.value);
    }
    function onSpeechResults(e) {
      console.log('onSpeechResults: ', e);
      setResults(e.value);
    }
    function onSpeechPartialResults(e) {
      console.log('onSpeechPartialResults: ', e);
      setPartialResults(e.value);
    }
    function onSpeechVolumeChanged(e) {
      console.log('onSpeechVolumeChanged: ', e);
      setPitch(e.value);
    }
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  const _startRecognizing = async () => {
    setPitch('');
    setError('');
    setStarted('');
    setResults([]);
    setPartialResults([]);
    setEnd('');
    try {
      await Voice.start('pt-BR');
    } catch (e) {
      console.error(e);
    }
  };
  const _stopRecognizing = async () => {
    //Stops listening for speech
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };
  const _cancelRecognizing = async () => {
    //Cancels the speech recognition
    try {
      await Voice.cancel();
    } catch (e) {
      console.error(e);
    }
  };
  const _destroyRecognizer = async () => {
    //Destroys the current SpeechRecognizer instance
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    setPitch('');
    setError('');
    setStarted('');
    setResults([]);
    setPartialResults([]);
    setEnd('');
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Exemplo de conversão de fala para texto / Reconhecimento de voz
        </Text>
        <Text style={styles.instructions}>
          Toque no icone de microfone para começar o reconhecimento
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              color: '#B0171F',
            }}>{`Iniciado: ${started}`}</Text>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              color: '#B0171F',
            }}>{`Finalizado: ${end}`}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              color: '#B0171F',
            }}>{`Pitch \n ${pitch}`}</Text>
          <Text
            style={{
              flex: 1,
              textAlign: 'center',
              color: '#B0171F',
            }}>{`Erros \n ${error}`}</Text>
        </View>
        <TouchableHighlight
          onPress={_startRecognizing}
          style={{marginVertical: 20}}>
          <Image
            style={styles.button}
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/microphone.png',
            }}
          />
        </TouchableHighlight>
        <Text
          style={{
            textAlign: 'center',
            color: '#B0171F',
            marginBottom: 1,
            fontWeight: '700',
          }}>
          Resultados parciais
        </Text>
        <ScrollView>
          {partialResults.map((result, index) => {
            return (
              <Text
                key={`partial-result-${index}`}
                style={{
                  textAlign: 'center',
                  color: '#B0171F',
                  marginBottom: 1,
                  fontWeight: '700',
                }}>
                {result}
              </Text>
            );
          })}
        </ScrollView>
        <Text style={styles.stat}>Resultados</Text>
        <ScrollView style={{marginBottom: 42}}>
          {results.map((result, index) => {
            return (
              <Text key={`result-${index}`} style={styles.stat}>
                {result}
              </Text>
            );
          })}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'space-between',
            position: 'absolute',
            bottom: 0,
          }}>
          <TouchableHighlight
            onPress={_stopRecognizing}
            style={{flex: 1, backgroundColor: 'red'}}>
            <Text style={styles.action}>Stop</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={_cancelRecognizing}
            style={{flex: 1, backgroundColor: 'red'}}>
            <Text style={styles.action}>Cancel</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={_destroyRecognizer}
            style={{flex: 1, backgroundColor: 'red'}}>
            <Text style={styles.action}>Destroy</Text>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  action: {
    width: '100%',
    textAlign: 'center',
    color: 'white',
    paddingVertical: 8,
    marginVertical: 5,
    fontWeight: 'bold',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  stat: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 1,
    marginTop: 30,
  },
});
