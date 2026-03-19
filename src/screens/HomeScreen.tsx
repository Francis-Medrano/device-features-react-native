import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Device Features</Text>
          <Text style={styles.subtitle}>Explore your device capabilities</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    backgroundColor: '#6366f1',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0e7ff',
  },
  cardsContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#6366f1',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    marginTop: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
});
