import React, { useState, useMemo } from 'react';
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
import { mockStudentProfile, mockScholarships } from '../data/mockData';
import { Scholarship } from '../types';

const { width } = Dimensions.get('window');

const ScholarshipsScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAmount, setSelectedAmount] = useState('all');
  const [sortBy, setSortBy] = useState('match');

  const categories = ['all', 'merit', 'need', 'ethnicity', 'major', 'state', 'other'];
  const amountRanges = ['all', '0-1000', '1000-5000', '5000-10000', '10000+'];

  const calculateMatchScore = (scholarship: Scholarship, profile: any): number => {
    let score = 0;
    let totalCriteria = 0;

    // Academic criteria (40% weight)
    if (profile.gpa >= scholarship.gpa) {
      score += 40;
    }
    totalCriteria += 40;

    if (scholarship.satScore && profile.satScore) {
      if (profile.satScore >= scholarship.satScore) {
        score += 20;
      }
      totalCriteria += 20;
    }

    if (scholarship.actScore && profile.actScore) {
      if (profile.actScore >= scholarship.actScore) {
        score += 20;
      }
      totalCriteria += 20;
    }

    // Financial criteria (25% weight)
    if (scholarship.maxFamilyIncome && profile.familyIncome <= scholarship.maxFamilyIncome) {
      score += 25;
    }
    totalCriteria += 25;

    // Geographic criteria (15% weight)
    if (scholarship.states && scholarship.states.includes(profile.state)) {
      score += 15;
    } else if (!scholarship.states) {
      score += 15; // National scholarships
    }
    totalCriteria += 15;

    // Demographic criteria (20% weight)
    if (scholarship.ethnicity && scholarship.ethnicity === profile.ethnicity) {
      score += 10;
    }
    totalCriteria += 10;

    if (scholarship.firstGen && profile.firstGen) {
      score += 10;
    }
    totalCriteria += 10;

    // Major criteria (10% weight)
    if (scholarship.majors.includes('All majors') || 
        profile.intendedMajor.some((major: string) => scholarship.majors.includes(major))) {
      score += 10;
    }
    totalCriteria += 10;

    // Leadership criteria (10% weight)
    if (scholarship.leadershipRequired && profile.leadershipRoles.length > 0) {
      score += 10;
    }
    totalCriteria += 10;

    // Community service criteria (10% weight)
    if (scholarship.communityServiceRequired && profile.communityService >= scholarship.communityServiceRequired) {
      score += 10;
    }
    totalCriteria += 10;

    return Math.round((score / totalCriteria) * 100);
  };

  const filteredScholarships = useMemo(() => {
    return mockScholarships.filter(scholarship => {
      const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           scholarship.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || scholarship.category === selectedCategory;
      
      let matchesAmount = true;
      if (selectedAmount !== 'all') {
        const [min, max] = selectedAmount.split('-').map(Number);
        if (selectedAmount === '10000+') {
          matchesAmount = scholarship.amount >= 10000;
        } else {
          matchesAmount = scholarship.amount >= min && scholarship.amount <= max;
        }
      }

      return matchesSearch && matchesCategory && matchesAmount;
    }).map(scholarship => ({
      ...scholarship,
      matchScore: calculateMatchScore(scholarship, mockStudentProfile) / 100
    }));
  }, [searchTerm, selectedCategory, selectedAmount]);

  const sortedScholarships = useMemo(() => {
    return [...filteredScholarships].sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return b.matchScore - a.matchScore;
        case 'amount':
          return b.amount - a.amount;
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [filteredScholarships, sortBy]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'merit': return '#3b82f6';
      case 'need': return '#10b981';
      case 'ethnicity': return '#f59e0b';
      case 'major': return '#8b5cf6';
      case 'state': return '#06b6d4';
      case 'other': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 0.9) return '#10b981';
    if (score >= 0.7) return '#3b82f6';
    if (score >= 0.5) return '#f59e0b';
    return '#ef4444';
  };

  const getAmountColor = (amount: number) => {
    if (amount >= 10000) return '#10b981';
    if (amount >= 5000) return '#3b82f6';
    if (amount >= 1000) return '#f59e0b';
    return '#6b7280';
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Deadline passed';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    if (diffDays <= 7) return `Due in ${diffDays} days`;
    return date.toLocaleDateString();
  };

  const getDeadlineColor = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return '#ef4444';
    if (diffDays <= 7) return '#f59e0b';
    return '#10b981';
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search scholarships..."
          onChangeText={setSearchTerm}
          value={searchTerm}
          style={styles.searchbar}
        />
      </View>

      {/* Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        <View style={styles.filtersRow}>
          <Chip
            selected={selectedCategory === 'all'}
            onPress={() => setSelectedCategory('all')}
            style={styles.filterChip}
          >
            All Categories
          </Chip>
          {categories.slice(1).map(category => (
            <Chip
              key={category}
              selected={selectedCategory === category}
              onPress={() => setSelectedCategory(category)}
              style={styles.filterChip}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Chip>
          ))}
        </View>
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        <View style={styles.filtersRow}>
          <Chip
            selected={selectedAmount === 'all'}
            onPress={() => setSelectedAmount('all')}
            style={styles.filterChip}
          >
            All Amounts
          </Chip>
          {amountRanges.slice(1).map(amount => (
            <Chip
              key={amount}
              selected={selectedAmount === amount}
              onPress={() => setSelectedAmount(amount)}
              style={styles.filterChip}
            >
              {amount === '10000+' ? '$10,000+' : `$${amount}`}
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
            mode={sortBy === 'amount' ? 'contained' : 'outlined'}
            onPress={() => setSortBy('amount')}
            style={styles.sortButton}
          >
            Amount
          </Button>
          <Button
            mode={sortBy === 'deadline' ? 'contained' : 'outlined'}
            onPress={() => setSortBy('deadline')}
            style={styles.sortButton}
          >
            Deadline
          </Button>
          <Button
            mode={sortBy === 'name' ? 'contained' : 'outlined'}
            onPress={() => setSortBy('name')}
            style={styles.sortButton}
          >
            Name
          </Button>
        </View>
      </View>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Paragraph style={styles.resultsText}>
          {sortedScholarships.length} scholarships found
        </Paragraph>
      </View>

      {/* Scholarship Cards */}
      <ScrollView style={styles.scholarshipsList}>
        {sortedScholarships.map((scholarship) => (
          <Card key={scholarship.id} style={styles.scholarshipCard}>
            <Card.Content>
              <View style={styles.scholarshipHeader}>
                <View style={styles.scholarshipInfo}>
                  <Title style={styles.scholarshipName}>{scholarship.name}</Title>
                  <View style={styles.scholarshipStats}>
                    <Chip 
                      mode="outlined" 
                      style={[styles.categoryChip, { borderColor: getCategoryColor(scholarship.category) }]}
                    >
                      {scholarship.category.charAt(0).toUpperCase() + scholarship.category.slice(1)}
                    </Chip>
                    <Chip 
                      mode="outlined"
                      style={[styles.matchChip, { borderColor: getMatchColor(scholarship.matchScore) }]}
                    >
                      {Math.round(scholarship.matchScore * 100)}% match
                    </Chip>
                  </View>
                </View>
                <View style={styles.amountContainer}>
                  <Title style={[styles.amountText, { color: getAmountColor(scholarship.amount) }]}>
                    ${scholarship.amount.toLocaleString()}
                  </Title>
                </View>
              </View>

              <Paragraph style={styles.scholarshipDescription}>
                {scholarship.description}
              </Paragraph>

              <View style={styles.scholarshipDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="calendar" size={16} color="#6b7280" />
                  <Paragraph style={[styles.detailText, { color: getDeadlineColor(scholarship.deadline) }]}>
                    {formatDeadline(scholarship.deadline)}
                  </Paragraph>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="school" size={16} color="#6b7280" />
                  <Paragraph style={styles.detailText}>
                    Min GPA: {scholarship.gpa}
                  </Paragraph>
                </View>
                {scholarship.satScore && (
                  <View style={styles.detailRow}>
                    <Ionicons name="book" size={16} color="#6b7280" />
                    <Paragraph style={styles.detailText}>
                      Min SAT: {scholarship.satScore}
                    </Paragraph>
                  </View>
                )}
                <View style={styles.detailRow}>
                  <Ionicons name="library" size={16} color="#6b7280" />
                  <Paragraph style={styles.detailText}>
                    {scholarship.majors.slice(0, 3).join(', ')}
                    {scholarship.majors.length > 3 ? '...' : ''}
                  </Paragraph>
                </View>
              </View>

              {scholarship.requirements.length > 0 && (
                <View style={styles.requirementsContainer}>
                  <Paragraph style={styles.requirementsTitle}>Requirements:</Paragraph>
                  {scholarship.requirements.slice(0, 3).map((requirement, index) => (
                    <View key={index} style={styles.requirementItem}>
                      <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                      <Paragraph style={styles.requirementText}>{requirement}</Paragraph>
                    </View>
                  ))}
                  {scholarship.requirements.length > 3 && (
                    <Paragraph style={styles.moreText}>
                      +{scholarship.requirements.length - 3} more requirements
                    </Paragraph>
                  )}
                </View>
              )}

              <Button
                mode="contained"
                onPress={() => {}}
                style={styles.viewButton}
              >
                View Details
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
  scholarshipsList: {
    flex: 1,
  },
  scholarshipCard: {
    margin: 16,
    marginTop: 8,
    elevation: 2,
  },
  scholarshipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  scholarshipInfo: {
    flex: 1,
  },
  scholarshipName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  scholarshipStats: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryChip: {
    height: 24,
  },
  matchChip: {
    height: 24,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scholarshipDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  scholarshipDetails: {
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
  requirementsContainer: {
    marginBottom: 16,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  requirementText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 8,
  },
  moreText: {
    fontSize: 12,
    color: '#3b82f6',
    marginTop: 4,
  },
  viewButton: {
    marginTop: 8,
  },
});

export default ScholarshipsScreen;
