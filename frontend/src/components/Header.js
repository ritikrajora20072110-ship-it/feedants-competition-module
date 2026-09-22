import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

export const Header = ({ onBack, currentLang, onToggleLang, t, onOpenStateSwitcher }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onBack}
          style={styles.backButton}
          activeOpacity={0.7}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={22} color={theme.colors.textPrimary} />
          <Text style={styles.backText}>{t.goBack}</Text>
        </TouchableOpacity>

        <View style={styles.rightActions}>
          {/* Quick Demo State Switcher button */}
          <TouchableOpacity
            onPress={onOpenStateSwitcher}
            style={styles.demoPill}
            activeOpacity={0.7}
          >
            <Ionicons name="options-outline" size={14} color={theme.colors.primary} />
            <Text style={styles.demoText}>Demo</Text>
          </TouchableOpacity>

          {/* Language Switcher ENG / हिंदी */}
          <View style={styles.langToggle}>
            <TouchableOpacity
              style={[styles.langOption, currentLang === 'en' && styles.langOptionActive]}
              onPress={() => onToggleLang('en')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.langText,
                  currentLang === 'en' && styles.langTextActive,
                ]}
              >
                ENG
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.langOption, currentLang === 'hi' && styles.langOptionActive]}
              onPress={() => onToggleLang('hi')}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.langText,
                  currentLang === 'hi' && styles.langTextActive,
                ]}
              >
                हिंदी
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.white,
  },
  container: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.borderLight,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  backText: {
    fontSize: theme.typography.sizes.md,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  demoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(8, 105, 114, 0.2)',
  },
  demoText: {
    fontSize: 11,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  langToggle: {
    flexDirection: 'row',
    backgroundColor: '#EEF2F6',
    borderRadius: theme.borderRadius.full,
    padding: 2,
  },
  langOption: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  langOptionActive: {
    backgroundColor: theme.colors.primary,
  },
  langText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  langTextActive: {
    color: theme.colors.white,
  },
});
