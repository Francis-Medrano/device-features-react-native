import { EntriesProvider } from './src/contexts/EntriesContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <ThemeProvider>
      <EntriesProvider>
        <RootNavigator />
      </EntriesProvider>
    </ThemeProvider>
  );
}
