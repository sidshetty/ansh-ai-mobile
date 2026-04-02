import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeInRight, FadeInUp, useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';

const { width } = Dimensions.get('window');

const STYLES = [
  { id: '1', name: 'NORDIC', image: 'https://images.unsplash.com/photo-1556912170-45244181fcd7?q=80&w=400&auto=format&fit=crop' },
  { id: '2', name: 'INDUSTRIAL', image: 'https://images.unsplash.com/photo-1556911220-e15224bbbe39?q=80&w=400&auto=format&fit=crop' },
  { id: '3', name: 'MINIMAL', image: 'https://images.unsplash.com/photo-1556912167-4554c11ef362?q=80&w=400&auto=format&fit=crop' },
  { id: '4', name: 'CLASSIC', image: 'https://images.unsplash.com/photo-1556912170-45244181fcd7?q=80&w=400&auto=format&fit=crop' },
];

const RECENT_PROJECTS = [
  { id: 'a', title: 'Modern Studio', date: '2 days ago', image: 'https://images.unsplash.com/photo-1556911220-e15224bbbe39?q=80&w=400' },
  { id: 'b', title: 'Summer House', date: '1 week ago', image: 'https://images.unsplash.com/photo-1556912167-4554c11ef362?q=80&w=400' },
  { id: 'c', title: 'Urban Loft', date: '3 weeks ago', image: 'https://images.unsplash.com/photo-1556912170-45244181fcd7?q=80&w=400' },
  { id: 'd', title: 'Cozy Corner', date: '1 month ago', image: 'https://images.unsplash.com/photo-1556911220-e15224bbbe39?q=80&w=400' },
];

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(withTiming(1.15, { duration: 1500 }), -1, true);
  }, []);

  const animatedFabStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const renderStyleItem = ({ item, index }: { item: typeof STYLES[0], index: number }) => (
    <Animated.View entering={FadeInRight.delay(index * 100 + 400).duration(800)}>
      <TouchableOpacity activeOpacity={0.9} style={styles.styleCard}>
        <Image source={{ uri: item.image }} style={styles.styleImage} />
        <View style={styles.styleOverlay}>
          <Text style={styles.styleName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  const renderProjectItem = (project: typeof RECENT_PROJECTS[0], index: number) => (
    <Animated.View key={project.id} entering={FadeInUp.delay(index * 100 + 800).duration(800)} style={styles.projectItem}>
      <TouchableOpacity activeOpacity={0.9} style={styles.projectCard}>
        <Image source={{ uri: project.image }} style={styles.projectImage} />
        <View style={styles.projectInfo}>
          <Text style={styles.projectTitle}>{project.title}</Text>
          <Text style={styles.projectDate}>{project.date}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingTop: insets.top + 20, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Design Lover</Text>
            <Text style={styles.welcomeText}>Ready to reimagine?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle" size={40} color="#1A1A1A" />
          </TouchableOpacity>
        </View>

        <Animated.View entering={FadeInUp.delay(200).duration(800)}>
          <TouchableOpacity activeOpacity={0.9} style={styles.heroCard}>
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>MAGIC UPLOAD</Text>
              <Text style={styles.heroSubtitle}>Transform your kitchen sketch into 3D</Text>
              <View style={styles.heroBadge}>
                <MaterialIcons name="auto-awesome" size={16} color="white" />
                <Text style={styles.heroBadgeText}>AI POWERED</Text>
              </View>
            </View>
            <MaterialIcons name="camera-alt" size={48} color="rgba(255,255,255,0.2)" style={styles.heroIcon} />
          </TouchableOpacity>
        </Animated.View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>STYLES</Text>
          <TouchableOpacity><Text style={styles.viewAllText}>View All</Text></TouchableOpacity>
        </View>

        <FlatList
          data={STYLES}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderStyleItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.styleList}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>RECENT PROJECTS</Text>
          <TouchableOpacity><Text style={styles.viewAllText}>Manage</Text></TouchableOpacity>
        </View>

        <View style={styles.projectGrid}>
          {RECENT_PROJECTS.map((project, index) => renderProjectItem(project, index))}
        </View>
      </ScrollView>

      <Animated.View style={[styles.fabContainer, animatedFabStyle, { bottom: insets.bottom + 20 }]}>
        <TouchableOpacity style={styles.fab}>
          <MaterialIcons name="auto-awesome" size={24} color="white" />
          <Text style={styles.fabText}>GENERATE</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  profileButton: {
    padding: 2,
  },
  heroCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    overflow: 'hidden',
  },
  heroContent: {
    flex: 1,
  },
  heroTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1,
  },
  heroSubtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 12,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E2B31E',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 4,
  },
  heroBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  heroIcon: {
    marginLeft: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: '#1A1A1A',
    letterSpacing: 2,
  },
  viewAllText: {
    fontSize: 12,
    color: '#E2B31E',
    fontWeight: 'bold',
  },
  styleList: {
    paddingBottom: 10,
    marginBottom: 20,
    gap: 12,
  },
  styleCard: {
    width: 130,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#EEE',
  },
  styleImage: {
    width: '100%',
    height: '100%',
  },
  styleOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    padding: 12,
  },
  styleName: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  projectGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  projectItem: {
    width: (width - 52) / 2,
  },
  projectCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  projectImage: {
    width: '100%',
    height: 120,
  },
  projectInfo: {
    padding: 12,
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  projectDate: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  fabContainer: {
    position: 'absolute',
    alignSelf: 'center',
    shadowColor: '#E2B31E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  fab: {
    backgroundColor: '#E2B31E',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fabText: {
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
