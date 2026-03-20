import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/RootNavigator';
import { Entry } from '../types/Entry';
import { useEntries } from '../contexts/EntriesContext';
import { useTheme } from '../contexts/ThemeContext';
import { entryDetailScreenStyles as styles } from '../styles/EntryDetailScreenStyle';
import { getThemeAwareStyles } from '../styles/themeAwareStyles';

type Props = NativeStackScreenProps<RootStackParamList, 'EntryDetail'>;

export default function EntryDetailScreen({ route, navigation }: Props) {
  const { entryId } = route.params;
  const { entries, removeEntry } = useEntries();
  const { theme } = useTheme();
  const themeAwareStyles = React.useMemo(() => getThemeAwareStyles(theme), [theme]);

  const entry = entries.find((e) => e.id === entryId);
  const [isDeleting, setIsDeleting] = React.useState(false);

  if (!entry) {
    return (
      <View style={[styles.container, themeAwareStyles.container]}>
        <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
        <Text style={[styles.errorText, themeAwareStyles.text]}>Entry not found</Text>
      </View>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this entry?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            setIsDeleting(true);
            try {
              await removeEntry(entry.id);
              navigation.goBack();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete entry');
              setIsDeleting(false);
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={[styles.container, themeAwareStyles.container]}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: entry.imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        {/* Details Container */}
        <View style={[styles.detailsContainer, themeAwareStyles.card]}>
          {/* Title */}
          <Text style={[styles.title, themeAwareStyles.title]}>{entry.title}</Text>

          {/* Date */}
          <View style={styles.dateContainer}>
            <Ionicons name="calendar" size={16} color={themeAwareStyles.textMuted.color} />
            <Text style={[styles.date, themeAwareStyles.textMuted]}>
              {formatDate(new Date(entry.createdAt))}
            </Text>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, themeAwareStyles.text]}>Description</Text>
            <Text style={[styles.description, themeAwareStyles.textMuted]}>
              {entry.description}
            </Text>
          </View>

          {/* Location */}
          {entry.address && (
            <View style={styles.section}>
              <View style={styles.locationHeader}>
                <Ionicons name="location-sharp" size={16} color="#FF6B6B" />
                <Text style={[styles.sectionTitle, themeAwareStyles.text]}>Location</Text>
              </View>
              <View style={[styles.locationBox, themeAwareStyles.border]}>
                {entry.address.street && (
                  <Text style={styles.locationText}>
                    {entry.address.street}
                  </Text>
                )}
                {(entry.address.city || entry.address.region) && (
                  <Text style={styles.locationText}>
                    {[entry.address.city, entry.address.region].filter(Boolean).join(', ')}
                  </Text>
                )}
                {entry.address.country && (
                  <Text style={styles.locationText}>
                    {entry.address.country}
                  </Text>
                )}
                {entry.address.postalCode && (
                  <Text style={styles.locationText}>
                    {entry.address.postalCode}
                  </Text>
                )}
              </View>
            </View>
          )}

          {/* Delete Button */}
          <Pressable
            style={({ pressed }) => [
              styles.deleteButton,
              pressed && styles.deleteButtonPressed,
              isDeleting && styles.deleteButtonDisabled,
            ]}
            onPress={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Ionicons name="trash" size={18} color="#fff" />
                <Text style={styles.deleteButtonText}>Delete Entry</Text>
              </>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
