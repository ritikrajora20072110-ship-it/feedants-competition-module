import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../constants/theme';

export const BottomActionBar = ({
  isRegistered,
  hasSubmitted,
  isFull,
  dynamicState,
  entryFee = 99,
  onPressRegister,
  onPressSubmit,
  onPressViewSubmission,
  onPressJoinWaitlist,
  t,
}) => {
  const lifecycle = dynamicState?.lifecycle || 'REGISTRATION_OPEN';

  const getButtonContent = () => {
    // 1. If competition is completed
    if (lifecycle === 'COMPLETED') {
      return {
        title: 'Competition Ended',
        subtitle: 'Results & Certificates Declared',
        onPress: () => {},
        disabled: true,
        bgColor: '#64748B',
      };
    }

    // 2. If registered and already submitted
    if (isRegistered && hasSubmitted) {
      return {
        title: 'View Your Submission',
        subtitle: 'Entry Submitted • Under Review',
        onPress: onPressViewSubmission,
        disabled: false,
        bgColor: '#0D9488',
      };
    }

    // 3. If registered, submission phase or registration phase
    if (isRegistered) {
      return {
        title: t.uploadSubmission,
        subtitle: t.registeredStatus,
        onPress: onPressSubmit,
        disabled: false,
        bgColor: '#086972',
      };
    }

    // 4. If not registered, but competition is full (Sold Out / Waitlist)
    if (isFull || lifecycle === 'REGISTRATION_FULL') {
      return {
        title: 'Join Waitlist',
        subtitle: '0 Spots Remaining • Sold Out',
        onPress: onPressJoinWaitlist,
        disabled: false,
        bgColor: '#D97706',
      };
    }

    // 5. If registration is upcoming
    if (lifecycle === 'UPCOMING') {
      return {
        title: 'Registration Opens Soon',
        subtitle: 'Check Important Dates',
        onPress: () => {},
        disabled: true,
        bgColor: '#94A3B8',
      };
    }

    // 6. If registration deadline passed for unregistered user
    if (lifecycle === 'REGISTRATION_CLOSED' || lifecycle === 'SUBMISSION_OPEN') {
      return {
        title: 'Registration Closed',
        subtitle: 'Submissions in Progress',
        onPress: () => {},
        disabled: true,
        bgColor: '#94A3B8',
      };
    }

    // 7. Default: Available to register
    return {
      title: t.registerNow,
      subtitle: t.payFee.replace('{fee}', entryFee),
      onPress: onPressRegister,
      disabled: false,
      bgColor: '#086972',
    };
  };

  const buttonConfig = getButtonContent();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.actionButton,
          { backgroundColor: buttonConfig.bgColor },
          buttonConfig.disabled && styles.disabledButton,
        ]}
        onPress={buttonConfig.onPress}
        disabled={buttonConfig.disabled}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonTitle}>{buttonConfig.title}</Text>
        {buttonConfig.subtitle ? (
          <Text style={styles.buttonSubtitle}>{buttonConfig.subtitle}</Text>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 10,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  actionButton: {
    paddingVertical: 10,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    opacity: 0.65,
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.white,
  },
  buttonSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 2,
  },
});
