import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

export const DisclaimerBanner = ({ disclaimer, currentLang, t }) => {
  const isHi = currentLang === 'hi';
  const text = disclaimer
    ? (isHi && disclaimer.hi) ? disclaimer.hi : disclaimer.en
    : t.disclaimer;

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        <Ionicons name="information-circle-outline" size={16} color="#0D9488" style={{ marginRight: 6 }} />
        <Text style={styles.text}>{text}</Text>
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
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F0FDFA',
    borderWidth: 1,
    borderColor: '#CCFBF1',
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  text: {
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
    color: '#0D9488',
    fontWeight: '500',
  },
});
