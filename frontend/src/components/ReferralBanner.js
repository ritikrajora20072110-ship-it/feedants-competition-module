import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

export const ReferralBanner = ({ referralConfig, t, onShowToast }) => {
  const [copied, setCopied] = useState(false);

  const referralUrl = referralConfig
    ? `${referralConfig.baseUrl || 'https://feedants.com/r/'}${referralConfig.code || 'referral123'}`
    : 'https://feedants.com/r/referral123';
  const rewardAmount = referralConfig?.rewardAmount || 10;

  const handleCopy = () => {
    setCopied(true);
    if (onShowToast) {
      onShowToast(t.copiedToast);
    }
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Top Header Row */}
        <View style={styles.headerRow}>
          <View style={styles.titleGroup}>
            <View style={styles.iconCircle}>
              <Ionicons name="megaphone" size={16} color="#0D9488" />
            </View>
            <Text style={styles.title}>{t.referAndEarn}</Text>
          </View>

          {/* Refer Now Button */}
          <TouchableOpacity
            style={styles.referNowBtn}
            onPress={handleCopy}
            activeOpacity={0.8}
          >
            <Text style={styles.referNowText}>{t.referNow}</Text>
          </TouchableOpacity>
        </View>

        {/* URL Input & Copy Row */}
        <View style={styles.inputRow}>
          <View style={styles.urlBox}>
            <Text style={styles.urlText} numberOfLines={1}>{referralUrl}</Text>
          </View>

          <TouchableOpacity
            style={[styles.copyBtn, copied && styles.copyBtnSuccess]}
            onPress={handleCopy}
            activeOpacity={0.7}
          >
            <Text style={[styles.copyText, copied && styles.copyTextSuccess]}>
              {copied ? '✓ Copied' : t.copyLink}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Footer Subtext */}
        <View style={styles.footerRow}>
          <Text style={styles.earningText}>
            {t.referralEarning.replace('{amount}', rewardAmount)}
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
    backgroundColor: '#EBF9F3',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: '#C6EFE0',
    padding: 14,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#CCFBF1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  referNowBtn: {
    backgroundColor: '#086972',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.sm,
  },
  referNowText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.white,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  urlBox: {
    flex: 1,
    height: 34,
    backgroundColor: theme.colors.white,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D1EAE0',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  urlText: {
    fontSize: 11,
    color: theme.colors.textSecondary,
  },
  copyBtn: {
    height: 34,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.white,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#D1EAE0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  copyBtnSuccess: {
    backgroundColor: '#D1FAE5',
    borderColor: '#A7F3D0',
  },
  copyText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  copyTextSuccess: {
    color: '#065F46',
  },
  footerRow: {
    alignItems: 'flex-end',
    marginTop: 6,
  },
  earningText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#086972',
  },
});
