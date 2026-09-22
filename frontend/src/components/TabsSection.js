import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../constants/theme';

export const TabsSection = ({ tabsData, currentLang, t }) => {
  const [activeTab, setActiveTab] = useState('about');
  const [isExpanded, setIsExpanded] = useState(false);

  const isHi = currentLang === 'hi';

  const defaultTabs = {
    about: {
      en: 'This is an online classical dance competition open for all age groups.\nParticipate from anywhere and showcase your talent.\nExpress your passion through traditional dance.\n\nWhether you practice Kathak, Bharatanatyam, Odissi, Kuchipudi, or Kathakali, this platform provides national visibility, direct feedback from veteran artists, and guaranteed cash rewards for top performers.',
      hi: 'यह एक ऑनलाइन शास्त्रीय नृत्य प्रतियोगिता है जो सभी आयु समूहों के लिए खुली है।\nकहीं से भी भाग लें और अपनी प्रतिभा का प्रदर्शन करें।\nपारंपरिक नृत्य के माध्यम से अपने जुनून को व्यक्त करें।\n\nचाहे आप कथक, भरतनाट्यम, ओडिसी, कुचिपुड़ी या कथकली का अभ्यास करते हों, यह मंच राष्ट्रीय पहचान, अनुभवी कलाकारों से सीधी प्रतिक्रिया और शीर्ष प्रदर्शनकर्ताओं के लिए नकद पुरस्कार प्रदान करता है।',
    },
    judgingParameters: {
      en: '• Technical Proficiency & Footwork (30%): Accuracy of rhythm (Taal), postures (Mudras), and foot synchronization.\n• Expressions & Abhinaya (25%): Facial expressions, emotional conveyance, and storytelling depth.\n• Choreography & Rhythm (25%): Originality of movement, seamless transitions, and musical harmony.\n• Costume & Presentation (20%): Traditional attire, makeup, stage aesthetics, and overall presentation.',
      hi: '• तकनीकी दक्षता और पद संचालन (30%): ताल की सटीकता, मुद्राएं और पैरों का तालमेल।\n• भाव एवं अभिनय (25%): चेहरे के भाव, संवेगात्मक प्रस्तुति और कहानी की गहराई।\n• कोरियोग्राफी और लय (25%): गति की मौलिकता, सुगम परिवर्तन और संगीत का सामंजस्य।\n• वेशभूषा और प्रस्तुति (20%): पारंपरिक पोशाक, श्रृंगार और समग्र मंच प्रस्तुति।',
    },
    rulesAndEligibility: {
      en: '• Open to all age groups across India & internationally.\n• Video performance duration must be between 1.5 to 3 minutes.\n• Continuous unedited video recording with clearly audible background music.\n• Only solo performances are eligible for prize distribution.\n• High definition video (720p or 1080p) uploaded in MP4/MOV format or YouTube unlisted link.\n• Decisions of the judging panel will be final and binding.',
      hi: '• भारत और अंतरराष्ट्रीय स्तर पर सभी आयु समूहों के लिए खुला है।\n• वीडियो प्रदर्शन की अवधि 1.5 से 3 मिनट के बीच होनी चाहिए।\n• स्पष्ट श्रव्य पृष्ठभूमि संगीत के साथ निरंतर असंपादित वीडियो रिकॉर्डिंग।\n• पुरस्कार वितरण के लिए केवल एकल प्रदर्शन ही पात्र हैं।\n• 720p या 1080p में वीडियो MP4/MOV प्रारूप में अपलोड किया जाना चाहिए।\n• निर्णायक मंडल का निर्णय अंतिम एवं सर्वमान्य होगा।',
    },
  };

  const currentTabContent =
    tabsData && tabsData[activeTab]
      ? isHi
        ? tabsData[activeTab].hi
        : tabsData[activeTab].en
      : isHi
      ? defaultTabs[activeTab].hi
      : defaultTabs[activeTab].en;

  return (
    <View style={styles.container}>
      {/* Tabs Header */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'about' && styles.tabButtonActive]}
          onPress={() => {
            setActiveTab('about');
            setIsExpanded(false);
          }}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === 'about' && styles.tabTextActive]}>
            {t.aboutTab}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'judgingParameters' && styles.tabButtonActive]}
          onPress={() => {
            setActiveTab('judgingParameters');
            setIsExpanded(false);
          }}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === 'judgingParameters' && styles.tabTextActive]}>
            {t.judgingTab}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'rulesAndEligibility' && styles.tabButtonActive]}
          onPress={() => {
            setActiveTab('rulesAndEligibility');
            setIsExpanded(false);
          }}
          activeOpacity={0.7}
        >
          <Text style={[styles.tabText, activeTab === 'rulesAndEligibility' && styles.tabTextActive]}>
            {t.rulesTab}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Body */}
      <View style={styles.tabBody}>
        <Text
          style={styles.contentText}
          numberOfLines={isExpanded ? undefined : 3}
        >
          {currentTabContent}
        </Text>

        {/* View More / View Less Toggle */}
        <TouchableOpacity
          style={styles.viewMoreButton}
          onPress={() => setIsExpanded(!isExpanded)}
          activeOpacity={0.7}
        >
          <Text style={styles.viewMoreText}>
            {isExpanded ? t.viewLess : t.viewMore}
          </Text>
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={14}
            color="#086972"
          />
        </TouchableOpacity>
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
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tabButton: {
    paddingVertical: 10,
    marginRight: 16,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabButtonActive: {
    borderBottomColor: '#086972',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  tabTextActive: {
    color: '#086972',
    fontWeight: '800',
  },
  tabBody: {
    paddingTop: 12,
  },
  contentText: {
    fontSize: 13,
    lineHeight: 20,
    color: theme.colors.textSecondary,
  },
  viewMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: 8,
    paddingVertical: 4,
  },
  viewMoreText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#086972',
  },
});
