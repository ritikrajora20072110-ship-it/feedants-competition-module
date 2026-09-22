import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export const ReviewsModal = ({ visible, reviews, currentLang, onClose, t }) => {
  const isHi = currentLang === 'hi';

  const defaultReviews = [
    {
      userName: 'Pooja Bhattacharya',
      userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
      rating: 5,
      comment: 'Feedants provided an incredible stage! The feedback from Manju Dubey ma’am was genuinely constructive and helped me improve my Mudras.',
      commentHi: 'फीडैंट्स ने एक अविश्वसनीय मंच प्रदान किया! मंजू दुबे मैम की प्रतिक्रिया वास्तव में रचनात्मक थी और इससे मुझे अपनी मुद्राओं में सुधार करने में मदद मिली।',
      competitionCategory: 'Classical Dance',
      badge: '1st Place Winner',
    },
    {
      userName: 'Vikramaditya Roy',
      userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80',
      rating: 5,
      comment: 'Smooth registration process and instant cash prize credited straight to UPI within 24 hours of result announcement. Highly recommended!',
      commentHi: 'सुचारू पंजीकरण प्रक्रिया और परिणाम घोषणा के 24 घंटों के भीतर सीधे UPI में तत्काल नकद पुरस्कार। अत्यधिक अनुशंसित!',
      competitionCategory: 'Kathak Solo',
      badge: 'Verified Participant',
    },
    {
      userName: 'Ananya Deshmukh',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
      rating: 5,
      comment: 'The transparent judging parameters and verified certificates make Feedants the best platform for budding artists in India.',
      commentHi: 'पारदर्शी निर्णय मानदंड और सत्यापित प्रमाण पत्र फीडैंट्स को भारत में उभरते कलाकारों के लिए सर्वश्रेष्ठ मंच बनाते हैं।',
      competitionCategory: 'Bharatanatyam',
      badge: 'Top 5 Finalist',
    },
  ];

  const reviewList = reviews && reviews.length > 0 ? reviews : defaultReviews;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>{t.hearFromUsers}</Text>
              <Text style={styles.subtitle}>Verified testimonials from past dance participants</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
              <Ionicons name="close" size={20} color={theme.colors.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* List */}
          <ScrollView contentContainerStyle={styles.listContainer}>
            {reviewList.map((review, index) => {
              const comment = (isHi && review.commentHi) ? review.commentHi : review.comment;
              return (
                <View key={index} style={styles.reviewCard}>
                  <View style={styles.userHeader}>
                    <Image source={{ uri: review.userAvatar }} style={styles.avatar} />
                    <View style={styles.userInfo}>
                      <Text style={styles.userName}>{review.userName}</Text>
                      <View style={styles.badgeRow}>
                        <Text style={styles.badgeText}>{review.badge}</Text>
                      </View>
                    </View>

                    {/* Star Rating */}
                    <View style={styles.starRow}>
                      {Array.from({ length: review.rating || 5 }).map((_, i) => (
                        <Ionicons key={i} name="star" size={14} color="#F59E0B" />
                      ))}
                    </View>
                  </View>

                  <Text style={styles.commentText}>{comment}</Text>
                  <Text style={styles.categoryTag}>{review.competitionCategory}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '80%',
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 11,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  closeBtn: {
    padding: 4,
  },
  listContainer: {
    padding: 16,
    gap: 12,
  },
  reviewCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  badgeRow: {
    marginTop: 2,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#086972',
  },
  starRow: {
    flexDirection: 'row',
    gap: 2,
  },
  commentText: {
    fontSize: 12,
    lineHeight: 18,
    color: theme.colors.textSecondary,
  },
  categoryTag: {
    fontSize: 10,
    fontWeight: '600',
    color: theme.colors.textMuted,
    marginTop: 8,
  },
});
