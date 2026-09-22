import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export const VideoModal = ({ visible, videoUrl, title, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={1}>{title || 'Performance Video'}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
              <Ionicons name="close" size={20} color={theme.colors.textPrimary} />
            </TouchableOpacity>
          </View>

          {/* Video Player Box */}
          <View style={styles.videoPlayerContainer}>
            {Platform.OS === 'web' ? (
              <video
                src={videoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                controls
                autoPlay
                style={{ width: '100%', height: '100%', borderRadius: 12, backgroundColor: '#000' }}
              />
            ) : (
              <View style={styles.mobilePlaceholder}>
                <Ionicons name="play-circle" size={54} color="#0D9488" />
                <Text style={styles.mobileUrlText} numberOfLines={2}>{videoUrl}</Text>
                <Text style={styles.mobileSubtext}>Simulated Streaming Player</Text>
              </View>
            )}
          </View>

          {/* Footer Note */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Feedants Certified Competition Media</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.xl,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    flex: 1,
  },
  closeBtn: {
    padding: 4,
  },
  videoPlayerContainer: {
    width: '100%',
    height: 280,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobilePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  mobileUrlText: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  mobileSubtext: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 4,
  },
  footer: {
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  footerText: {
    fontSize: 11,
    color: theme.colors.textMuted,
  },
});
