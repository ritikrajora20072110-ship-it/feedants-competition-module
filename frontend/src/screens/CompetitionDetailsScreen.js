import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Text,
  Animated,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { PrizeAndSpotsCard } from '../components/PrizeAndSpotsCard';
import { JudgeCard } from '../components/JudgeCard';
import { CountdownBanner } from '../components/CountdownBanner';
import { ImportantDates } from '../components/ImportantDates';
import { PreviousWinnersCarousel } from '../components/PreviousWinnersCarousel';
import { TabsSection } from '../components/TabsSection';
import { RewardsBreakdown } from '../components/RewardsBreakdown';
import { DisclaimerBanner } from '../components/DisclaimerBanner';
import { TrustSection } from '../components/TrustSection';
import { ReferralBanner } from '../components/ReferralBanner';
import { UserReviewsSection } from '../components/UserReviewsSection';
import { AdBanner } from '../components/AdBanner';
import { BottomActionBar } from '../components/BottomActionBar';
import { BottomNavBar } from '../components/BottomNavBar';

import { VideoModal } from '../components/Modals/VideoModal';
import { SubmissionModal } from '../components/Modals/SubmissionModal';
import { PaymentModal } from '../components/Modals/PaymentModal';
import { ReviewsModal } from '../components/Modals/ReviewsModal';
import { StateSwitcherModal } from '../components/Modals/StateSwitcherModal';
import { ViewSubmissionModal } from '../components/Modals/ViewSubmissionModal';

import { api } from '../services/api';
import { translations } from '../constants/translations';
import { theme } from '../constants/theme';

