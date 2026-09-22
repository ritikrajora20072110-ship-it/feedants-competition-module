import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

export const AdBanner = ({ t }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Ionicons name="megaphone-outline" size={16} color={theme.colors.textMuted} style={{ marginRight: 6 }} />
        <Text style={styles.text}>{t.adHere}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.white,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    paddingVertical: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textMuted,
  },
});
