import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const KITCHEN_IMAGE = 'https://images.unsplash.com/photo-1556912170-45244181fcd7?q=80&w=2070&auto=format&fit=crop';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleLogin = () => {
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ImageBackground
        source={{ uri: KITCHEN_IMAGE }}
        style={styles.backgroundImage}
        blurRadius={5}
      >
        <View style={styles.overlay}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.content}
          >
            <TouchableOpacity 
              onPress={() => router.back()}
              style={[styles.backButton, { top: insets.top + 10 }]}
            >
              <MaterialIcons name="arrow-back" size={28} color="#1A1A1A" />
            </TouchableOpacity>

            <Animated.View 
              entering={FadeInUp.delay(200).duration(800)}
              style={styles.header}
            >
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Enter your details to access your design studio.</Text>
            </Animated.View>

            <Animated.View 
              entering={FadeInDown.delay(400).duration(800)}
              style={styles.glassCard}
            >
              <View style={styles.inputContainer}>
                <MaterialIcons name="email" size={20} color="#666" />
                <TextInput 
                  placeholder="Email Address"
                  placeholderTextColor="#999"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <MaterialIcons name="lock" size={20} color="#666" />
                <TextInput 
                  placeholder="Password"
                  placeholderTextColor="#999"
                  style={styles.input}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                activeOpacity={0.8}
                onPress={handleLogin}
                style={styles.loginButton}
              >
                <Text style={styles.loginButtonText}>LOGIN</Text>
              </TouchableOpacity>

              {__DEV__ && (
                <TouchableOpacity 
                  activeOpacity={0.7}
                  onPress={() => router.replace('/(tabs)')}
                  style={styles.devBypassButton}
                >
                  <Text style={styles.devBypassText}>DEBUG: BYPASS LOGIN</Text>
                </TouchableOpacity>
              )}

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.socialButton}>
                  <FontAwesome name="apple" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <FontAwesome name="google" size={24} color="#DB4437" />
                </TouchableOpacity>
              </View>
            </Animated.View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>
              <TouchableOpacity>
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
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
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(248, 248, 248, 0.6)',
    paddingHorizontal: 30,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    zIndex: 10,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  glassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 16,
    height: 56,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  input: {
    flex: 1,
    color: '#1A1A1A',
    marginLeft: 10,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#E2B31E',
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#1A1A1A',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  devBypassButton: {
    marginTop: -12,
    marginBottom: 24,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(226, 179, 30, 0.3)',
    borderRadius: 8,
    borderStyle: 'dashed',
  },
  devBypassText: {
    color: '#E2B31E',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#EEE',
  },
  dividerText: {
    color: '#999',
    fontSize: 10,
    fontWeight: 'bold',
    marginHorizontal: 10,
    letterSpacing: 1,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  footerText: {
    color: '#666',
    fontSize: 14,
  },
  signUpText: {
    color: '#1A1A1A',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
