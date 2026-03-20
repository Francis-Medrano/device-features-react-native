import React from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  ListRenderItem,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { TabsParamList } from '../navigation/RootNavigator';
import { Entry } from '../types/Entry';
import { entriesListScreenStyles as styles } from '../styles/EntriesListScreenStyle';
import { getThemeAwareStyles } from '../styles/themeAwareStyles';
import { useEntries } from '../contexts/EntriesContext';
import { useTheme } from '../contexts/ThemeContext';

type Props = BottomTabScreenProps<TabsParamList, 'EntriesList'>;

export default function EntriesListScreen({ navigation }: Props) {
  const { entries, loadEntries } = useEntries();
  const { theme } = useTheme();
  const themeAwareStyles = React.useMemo(() => getThemeAwareStyles(theme), [theme]);

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
    <View style={[styles.entryCard, themeAwareStyles.card]}>
      <Text style={[styles.entryTitle, themeAwareStyles.text]}>{item.title}</Text>
      <Text style={[styles.entryDescription, themeAwareStyles.textMuted]}>{item.description}</Text>
      <Text style={[styles.entryDate, themeAwareStyles.textLight]}>{formatDate(new Date(item.createdAt))}</Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={[styles.emptyText, themeAwareStyles.textMuted]}>No entries yet</Text>
      <Text style={[styles.emptySubtext, themeAwareStyles.textLight]}>
        Tap "+ Add" to take or select a picture for your first entry
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, themeAwareStyles.container]}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={theme === 'dark' ? '#1a1a1a' : '#f5f5f5'} />
      
      {/* Header */}
      <SafeAreaView edges={['top', 'left', 'right']} style={[styles.header, themeAwareStyles.header]}>
        <View style={styles.headerContent}>
          <View style={styles.headerText}>
            <Text style={[styles.title, themeAwareStyles.title]}>Entries</Text>
            <Text style={[styles.subtitle, themeAwareStyles.subtitle]}>
              {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
            <Pressable
              style={styles.addButton}
              onPress={() => (navigation.getParent() as any).navigate('TravelEntry')}
            >
              <Text style={styles.addButtonText}>+ Add</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>

      {/* Entries List */}
      <FlatList
        data={entries}
        renderItem={renderEntry}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={
          <View style={[styles.footer, themeAwareStyles.border]}>
            <Text style={[styles.footerText, themeAwareStyles.textLight]}>Travel Journal • Entries</Text>
          </View>
        }
        scrollEnabled={true}
      />
    </View>
  );
}
