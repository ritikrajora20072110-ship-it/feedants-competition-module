import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

export const UserReviewsSection = ({ onOpenReviews, t }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        onPress={onOpenReviews}
        activeOpacity={0.7}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={20} color={theme.colors.textPrimary} />

        <View style={styles.textGroup}>
          <Text style={styles.title}>{t.hearFromUsers}</Text>
          <Text style={styles.subtitle}>{t.seeWhatParticipantsSay}</Text>
        </View>

        <Ionicons name="chevron-forward" size={18} color={theme.colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.xs,
    backgroundColor: theme.colors.white,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  textGroup: {
    flex: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 11,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
});
