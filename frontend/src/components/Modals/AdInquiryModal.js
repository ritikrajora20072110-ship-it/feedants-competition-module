import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { api } from '../../services/api';

export const AdInquiryModal = ({ visible, onClose, onShowToast, t }) => {
  const [brandName, setBrandName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTier, setSelectedTier] = useState('Standard Banner');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const tiers = [
    { id: 'Standard Banner', price: '₹1,499', desc: 'Featured in Ad Slots across this competition' },
    { id: 'Category Sponsor', price: '₹4,999', desc: 'Logo on Judge Cards & Winner Certificates' },
    { id: 'Title Co-Host', price: '₹9,999', desc: 'Co-Branded Competition with Social Media Push' },
  ];

  const handleSubmit = async () => {
    if (!brandName.trim()) {
      onShowToast('Please enter your Brand or Academy name');
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      onShowToast('Please enter a valid email address');
      return;
    }

    try {
      setSubmitting(true);
      const res = await api.submitAdInquiry({
        brandName,
        contactPerson,
        email,
        phone,
        tier: selectedTier,
        message,
      });

      setSubmittedData(res.data);
      onShowToast('Inquiry submitted successfully! 🎉');
    } catch (err) {
      onShowToast(err.message || 'Failed to submit inquiry');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmittedData(null);
    setBrandName('');
    setContactPerson('');
    setEmail('');
    setPhone('');
    setMessage('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={handleResetAndClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.badge}>
                <Ionicons name="megaphone" size={16} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.title}>Advertise on Feedants</Text>
                <Text style={styles.subtitle}>Reach 50,000+ dancers, judges & performers</Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleResetAndClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {submittedData ? (
            <View style={styles.successContainer}>
              <View style={styles.successIcon}>
                <Ionicons name="checkmark-circle" size={56} color="#10B981" />
              </View>
              <Text style={styles.successTitle}>Inquiry Received!</Text>
              <Text style={styles.successSubtitle}>
                Thank you for partnering with Feedants. Our sponsorships team will contact you at{' '}
                <Text style={{ fontWeight: '700', color: '#0F172A' }}>{submittedData.email}</Text> within 2 hours.
              </Text>
              <View style={styles.inquiryDetailCard}>
                <Text style={styles.inquiryDetailText}>
                  <Text style={{ fontWeight: '700' }}>Reference ID:</Text> {submittedData.id}
                </Text>
                <Text style={styles.inquiryDetailText}>
                  <Text style={{ fontWeight: '700' }}>Selected Package:</Text> {submittedData.tier}
                </Text>
              </View>
              <TouchableOpacity style={styles.doneBtn} onPress={handleResetAndClose}>
                <Text style={styles.doneBtnText}>Close</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <ScrollView style={styles.formScroll} showsVerticalScrollIndicator={false}>
              {/* Sponsorship Tiers */}
              <Text style={styles.sectionLabel}>Select Sponsorship Tier</Text>
              <View style={styles.tierContainer}>
                {tiers.map((t) => {
                  const isSelected = selectedTier === t.id;
                  return (
                    <TouchableOpacity
                      key={t.id}
                      style={[styles.tierCard, isSelected && styles.tierCardActive]}
                      onPress={() => setSelectedTier(t.id)}
                    >
                      <View style={styles.tierHeader}>
                        <Text style={[styles.tierName, isSelected && styles.tierNameActive]}>
                          {t.id}
                        </Text>
                        <Text style={[styles.tierPrice, isSelected && styles.tierPriceActive]}>
                          {t.price}
                        </Text>
                      </View>
                      <Text style={styles.tierDesc}>{t.desc}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Form Fields */}
              <Text style={styles.sectionLabel}>Your Details</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Brand / Academy Name *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Nritya Mandir Academy"
                  value={brandName}
                  onChangeText={setBrandName}
                  placeholderTextColor="#94A3B8"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Contact Person</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Rajesh Sharma"
                  value={contactPerson}
                  onChangeText={setContactPerson}
                  placeholderTextColor="#94A3B8"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Official Email *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. contact@nrityamandir.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#94A3B8"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Phone / WhatsApp</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. +91 98765 43210"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  placeholderTextColor="#94A3B8"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Campaign Goals / Notes</Text>
                <TextInput
                  style={[styles.input, { height: 70, textAlignVertical: 'top' }]}
                  placeholder="What would you like to promote?"
                  value={message}
                  onChangeText={setMessage}
                  multiline
                  placeholderTextColor="#94A3B8"
                />
              </View>

              {/* CTA Button */}
              <TouchableOpacity
                style={[styles.submitBtn, submitting && styles.submitBtnDisabled]}
                onPress={handleSubmit}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator color="#FFFFFF" size="small" />
                ) : (
                  <>
                    <Ionicons name="paper-plane-outline" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.submitBtnText}>Submit Advertising Inquiry</Text>
                  </>
                )}
              </TouchableOpacity>
              <View style={{ height: 20 }} />
            </ScrollView>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    width: '100%',
    maxWidth: 460,
    maxHeight: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  badge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#E11D48',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
  },
  formScroll: {
    paddingHorizontal: 18,
    paddingTop: 14,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginTop: 6,
  },
  tierContainer: {
    gap: 8,
    marginBottom: 14,
  },
  tierCard: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 10,
    backgroundColor: '#F8FAFC',
  },
  tierCardActive: {
    borderColor: '#0284C7',
    backgroundColor: '#F0F9FF',
  },
  tierHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  tierName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  tierNameActive: {
    color: '#0284C7',
  },
  tierPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  tierPriceActive: {
    color: '#0284C7',
  },
  tierDesc: {
    fontSize: 11,
    color: '#64748B',
  },
  inputGroup: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: '#0F172A',
    backgroundColor: '#FFFFFF',
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 12,
    paddingVertical: 13,
    marginTop: 10,
  },
  submitBtnDisabled: {
    opacity: 0.7,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  successContainer: {
    alignItems: 'center',
    padding: 24,
  },
  successIcon: {
    marginBottom: 12,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 13,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  inquiryDetailCard: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
  },
  inquiryDetailText: {
    fontSize: 12,
    color: '#334155',
    marginVertical: 2,
  },
  doneBtn: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 10,
  },
  doneBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
