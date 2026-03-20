import React, { useState, useMemo } from 'react';
import { Text, View, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { addEntryScreenStyles as styles } from '../styles/AddEntryScreenStyle';
import { getThemeAwareStyles } from '../styles/themeAwareStyles';
import { useTheme } from '../contexts/ThemeContext';

type Props = NativeStackScreenProps<RootStackParamList, 'AddEntry'>;

export default function AddEntryScreen({ navigation }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { theme, toggleTheme } = useTheme();
  const themeAwareStyles = useMemo(() => getThemeAwareStyles(theme), [theme]);

  const handleAddEntry = () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Please enter a title');
      return;
    }
    
    Alert.alert('Success', `Entry "${title}" added successfully!`, [
      {
        text: 'OK',
        onPress: () => {
          setTitle('');
          setDescription('');
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={[styles.container, themeAwareStyles.container]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          <Text style={[styles.label, themeAwareStyles.title]}>Entry Title</Text>
          <TextInput
            style={[styles.input, themeAwareStyles.card, { color: themeAwareStyles.text.color }]}
            placeholder="Enter title..."
            placeholderTextColor={themeAwareStyles.placeholder.color}
            value={title}
            onChangeText={setTitle}
          />

          <Text style={[styles.label, themeAwareStyles.title]}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea, themeAwareStyles.card, { color: themeAwareStyles.text.color }]}
            placeholder="Enter description (optional)..."
            placeholderTextColor={themeAwareStyles.placeholder.color}
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          <Pressable style={styles.submitButton} onPress={handleAddEntry}>
            <Text style={styles.submitButtonText}>Add Entry</Text>
          </Pressable>

          <Pressable style={styles.cancelButton} onPress={() => navigation.navigate('MainTabs', { screen: 'Home' })}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>

        <View style={[styles.footer, themeAwareStyles.border]}>
          <Text style={[styles.footerText, themeAwareStyles.textMuted]}>Travel Journal • Add Entry</Text>
        </View>
      </ScrollView>
    </View>
  );
}
