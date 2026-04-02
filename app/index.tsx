import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp, FadeIn } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

// A high-quality photorealistic kitchen image - using a brighter version
const KITCHEN_IMAGE = 'https://images.unsplash.com/photo-1556912170-45244181fcd7?q=80&w=2070&auto=format&fit=crop';

export default function WelcomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleStart = () => {
    router.push('/login');
  };

  const handleWatchDemo = () => {
    router.push('/video-demo');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ImageBackground
        source={{ uri: KITCHEN_IMAGE }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Light Overlay for consistency with Dashboard */}
        <View style={[styles.overlay, { paddingTop: insets.top, paddingBottom: insets.bottom + 20 }]}>
          
          <Animated.View 
            entering={FadeInDown.delay(200).duration(1000)}
            style={styles.header}
          >
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>ANSH AI</Text>
              <MaterialIcons name="auto-awesome" size={24} color="#E2B31E" style={styles.sparkIcon} />
            </View>
          </Animated.View>

          <View style={styles.content}>
            <Animated.View 
              entering={FadeInUp.delay(400).duration(1000)}
              style={styles.heroContainer}
            >
              <Text style={styles.headline}>REIMAGINE{"\n"}YOUR KITCHEN</Text>
              <View style={styles.line} />
              <Text style={styles.subheadline}>
                Photorealistic 3D visualization{"\n"}driven by state-of-the-art AI.
              </Text>
            </Animated.View>
          </View>

          <Animated.View 
            entering={FadeInDown.delay(800).duration(1000)}
            style={styles.footer}
          >
            <TouchableOpacity 
              activeOpacity={0.8} 
              onPress={handleStart}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>START TRANSFORMATION</Text>
              <MaterialIcons name="arrow-forward" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity 
              activeOpacity={0.6}
              onPress={handleWatchDemo}
              style={styles.secondaryButton}
            >
              <Text style={styles.secondaryButtonText}>WATCH AI IN ACTION</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.Text 
            entering={FadeIn.delay(1200).duration(1000)}
            style={styles.attribution}
          >
            Scandinavian Design • Modern Utility • AI Power
          </Animated.Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(248, 248, 248, 0.7)', // Light overlay matching Dashboard background
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '300',
    color: '#1A1A1A',
    letterSpacing: 6,
  },
  sparkIcon: {
    marginTop: -2,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  heroContainer: {
    alignItems: 'flex-start',
  },
  headline: {
    fontSize: 42,
    fontWeight: '900',
    color: '#1A1A1A',
    lineHeight: 48,
    letterSpacing: 1,
    textAlign: 'left',
  },
  line: {
    height: 4,
    width: 60,
    backgroundColor: '#E2B31E',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 2,
  },
  subheadline: {
    fontSize: 18,
    color: '#444',
    lineHeight: 26,
    fontWeight: '400',
  },
  footer: {
    gap: 16,
    marginBottom: 40,
  },
  primaryButton: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 18,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  secondaryButton: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#1A1A1A',
    borderRadius: 12,
  },
  secondaryButtonText: {
    color: '#1A1A1A',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  attribution: {
    textAlign: 'center',
    color: '#999',
    fontSize: 10,
    letterSpacing: 1,
    marginBottom: 10,
    fontWeight: '500',
  },
});
