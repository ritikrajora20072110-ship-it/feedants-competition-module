import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { theme } from '../constants/theme';

export const ImportantDates = ({ dates, t }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t.importantDates}</Text>

      <View style={styles.gridCard}>
        {/* Row 1 */}
        <View style={styles.row}>
          {/* Register Before */}
          <View style={[styles.cell, styles.cellBorderRight]}>
            <View style={styles.iconWrapper}>
              <Ionicons name="calendar-outline" size={18} color="#0D9488" />
            </View>
            <View style={styles.cellContent}>
              <Text style={styles.dateLabel}>{t.registerBefore}</Text>
              <Text style={styles.dateValue}>10 Aug 26</Text>
              <Text style={styles.timeValue}>11:50 PM</Text>
            </View>
          </View>

          {/* Submission Starts */}
          <View style={styles.cell}>
            <View style={styles.iconWrapper}>
              <Feather name="send" size={16} color="#0D9488" />
            </View>
            <View style={styles.cellContent}>
              <Text style={styles.dateLabel}>{t.submissionStarts}</Text>
              <Text style={styles.dateValue}>6 Aug 26</Text>
              <Text style={styles.timeValue}>04:00 AM</Text>
            </View>
          </View>
        </View>

        {/* Horizontal Divider */}
        <View style={styles.horizontalDivider} />

        {/* Row 2 */}
        <View style={styles.row}>
          {/* Submission Ends */}
          <View style={[styles.cell, styles.cellBorderRight]}>
            <View style={styles.iconWrapper}>
              <Feather name="upload" size={16} color="#0D9488" />
            </View>
            <View style={styles.cellContent}>
              <Text style={styles.dateLabel}>{t.submissionEnds}</Text>
              <Text style={styles.dateValue}>30 Aug 26</Text>
              <Text style={styles.timeValue}>11:55 PM</Text>
            </View>
          </View>

          {/* Result Date */}
          <View style={styles.cell}>
            <View style={styles.iconWrapper}>
              <Ionicons name="trophy-outline" size={18} color="#0D9488" />
            </View>
            <View style={styles.cellContent}>
              <Text style={styles.dateLabel}>{t.resultDate}</Text>
              <Text style={styles.dateValue}>1 Sept 26</Text>
              <Text style={styles.timeValue}>11:50 PM</Text>
            </View>
          </View>
        </View>
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
  sectionTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.textPrimary,
    marginBottom: 10,
  },
  gridCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 10,
  },
  cellBorderRight: {
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    width: '100%',
  },
  iconWrapper: {
    paddingTop: 2,
  },
  cellContent: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 11,
    color: theme.colors.textSecondary,
    marginBottom: 2,
  },
  dateValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#086972',
  },
  timeValue: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    marginTop: 1,
  },
});