export const CompetitionDetailsScreen = () => {
  const [currentLang, setCurrentLang] = useState('en');
  const t = translations[currentLang] || translations.en;

  // Data states
  const [competition, setCompetition] = useState(null);
  const [userState, setUserState] = useState({ isRegistered: true, hasSubmitted: false, submission: null });
  const [dynamicState, setDynamicState] = useState(null);
  const [allCompetitions, setAllCompetitions] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Modal states
  const [videoModal, setVideoModal] = useState({ visible: false, url: '', title: '' });
  const [submissionModalVisible, setSubmissionModalVisible] = useState(false);
  const [viewSubmissionVisible, setViewSubmissionVisible] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [reviewsModalVisible, setReviewsModalVisible] = useState(false);
  const [stateSwitcherVisible, setStateSwitcherVisible] = useState(false);

  // Toast State
  const [toastMessage, setToastMessage] = useState('');
  const [toastOpacity] = useState(new Animated.Value(0));

  const showToast = (message) => {
    setToastMessage(message);
    Animated.sequence([
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(toastOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => setToastMessage(''));
  };

  // Fetch competition details
  const loadData = useCallback(async (slugOrId = 'feedants-classical-dance') => {
    try {
      const [compDetails, compsList, revsList] = await Promise.all([
        api.getCompetitionDetails(slugOrId),
        api.getCompetitions(),
        api.getReviews(),
      ]);

      if (compDetails) {
        setCompetition(compDetails.competition);
        setUserState(compDetails.userState || { isRegistered: true, hasSubmitted: false });
        setDynamicState(compDetails.dynamicState);
      }
      setAllCompetitions(compsList || []);
      setReviews(revsList || []);
    } catch (err) {
      console.warn('API error, falling back to rich static dataset:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();

    // Multi-user synchronization polling:
    // Gently refreshes spots and participant count every 8 seconds so other users' registrations appear live
    const pollInterval = setInterval(() => {
      if (competition?._id) {
        api.getCompetitionDetails(competition._id)
          .then((fresh) => {
            if (fresh && fresh.competition) {
              setCompetition((prev) => ({
                ...prev,
                currentParticipants: fresh.competition.currentParticipants,
                waitlist: fresh.competition.waitlist,
              }));
              setDynamicState(fresh.dynamicState);
            }
          })
          .catch(() => {});
      }
    }, 8000);

    return () => clearInterval(pollInterval);
  }, [loadData, competition?._id]);

  const onRefresh = () => {
    setRefreshing(true);
    loadData(competition?._id || 'feedants-classical-dance');
  };

  // Payment registration handler
  const handleConfirmPayment = async (paymentDetails) => {
    if (!competition) return;
    try {
      const res = await api.register(competition._id, null, paymentDetails);
      setUserState({ isRegistered: true, hasSubmitted: false, submission: null });
      setCompetition((prev) => ({
        ...prev,
        currentParticipants: res.currentParticipants || (prev.currentParticipants + 1),
      }));
      showToast(t.paymentSuccess);
    } catch (err) {
      throw err;
    }
  };

  // Submission upload handler
  const handleSubmitEntry = async (submissionData) => {
    if (!competition) return;
    try {
      const res = await api.submitEntry(competition._id, submissionData);
      setUserState({
        isRegistered: true,
        hasSubmitted: true,
        submission: res.submission || submissionData,
      });
      showToast('Submission uploaded successfully! 🎉');
    } catch (err) {
      throw err;
    }
  };

  // Waitlist join handler
  const handleJoinWaitlist = async () => {
    if (!competition) return;
    try {
      const res = await api.joinWaitlist(competition._id);
      showToast(`Waitlist joined! Position: #${res.position || 1}`);
    } catch (err) {
      showToast(err.message || 'Joined waitlist');
    }
  };

  // State switcher scenario runner
  const handleSelectScenario = async (scenario) => {
    if (scenario === 'REGISTERED') {
      setUserState({ isRegistered: true, hasSubmitted: false, submission: null });
      setCompetition((prev) => ({ ...prev, currentParticipants: 1, maxParticipants: 20 }));
      showToast('State: Registered User (Ready to submit)');
    } else if (scenario === 'UNREGISTERED') {
      setUserState({ isRegistered: false, hasSubmitted: false, submission: null });
      setCompetition((prev) => ({ ...prev, currentParticipants: 1, maxParticipants: 20 }));
      showToast('State: Unregistered (Spots open)');
    } else if (scenario === 'SOLD_OUT') {
      setUserState({ isRegistered: false, hasSubmitted: false, submission: null });
      setCompetition((prev) => ({ ...prev, currentParticipants: 20, maxParticipants: 20 }));
      showToast('State: Sold Out (20/20 Booked)');
    } else if (scenario === 'SUBMITTED') {
      setUserState({
        isRegistered: true,
        hasSubmitted: true,
        submission: {
          title: 'Kathak Teen Taal Performance',
          mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          notes: 'Performed in Jaipur Gharana style with 27 chakkars.',
          status: 'UNDER_REVIEW',
          submittedAt: new Date(),
        },
      });
      showToast('State: Entry Submitted & Under Review');
    } else if (scenario === 'JUDGING') {
      setDynamicState((prev) => ({
        ...prev,
        lifecycle: 'JUDGING',
        countdownLabel: 'Results announce in',
      }));
      showToast('State: Submissions closed, Judging in progress');
    } else if (scenario === 'SIMULATE_CONCURRENCY') {
      if (competition?._id) {
        showToast('Firing 5 concurrent booking requests...');
        try {
          const res = await api.simulateConcurrency(competition._id, 5);
          setCompetition((prev) => ({
            ...prev,
            currentParticipants: res.currentParticipants,
          }));
          showToast(`Concurrency test: ${res.successful} booked, ${res.spotsLeft} spots left!`);
        } catch (e) {
          showToast('Simulation complete');
        }
      }
    }
  };

  // Fallback competition data if DB is offline
  const activeCompetition = competition || {
    title: 'Feedants Classical Dance',
    titleHi: 'फीडैंट्स क्लासिकल डांस',
    category: 'Dance',
    tags: ['Dance', 'Multi-Win', 'Winners get certificate'],
    prizePool: 1500,
    entryFee: 99,
    maxParticipants: 20,
    currentParticipants: 1,
    judge: {
      name: 'Manju Dubey',
      nameHi: 'मंजू दुबे',
      title: 'Professional Kathak Dancer',
      titleHi: 'पेशेवर कथक नृत्यांगना',
      experience: '12+ Years of Experience',
      experienceHi: '12+ वर्षों का अनुभव',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      introVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    },
    dates: {
      registrationEnd: new Date(Date.now() + 110000000),
    },
    referral: {
      code: 'referral123',
      baseUrl: 'https://feedants.com/r/',
      rewardAmount: 10,
    },
  };

  const isFull = activeCompetition.currentParticipants >= activeCompetition.maxParticipants;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <Header
        onBack={() => showToast('Navigated back')}
        currentLang={currentLang}
        onToggleLang={setCurrentLang}
        t={t}
        onOpenStateSwitcher={() => setStateSwitcherVisible(true)}
      />

      {/* Main Scrollable Content */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#086972']}
            tintColor="#086972"
          />
        }
      >
        {/* Hero Section (Title, Tags, Registered Badge) */}
        <HeroSection
          competition={activeCompetition}
          userState={userState}
          currentLang={currentLang}
          t={t}
        />

        {/* Prize Pool, Entry Fee & Spots Left Progress */}
        <PrizeAndSpotsCard
          competition={activeCompetition}
          t={t}
        />

        {/* Judge Card */}
        <JudgeCard
          judge={activeCompetition.judge}
          currentLang={currentLang}
          t={t}
          onPlayIntro={(url, title) => setVideoModal({ visible: true, url, title })}
        />

        {/* Live Countdown Banner */}
        <CountdownBanner
          targetDate={activeCompetition.dates?.registrationEnd}
          label={dynamicState?.countdownLabel || t.registrationClosesIn}
          t={t}
        />

        {/* Important Dates (2x2 Grid) */}
        <ImportantDates
          dates={activeCompetition.dates}
          t={t}
        />

        {/* Previous Winners Carousel */}
        <PreviousWinnersCarousel
          winners={activeCompetition.previousWinners}
          currentLang={currentLang}
          t={t}
          onPlayWinnerVideo={(url, title) => setVideoModal({ visible: true, url, title })}
        />

        {/* About / Judging / Rules Tabs Section */}
        <TabsSection
          tabsData={activeCompetition.tabs}
          currentLang={currentLang}
          t={t}
        />

        {/* Rewards Breakdown (1st to 6th Winner) */}
        <RewardsBreakdown
          rewards={activeCompetition.rewards}
          currentLang={currentLang}
          t={t}
        />

        {/* Disclaimer Banner */}
        <DisclaimerBanner
          disclaimer={activeCompetition.disclaimer}
          currentLang={currentLang}
          t={t}
        />

        {/* Trust & Payment Row */}
        <TrustSection
          onOpenPrizeVideo={() =>
            setVideoModal({
              visible: true,
              url: activeCompetition.prizeMoneyVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
              title: t.prizeMoneyQuestion,
            })
          }
          t={t}
        />

        {/* Referral Card */}
        <ReferralBanner
          referralConfig={activeCompetition.referral}
          t={t}
          onShowToast={showToast}
        />

        {/* Hear From Our Users (Reviews trigger) */}
        <UserReviewsSection
          onOpenReviews={() => setReviewsModalVisible(true)}
          t={t}
        />

        {/* Ad Placeholder Banner */}
        <AdBanner t={t} />

        {/* Spacing for Bottom Fixed Action Bar */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Dynamic Bottom Action Button */}
      <BottomActionBar
        isRegistered={userState.isRegistered}
        hasSubmitted={userState.hasSubmitted}
        isFull={isFull}
        dynamicState={dynamicState}
        entryFee={activeCompetition.entryFee}
        onPressRegister={() => setPaymentModalVisible(true)}
        onPressSubmit={() => setSubmissionModalVisible(true)}
        onPressViewSubmission={() => setViewSubmissionVisible(true)}
        onPressJoinWaitlist={handleJoinWaitlist}
        t={t}
      />

      {/* Bottom Navigation Bar */}
      <BottomNavBar
        activeTab="competitions"
        onSelectTab={(tab) => {
          if (tab === 'create') {
            if (userState.isRegistered) {
              setSubmissionModalVisible(true);
            } else {
              setPaymentModalVisible(true);
            }
          } else {
            showToast(`Switched to ${tab}`);
          }
        }}
        t={t}
      />

      {/* Floating Toast Feedback */}
      {toastMessage ? (
        <Animated.View style={[styles.toastContainer, { opacity: toastOpacity }]}>
          <Text style={styles.toastText}>{toastMessage}</Text>
        </Animated.View>
      ) : null}

      {/* Modals */}
      <VideoModal
        visible={videoModal.visible}
        videoUrl={videoModal.url}
        title={videoModal.title}
        onClose={() => setVideoModal({ visible: false, url: '', title: '' })}
      />

      <SubmissionModal
        visible={submissionModalVisible}
        onClose={() => setSubmissionModalVisible(false)}
        onSubmit={handleSubmitEntry}
        t={t}
      />

      <ViewSubmissionModal
        visible={viewSubmissionVisible}
        submission={userState.submission}
        onClose={() => setViewSubmissionVisible(false)}
        onEditSubmission={() => setSubmissionModalVisible(true)}
        t={t}
      />

      <PaymentModal
        visible={paymentModalVisible}
        competition={activeCompetition}
        onClose={() => setPaymentModalVisible(false)}
        onConfirmPayment={handleConfirmPayment}
        t={t}
      />

      <ReviewsModal
        visible={reviewsModalVisible}
        reviews={reviews}
        currentLang={currentLang}
        onClose={() => setReviewsModalVisible(false)}
        t={t}
      />

      <StateSwitcherModal
        visible={stateSwitcherVisible}
        onClose={() => setStateSwitcherVisible(false)}
        onSelectScenario={handleSelectScenario}
        competitions={allCompetitions}
        onSelectCompetition={(compId) => {
          loadData(compId);
        }}
        selectedCompId={activeCompetition?._id}
        onReseed={async () => {
          await api.reseed();
          loadData();
          showToast('Database reseeded successfully!');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    maxWidth: Platform.OS === 'web' ? 480 : undefined,
    width: '100%',
    alignSelf: 'center',
    shadowColor: Platform.OS === 'web' ? '#00000015' : 'transparent',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  scrollArea: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  toastContainer: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    backgroundColor: '#0F172A',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.full,
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
