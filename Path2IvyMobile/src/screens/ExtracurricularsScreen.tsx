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
  FAB,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { mockActivities } from '../data/mockData';
import { Activity } from '../types';

const { width } = Dimensions.get('window');

const ExtracurricularsScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const categories = ['all', 'volunteering', 'competitions', 'internships', 'research', 'leadership', 'other'];
  const statuses = ['all', 'ongoing', 'completed'];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'volunteering': return 'heart';
      case 'competitions': return 'trophy';
      case 'internships': return 'briefcase';
      case 'research': return 'beaker';
      case 'leadership': return 'people';
      case 'other': return 'ellipsis-horizontal';
      default: return 'ellipsis-horizontal';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'volunteering': return '#ef4444';
      case 'competitions': return '#f59e0b';
      case 'internships': return '#3b82f6';
      case 'research': return '#8b5cf6';
      case 'leadership': return '#10b981';
      case 'other': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const filteredActivities = useMemo(() => {
    return mockActivities.filter(activity => {
      const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.organization.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || activity.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || 
                           (selectedStatus === 'ongoing' && activity.isOngoing) ||
                           (selectedStatus === 'completed' && !activity.isOngoing);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, selectedCategory, selectedStatus]);

  const sortedActivities = useMemo(() => {
    return [...filteredActivities].sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case 'hours':
          return b.totalHours - a.totalHours;
        case 'name':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });
  }, [filteredActivities, sortBy]);

  const totalHours = mockActivities.reduce((sum, activity) => sum + activity.totalHours, 0);
  const ongoingActivities = mockActivities.filter(activity => activity.isOngoing).length;
  const completedActivities = mockActivities.filter(activity => !activity.isOngoing).length;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <View style={styles.container}>
      {/* Stats Overview */}
      <Card style={styles.statsCard}>
        <Card.Content>
          <Title style={styles.statsTitle}>Activity Overview</Title>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Title style={styles.statNumber}>{totalHours}</Title>
              <Paragraph style={styles.statLabel}>Total Hours</Paragraph>
            </View>
            <View style={styles.statItem}>
              <Title style={styles.statNumber}>{ongoingActivities}</Title>
              <Paragraph style={styles.statLabel}>Ongoing</Paragraph>
            </View>
            <View style={styles.statItem}>
              <Title style={styles.statNumber}>{completedActivities}</Title>
              <Paragraph style={styles.statLabel}>Completed</Paragraph>
            </View>
            <View style={styles.statItem}>
              <Title style={styles.statNumber}>{mockActivities.length}</Title>
              <Paragraph style={styles.statLabel}>Total Activities</Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search activities..."
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
            selected={selectedStatus === 'all'}
            onPress={() => setSelectedStatus('all')}
            style={styles.filterChip}
          >
            All Status
          </Chip>
          {statuses.slice(1).map(status => (
            <Chip
              key={status}
              selected={selectedStatus === status}
              onPress={() => setSelectedStatus(status)}
              style={styles.filterChip}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Chip>
          ))}
        </View>
      </ScrollView>

      {/* Sort Options */}
      <View style={styles.sortContainer}>
        <Paragraph style={styles.sortLabel}>Sort by:</Paragraph>
        <View style={styles.sortButtons}>
          <Button
            mode={sortBy === 'recent' ? 'contained' : 'outlined'}
            onPress={() => setSortBy('recent')}
            style={styles.sortButton}
          >
            Recent
          </Button>
          <Button
            mode={sortBy === 'hours' ? 'contained' : 'outlined'}
            onPress={() => setSortBy('hours')}
            style={styles.sortButton}
          >
            Hours
          </Button>
          <Button
            mode={sortBy === 'name' ? 'contained' : 'outlined'}
            onPress={() => setSortBy('name')}
            style={styles.sortButton}
          >
            Name
          </Button>
          <Button
            mode={sortBy === 'category' ? 'contained' : 'outlined'}
            onPress={() => setSortBy('category')}
            style={styles.sortButton}
          >
            Category
          </Button>
        </View>
      </View>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Paragraph style={styles.resultsText}>
          {sortedActivities.length} activities found
        </Paragraph>
      </View>

      {/* Activity Cards */}
      <ScrollView style={styles.activitiesList}>
        {sortedActivities.map((activity) => (
          <Card key={activity.id} style={styles.activityCard}>
            <Card.Content>
              <View style={styles.activityHeader}>
                <View style={styles.activityInfo}>
                  <Title style={styles.activityName}>{activity.title}</Title>
                  <Paragraph style={styles.activityOrganization}>{activity.organization}</Paragraph>
                  <View style={styles.activityStats}>
                    <Chip 
                      mode="outlined" 
                      style={[styles.categoryChip, { borderColor: getCategoryColor(activity.category) }]}
                    >
                      {activity.category.charAt(0).toUpperCase() + activity.category.slice(1)}
                    </Chip>
                    {activity.isOngoing && (
                      <Chip mode="outlined" style={[styles.statusChip, { borderColor: '#10b981' }]}>
                        Ongoing
                      </Chip>
                    )}
                  </View>
                </View>
                <Avatar.Icon 
                  size={40} 
                  icon={getCategoryIcon(activity.category)}
                  style={[styles.activityIcon, { backgroundColor: getCategoryColor(activity.category) }]}
                />
              </View>

              <Paragraph style={styles.activityDescription}>
                {activity.description}
              </Paragraph>

              <View style={styles.activityDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="location" size={16} color="#6b7280" />
                  <Paragraph style={styles.detailText}>{activity.location}</Paragraph>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="time" size={16} color="#6b7280" />
                  <Paragraph style={styles.detailText}>
                    {formatDate(activity.startDate)} - {activity.endDate ? formatDate(activity.endDate) : 'Present'}
                  </Paragraph>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="clock" size={16} color="#6b7280" />
                  <Paragraph style={styles.detailText}>
                    {activity.hoursPerWeek} hrs/week • {activity.totalHours} total hours
                  </Paragraph>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="person" size={16} color="#6b7280" />
                  <Paragraph style={styles.detailText}>Role: {activity.role}</Paragraph>
                </View>
              </View>

              {activity.achievements.length > 0 && (
                <View style={styles.achievementsContainer}>
                  <Paragraph style={styles.achievementsTitle}>Key Achievements:</Paragraph>
                  {activity.achievements.slice(0, 2).map((achievement, index) => (
                    <View key={index} style={styles.achievementItem}>
                      <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                      <Paragraph style={styles.achievementText}>{achievement}</Paragraph>
                    </View>
                  ))}
                  {activity.achievements.length > 2 && (
                    <Paragraph style={styles.moreText}>
                      +{activity.achievements.length - 2} more achievements
                    </Paragraph>
                  )}
                </View>
              )}

              {activity.skills.length > 0 && (
                <View style={styles.skillsContainer}>
                  <Paragraph style={styles.skillsTitle}>Skills Developed:</Paragraph>
                  <View style={styles.skillsList}>
                    {activity.skills.slice(0, 3).map((skill, index) => (
                      <Chip key={index} mode="outlined" style={styles.skillChip}>
                        {skill}
                      </Chip>
                    ))}
                    {activity.skills.length > 3 && (
                      <Chip mode="outlined" style={styles.skillChip}>
                        +{activity.skills.length - 3} more
                      </Chip>
                    )}
                  </View>
                </View>
              )}

              <View style={styles.impactContainer}>
                <Paragraph style={styles.impactTitle}>Impact:</Paragraph>
                <Paragraph style={styles.impactText}>{activity.impact}</Paragraph>
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

      {/* FAB for adding new activity */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  statsCard: {
    margin: 16,
    marginBottom: 8,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
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
  activitiesList: {
    flex: 1,
  },
  activityCard: {
    margin: 16,
    marginTop: 8,
    elevation: 2,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  activityOrganization: {
    fontSize: 14,
    color: '#3b82f6',
    marginBottom: 8,
  },
  activityStats: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryChip: {
    height: 24,
  },
  statusChip: {
    height: 24,
  },
  activityIcon: {
    marginLeft: 12,
  },
  activityDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  activityDetails: {
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
  achievementsContainer: {
    marginBottom: 12,
  },
  achievementsTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  achievementText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 8,
  },
  moreText: {
    fontSize: 12,
    color: '#3b82f6',
    marginTop: 4,
  },
  skillsContainer: {
    marginBottom: 12,
  },
  skillsTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  skillsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillChip: {
    height: 24,
  },
  impactContainer: {
    marginBottom: 16,
  },
  impactTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  impactText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  viewButton: {
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#3b82f6',
  },
});

export default ExtracurricularsScreen;
