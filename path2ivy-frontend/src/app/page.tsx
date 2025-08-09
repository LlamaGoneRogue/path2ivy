'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ChevronRightIcon, 
  StarIcon,
  AcademicCapIcon,
  BanknotesIcon,
  ChartBarIcon,
  UserGroupIcon,
  CheckCircleIcon,
  SparklesIcon,
    TrophyIcon,
    GlobeAltIcon,
    BuildingLibraryIcon,
    MapIcon
} from '@heroicons/react/24/outline';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const colorToGradient: Record<string, string> = {
    primary: 'from-blue-500 to-blue-600',
    secondary: 'from-purple-500 to-purple-600',
    accent: 'from-pink-500 to-pink-600',
    success: 'from-green-500 to-green-600',
    warning: 'from-yellow-500 to-yellow-600',
    error: 'from-red-500 to-red-600'
  };

  const features = [
    {
      icon: SparklesIcon,
      title: 'AI Powered Roadmaps',
      description: 'Major-aligned timeline for courses, activities, testing, and milestones.',
      color: 'primary',
      href: '/roadmap'
    },
    {
      icon: AcademicCapIcon,
      title: 'Smart College Matching',
      description: 'Discover colleges that perfectly match your interests, stats, and preferences.',
      color: 'secondary',
      href: '/colleges'
    },
    {
      icon: BanknotesIcon,
      title: 'Financial Aid Guidance',
      description: 'Find scholarships and financial aid opportunities you qualify for.',
      color: 'accent',
      href: '/scholarships'
    },
    {
      icon: ChartBarIcon,
      title: 'Progress Tracking',
      description: 'Visualize your college prep journey with comprehensive progress analytics.',
      color: 'success',
      href: '/progress'
    },
    {
      icon: UserGroupIcon,
      title: 'Mentor Connect',
      description: 'Connect with verified college counselors and peer mentors for guidance.',
      color: 'warning'
    },
    {
      icon: TrophyIcon,
      title: 'Extracurriculars',
      description: 'Track volunteering, competitions, internships, and research.',
      color: 'error',
      href: '/extracurriculars'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      school: 'Stanford University',
      quote: 'Path2Ivy helped me organize my entire application process. The AI recommendations were spot-on!',
      rating: 5
    },
    {
      name: 'Marcus Johnson',
      school: 'Harvard University',
      quote: 'As a first-generation college student, Path2Ivy made the overwhelming process manageable.',
      rating: 5
    },
    {
      name: 'Elena Rodriguez',
      school: 'MIT',
      quote: 'The scholarship finder alone saved my family thousands of dollars. Incredible platform!',
      rating: 5
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Students Helped' },
    { number: '500+', label: 'Partner Colleges' },
    { number: '$50M+', label: 'Scholarships Found' },
    { number: '95%', label: 'College Acceptance Rate' }
  ];

  const partners = [
    { name: 'City of Raleigh', href: 'https://raleighnc.gov', logo: 'https://logo.clearbit.com/raleighnc.gov', Icon: MapIcon },
    { name: 'Town of Cary', href: 'https://www.carync.gov', logo: 'https://logo.clearbit.com/carync.gov', Icon: BuildingLibraryIcon },
    { name: 'City of Durham', href: 'https://durhamnc.gov', logo: 'https://logo.clearbit.com/durhamnc.gov', Icon: GlobeAltIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <GlobeAltIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-blue-600">
                Path2Ivy
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
                How It Works
              </Link>
              <Link href="/scholarships" className="text-gray-600 hover:text-blue-600 transition-colors">
                Scholarships
              </Link>
              <Link href="/mentors" className="text-gray-600 hover:text-blue-600 transition-colors">
                Find Mentors
              </Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">
                Success Stories
              </Link>
              <Link href="/login" className="btn-ghost">
                Sign In
              </Link>
              <Link href="/register" className="btn-primary">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-50 border border-primary-200 text-primary-700 text-sm font-medium mb-8">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Free AI-Powered College Guidance
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Your Path to
                <span className="block text-blue-600">
                  Elite Colleges
                </span>
                Starts Here
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Democratizing college admissions with AI-powered guidance, personalized action plans, 
                and expert mentorship—completely free for students from all backgrounds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/register" className="btn-primary btn-xl group">
                  Start Your Journey Free
                  <ChevronRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="#demo" className="btn-secondary btn-xl">
                  Watch Demo
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                No credit card required • Always free for students • Join 10,000+ successful applicants
              </p>
            </motion.div>
          </div>

          {/* Hero Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and guidance you need 
              to navigate the complex college admissions process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const content = (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card-interactive group hover:shadow-md cursor-pointer"
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorToGradient[feature.color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
              return feature.href ? (
                <Link key={index} href={feature.href} className="block">
                  {content}
                </Link>
              ) : (
                <div key={index}>{content}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Path2Ivy Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to transform your college admissions journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Create Your Profile',
                description: 'Tell us about your academic achievements, interests, and college goals.',
                icon: UserGroupIcon
              },
              {
                step: '02',
                title: 'Get AI Recommendations',
                description: 'Get an AI roadmap aligned to your major plus smart college matches.',
                icon: SparklesIcon
              },
              {
                step: '03',
                title: 'Track Your Progress',
                description: 'Monitor your journey and celebrate achievements along the way.',
                icon: TrophyIcon
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-blue-600 font-bold text-sm mb-2">
                  STEP {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              See how Path2Ivy has helped students achieve their college dreams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-blue-600 text-sm">
                    {testimonial.school}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Our Partners</h2>
            <p className="text-gray-600 mt-2">Proudly supported by communities across the Triangle</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {partners.map((p, i) => (
              <a key={i} href={p.href} target="_blank" rel="noopener noreferrer" className="card group flex items-center justify-center h-28">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg bg-white border border-gray-200 flex items-center justify-center overflow-hidden group-hover:border-blue-300">
                    <img
                      src={p.logo}
                      alt={`${p.name} logo`}
                      className="max-h-14 max-w-14 object-contain grayscale group-hover:grayscale-0 transition"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                    />
                    <p.Icon className="w-7 h-7 text-gray-300 absolute pointer-events-none" aria-hidden="true" />
                  </div>
                  <span className="text-gray-800 font-medium group-hover:text-blue-700 transition-colors">
                    {p.name}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your College Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of students who have successfully navigated their path to elite colleges with Path2Ivy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="btn bg-white text-blue-600 hover:bg-gray-50 btn-xl">
                Start Free Today
              </Link>
              <Link href="#demo" className="btn border-2 border-white text-white hover:bg-white hover:text-blue-600 btn-xl">
                Schedule Demo
              </Link>
            </div>
            <p className="text-blue-100 text-sm mt-4">
              Free forever • No hidden fees • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <GlobeAltIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Path2Ivy</span>
              </div>
              <p className="text-gray-400">
                Democratizing college admissions with AI-powered guidance for students from all backgrounds.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Path2Ivy. All rights reserved. Made with ❤️ for students everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}