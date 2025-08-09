'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/hooks/useAuth';

interface Mentor {
  _id: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  title: string;
  institution: string;
  expertise: string[];
  biography: string;
  experience: number;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  availability: {
    days: string[];
    timeSlots: string[];
  };
  specializations: string[];
  education: Array<{
    degree: string;
    institution: string;
    graduationYear: number;
  }>;
  achievements: string[];
  languages: string[];
  responseTime: string;
  totalSessions: number;
  successStories: number;
  isVerified: boolean;
}

interface Review {
  _id: string;
  userName: string;
  rating: number;
  review: string;
  createdAt: string;
  sessionType: string;
}

const sessionTypes = [
  { value: 'consultation', label: 'Initial Consultation', duration: 60, description: 'Get to know each other and discuss your goals' },
  { value: 'essay-review', label: 'Essay Review', duration: 45, description: 'Detailed review and feedback on your essays' },
  { value: 'interview-prep', label: 'Interview Preparation', duration: 60, description: 'Mock interviews and preparation strategies' },
  { value: 'strategy-session', label: 'Strategy Session', duration: 90, description: 'Comprehensive application strategy planning' },
  { value: 'follow-up', label: 'Follow-up Session', duration: 30, description: 'Continue previous discussions and check progress' }
];

export default function MentorProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSessionType, setSelectedSessionType] = useState('consultation');
  const [studentGoals, setStudentGoals] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        setLoading(true);
        const [mentorResponse, reviewsResponse] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/mentors/${params.id}`),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/mentors/${params.id}/reviews`)
        ]);
        
        setMentor(mentorResponse.data);
        setReviews(reviewsResponse.data.reviews);
      } catch (error) {
        console.error('Error fetching mentor data:', error);
        router.push('/mentors');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchMentorData();
    }
  }, [params.id, router]);

  const handleBookSession = async () => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (!selectedDate || !selectedTime || !studentGoals.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setBookingLoading(true);
      const sessionTypeData = sessionTypes.find(st => st.value === selectedSessionType);
      
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/mentors/${params.id}/book`,
        {
          sessionType: selectedSessionType,
          scheduledDate: `${selectedDate}T${selectedTime}:00`,
          duration: sessionTypeData?.duration || 60,
          studentGoals
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      alert('Session booked successfully! You will receive a confirmation email shortly.');
      setShowBookingModal(false);
      
      // Reset form
      setSelectedDate('');
      setSelectedTime('');
      setStudentGoals('');
    } catch (error) {
      console.error('Error booking session:', error);
      alert('Error booking session. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading mentor profile...</p>
        </div>
      </div>
    );
  }

  if (!mentor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Mentor not found</h1>
          <button
            onClick={() => router.push('/mentors')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Mentors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Mentors
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Mentor Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-start space-x-6">
                <img
                  src={mentor.profileImage}
                  alt={`${mentor.firstName} ${mentor.lastName}`}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {mentor.firstName} {mentor.lastName}
                    </h1>
                    {mentor.isVerified && (
                      <span className="ml-3 text-blue-500" title="Verified Mentor">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <p className="text-xl text-blue-600 font-semibold mb-1">{mentor.title}</p>
                  <p className="text-lg text-gray-600 mb-4">{mentor.institution}</p>

                  {/* Rating and Stats */}
                  <div className="flex items-center space-x-6 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex">{renderStars(mentor.rating)}</div>
                      <span className="text-gray-600">
                        {mentor.rating} ({mentor.reviewCount} reviews)
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      ${mentor.hourlyRate}/hour
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center bg-gray-50 rounded-lg p-3">
                      <p className="text-lg font-bold text-gray-900">{mentor.experience}</p>
                      <p className="text-sm text-gray-600">Years Experience</p>
                    </div>
                    <div className="text-center bg-gray-50 rounded-lg p-3">
                      <p className="text-lg font-bold text-gray-900">{mentor.totalSessions}</p>
                      <p className="text-sm text-gray-600">Total Sessions</p>
                    </div>
                    <div className="text-center bg-gray-50 rounded-lg p-3">
                      <p className="text-lg font-bold text-gray-900">{mentor.successStories}</p>
                      <p className="text-sm text-gray-600">Success Stories</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{mentor.biography}</p>

              {/* Languages */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {mentor.languages.map((language) => (
                    <span
                      key={language}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              {/* Response Time */}
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Typically responds {mentor.responseTime}
              </div>
            </div>

            {/* Specializations */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Specializations</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {mentor.specializations.map((spec) => (
                  <div
                    key={spec}
                    className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center"
                  >
                    <span className="text-blue-800 font-medium">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Education</h2>
              <div className="space-y-4">
                {mentor.education.map((edu, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.institution}</p>
                      <p className="text-sm text-gray-500">Class of {edu.graduationYear}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Achievements</h2>
              <ul className="space-y-2">
                {mentor.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <span className="text-gray-700">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Reviews</h2>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review._id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {review.userName.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                            <div className="flex items-center space-x-2">
                              <div className="flex">{renderStars(review.rating)}</div>
                              <span className="text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {review.sessionType}
                          </span>
                        </div>
                        <p className="text-gray-700">{review.review}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-6">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-gray-900 mb-2">${mentor.hourlyRate}/hour</p>
                <p className="text-gray-600">Professional Mentoring</p>
              </div>

              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4"
              >
                Book a Session
              </button>

              <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors mb-6">
                Send Message
              </button>

              {/* Availability Preview */}
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Available Days</h3>
                <div className="flex flex-wrap gap-1 mb-4">
                  {mentor.availability.days.map((day) => (
                    <span
                      key={day}
                      className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs"
                    >
                      {day.slice(0, 3)}
                    </span>
                  ))}
                </div>

                <h3 className="font-semibold text-gray-900 mb-3">Available Times</h3>
                <div className="grid grid-cols-2 gap-1">
                  {mentor.availability.timeSlots.slice(0, 6).map((time) => (
                    <span
                      key={time}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs text-center"
                    >
                      {time}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Book a Session</h2>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Session Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Session Type
                  </label>
                  <select
                    value={selectedSessionType}
                    onChange={(e) => setSelectedSessionType(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    {sessionTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label} ({type.duration} min)
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500 mt-1">
                    {sessionTypes.find(st => st.value === selectedSessionType)?.description}
                  </p>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a time</option>
                    {mentor.availability.timeSlots.map((time) => (
                      <option key={time} value={time.replace(/\s+/g, '')}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Goals */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Goals for This Session *
                  </label>
                  <textarea
                    value={studentGoals}
                    onChange={(e) => setStudentGoals(e.target.value)}
                    placeholder="Tell us what you'd like to achieve in this session..."
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                {/* Price Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">
                      {sessionTypes.find(st => st.value === selectedSessionType)?.duration} minute session
                    </span>
                    <span className="font-semibold text-gray-900">
                      ${mentor.hourlyRate}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleBookSession}
                    disabled={bookingLoading || !selectedDate || !selectedTime || !studentGoals.trim()}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {bookingLoading ? 'Booking...' : 'Book Session'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



