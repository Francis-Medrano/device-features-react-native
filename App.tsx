import { EntriesProvider } from './src/contexts/EntriesContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <EntriesProvider>
      <RootNavigator />
    </EntriesProvider>
  );
}
