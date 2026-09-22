import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

export const PrizeAndSpotsCard = ({ competition, t }) => {
  const prizePool = competition.prizePool || 1500;
  const entryFee = competition.entryFee || 99;
  const current = competition.currentParticipants || 0;
  const max = competition.maxParticipants || 20;
  const spotsLeft = Math.max(0, max - current);
  const progressPercent = Math.min(100, Math.round((current / max) * 100));

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Prize Pool */}
        <View style={styles.col}>
          <Text style={styles.label}>{t.prizePool}</Text>
          <Text style={styles.prizeValue}>₹ {prizePool.toLocaleString('en-IN')}</Text>
        </View>

        {/* Entry Fee */}
        <View style={styles.col}>
          <Text style={styles.label}>{t.entryFee}</Text>
          <Text style={styles.feeValue}>₹ {entryFee}</Text>
        </View>

        {/* Spots Left & Progress */}
        <View style={[styles.col, styles.spotsCol]}>
          <View style={styles.spotsHeader}>
            <Ionicons name="people" size={14} color="#0D9488" />
            <Text style={styles.spotsLeftText}>
              {spotsLeft > 0
                ? t.spotsLeft.replace('{count}', spotsLeft)
                : t.spotsFull}
            </Text>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${Math.max(5, progressPercent)}%` }]} />
          </View>

          {/* Ratio */}
          <Text style={styles.ratioText}>
            {t.bookedRatio.replace('{current}', current).replace('{max}', max)}
          </Text>
        </View>
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
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  col: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    color: theme.colors.textMuted,
    marginBottom: 4,
  },
  prizeValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#086972',
  },
  feeValue: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  spotsCol: {
    flex: 1.3,
    alignItems: 'flex-start',
  },
  spotsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  spotsLeftText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0D9488',
  },
  progressBarBg: {
    width: '100%',
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0D9488',
    borderRadius: 3,
  },
  ratioText: {
    fontSize: 11,
    color: theme.colors.textSecondary,
  },
});
