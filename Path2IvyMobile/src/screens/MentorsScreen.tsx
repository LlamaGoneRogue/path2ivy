import React, { useEffect, useMemo, useState } from 'react';
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
  Searchbar,
  Chip,
  Button,
  Avatar,
  Divider,
  List,
  Badge,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { mockStudentProfile, mockMentors } from '../data/mockData';
import { saveCache, loadCache } from '../utils/cache';
import { Mentor } from '../types';

const { width } = Dimensions.get('window');

const MentorsScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [maxRate, setMaxRate] = useState('');
  const [minRating, setMinRating] = useState('all');
  const [sortBy, setSortBy] = useState('match');

  const specializations = ['all', 'College Admissions', 'Essay Writing', 'Ivy League', 'STEM Applications', 'Financial Aid', 'Scholarship Applications', 'First-Gen Support'];

  // Offline cache simple demo: save filtered mentors snapshot
  useEffect(() => {
    (async () => {
      try {
        const cached = await loadCache<any[]>('mentors_cache');
        if (!cached || cached.length === 0) {
          await saveCache('mentors_cache', mockMentors);
        }
      } catch {}
    })();
  }, []);
  const rateRanges = ['all', '0-50', '50-100', '100-150', '150+'];
  const ratingRanges = ['all', '4.5+', '4.0+', '3.5+'];

  const calculateMatchScore = (mentor: Mentor, profile: any): number => {
    let score = 0;
    let totalCriteria = 0;

    // Academic criteria (30% weight)
    if (profile.gpa >= (mentor.minGPA || 0)) {
      score += 30;
    }
    totalCriteria += 30;

    if (mentor.minSAT && profile.satScore >= mentor.minSAT) {
      score += 15;
    }
    totalCriteria += 15;

    if (mentor.minACT && profile.actScore >= mentor.minACT) {
      score += 15;
    }
    totalCriteria += 15;

    // Budget criteria (20% weight)
    if (mentor.maxBudget && profile.budget <= mentor.maxBudget) {
      score += 20;
    }
    totalCriteria += 20;

    // Specialization alignment (25% weight)
    const specializationMatch = mentor.specializations.some(spec => 
      profile.preferredSpecializations.includes(spec)
    );
    if (specializationMatch) {
      score += 25;
    }
    totalCriteria += 25;

    // Target college alignment (15% weight)
    if (mentor.targetColleges) {
      const collegeMatch = mentor.targetColleges.some(college => 
        profile.targetColleges.includes(college)
      );
      if (collegeMatch) {
        score += 15;
      }
    }
    totalCriteria += 15;

    // Student type preference (10% weight)
    if (mentor.preferredStudentTypes) {
      const typeMatch = mentor.preferredStudentTypes.some(type => {
        if (type === 'First-generation' && profile.firstGen) return true;
        if (type === 'Hispanic' && profile.ethnicity === 'Hispanic') return true;
        if (type === 'STEM-focused' && profile.intendedMajor.some((major: string) => 
          ['Computer Science', 'Engineering', 'Physics', 'Chemistry', 'Biology'].includes(major)
        )) return true;
        return false;
      });
      if (typeMatch) {
        score += 10;
      }
    }
    totalCriteria += 10;

    return Math.round((score / totalCriteria) * 100);
  };

  const filteredMentors = useMemo(() => {
    return mockMentors.filter(mentor => {
      const matchesSearch = mentor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mentor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mentor.institution.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mentor.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesSpecialization = selectedSpecialization === 'all' || mentor.specializations.includes(selectedSpecialization);
      const matchesRate = !maxRate || mentor.hourlyRate <= parseInt(maxRate);
      const matchesRating = minRating === 'all' || mentor.rating >= parseFloat(minRating);

      return matchesSearch && matchesSpecialization && matchesRate && matchesRating;
    }).map(mentor => ({
      ...mentor,
      matchScore: calculateMatchScore(mentor, mockStudentProfile) / 100
    }));
  }, [searchTerm, selectedSpecialization, maxRate, minRating]);

  const sortedMentors = useMemo(() => {
    return [...filteredMentors].sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return b.matchScore - a.matchScore;
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return a.hourlyRate - b.hourlyRate;
        case 'experience':
          return b.experience - a.experience;
        default:
          return 0;
      }
    });
  }, [filteredMentors, sortBy]);

  const getMatchColor = (score: number) => {
    if (score >= 0.9) return '#10b981';
    if (score >= 0.7) return '#3b82f6';
    if (score >= 0.5) return '#f59e0b';
    return '#ef4444';
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return '#10b981';
    if (rating >= 4.0) return '#3b82f6';
    if (rating >= 3.5) return '#f59e0b';
    return '#6b7280';
  };

  const getRateColor = (rate: number) => {
    if (rate <= 50) return '#10b981';
    if (rate <= 100) return '#3b82f6';
    if (rate <= 150) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search mentors..."
          onChangeText={setSearchTerm}
          value={searchTerm}
          style={styles.searchbar}
        />
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        <View style={styles.filtersRow}>
          <Chip
            selected={selectedSpecialization === 'all'}
            onPress={() => setSelectedSpecialization('all')}
            style={styles.filterChip}
          >
            All Specializations
          </Chip>
          {specializations.slice(1).map(specialization => (
            <Chip
              key={specialization}
              selected={selectedSpecialization === specialization}
              onPress={() => setSelectedSpecialization(specialization)}
              style={styles.filterChip}
            >
              {specialization}
            </Chip>
          ))}
        </View>
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        <View style={styles.filtersRow}>
          <Chip
            selected={maxRate === ''}
            onPress={() => setMaxRate('')}
            style={styles.filterChip}
          >
            All Rates
          </Chip>
          {rateRanges.slice(1).map(rate => (
            <Chip
              key={rate}
              selected={maxRate === rate}
              onPress={() => setMaxRate(rate)}
              style={styles.filterChip}
            >
              ${rate}/hr
            </Chip>
          ))}
        </View>
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        <View style={styles.filtersRow}>
          <Chip
            selected={minRating === 'all'}
            onPress={() => setMinRating('all')}
            style={styles.filterChip}
          >
            All Ratings
          </Chip>
          {ratingRanges.slice(1).map(rating => (
            <Chip
              key={rating}
              selected={minRating === rating}
              onPress={() => setMinRating(rating)}
              style={styles.filterChip}
            >
              {rating}
            </Chip>
          ))}
        </View>
      </ScrollView>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Paragraph style={styles.sortLabel}>Sort by:</Paragraph>
        <View style={styles.sortButtons}>
          <Button
            mode={sortBy === 'match' ? 'contained' : 'outlined'}
            onPress={() => setSortBy('match')}
            style={styles.sortButton}
          >
            Match
          </Button>
          <Button
            mode={sortBy === 'rating' ? 'contained' : 'outlined'}
            onPress={() => setSortBy('rating')}
            style={styles.sortButton}
          >
            Rating
          </Button>
          <Button
            mode={sortBy === 'price' ? 'contained' : 'outlined'}
            onPress={() => setSortBy('price')}
            style={styles.sortButton}
          >
            Price
          </Button>
          <Button
            mode={sortBy === 'experience' ? 'contained' : 'outlined'}
            onPress={() => setSortBy('experience')}
            style={styles.sortButton}
          >
            Experience
          </Button>
        </View>
      </View>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Paragraph style={styles.resultsText}>
          {sortedMentors.length} mentors found
        </Paragraph>
      </View>

      {/* Mentor Cards */}
      <ScrollView style={styles.mentorsList}>
        {sortedMentors.map((mentor) => (
          <Card key={mentor.id} style={styles.mentorCard}>
            <Card.Content>
              <View style={styles.mentorHeader}>
                <Avatar.Image 
                  size={60} 
                  source={{ uri: mentor.profileImage }}
                  style={styles.mentorAvatar}
                />
                <View style={styles.mentorInfo}>
                  <Title style={styles.mentorName}>
                    {mentor.firstName} {mentor.lastName}
                  </Title>
                  <Paragraph style={styles.mentorTitle}>{mentor.title}</Paragraph>
                  <Paragraph style={styles.mentorInstitution}>{mentor.institution}</Paragraph>
                  
                  <View style={styles.mentorStats}>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={16} color="#fbbf24" />
                      <Paragraph style={[styles.ratingText, { color: getRatingColor(mentor.rating) }]}>
                        {mentor.rating} ({mentor.reviewCount} reviews)
                      </Paragraph>
                    </View>
                    <View style={styles.experienceContainer}>
                      <Ionicons name="time" size={16} color="#6b7280" />
                      <Paragraph style={styles.experienceText}>
                        {mentor.experience} years
                      </Paragraph>
                    </View>
                  </View>
                </View>
                <View style={styles.matchContainer}>
                  <Chip 
                    mode="outlined"
                    style={[styles.matchChip, { borderColor: getMatchColor(mentor.matchScore) }]}
                  >
                    {Math.round(mentor.matchScore * 100)}% match
                  </Chip>
                </View>
              </View>

              <Paragraph style={styles.mentorBio}>
                {mentor.biography}
              </Paragraph>

              <View style={styles.specializationsContainer}>
                <Paragraph style={styles.specializationsTitle}>Specializations:</Paragraph>
                <View style={styles.specializationsList}>
                  {mentor.specializations.slice(0, 3).map((spec, index) => (
                    <Chip key={index} mode="outlined" style={styles.specChip}>
                      {spec}
                    </Chip>
                  ))}
                  {mentor.specializations.length > 3 && (
                    <Chip mode="outlined" style={styles.specChip}>
                      +{mentor.specializations.length - 3} more
                    </Chip>
                  )}
                </View>
              </View>

              <View style={styles.mentorDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="cash" size={16} color="#6b7280" />
                  <Paragraph style={[styles.detailText, { color: getRateColor(mentor.hourlyRate) }]}>
                    ${mentor.hourlyRate}/hr
                  </Paragraph>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="chatbubble" size={16} color="#6b7280" />
                  <Paragraph style={styles.detailText}>
                    {mentor.responseTime}
                  </Paragraph>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="people" size={16} color="#6b7280" />
                  <Paragraph style={styles.detailText}>
                    {mentor.totalSessions} sessions
                  </Paragraph>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="trophy" size={16} color="#6b7280" />
                  <Paragraph style={styles.detailText}>
                    {mentor.successStories} success stories
                  </Paragraph>
                </View>
              </View>

              {mentor.isVerified && (
                <View style={styles.verifiedContainer}>
                  <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                  <Paragraph style={styles.verifiedText}>Verified Mentor</Paragraph>
                </View>
              )}

              <Button
                mode="contained"
                onPress={() => {}}
                style={styles.viewButton}
              >
                View Profile
              </Button>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  searchbar: {
    elevation: 2,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    marginRight: 8,
  },
  sortContainer: {
    padding: 16,
    paddingTop: 8,
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  sortButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sortButton: {
    marginRight: 8,
  },
  resultsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  resultsText: {
    fontSize: 14,
    color: '#6b7280',
  },
  mentorsList: {
    flex: 1,
  },
  mentorCard: {
    margin: 16,
    marginTop: 8,
    elevation: 2,
  },
  mentorHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  mentorAvatar: {
    marginRight: 12,
  },
  mentorInfo: {
    flex: 1,
  },
  mentorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  mentorTitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 2,
  },
  mentorInstitution: {
    fontSize: 14,
    color: '#3b82f6',
    marginBottom: 8,
  },
  mentorStats: {
    flexDirection: 'row',
    gap: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  experienceText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  matchContainer: {
    alignItems: 'flex-end',
  },
  matchChip: {
    height: 24,
  },
  mentorBio: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  specializationsContainer: {
    marginBottom: 12,
  },
  specializationsTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  specializationsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specChip: {
    height: 24,
  },
  mentorDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
  },
  verifiedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  verifiedText: {
    fontSize: 12,
    color: '#10b981',
    marginLeft: 4,
  },
  viewButton: {
    marginTop: 8,
  },
});

export default MentorsScreen;
