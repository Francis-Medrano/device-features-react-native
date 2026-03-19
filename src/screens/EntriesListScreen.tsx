import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
  StatusBar,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { Entry } from '../types/Entry';
import { entriesListScreenStyles as styles } from '../styles/EntriesListScreenStyle';

type Props = NativeStackScreenProps<RootStackParamList, 'EntriesList'>;

export default function EntriesListScreen({ navigation }: Props) {
  const [entries, setEntries] = useState<Entry[]>([
    {
      id: '1',
      title: 'First Entry',
      description: 'This is a sample entry to demonstrate the list',
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Second Entry',
      description: 'Another entry in the list',
      createdAt: new Date(),
    },
  ]);

  useFocusEffect(
    React.useCallback(() => {
      // Refresh data when returning from AddEntry screen
      // This is where you would fetch fresh data
    }, [])
  );

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderEntry: ListRenderItem<Entry> = ({ item }) => (
    <View style={styles.entryCard}>
      <Text style={styles.entryTitle}>{item.title}</Text>
      <Text style={styles.entryDescription}>{item.description}</Text>
      <Text style={styles.entryDate}>{formatDate(item.createdAt)}</Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No entries yet</Text>
      <Text style={styles.emptySubtext}>
        Tap the "Add Entry" button to create your first entry
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={styles.title}>Entries</Text>
            <Text style={styles.subtitle}>
              {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddEntry')}
          >
            <Text style={styles.addButtonText}>+ Add</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Entries List */}
      <FlatList
        data={entries}
        renderItem={renderEntry}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        scrollEnabled={true}
      />
    </View>
  );
}
