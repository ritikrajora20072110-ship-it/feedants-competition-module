import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';
import { api } from '../services/api';

export const AdBanner = ({ t, onOpenAdInquiry, onShowToast }) => {
  const [ads, setAds] = useState([
    {
      id: 'ad_1',
      sponsorName: 'Nritya Wear & Ghungroo Store',
      sponsorNameHi: 'नृत्य परिधान एवं घुंघरू स्टोर',
      headline: 'Flat 25% Off on Authentic Kathak Ghungroos & Costumes',
      headlineHi: 'प्रामाणिक कथक घुंघरू और वेशभूषा पर 25% की छूट',
      couponCode: 'NATYA25',
      discount: '25% OFF',
      tag: 'SPONSORED',
      badgeColor: '#E11D48',
      icon: 'sparkles',
    },
    {
      id: 'ad_2',
      sponsorName: 'Parampara Arts Academy',
      sponsorNameHi: 'परंपरा कला अकादमी',
      headline: 'Exclusive Masterclass with Sangeet Natak Winners',
      headlineHi: 'अकादमी विजेताओं के साथ विशेष मास्टरक्लास',
      couponCode: 'PARAM500',
      discount: '₹500 OFF',
      tag: 'PARTNER',
      badgeColor: '#0284C7',
      icon: 'ribbon',
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    api.getAds()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setAds(data);
        }
      })
      .catch(() => {});

    // Rotate through ads every 6 seconds
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (ads.length || 1));
    }, 6000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [ads.length]);

  const activeAd = ads[currentIndex] || ads[0];

  const handleCopyCode = (code) => {
    if (onShowToast) {
      onShowToast(`Copied promo code '${code}'! 🎉`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Active Sponsor Card */}
      <View style={styles.sponsorCard}>
        <View style={styles.topRow}>
          <View style={styles.sponsorIdentity}>
            <View style={[styles.badge, { backgroundColor: activeAd.badgeColor || '#E11D48' }]}>
              <Ionicons name={activeAd.icon || 'sparkles'} size={11} color="#FFFFFF" style={{ marginRight: 3 }} />
              <Text style={styles.badgeText}>{activeAd.tag || 'SPONSORED'}</Text>
            </View>
            <Text style={styles.sponsorName} numberOfLines={1}>
              {activeAd.sponsorName}
            </Text>
          </View>

          {/* Ad indicator dots */}
          <View style={styles.dots}>
            {ads.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  i === currentIndex && { backgroundColor: activeAd.badgeColor || '#E11D48', width: 12 },
                ]}
              />
            ))}
          </View>
        </View>

        <Text style={styles.headline} numberOfLines={2}>
          {activeAd.headline}
        </Text>

        <View style={styles.actionRow}>
          {activeAd.couponCode ? (
            <TouchableOpacity
              style={styles.codeButton}
              onPress={() => handleCopyCode(activeAd.couponCode)}
              activeOpacity={0.7}
            >
              <Ionicons name="pricetag-outline" size={13} color="#0F172A" style={{ marginRight: 4 }} />
              <Text style={styles.codeText}>{activeAd.couponCode}</Text>
              <View style={styles.discountPill}>
                <Text style={styles.discountText}>{activeAd.discount}</Text>
              </View>
            </TouchableOpacity>
          ) : null}

          <TouchableOpacity
            style={styles.adHereBtn}
            onPress={onOpenAdInquiry}
            activeOpacity={0.8}
          >
            <Ionicons name="megaphone-outline" size={12} color="#0284C7" style={{ marginRight: 4 }} />
            <Text style={styles.adHereText}>
              {t?.adHere || 'Ad Here'}
            </Text>
          </TouchableOpacity>
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
  sponsorCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  sponsorIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  sponsorName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
    flex: 1,
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#CBD5E1',
  },
  headline: {
    fontSize: 12.5,
    color: '#0F172A',
    fontWeight: '600',
    lineHeight: 17,
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  codeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  codeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F172A',
    marginRight: 6,
    letterSpacing: 0.5,
  },
  discountPill: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#166534',
  },
  adHereBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  adHereText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0284C7',
  },
});
