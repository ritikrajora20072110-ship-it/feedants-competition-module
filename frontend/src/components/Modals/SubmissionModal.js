import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export const SubmissionModal = ({ visible, onClose, onSubmit, t }) => {
  const [title, setTitle] = useState('');
  const [mediaUrl, setMediaUrl] = useState(
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  );
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFormSubmit = async () => {
    if (!title.trim()) {
      setErrorMsg('Please enter a performance title');
      return;
    }
    if (!mediaUrl.trim()) {
      setErrorMsg('Please enter a media URL or video link');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg('');
      await onSubmit({ title, mediaUrl, notes });
      setIsSubmitting(false);
      onClose();
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg(err.message || 'Failed to submit entry');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>{t.submitYourEntry}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
              <Ionicons name="close" size={20} color={theme.colors.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.body}>
            {errorMsg ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{errorMsg}</Text>
              </View>
            ) : null}

            {/* Title Field */}
            <Text style={styles.inputLabel}>{t.entryTitlePrompt} *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Kathak Tarana & Thumri"
              value={title}
              onChangeText={setTitle}
              placeholderTextColor={theme.colors.textMuted}
            />

            {/* Media URL */}
            <Text style={styles.inputLabel}>{t.videoLinkPrompt} *</Text>
            <TextInput
              style={styles.input}
              placeholder="https://..."
              value={mediaUrl}
              onChangeText={setMediaUrl}
              placeholderTextColor={theme.colors.textMuted}
            />

            {/* Notes */}
            <Text style={styles.inputLabel}>{t.notesPrompt}</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Mention Raga, Taal, or specific dance gharana..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
              placeholderTextColor={theme.colors.textMuted}
            />

            {/* Action Buttons */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={onClose}
                activeOpacity={0.7}
                disabled={isSubmitting}
              >
                <Text style={styles.cancelText}>{t.cancel}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.submitBtn}
                onPress={handleFormSubmit}
                activeOpacity={0.85}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color={theme.colors.white} size="small" />
                ) : (
                  <Text style={styles.submitText}>{t.submitButton}</Text>
                )}
              </TouchableOpacity>
            </View>
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
  modalCard: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
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
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  closeBtn: {
    padding: 4,
  },
  body: {
    padding: 20,
  },
  errorBox: {
    backgroundColor: '#FEE2E2',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginBottom: 6,
    marginTop: 6,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 12,
    fontSize: 13,
    color: theme.colors.textPrimary,
    backgroundColor: '#F8FAFC',
    marginBottom: 8,
  },
  textArea: {
    height: 72,
    textAlignVertical: 'top',
    paddingTop: 8,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  cancelBtn: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textSecondary,
  },
  submitBtn: {
    flex: 2,
    height: 44,
    backgroundColor: '#086972',
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.white,
  },
});
