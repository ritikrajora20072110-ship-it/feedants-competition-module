import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { theme } from '../constants/theme';

export const TrustSection = ({ onOpenPrizeVideo, t }) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {/* Left Video CTA Card */}
        <TouchableOpacity
          style={styles.videoCard}
          onPress={onOpenPrizeVideo}
          activeOpacity={0.8}
        >
          <View style={styles.playIconContainer}>
            <Ionicons name="play" size={16} color="#0D9488" style={{ marginLeft: 2 }} />
          </View>
          <View style={styles.videoCardText}>
            <Text style={styles.videoCardTitle}>{t.prizeMoneyQuestion}</Text>
            <Text style={styles.videoCardSubtitle}>{t.watchVideoPrompt}</Text>
          </View>
        </TouchableOpacity>

        {/* Right Trust Badges */}
        <View style={styles.trustColumn}>
          {/* Refund Policy */}
          <View style={styles.trustItem}>
            <Feather name="shield" size={15} color="#0F172A" />
            <Text style={styles.trustText}>{t.refundPolicy}</Text>
          </View>

          {/* Razorpay badge */}
          <View style={styles.trustItem}>
            <Feather name="shield" size={15} color="#0F172A" />
            <View style={styles.razorpayRow}>
              <Text style={styles.trustText}>{t.securePayments}</Text>
              <Text style={styles.razorpayBrand}> Razorpay</Text>
            </View>
          </View>
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
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  videoCard: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
    gap: 8,
  },
  playIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#CCFBF1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoCardText: {
    flex: 1,
  },
  videoCardTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    lineHeight: 14,
  },
  videoCardSubtitle: {
    fontSize: 10,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  trustColumn: {
    flex: 1,
    gap: 8,
    justifyContent: 'center',
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trustText: {
    fontSize: 10,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  razorpayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  razorpayBrand: {
    fontSize: 11,
    fontWeight: '900',
    fontStyle: 'italic',
    color: '#0C2340',
  },
});
