import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList, Image, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useMemo } from 'react';
import { TabsParamList } from '../navigation/RootNavigator';
import { homeScreenStyles as styles } from '../styles/HomeScreenStyle';
import { getThemeAwareStyles } from '../styles/themeAwareStyles';
import { useEntries } from '../contexts/EntriesContext';
import { useTheme } from '../contexts/ThemeContext';
import { Entry } from '../types/Entry';
import { usePreventGoBack } from '../hooks/usePreventGoBack';

type Props = BottomTabScreenProps<TabsParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { entries, loadEntries, removeEntry } = useEntries();
  const { theme, toggleTheme } = useTheme();
  const themeAwareStyles = useMemo(() => getThemeAwareStyles(theme), [theme]);
  usePreventGoBack();

  useFocusEffect(
    useCallback(() => {
      loadEntries();
    }, [loadEntries])
  );

  const handleRemoveEntry = (entry: Entry) => {
    Alert.alert('Delete Entry', `Are you sure you want to delete this entry?`, [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await removeEntry(entry.id);
            Alert.alert('Success', 'Entry deleted successfully');
          } catch (error) {
            Alert.alert('Error', 'Failed to delete entry');
          }
        },
        style: 'destructive',
      },
    ]);
  };

  const renderEntry = ({ item }: { item: Entry }) => (
    <View style={[styles.card, themeAwareStyles.card]}>
      <Image
        source={{ uri: item.imageUri }}
        style={styles.cardImage}
      />
      <View style={styles.cardLocation}>
        <Text style={[styles.cardLocationText, themeAwareStyles.textMuted]}>
          {item.address
            ? `Location: ${item.address.city}, ${item.address.country}`
            : 'Location: No address available'}
        </Text>
      </View>
      <Pressable
        style={styles.removeButton}
        onPress={() => handleRemoveEntry(item)}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </Pressable>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, themeAwareStyles.textMuted]}>
        No Entries yet
      </Text>
      <Text style={[styles.emptySubtext, themeAwareStyles.textLight]}>
        Add a travel entry to see photos with location here.
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, themeAwareStyles.container]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      {/* Header */}
      <SafeAreaView edges={['top', 'left', 'right']} style={[styles.header, themeAwareStyles.header]}>
        <View style={styles.headerContent}>
          <View>
            <Text style={[styles.title, { color: theme === 'dark' ? '#fff' : '#1f2937' }]}>Captured Photos</Text>
            <Text style={[styles.subtitle, { color: theme === 'dark' ? '#e0e7ff' : '#6b7280' }]}>
              {entries.length} photo{entries.length !== 1 ? 's' : ''}
            </Text>
          </View>
          <Pressable
            onPress={toggleTheme}
            style={styles.themeToggleButton}
          >
            <Ionicons 
              name={theme === 'dark' ? 'sunny' : 'moon'} 
              size={24} 
              color={theme === 'dark' ? '#fff' : '#1f2937'} 
            />
          </Pressable>
        </View>
      </SafeAreaView>

      {/* List */}
      <FlatList
        data={entries}
        renderItem={renderEntry}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={
          <View style={[styles.footer, themeAwareStyles.border]}>
            <Text style={[styles.footerText, themeAwareStyles.textLight]}>Travel Journal • Home</Text>
          </View>
        }
        scrollEnabled={true}
      />
    </View>
  );
}
