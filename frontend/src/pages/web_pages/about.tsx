import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  AboutUsDesigns,
  FeaturesDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'CityScope';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/about',
      label: 'about',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/blog',
      label: 'blog',
    },
  ];

  const features_points = [
    {
      name: 'Comprehensive HTS Analysis',
      description:
        'Our Housing \u0026 Transit Score (HTS) provides a detailed analysis of neighborhoods, helping you make informed decisions about where to live.',
      icon: 'mdiChartLine',
    },
    {
      name: 'Real-Time Data Integration',
      description:
        'Stay updated with the latest housing and transit information through our seamless integration with real-time data sources.',
      icon: 'mdiClockFast',
    },
    {
      name: 'Community Engagement Platform',
      description:
        'Connect with fellow residents and city officials through our platform, fostering collaboration and community-driven improvements.',
      icon: 'mdiAccountGroupOutline',
    },
  ];

  const faqs = [
    {
      question: 'How does Cityscope calculate the HTS?',
      answer:
        'The Housing \u0026 Transit Score (HTS) is calculated using data on affordability, commute efficiency, transit reliability, accessibility, and safety. Each factor contributes to an overall score, providing a comprehensive view of neighborhood livability.',
    },
    {
      question: 'Can I use Cityscope in my city?',
      answer:
        'Cityscope is expanding to include more cities. Check our platform to see if your city is currently supported, and stay tuned for updates as we grow.',
    },
    {
      question: 'How often is the data updated?',
      answer:
        'Cityscope integrates real-time data sources and regularly updates information to ensure accuracy. This includes housing listings, transit schedules, and user feedback.',
    },
    {
      question: 'Is there a cost to use Cityscope?',
      answer:
        'Cityscope is free for residents to use. We aim to provide accessible information to help you make informed housing decisions without any cost.',
    },
    {
      question: 'How can I provide feedback or report issues?',
      answer:
        'You can report issues or provide feedback directly through the Cityscope platform. Your input helps us improve the accuracy and relevance of our data.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`About Cityscope: Our Mission and Vision`}</title>
        <meta
          name='description'
          content={`Learn about Cityscope's mission to enhance urban living through data-driven insights. Discover our features, values, and how we empower communities.`}
        />
      </Head>
      <WebSiteHeader projectName={'CityScope'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'CityScope'}
          image={['Cityscape with diverse community']}
          mainText={`Discover the Heart of Cityscope`}
          subTitle={`At ${projectName}, we are dedicated to transforming urban living through innovative solutions. Learn about our mission, values, and the impact we strive to make in communities.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Our Story`}
        />

        <AboutUsSection
          projectName={'CityScope'}
          image={['Team collaborating on urban solutions']}
          mainText={`Empowering Urban Living with Cityscope`}
          subTitle={`${projectName} is committed to enhancing urban life by providing data-driven insights and solutions. Our mission is to make cities more accessible, affordable, and connected for everyone.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Meet Our Team`}
        />

        <FeaturesSection
          projectName={'CityScope'}
          image={['Interactive dashboard with data insights']}
          withBg={0}
          features={features_points}
          mainText={`Explore Cityscope's Innovative Features`}
          subTitle={`Discover how ${projectName} is revolutionizing urban living with cutting-edge features designed to enhance your experience.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS_DIVERSITY || ''}
        />

        <FaqSection
          projectName={'CityScope'}
          design={FaqDesigns.SPLIT_LIST || ''}
          faqs={faqs}
          mainText={`Cityscope FAQs: Your Questions Answered `}
        />
      </main>
      <WebSiteFooter projectName={'CityScope'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
