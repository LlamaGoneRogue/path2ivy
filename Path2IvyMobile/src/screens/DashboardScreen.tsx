import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  ProgressBar,
  Chip,
  Avatar,
  List,
  Divider,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { mockStudentProfile, mockColleges, mockScholarships, mockMentors } from '../data/mockData';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'safe': return '#10b981';
      case 'target': return '#3b82f6';
      case 'reach': return '#f59e0b';
      case 'extremeReach': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 0.9) return '#10b981';
    if (score >= 0.7) return '#3b82f6';
    if (score >= 0.5) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Welcome back!</Title>
        <Paragraph style={styles.headerSubtitle}>
          Your college journey is progressing well
        </Paragraph>
      </View>

      {/* Profile Summary Card */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.profileHeader}>
            <Avatar.Text 
              size={50} 
              label={`${mockStudentProfile.gpa}`}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Title style={styles.profileName}>Student Profile</Title>
              <Paragraph style={styles.profileDetails}>
                GPA: {mockStudentProfile.gpa} • SAT: {mockStudentProfile.satScore} • ACT: {mockStudentProfile.actScore}
              </Paragraph>
            </View>
          </View>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Title style={styles.statNumber}>{mockStudentProfile.communityService}</Title>
              <Paragraph style={styles.statLabel}>Service Hours</Paragraph>
            </View>
            <View style={styles.statItem}>
              <Title style={styles.statNumber}>{mockStudentProfile.leadershipRoles.length}</Title>
              <Paragraph style={styles.statLabel}>Leadership Roles</Paragraph>
            </View>
            <View style={styles.statItem}>
              <Title style={styles.statNumber}>{mockStudentProfile.awards.length}</Title>
              <Paragraph style={styles.statLabel}>Awards</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Quick Actions</Title>
          <View style={styles.actionButtons}>
            <Button
              mode="contained"
              icon="school"
              style={styles.actionButton}
              onPress={() => {}}
            >
              Find Colleges
            </Button>
            <Button
              mode="outlined"
              icon="card"
              style={styles.actionButton}
              onPress={() => {}}
            >
              Scholarships
            </Button>
            <Button
              mode="outlined"
              icon="people"
              style={styles.actionButton}
              onPress={() => {}}
            >
              Mentors
            </Button>
          </View>
        </Card.Content>
      </Card>

      {/* Top College Matches */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Top College Matches</Title>
          {mockColleges.slice(0, 3).map((college) => (
            <View key={college.id} style={styles.collegeItem}>
              <View style={styles.collegeInfo}>
                <Title style={styles.collegeName}>{college.name}</Title>
                <Paragraph style={styles.collegeLocation}>{college.location}</Paragraph>
                <View style={styles.collegeStats}>
                  <Chip 
                    mode="outlined" 
                    style={[styles.categoryChip, { borderColor: getCategoryColor(college.category) }]}
                  >
                    {college.category.replace(/([A-Z])/g, ' $1').trim()}
                  </Chip>
                  <Chip 
                    mode="outlined"
                    style={[styles.matchChip, { borderColor: getMatchColor(college.matchScore) }]}
                  >
                    {Math.round(college.matchScore * 100)}% match
                  </Chip>
                </View>
              </View>
              <View style={styles.collegeStats}>
                <Paragraph style={styles.statText}>Acceptance: {college.acceptanceRate}%</Paragraph>
                <Paragraph style={styles.statText}>Tuition: ${college.tuition.toLocaleString()}</Paragraph>
              </View>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Scholarship Opportunities */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Scholarship Opportunities</Title>
          {mockScholarships.slice(0, 2).map((scholarship) => (
            <View key={scholarship.id} style={styles.scholarshipItem}>
              <View style={styles.scholarshipInfo}>
                <Title style={styles.scholarshipName}>{scholarship.name}</Title>
                <Paragraph style={styles.scholarshipAmount}>
                  ${scholarship.amount.toLocaleString()}
                </Paragraph>
                <Chip 
                  mode="outlined"
                  style={[styles.matchChip, { borderColor: getMatchColor(scholarship.matchScore) }]}
                >
                  {Math.round(scholarship.matchScore * 100)}% match
                </Chip>
              </View>
              <Paragraph style={styles.deadlineText}>
                Deadline: {new Date(scholarship.deadline).toLocaleDateString()}
              </Paragraph>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Recommended Mentors */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Recommended Mentors</Title>
          {mockMentors.slice(0, 2).map((mentor) => (
            <View key={mentor.id} style={styles.mentorItem}>
              <View style={styles.mentorHeader}>
                <Avatar.Image 
                  size={40} 
                  source={{ uri: mentor.profileImage }}
                />
                <View style={styles.mentorInfo}>
                  <Title style={styles.mentorName}>
                    {mentor.firstName} {mentor.lastName}
                  </Title>
                  <Paragraph style={styles.mentorTitle}>{mentor.title}</Paragraph>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#fbbf24" />
                    <Paragraph style={styles.ratingText}>
                      {mentor.rating} ({mentor.reviewCount} reviews)
                    </Paragraph>
                  </View>
                </View>
                <Chip 
                  mode="outlined"
                  style={[styles.matchChip, { borderColor: getMatchColor(mentor.matchScore) }]}
                >
                  {Math.round(mentor.matchScore * 100)}% match
                </Chip>
              </View>
              <Paragraph style={styles.mentorRate}>${mentor.hourlyRate}/hr</Paragraph>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Progress Overview */}
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Application Progress</Title>
          <View style={styles.progressSection}>
            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Paragraph style={styles.progressLabel}>Foundation Building</Paragraph>
                <Paragraph style={styles.progressPercent}>75%</Paragraph>
              </View>
              <ProgressBar progress={0.75} color="#3b82f6" style={styles.progressBar} />
            </View>
            <View style={styles.progressItem}>
              <View style={styles.progressHeader}>
                <Paragraph style={styles.progressLabel}>Application Preparation</Paragraph>
                <Paragraph style={styles.progressPercent}>0%</Paragraph>
              </View>
              <ProgressBar progress={0} color="#6b7280" style={styles.progressBar} />
            </View>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 4,
  },
  card: {
    margin: 16,
    marginTop: 8,
    elevation: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    backgroundColor: '#3b82f6',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileDetails: {
    fontSize: 14,
    color: '#6b7280',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    minWidth: (width - 64) / 3,
  },
  collegeItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  collegeInfo: {
    marginBottom: 8,
  },
  collegeName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  collegeLocation: {
    fontSize: 14,
    color: '#6b7280',
  },
  collegeStats: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  categoryChip: {
    height: 24,
  },
  matchChip: {
    height: 24,
  },
  statText: {
    fontSize: 12,
    color: '#6b7280',
  },
  scholarshipItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  scholarshipInfo: {
    marginBottom: 8,
  },
  scholarshipName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  scholarshipAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10b981',
  },
  deadlineText: {
    fontSize: 12,
    color: '#ef4444',
  },
  mentorItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  mentorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  mentorInfo: {
    flex: 1,
    marginLeft: 12,
  },
  mentorName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mentorTitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  mentorRate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  progressSection: {
    gap: 16,
  },
  progressItem: {
    marginBottom: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  progressPercent: {
    fontSize: 14,
    color: '#6b7280',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
});

export default DashboardScreen;


