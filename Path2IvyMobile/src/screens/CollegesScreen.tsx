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
import { mockStudentProfile, mockColleges } from '../data/mockData';
import { College } from '../types';

const { width } = Dimensions.get('window');

const CollegesScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('match');

  const categories = ['all', 'safe', 'target', 'reach', 'extremeReach'];
  const regions = ['all', 'West Coast', 'East Coast', 'Midwest', 'South'];
  const types = ['all', 'public', 'private'];

  const calculateMatchScore = (college: College, profile: any): number => {
    let score = 0;
    let totalCriteria = 0;

    // Academic criteria (40% weight)
    if (profile.gpa >= college.averageGPA) {
      score += 40;
    }
    totalCriteria += 40;

    if (college.averageSAT && profile.satScore) {
      if (profile.satScore >= college.averageSAT) {
        score += 20;
      }
      totalCriteria += 20;
    }

    if (college.averageACT && profile.actScore) {
      if (profile.actScore >= college.averageACT) {
        score += 20;
      }
      totalCriteria += 20;
    }

    // Financial criteria (25% weight)
    if (college.maxFamilyIncome && profile.familyIncome <= college.maxFamilyIncome) {
      score += 25;
    }
    totalCriteria += 25;

    // Geographic criteria (15% weight)
    if (college.states && college.states.includes(profile.state)) {
      score += 15;
    } else if (!college.states) {
      score += 15;
    }
    totalCriteria += 15;

    // Major criteria (10% weight)
    if (college.majors.includes('All majors') || 
        profile.intendedMajor.some((major: string) => college.majors.includes(major))) {
      score += 10;
    }
    totalCriteria += 10;

    // Leadership criteria (10% weight)
    if (college.leadershipRequired && profile.leadershipRoles.length > 0) {
      score += 10;
    }
    totalCriteria += 10;

    // Community service criteria (10% weight)
    if (college.communityServiceRequired && profile.communityService >= college.communityServiceRequired) {
      score += 10;
    }
    totalCriteria += 10;

    // Research experience criteria (10% weight)
    if (college.researchExperience && profile.researchExperience) {
      score += 10;
    }
    totalCriteria += 10;

    return Math.round((score / totalCriteria) * 100);
  };

  const filteredColleges = useMemo(() => {
    return mockColleges.filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || college.category === selectedCategory;
      const matchesRegion = selectedRegion === 'all' || college.region === selectedRegion;
      const matchesType = selectedType === 'all' || college.type === selectedType;

      return matchesSearch && matchesCategory && matchesRegion && matchesType;
    }).map(college => ({
      ...college,
      matchScore: calculateMatchScore(college, mockStudentProfile) / 100
    }));
  }, [searchTerm, selectedCategory, selectedRegion, selectedType]);

  const sortedColleges = useMemo(() => {
    return [...filteredColleges].sort((a, b) => {
      switch (sortBy) {
        case 'match':
          return b.matchScore - a.matchScore;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'acceptance':
          return a.acceptanceRate - b.acceptanceRate;
        case 'tuition':
          return a.tuition - b.tuition;
        default:
          return 0;
      }
    });
  }, [filteredColleges, sortBy]);

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
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search colleges..."
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
              {category.replace(/([A-Z])/g, ' $1').trim()}
            </Chip>
          ))}
        </View>
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        <View style={styles.filtersRow}>
          <Chip
            selected={selectedRegion === 'all'}
            onPress={() => setSelectedRegion('all')}
            style={styles.filterChip}
          >
            All Regions
          </Chip>
          {regions.slice(1).map(region => (
            <Chip
              key={region}
              selected={selectedRegion === region}
              onPress={() => setSelectedRegion(region)}
              style={styles.filterChip}
            >
              {region}
            </Chip>
          ))}
        </View>
      </ScrollView>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersContainer}>
        <View style={styles.filtersRow}>
          <Chip
            selected={selectedType === 'all'}
            onPress={() => setSelectedType('all')}
            style={styles.filterChip}
          >
            All Types
          </Chip>
          {types.slice(1).map(type => (
            <Chip
              key={type}
              selected={selectedType === type}
              onPress={() => setSelectedType(type)}
              style={styles.filterChip}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
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
            mode={sortBy === 'name' ? 'contained' : 'outlined'}
            onPress={() => setSortBy('name')}
            style={styles.sortButton}
          >
            Name
          </Button>
          <Button
            mode={sortBy === 'acceptance' ? 'contained' : 'outlined'}
            onPress={() => setSortBy('acceptance')}
            style={styles.sortButton}
          >
            Acceptance
          </Button>
          <Button
            mode={sortBy === 'tuition' ? 'contained' : 'outlined'}
            onPress={() => setSortBy('tuition')}
            style={styles.sortButton}
          >
            Tuition
          </Button>
        </View>
      </View>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Paragraph style={styles.resultsText}>
          {sortedColleges.length} colleges found
        </Paragraph>
      </View>

      {/* College Cards */}
      <ScrollView style={styles.collegesList}>
        {sortedColleges.map((college) => (
          <Card key={college.id} style={styles.collegeCard}>
            <Card.Content>
              <View style={styles.collegeHeader}>
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
                <Avatar.Text 
                  size={40} 
                  label={college.name.charAt(0)}
                  style={[styles.collegeAvatar, { backgroundColor: getCategoryColor(college.category) }]}
                />
              </View>

              <View style={styles.collegeDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="school" size={16} color="#6b7280" />
                  <Paragraph style={styles.detailText}>
                    Acceptance: {college.acceptanceRate}%
                  </Paragraph>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="cash" size={16} color="#6b7280" />
                  <Paragraph style={styles.detailText}>
                    Tuition: ${college.tuition.toLocaleString()}
                  </Paragraph>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="people" size={16} color="#6b7280" />
                  <Paragraph style={styles.detailText}>
                    Avg GPA: {college.averageGPA}
                  </Paragraph>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="book" size={16} color="#6b7280" />
                  <Paragraph style={styles.detailText}>
                    {college.majors.slice(0, 3).join(', ')}
                    {college.majors.length > 3 ? '...' : ''}
                  </Paragraph>
                </View>
              </View>

              <View style={styles.collegeHighlights}>
                <Paragraph style={styles.highlightsTitle}>Highlights:</Paragraph>
                {college.highlights.slice(0, 2).map((highlight, index) => (
                  <View key={index} style={styles.highlightItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                    <Paragraph style={styles.highlightText}>{highlight}</Paragraph>
                  </View>
                ))}
              </View>

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
  collegesList: {
    flex: 1,
  },
  collegeCard: {
    margin: 16,
    marginTop: 8,
    elevation: 2,
  },
  collegeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  collegeInfo: {
    flex: 1,
  },
  collegeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  collegeLocation: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  collegeStats: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryChip: {
    height: 24,
  },
  matchChip: {
    height: 24,
  },
  collegeAvatar: {
    marginLeft: 12,
  },
  collegeDetails: {
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
  collegeHighlights: {
    marginBottom: 16,
  },
  highlightsTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  highlightText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 8,
  },
  viewButton: {
    marginTop: 8,
  },
});

export default CollegesScreen;
