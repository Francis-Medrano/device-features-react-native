import { StatusBar } from 'expo-status-bar';
import { Text, View, FlatList, Image, Pressable, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useCallback } from 'react';
import { TabsParamList } from '../navigation/RootNavigator';
import { homeScreenStyles as styles } from '../styles/HomeScreenStyle';
import { useEntries } from '../contexts/EntriesContext';
import { Entry } from '../types/Entry';

type Props = BottomTabScreenProps<TabsParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { entries, loadEntries, removeEntry } = useEntries();

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
    <View style={styles.card}>
      <Image
        source={{ uri: item.imageUri }}
        style={styles.cardImage}
      />
      <View style={styles.cardLocation}>
        <Text style={styles.cardLocationText}>
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
      <Text style={styles.emptyText}>
        No Entries yet
      </Text>
      <Text style={styles.emptySubtext}>
        Add a travel entry to see photos with location here.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.title}>Captured Photos</Text>
            <Text style={styles.subtitle}>
              {entries.length} photo{entries.length !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={entries}
        renderItem={renderEntry}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.footerText}>Travel Journal • Home</Text>
          </View>
        }
        scrollEnabled={true}
      />
    </View>
  );
}
