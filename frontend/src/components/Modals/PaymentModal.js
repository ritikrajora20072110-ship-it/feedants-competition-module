import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export const PaymentModal = ({ visible, competition, onClose, onConfirmPayment, t }) => {
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const entryFee = competition?.entryFee || 50;

  const handlePay = async () => {
    try {
      setProcessing(true);
      setErrorMsg('');
      await onConfirmPayment({
        paymentId: `pay_rzp_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        paymentGateway: 'Razorpay',
      });
      setProcessing(false);
      onClose();
    } catch (err) {
      setProcessing(false);
      setErrorMsg(err.message || 'Payment failed or competition is full.');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <Feather name="shield" size={18} color="#086972" />
              <Text style={styles.headerTitle}>{t?.paymentTitle || 'Feedants Secure Checkout'}</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
              <Ionicons name="close" size={20} color={theme.colors.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Body */}
          <View style={styles.body}>
            {errorMsg ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle" size={16} color="#DC2626" style={{ marginRight: 6 }} />
                <Text style={styles.errorText}>{errorMsg}</Text>
              </View>
            ) : null}

            {/* Competition Summary */}
            <View style={styles.summaryBox}>
              <Text style={styles.compTitle}>{competition?.title || 'Feedants Competition'}</Text>
              <View style={styles.feeBreakdownRow}>
                <Text style={styles.breakdownLabel}>Entry Registration Fee</Text>
                <Text style={styles.breakdownValue}>₹ {Number(entryFee).toFixed(2)}</Text>
              </View>
              <View style={styles.feeBreakdownRow}>
                <Text style={styles.breakdownLabel}>Platform & Processing GST</Text>
                <Text style={styles.freeBadge}>FREE (₹ 0.00)</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.feeBreakdownRow}>
                <Text style={styles.totalLabel}>Total Payable</Text>
                <Text style={styles.totalValue}>₹ {Number(entryFee).toFixed(2)}</Text>
              </View>
            </View>

            {/* Payment Methods Simulation */}
            <View style={styles.paymentMethods}>
              <View style={styles.methodPill}>
                <Ionicons name="card-outline" size={16} color="#086972" />
                <Text style={styles.methodText}>UPI / Cards / NetBanking</Text>
              </View>
              <View style={styles.trustedBadge}>
                <Text style={styles.trustedText}>🔒 256-bit Encrypted Checkout</Text>
              </View>
            </View>

            {/* Pay Button */}
            <TouchableOpacity
              style={styles.payButton}
              onPress={handlePay}
              disabled={processing}
              activeOpacity={0.85}
            >
              {processing ? (
                <ActivityIndicator color={theme.colors.white} size="small" />
              ) : (
                <Text style={styles.payButtonText}>
                  {t.confirmPayment.replace('{amount}', entryFee)}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
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
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#086972',
  },
  closeBtn: {
    padding: 4,
  },
  body: {
    padding: 20,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  summaryBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    marginBottom: 14,
  },
  compTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 12,
  },
  feeBreakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  breakdownLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  breakdownValue: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  freeBadge: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0D9488',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '900',
    color: '#086972',
  },
  paymentMethods: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  methodPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E6F6F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
  },
  methodText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#086972',
  },
  trustedBadge: {
    paddingVertical: 2,
  },
  trustedText: {
    fontSize: 11,
    color: theme.colors.textMuted,
  },
  payButton: {
    height: 46,
    backgroundColor: '#086972',
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.white,
  },
});
