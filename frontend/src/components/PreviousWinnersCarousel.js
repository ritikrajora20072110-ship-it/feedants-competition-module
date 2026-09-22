import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

export const PreviousWinnersCarousel = ({ winners, currentLang, t, onPlayWinnerVideo }) => {
  const isHi = currentLang === 'hi';

  const defaultWinners = [
    {
      name: 'Riya Shah',
      rankText: '1st Winner',
      rankTextHi: 'प्रथम विजेता',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
    {
      name: 'Aarav Mehta',
      rankText: '1st Winner',
      rankTextHi: 'प्रथम विजेता',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    },
    {
      name: 'Neha Verma',
      rankText: '2nd Winner',
      rankTextHi: 'द्वितीय विजेता',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    },
    {
      name: 'Ishita Cho',
      rankText: '3rd Winner',
      rankTextHi: 'तृतीय विजेता',
      avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    },
  ];

  const winnerList = winners && winners.length > 0 ? winners : defaultWinners;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t.previousWinners}</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {winnerList.map((winner, index) => {
          const rankText = (isHi && winner.rankTextHi) ? winner.rankTextHi : winner.rankText;
          return (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => onPlayWinnerVideo(winner.videoUrl, `${winner.name} - Winning Performance`)}
              activeOpacity={0.8}
            >
              <View style={styles.imageWrapper}>
                <Image source={{ uri: winner.avatarUrl }} style={styles.thumbnail} resizeMode="cover" />
                <View style={styles.playOverlay}>
                  <Ionicons name="play" size={14} color="#0D9488" style={{ marginLeft: 2 }} />
                </View>
              </View>

              <View style={styles.textWrapper}>
                <Text style={styles.name} numberOfLines={1}>{winner.name}</Text>
                <Text style={styles.rank}>{rankText}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.white,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: 10,
  },
  scrollContainer: {
    paddingHorizontal: theme.spacing.lg,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 6,
    gap: 8,
    minWidth: 145,
  },
  imageWrapper: {
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  playOverlay: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  rank: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0D9488',
    marginTop: 2,
  },
});
