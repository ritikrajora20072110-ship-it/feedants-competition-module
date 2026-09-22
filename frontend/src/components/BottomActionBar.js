import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../constants/theme';

export const BottomActionBar = ({
  isRegistered,
  isFull,
  dynamicState,
  entryFee = 99,
  onPressRegister,
  onPressSubmit,
  t,
}) => {
  const getButtonContent = () => {
    if (isRegistered) {
      return {
        title: t.uploadSubmission,
        subtitle: t.registeredStatus,
        onPress: onPressSubmit,
        disabled: false,
        bgColor: '#086972',
      };
    }

    if (isFull) {
      return {
        title: t.spotsFull,
        subtitle: t.soldOutBadge,
        onPress: () => {},
        disabled: true,
        bgColor: '#94A3B8',
      };
    }

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
    opacity: 0.6,
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.white,
  },
  buttonSubtitle: {
    fontSize: 11,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
  },
});
