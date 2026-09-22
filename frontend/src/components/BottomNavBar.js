import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { theme } from '../constants/theme';

export const BottomNavBar = ({ activeTab = 'competitions', onSelectTab, t, userAvatar }) => {
  return (
    <View style={styles.container}>
      {/* Home */}
      <TouchableOpacity
        style={styles.tab}
        onPress={() => onSelectTab && onSelectTab('home')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="home-outline"
          size={20}
          color={activeTab === 'home' ? '#086972' : theme.colors.textMuted}
        />
        <Text style={[styles.tabLabel, activeTab === 'home' && styles.tabLabelActive]}>
          {t.home}
        </Text>
      </TouchableOpacity>

      {/* Explore */}
      <TouchableOpacity
        style={styles.tab}
        onPress={() => onSelectTab && onSelectTab('explore')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="search-outline"
          size={20}
          color={activeTab === 'explore' ? '#086972' : theme.colors.textMuted}
        />
        <Text style={[styles.tabLabel, activeTab === 'explore' && styles.tabLabelActive]}>
          {t.explore}
        </Text>
      </TouchableOpacity>

      {/* Center Create Button (+) */}
      <View style={styles.centerButtonWrapper}>
        <TouchableOpacity
          style={styles.centerButton}
          onPress={() => onSelectTab && onSelectTab('create')}
          activeOpacity={0.85}
        >
          <Feather name="plus" size={24} color={theme.colors.white} />
        </TouchableOpacity>
      </View>

      {/* Competitions (Active) */}
      <TouchableOpacity
        style={styles.tab}
        onPress={() => onSelectTab && onSelectTab('competitions')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="trophy"
          size={20}
          color={activeTab === 'competitions' ? '#086972' : theme.colors.textMuted}
        />
        <Text style={[styles.tabLabel, activeTab === 'competitions' && styles.tabLabelActive]}>
          {t.competitions}
        </Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        style={styles.tab}
        onPress={() => onSelectTab && onSelectTab('profile')}
        activeOpacity={0.7}
      >
        <Image
          source={{
            uri:
              userAvatar ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
          }}
          style={[styles.profileAvatar, activeTab === 'profile' && styles.profileAvatarActive]}
        />
        <Text style={[styles.tabLabel, activeTab === 'profile' && styles.tabLabelActive]}>
          {t.profile}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 58,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  tabLabelActive: {
    color: '#086972',
    fontWeight: '800',
  },
  centerButtonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#086972',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#086972',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  profileAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  profileAvatarActive: {
    borderWidth: 1.5,
    borderColor: '#086972',
  },
});
