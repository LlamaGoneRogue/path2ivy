# Path2Ivy Mobile App

A React Native mobile application for college admissions guidance and student profile management.

## 🚀 Features

### 📱 **Dashboard**
- Student profile overview with key stats
- Quick action buttons for main features
- Top college matches with match percentages
- Scholarship opportunities
- Recommended mentors
- Application progress tracking

### 🎓 **College Matching**
- Student profile-based college recommendations
- Match scoring algorithm considering:
  - Academic criteria (GPA, SAT, ACT)
  - Financial criteria (family income)
  - Geographic preferences
  - Major alignment
  - Leadership requirements
  - Community service requirements

### 💰 **Scholarship Discovery**
- Personalized scholarship recommendations
- Match scoring based on student profile
- Deadline tracking
- Application requirements and tips

### 👥 **Mentor Connection**
- Expert mentor recommendations
- Profile-based matching
- Rating and review system
- Specialization filtering

### 📊 **Progress Tracking**
- AI-generated roadmap
- Milestone tracking
- Task management
- Achievement system

### 🏆 **Extracurricular Activities**
- Activity tracking and management
- Category organization
- Impact measurement
- Skills development tracking

## 🛠️ Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **TypeScript** - Type safety and better development experience
- **React Navigation** - Navigation between screens
- **React Native Paper** - Material Design components
- **Expo Vector Icons** - Icon library

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
cd Path2IvyMobile
npm install
```

### 2. Start the Development Server

```bash
npm start
```

### 3. Run on Device/Simulator

#### iOS
```bash
npm run ios
```

#### Android
```bash
npm run android
```

#### Web (for testing)
```bash
npm run web
```

## 📱 App Structure

```
src/
├── components/          # Reusable UI components
├── data/               # Mock data and API functions
├── screens/            # Screen components
├── types/              # TypeScript interfaces
└── utils/              # Utility functions
```

## 🎯 Key Features

### Student Profile System
- Comprehensive student data management
- Academic stats (GPA, SAT, ACT)
- Demographics and preferences
- Target colleges and majors
- Budget and application stage

### Smart Matching Algorithm
- Multi-criteria matching for colleges, scholarships, and mentors
- Weighted scoring system
- Real-time match percentage calculation
- Personalized recommendations

### Mobile-Optimized UI
- Native mobile components
- Touch-friendly interface
- Responsive design
- Material Design principles

## 🔧 Development

### Adding New Screens

1. Create a new screen component in `src/screens/`
2. Add the screen to the navigation in `App.tsx`
3. Update the tab navigator with appropriate icons

### Adding New Data Types

1. Define interfaces in `src/types/index.ts`
2. Add mock data in `src/data/mockData.ts`
3. Update components to use the new data

### Styling

The app uses React Native Paper for consistent Material Design styling. Custom styles are defined using StyleSheet.create().

## 📦 Available Scripts

- `npm start` - Start the Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Run in web browser

## 🔗 Integration with Web App

This mobile app is designed to work alongside the Path2Ivy web application:

- **Shared Business Logic**: Core algorithms and data structures
- **Consistent User Experience**: Similar features and workflows
- **Data Synchronization**: Future integration with backend APIs
- **Cross-Platform**: Web and mobile versions complement each other

## 🚧 Current Status

### ✅ Completed
- Basic app structure and navigation
- Dashboard screen with comprehensive overview
- TypeScript interfaces and mock data
- Student profile system
- Match scoring algorithms

### 🔄 In Progress
- Individual screen implementations
- Advanced filtering and search
- Detailed college/scholarship/mentor views
- Progress tracking features

### 📋 Planned
- Backend API integration
- Real-time data synchronization
- Push notifications
- Offline support
- Advanced analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the Path2Ivy college admissions platform.

## 📞 Support

For questions or support, please contact the development team.

---

**Path2Ivy Mobile** - Your college journey, in your pocket 📱


