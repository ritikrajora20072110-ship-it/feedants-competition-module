import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

export const HeroSection = ({ competition, userState, currentLang, t }) => {
  const isHi = currentLang === 'hi';
  const title = (isHi && competition.titleHi) ? competition.titleHi : competition.title;
  const isRegistered = userState?.isRegistered;
  const isFull = competition.currentParticipants >= competition.maxParticipants;

  return (
    <View style={styles.container}>
      {/* Title & Status Badge */}
      <View style={styles.titleRow}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>

        {isRegistered ? (
          <View style={styles.registeredBadge}>
            <Ionicons name="checkmark-circle" size={14} color="#0D9488" />
            <Text style={styles.registeredBadgeText}>{t.registeredBadge}</Text>
          </View>
        ) : isFull ? (
          <View style={styles.soldOutBadge}>
            <Text style={styles.soldOutBadgeText}>{t.soldOutBadge}</Text>
          </View>
        ) : null}
      </View>

      {/* Tags Row */}
      <View style={styles.tagsRow}>
        <View style={styles.tagPill}>
          <Text style={styles.tagText}>{isHi ? 'नृत्य' : 'Dance'}</Text>
        </View>

        <View style={styles.tagPill}>
          <Text style={styles.tagText}>{isHi ? 'मल्टी-विन' : 'Multi-Win'}</Text>
        </View>

        <View style={[styles.tagPill, styles.certificateTag]}>
          <Ionicons name="trophy-outline" size={14} color="#0D9488" style={{ marginRight: 4 }} />
          <Text style={styles.certificateText}>
            {isHi ? 'विजेताओं को प्रमाण पत्र' : 'Winners get certificate'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    backgroundColor: theme.colors.white,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    letterSpacing: -0.3,
  },
  registeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E6F9F6',
    borderWidth: 1,
    borderColor: '#B2EBE2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
  },
  registeredBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0D9488',
  },
  soldOutBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
  },
  soldOutBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
    marginTop: theme.spacing.sm,
  },
  tagPill: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  certificateTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: 2,
  },
  certificateText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0D9488',
  },
});
