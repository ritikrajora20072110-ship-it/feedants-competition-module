import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Platform } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export const ViewSubmissionModal = ({ visible, submission, onClose, onEditSubmission, t }) => {
  if (!submission) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <Ionicons name="checkmark-circle" size={20} color="#0D9488" />
              <Text style={styles.headerTitle}>Your Submitted Performance</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
              <Ionicons name="close" size={20} color={theme.colors.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Body */}
          <View style={styles.body}>
            {/* Status Pill */}
            <View style={styles.statusRow}>
              <Text style={styles.statusLabel}>Review Status:</Text>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{submission.status || 'UNDER_REVIEW'}</Text>
              </View>
            </View>

            {/* Title */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Performance Title</Text>
              <Text style={styles.fieldValue}>{submission.title || 'Kathak Classical Dance'}</Text>
            </View>

            {/* Video Preview Box */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Video Recording</Text>
              <View style={styles.videoBox}>
                <Ionicons name="videocam-outline" size={20} color="#086972" />
                <Text style={styles.mediaUrlText} numberOfLines={1}>
                  {submission.mediaUrl || 'https://commondatastorage.googleapis.com/...'}
                </Text>
              </View>
            </View>

            {/* Notes */}
            {submission.notes ? (
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>Choreography Notes</Text>
                <Text style={styles.notesValue}>{submission.notes}</Text>
              </View>
            ) : null}

            {/* Submitted Date */}
            <View style={styles.dateRow}>
              <Feather name="clock" size={13} color={theme.colors.textMuted} />
              <Text style={styles.dateText}>
                Submitted on {new Date(submission.submittedAt || Date.now()).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>

            {/* Actions */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => {
                  onClose();
                  onEditSubmission();
                }}
                activeOpacity={0.8}
              >
                <Feather name="edit-2" size={14} color="#086972" />
                <Text style={styles.editText}>Update Entry</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.doneBtn} onPress={onClose} activeOpacity={0.85}>
                <Text style={styles.doneText}>Done</Text>
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
  card: {
    width: '100%',
    maxWidth: 460,
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
    color: theme.colors.textPrimary,
  },
  closeBtn: {
    padding: 4,
  },
  body: {
    padding: 20,
    gap: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 8,
  },
  statusLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  statusBadge: {
    backgroundColor: '#CCFBF1',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0D9488',
  },
  fieldGroup: {
    gap: 4,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
  },
  fieldValue: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  videoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F1F5F9',
    padding: 10,
    borderRadius: 8,
  },
  mediaUrlText: {
    fontSize: 12,
    color: '#086972',
    fontWeight: '600',
    flex: 1,
  },
  notesValue: {
    fontSize: 12,
    lineHeight: 18,
    color: theme.colors.textSecondary,
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 8,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  dateText: {
    fontSize: 11,
    color: theme.colors.textMuted,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  editBtn: {
    flex: 1,
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#086972',
    borderRadius: 8,
  },
  editText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#086972',
  },
  doneBtn: {
    flex: 1,
    height: 42,
    backgroundColor: '#086972',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  doneText: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.white,
  },
});
