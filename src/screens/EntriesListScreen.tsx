import React from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  ListRenderItem,
  StatusBar,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { TabsParamList } from '../navigation/RootNavigator';
import { Entry } from '../types/Entry';
import { entriesListScreenStyles as styles } from '../styles/EntriesListScreenStyle';
import { useEntries } from '../contexts/EntriesContext';

type Props = BottomTabScreenProps<TabsParamList, 'EntriesList'>;

export default function EntriesListScreen({ navigation }: Props) {
  const { entries, loadEntries } = useEntries();

  useFocusEffect(
    React.useCallback(() => {
      // Refresh entries when screen is focused
      loadEntries();
    }, [loadEntries])
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
      <Text style={styles.entryDate}>{formatDate(new Date(item.createdAt))}</Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No entries yet</Text>
      <Text style={styles.emptySubtext}>
        Tap "+ Add" to take or select a picture for your first entry
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
          <Pressable
            style={styles.addButton}
            onPress={() => (navigation.getParent() as any).navigate('TravelEntry')}
          >
            <Text style={styles.addButtonText}>+ Add</Text>
          </Pressable>
        </View>
      </View>

      {/* Entries List */}
      <FlatList
        data={entries}
        renderItem={renderEntry}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.footerText}>Travel Journal • Entries</Text>
          </View>
        }
        scrollEnabled={true}
      />
    </View>
  );
}
