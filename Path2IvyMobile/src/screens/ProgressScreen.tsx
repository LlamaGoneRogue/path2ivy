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
  ProgressBar,
  Chip,
  Button,
  Avatar,
  Divider,
  List,
  Badge,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { mockRoadmap, mockAchievements } from '../data/mockData';
import { RoadmapPhase, Achievement } from '../types';

const { width } = Dimensions.get('window');

const ProgressScreen = () => {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const overallProgress = useMemo(() => {
    const totalPhases = mockRoadmap.length;
    const completedPhases = mockRoadmap.filter(phase => phase.isCompleted).length;
    const activePhase = mockRoadmap.find(phase => phase.isActive);
    const activeProgress = activePhase ? activePhase.progress : 0;
    
    return Math.round(((completedPhases + (activeProgress / 100)) / totalPhases) * 100);
  }, []);

  const totalTasks = useMemo(() => {
    return mockRoadmap.reduce((total, phase) => {
      return total + phase.milestones.reduce((milestoneTotal, milestone) => {
        return milestoneTotal + milestone.tasks.length;
      }, 0);
    }, 0);
  }, []);

  const completedTasks = useMemo(() => {
    return mockRoadmap.reduce((total, phase) => {
      return total + phase.milestones.reduce((milestoneTotal, milestone) => {
        return milestoneTotal + milestone.tasks.filter(task => task.isCompleted).length;
      }, 0);
    }, 0);
  }, []);

  const totalPoints = useMemo(() => {
    return mockAchievements.reduce((total, achievement) => total + achievement.points, 0);
  }, []);

  const getPhaseColor = (phase: RoadmapPhase) => {
    if (phase.isCompleted) return '#10b981';
    if (phase.isActive) return '#3b82f6';
    return '#6b7280';
  };

  const getTaskPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getAchievementIcon = (icon: string) => {
    switch (icon) {
      case 'beaker': return 'flask';
      case 'heart': return 'heart';
      case 'trophy': return 'trophy';
      default: return 'star';
    }
  };

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
      {/* Overall Progress */}
      <Card style={styles.overallCard}>
        <Card.Content>
          <Title style={styles.overallTitle}>Application Progress</Title>
          <View style={styles.overallStats}>
            <View style={styles.statItem}>
              <Title style={styles.statNumber}>{overallProgress}%</Title>
              <Paragraph style={styles.statLabel}>Overall Progress</Paragraph>
            </View>
            <View style={styles.statItem}>
              <Title style={styles.statNumber}>{completedTasks}/{totalTasks}</Title>
              <Paragraph style={styles.statLabel}>Tasks Completed</Paragraph>
            </View>
            <View style={styles.statItem}>
              <Title style={styles.statNumber}>{totalPoints}</Title>
              <Paragraph style={styles.statLabel}>Achievement Points</Paragraph>
            </View>
          </View>
          <ProgressBar progress={overallProgress / 100} color="#3b82f6" style={styles.overallProgressBar} />
        </Card.Content>
      </Card>

      {/* Roadmap Phases */}
      <Card style={styles.phasesCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Application Roadmap</Title>
          {mockRoadmap.map((phase) => (
            <View key={phase.id} style={styles.phaseContainer}>
              <View style={styles.phaseHeader}>
                <View style={styles.phaseInfo}>
                  <Title style={styles.phaseTitle}>{phase.title}</Title>
                  <Paragraph style={styles.phaseDescription}>{phase.description}</Paragraph>
                  <View style={styles.phaseDates}>
                    <Paragraph style={styles.phaseDate}>
                      {formatDate(phase.startDate)} - {formatDate(phase.endDate)}
                    </Paragraph>
                  </View>
                </View>
                <View style={styles.phaseStatus}>
                  <Chip 
                    mode="outlined" 
                    style={[styles.statusChip, { borderColor: getPhaseColor(phase) }]}
                  >
                    {phase.isCompleted ? 'Completed' : phase.isActive ? 'Active' : 'Upcoming'}
                  </Chip>
                  <Paragraph style={styles.progressText}>{phase.progress}%</Paragraph>
                </View>
              </View>
              
              <ProgressBar progress={phase.progress / 100} color={getPhaseColor(phase)} style={styles.phaseProgressBar} />
              
              {phase.milestones.length > 0 && (
                <View style={styles.milestonesContainer}>
                  <Paragraph style={styles.milestonesTitle}>Milestones:</Paragraph>
                  {phase.milestones.map((milestone) => (
                    <View key={milestone.id} style={styles.milestoneItem}>
                      <View style={styles.milestoneHeader}>
                        <View style={styles.milestoneInfo}>
                          <Title style={styles.milestoneTitle}>{milestone.title}</Title>
                          <Paragraph style={styles.milestoneDescription}>{milestone.description}</Paragraph>
                          <Paragraph style={styles.milestoneDue}>
                            Due: {formatDate(milestone.dueDate)}
                          </Paragraph>
                        </View>
                        <View style={styles.milestoneStatus}>
                          <Chip 
                            mode="outlined" 
                            style={[styles.milestoneChip, { borderColor: milestone.isCompleted ? '#10b981' : '#6b7280' }]}
                          >
                            {milestone.isCompleted ? 'Completed' : 'In Progress'}
                          </Chip>
                          <Paragraph style={styles.milestoneProgress}>{milestone.progress}%</Paragraph>
                        </View>
                      </View>
                      
                      <ProgressBar progress={milestone.progress / 100} color={milestone.isCompleted ? '#10b981' : '#3b82f6'} style={styles.milestoneProgressBar} />
                      
                      {milestone.tasks.length > 0 && (
                        <View style={styles.tasksContainer}>
                          <Paragraph style={styles.tasksTitle}>Tasks:</Paragraph>
                          {milestone.tasks.map((task) => (
                            <View key={task.id} style={styles.taskItem}>
                              <View style={styles.taskHeader}>
                                <View style={styles.taskInfo}>
                                  <Title style={styles.taskTitle}>{task.title}</Title>
                                  <Paragraph style={styles.taskDescription}>{task.description}</Paragraph>
                                  <Paragraph style={styles.taskDue}>
                                    Due: {formatDate(task.dueDate)}
                                  </Paragraph>
                                </View>
                                <View style={styles.taskStatus}>
                                  <Chip 
                                    mode="outlined" 
                                    style={[styles.taskChip, { borderColor: getTaskPriorityColor(task.priority) }]}
                                  >
                                    {task.priority}
                                  </Chip>
                                  {task.isCompleted && (
                                    <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                                  )}
                                </View>
                              </View>
                            </View>
                          ))}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Recent Achievements */}
      <Card style={styles.achievementsCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Recent Achievements</Title>
          {mockAchievements.map((achievement) => (
            <View key={achievement.id} style={styles.achievementItem}>
              <View style={styles.achievementHeader}>
                <Avatar.Icon 
                  size={40} 
                  icon={getAchievementIcon(achievement.icon)}
                  style={[styles.achievementIcon, { backgroundColor: '#3b82f6' }]}
                />
                <View style={styles.achievementInfo}>
                  <Title style={styles.achievementTitle}>{achievement.title}</Title>
                  <Paragraph style={styles.achievementDescription}>{achievement.description}</Paragraph>
                  <View style={styles.achievementMeta}>
                    <Chip mode="outlined" style={styles.categoryChip}>
                      {achievement.category}
                    </Chip>
                    <Paragraph style={styles.achievementDate}>
                      {formatDate(achievement.earnedDate)}
                    </Paragraph>
                  </View>
                </View>
                <View style={styles.achievementPoints}>
                  <Title style={styles.pointsText}>+{achievement.points}</Title>
                  <Paragraph style={styles.pointsLabel}>points</Paragraph>
                </View>
              </View>
            </View>
          ))}
        </Card.Content>
      </Card>

      {/* Quick Actions */}
      <Card style={styles.actionsCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Quick Actions</Title>
          <View style={styles.actionButtons}>
            <Button
              mode="contained"
              icon="plus"
              style={styles.actionButton}
              onPress={() => {}}
            >
              Add Task
            </Button>
            <Button
              mode="outlined"
              icon="calendar"
              style={styles.actionButton}
              onPress={() => {}}
            >
              View Timeline
            </Button>
            <Button
              mode="outlined"
              icon="trophy"
              style={styles.actionButton}
              onPress={() => {}}
            >
              View Achievements
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  overallCard: {
    margin: 16,
    marginBottom: 8,
  },
  overallTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  overallStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
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
  overallProgressBar: {
    height: 8,
    borderRadius: 4,
  },
  phasesCard: {
    margin: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  phaseContainer: {
    marginBottom: 24,
  },
  phaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  phaseInfo: {
    flex: 1,
  },
  phaseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  phaseDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  phaseDates: {
    marginBottom: 8,
  },
  phaseDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  phaseStatus: {
    alignItems: 'flex-end',
  },
  statusChip: {
    height: 24,
    marginBottom: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#6b7280',
  },
  phaseProgressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 16,
  },
  milestonesContainer: {
    marginLeft: 16,
  },
  milestonesTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 12,
  },
  milestoneItem: {
    marginBottom: 16,
  },
  milestoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  milestoneInfo: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  milestoneDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  milestoneDue: {
    fontSize: 11,
    color: '#6b7280',
  },
  milestoneStatus: {
    alignItems: 'flex-end',
  },
  milestoneChip: {
    height: 20,
    marginBottom: 4,
  },
  milestoneProgress: {
    fontSize: 10,
    color: '#6b7280',
  },
  milestoneProgressBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: 12,
  },
  tasksContainer: {
    marginLeft: 16,
  },
  tasksTitle: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  taskItem: {
    marginBottom: 8,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  taskDescription: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 2,
  },
  taskDue: {
    fontSize: 10,
    color: '#6b7280',
  },
  taskStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  taskChip: {
    height: 18,
  },
  achievementsCard: {
    margin: 16,
    marginTop: 8,
  },
  achievementItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  achievementHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIcon: {
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  achievementMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryChip: {
    height: 20,
  },
  achievementDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  achievementPoints: {
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
  pointsLabel: {
    fontSize: 10,
    color: '#6b7280',
  },
  actionsCard: {
    margin: 16,
    marginTop: 8,
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
});

export default ProgressScreen;
