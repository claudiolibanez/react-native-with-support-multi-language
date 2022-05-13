import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';

import './src/i18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'blue',
    marginVertical: 16,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

const App = () => {
  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;

  const handleChangeLanguagePress = () => {
    const code = selectedLanguageCode === 'pt-BR' ? 'en-US' : 'pt-BR';

    return i18n.changeLanguage(code);
  };

  return (
    <View style={styles.container}>
      <Text>{t('common:welcome')}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleChangeLanguagePress}
      >
        <Text style={styles.buttonText}>clicar</Text>
      </TouchableOpacity>
      <Text>{t('navigation:title')}</Text>
    </View>
  );
};

export default App;

// REFERENCES
// https://amanhimself.dev/blog/multi-language-support-in-react-native-with-react-i18next/
