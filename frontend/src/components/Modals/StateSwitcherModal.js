import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';

export const StateSwitcherModal = ({
  visible,
  onClose,
  onSelectScenario,
  onReseed,
  competitions,
  onSelectCompetition,
  selectedCompId,
}) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>🛠 Evaluation & State Switcher</Text>
              <Text style={styles.subtitle}>Test all competition & user states instantly</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.7}>
              <Ionicons name="close" size={20} color={theme.colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            {/* Scenarios Group */}
            <Text style={styles.sectionHeader}>User & Registration States</Text>

            {/* Scenario 1: Registered (Design Default) */}
            <TouchableOpacity
              style={styles.scenarioCard}
              onPress={() => {
                onSelectScenario('REGISTERED');
                onClose();
              }}
              activeOpacity={0.7}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#CCFBF1' }]}>
                <Ionicons name="checkmark-done-circle" size={20} color="#0D9488" />
              </View>
              <View style={styles.scenarioText}>
                <Text style={styles.scenarioTitle}>1. Registered User (Design Mockup)</Text>
                <Text style={styles.scenarioDesc}>Shows 'Registered' pill & 'Upload Submission' CTA button</Text>
              </View>
            </TouchableOpacity>

            {/* Scenario 2: Unregistered */}
            <TouchableOpacity
              style={styles.scenarioCard}
              onPress={() => {
                onSelectScenario('UNREGISTERED');
                onClose();
              }}
              activeOpacity={0.7}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#E0F2FE' }]}>
                <Ionicons name="person-add" size={18} color="#0284C7" />
              </View>
              <View style={styles.scenarioText}>
                <Text style={styles.scenarioTitle}>2. Unregistered User (Spots Available)</Text>
                <Text style={styles.scenarioDesc}>Shows 'Register Now - ₹99' and enables live checkout</Text>
              </View>
            </TouchableOpacity>

            {/* Scenario 3: Spots Full */}
            <TouchableOpacity
              style={styles.scenarioCard}
              onPress={() => {
                onSelectScenario('SOLD_OUT');
                onClose();
              }}
              activeOpacity={0.7}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#FEE2E2' }]}>
                <Ionicons name="lock-closed" size={18} color="#DC2626" />
              </View>
              <View style={styles.scenarioText}>
                <Text style={styles.scenarioTitle}>3. Sold Out / Max Capacity (0 Spots Left)</Text>
                <Text style={styles.scenarioDesc}>Shows 'Sold Out' status and enables 'Join Waitlist' CTA</Text>
              </View>
            </TouchableOpacity>

            {/* Scenario 4: Submitted Entry */}
            <TouchableOpacity
              style={styles.scenarioCard}
              onPress={() => {
                onSelectScenario('SUBMITTED');
                onClose();
              }}
              activeOpacity={0.7}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#E6F6F6' }]}>
                <Ionicons name="film" size={18} color="#086972" />
              </View>
              <View style={styles.scenarioText}>
                <Text style={styles.scenarioTitle}>4. Entry Submitted (Under Review)</Text>
                <Text style={styles.scenarioDesc}>Shows 'View Your Submission' & entry details</Text>
              </View>
            </TouchableOpacity>

            {/* Scenario 5: Judging in Progress */}
            <TouchableOpacity
              style={styles.scenarioCard}
              onPress={() => {
                onSelectScenario('JUDGING');
                onClose();
              }}
              activeOpacity={0.7}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#FEF3C7' }]}>
                <Ionicons name="hourglass" size={18} color="#D97706" />
              </View>
              <View style={styles.scenarioText}>
                <Text style={styles.scenarioTitle}>5. Judging in Progress (Deadline Passed)</Text>
                <Text style={styles.scenarioDesc}>Shows countdown to result announcement on 1 Sept</Text>
              </View>
            </TouchableOpacity>

            {/* Live Concurrency Simulation */}
            <Text style={styles.sectionHeader}>Concurrency & Multi-User Testing</Text>
            <TouchableOpacity
              style={[styles.scenarioCard, { borderColor: '#086972', backgroundColor: '#F0FDFA' }]}
              onPress={() => {
                onSelectScenario('SIMULATE_CONCURRENCY');
                onClose();
              }}
              activeOpacity={0.7}
            >
              <View style={[styles.iconCircle, { backgroundColor: '#086972' }]}>
                <Ionicons name="flash" size={18} color="#FFFFFF" />
              </View>
              <View style={styles.scenarioText}>
                <Text style={[styles.scenarioTitle, { color: '#086972' }]}>⚡ Fire 5 Concurrent Spot Bookings</Text>
                <Text style={styles.scenarioDesc}>Simulates 5 parallel users booking at the same second to test atomic consistency</Text>
              </View>
            </TouchableOpacity>

            {/* Switch Competitions */}
            {competitions && competitions.length > 0 ? (
              <>
                <Text style={styles.sectionHeader}>Switch Competition</Text>
                {competitions.map((comp) => (
                  <TouchableOpacity
                    key={comp._id}
                    style={[
                      styles.compCard,
                      selectedCompId === comp._id && styles.compCardSelected,
                    ]}
                    onPress={() => {
                      onSelectCompetition(comp._id);
                      onClose();
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={styles.scenarioText}>
                      <Text style={styles.scenarioTitle}>{comp.title}</Text>
                      <Text style={styles.scenarioDesc}>
                        Fee: ₹{comp.entryFee} • Prize: ₹{comp.prizePool} • {comp.currentParticipants}/{comp.maxParticipants} Booked
                      </Text>
                    </View>
                    {selectedCompId === comp._id ? (
                      <Ionicons name="checkmark-circle" size={18} color="#086972" />
                    ) : null}
                  </TouchableOpacity>
                ))}
              </>
            ) : null}

            {/* Reseed DB */}
            <TouchableOpacity
              style={styles.reseedBtn}
              onPress={async () => {
                await onReseed();
                onClose();
              }}
              activeOpacity={0.8}
            >
              <Ionicons name="refresh" size={16} color={theme.colors.white} />
              <Text style={styles.reseedText}>Reset / Reseed Database</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '85%',
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
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
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 11,
    color: theme.colors.textMuted,
    marginTop: 2,
  },
  closeBtn: {
    padding: 4,
  },
  content: {
    padding: 16,
    gap: 10,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 6,
    marginBottom: 4,
  },
  scenarioCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scenarioText: {
    flex: 1,
  },
  scenarioTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  scenarioDesc: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  compCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
  },
  compCardSelected: {
    borderColor: '#086972',
    backgroundColor: '#E6F6F6',
  },
  reseedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#086972',
    paddingVertical: 12,
    borderRadius: theme.borderRadius.md,
    marginTop: 10,
    marginBottom: 20,
  },
  reseedText: {
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.white,
  },
});
