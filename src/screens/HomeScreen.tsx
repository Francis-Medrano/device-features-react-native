import { StatusBar } from 'expo-status-bar';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { homeScreenStyles as styles } from '../styles/HomeScreenStyle';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.title}>Device Features</Text>
              <Text style={styles.subtitle}>Explore your device capabilities</Text>
            </View>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => navigation.navigate('AddEntry')}
            >
              <Text style={styles.addButtonText}>+ Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Feature Cards */}
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>📱 Device Info</Text>
            <Text style={styles.cardDescription}>
              View detailed information about your device
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Explore</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>🎨 Features</Text>
            <Text style={styles.cardDescription}>
              Discover available device features
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Explore</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>📸 Photo Capture</Text>
            <Text style={styles.cardDescription}>
              Take and save photos with location
            </Text>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('PhotoCapture')}
            >
              <Text style={styles.buttonText}>Explore</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>⚙️ Settings</Text>
            <Text style={styles.cardDescription}>
              Configure your preferences
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Explore</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>ℹ️ About</Text>
            <Text style={styles.cardDescription}>
              Learn more about this app
            </Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Explore</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made with ❤️ for exploring device features
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
