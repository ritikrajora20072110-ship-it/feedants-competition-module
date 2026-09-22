import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

export const JudgeCard = ({ judge, currentLang, t, onPlayIntro }) => {
  const isHi = currentLang === 'hi';
  const name = (isHi && judge?.nameHi) ? judge.nameHi : (judge?.name || 'Manju Dubey');
  const title = (isHi && judge?.titleHi) ? judge.titleHi : (judge?.title || 'Professional Kathak Dancer');
  const experience = (isHi && judge?.experienceHi) ? judge.experienceHi : (judge?.experience || '12+ Years of Experience');
  const avatarUrl = judge?.avatarUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80';

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Judge Avatar */}
        <Image source={{ uri: avatarUrl }} style={styles.avatar} resizeMode="cover" />

        {/* Judge Info */}
        <View style={styles.infoCol}>
          <Text style={styles.judgeTag}>{t.judge}</Text>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.experience}>{experience}</Text>
        </View>

        {/* Intro Video Trigger */}
        <TouchableOpacity
          style={styles.videoAction}
          onPress={() => onPlayIntro(judge?.introVideoUrl || '', `${name} - ${t.introVideo}`)}
          activeOpacity={0.7}
        >
          <View style={styles.playCircle}>
            <Ionicons name="play" size={16} color="#0D9488" style={{ marginLeft: 2 }} />
          </View>
          <Text style={styles.videoText}>{t.introVideo}</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: theme.spacing.md,
    gap: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  infoCol: {
    flex: 1,
    justifyContent: 'center',
  },
  judgeTag: {
    fontSize: 11,
    color: theme.colors.textMuted,
    marginBottom: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  title: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 1,
  },
  experience: {
    fontSize: 11,
    color: theme.colors.textMuted,
    marginTop: 1,
  },
  videoAction: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  playCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F6F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  videoText: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
});
