import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');

export default function VideoDemoScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // A high-quality interior design / AI demo video from YouTube
  const VIDEO_ID = 'dQw4w9WgXcQ'; // Replace with actual Ansh AI demo ID
  const embedUrl = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&controls=1&modestbranding=1&rel=0`;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Background to prevent white flash */}
      <View style={styles.videoBackground}>
        <WebView
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          allowsFullscreenVideo={true}
          source={{ uri: embedUrl }}
        />
      </View>

      <TouchableOpacity 
        onPress={() => router.back()}
        style={[styles.closeButton, { top: insets.top + 10 }]}
      >
        <MaterialIcons name="close" size={32} color="white" />
      </TouchableOpacity>

      <View style={[styles.overlay, { bottom: insets.bottom + 40 }]}>
        <Text style={styles.title}>AI IN ACTION</Text>
        <Text style={styles.subtitle}>See how we transform sketches into photorealistic kitchens in seconds.</Text>
        
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => router.replace('/login')}
          style={styles.ctaButton}
        >
          <Text style={styles.ctaButtonText}>START YOUR OWN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  videoBackground: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 4,
  },
  overlay: {
    position: 'absolute',
    left: 30,
    right: 30,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    color: '#E2B31E',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  ctaButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
