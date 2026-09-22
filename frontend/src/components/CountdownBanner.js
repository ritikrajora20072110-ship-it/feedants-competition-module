import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

export const CountdownBanner = ({ targetDate, label, t }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: '01',
    hours: '06',
    minutes: '28',
    seconds: '32',
    isExpired: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = targetDate ? new Date(targetDate).getTime() : Date.now() + 110000000;
      const difference = target - Date.now();

      if (difference <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00', isExpired: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        isExpired: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const displayLabel = label || t.registrationClosesIn;

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
        {/* Hourglass Icon */}
        <Ionicons name="hourglass-outline" size={18} color="#0D9488" style={{ marginRight: 6 }} />

        {/* Text & Timer */}
        <View style={styles.textGroup}>
          <Text style={styles.label}>{displayLabel}</Text>
          <Text style={styles.timer}>
            {`${timeLeft.days}d : ${timeLeft.hours}h : ${timeLeft.minutes}m : ${timeLeft.seconds}s`}
          </Text>
        </View>

        {/* Hurry Up Badge */}
        <View style={styles.hurryUpBadge}>
          <Ionicons name="timer-outline" size={14} color="#086972" style={{ marginRight: 3 }} />
          <Text style={styles.hurryUpText}>{t.hurryUp}</Text>
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
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E6F6F6',
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  textGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  timer: {
    fontSize: 13,
    fontWeight: '800',
    color: '#086972',
    letterSpacing: 0.2,
  },
  hurryUpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingLeft: 4,
  },
  hurryUpText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#086972',
  },
});
