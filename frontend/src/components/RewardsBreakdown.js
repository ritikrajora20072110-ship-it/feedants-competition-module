import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

export const RewardsBreakdown = ({ rewards, currentLang, t }) => {
  const isHi = currentLang === 'hi';

  const defaultRewards = [
    { rank: 1, title: '1st Winner', titleHi: 'प्रथम विजेता', amount: 550, iconType: 'trophy' },
    { rank: 2, title: '2nd Winner', titleHi: '2nd Winner', amount: 300, iconType: 'medal-silver' },
    { rank: 3, title: '3rd Winner', titleHi: '3rd Winner', amount: 240, iconType: 'medal-bronze' },
    { rank: 4, title: '4th Winner', titleHi: '4th Winner', amount: 200, iconType: 'star' },
    { rank: 5, title: '5th Winner', titleHi: '5th Winner', amount: 130, iconType: 'star' },
    { rank: 6, title: '6th Winner', titleHi: '6th Winner', amount: 80, iconType: 'star' },
  ];

  const rewardList = rewards && rewards.length > 0 ? rewards : defaultRewards;

  const renderIcon = (iconType, rank) => {
    if (rank === 1) {
      return <Ionicons name="trophy" size={16} color="#F59E0B" />;
    }
    if (rank === 2) {
      return <Ionicons name="medal" size={16} color="#94A3B8" />;
    }
    if (rank === 3) {
      return <Ionicons name="medal" size={16} color="#D97706" />;
    }
    return <Ionicons name="star-outline" size={16} color="#0D9488" />;
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.title}>{t.rewardsTitle}</Text>
        <Text style={styles.subtitle}>{t.allPositions}</Text>
      </View>

      {/* Rewards List */}
      <View style={styles.list}>
        {rewardList.map((item, index) => {
          const title = (isHi && item.titleHi) ? item.titleHi : item.title;
          return (
            <View key={index} style={styles.row}>
              <View style={styles.leftGroup}>
                <View style={styles.iconContainer}>
                  {renderIcon(item.iconType, item.rank)}
                </View>
                <Text style={styles.rankTitle}>{title}</Text>
              </View>

              <Text style={styles.amount}>₹ {item.amount}</Text>
            </View>
          );
        })}
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: theme.colors.textMuted,
  },
  list: {
    gap: 10,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  leftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconContainer: {
    width: 20,
    alignItems: 'center',
  },
  rankTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  amount: {
    fontSize: 14,
    fontWeight: '800',
    color: '#086972',
  },
});
