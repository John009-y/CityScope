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
  FeaturesDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

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
      name: 'Neighborhood Insights',
      description:
        'Gain comprehensive insights into neighborhoods with our detailed analysis of housing affordability, transit access, and safety. Make informed decisions with ease.',
      icon: 'mdiMapMarkerRadius',
    },
    {
      name: 'Real-Time Alerts',
      description:
        'Stay updated with real-time alerts on transit changes, housing availability, and community updates. Never miss important information again.',
      icon: 'mdiBellAlert',
    },
    {
      name: 'Community Engagement',
      description:
        'Connect with fellow residents and city officials through our platform. Share feedback, participate in discussions, and contribute to community-driven improvements.',
      icon: 'mdiAccountMultipleOutline',
    },
  ];

  const faqs = [
    {
      question: 'What services does Cityscope offer?',
      answer:
        'Cityscope provides services like neighborhood insights, real-time alerts, and community engagement to enhance urban living. These services help residents make informed decisions and stay connected.',
    },
    {
      question: 'How can I access real-time alerts?',
      answer:
        'Real-time alerts are available through the Cityscope platform. You can customize your alert preferences to receive updates on transit changes, housing availability, and community news.',
    },
    {
      question: 'Is there a cost for using Cityscope services?',
      answer:
        'Cityscope offers its core services for free to residents. Our goal is to provide accessible information to help you make informed housing and transit decisions.',
    },
    {
      question: 'How does Cityscope gather its data?',
      answer:
        'Cityscope integrates data from various sources, including public transit data, housing listings, and user feedback, to provide accurate and up-to-date information.',
    },
    {
      question: 'Can I contribute feedback to Cityscope?',
      answer:
        'Yes, residents can provide feedback and report issues directly through the platform. Your input helps improve the accuracy and relevance of our services.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Cityscope Services: Enhancing Urban Living`}</title>
        <meta
          name='description'
          content={`Explore the range of services offered by Cityscope to improve urban living. Discover how our features and solutions can benefit residents and city planners alike.`}
        />
      </Head>
      <WebSiteHeader projectName={'CityScope'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'CityScope'}
          image={['City skyline with service icons']}
          mainText={`Cityscope Services: Transforming Urban Living`}
          subTitle={`Discover how ${projectName} offers innovative services to enhance urban life. From data-driven insights to community engagement, explore the solutions we provide for residents and city planners.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore Services`}
        />

        <FeaturesSection
          projectName={'CityScope'}
          image={['Icons representing various services']}
          withBg={0}
          features={features_points}
          mainText={`Cityscope's Core Services and Features`}
          subTitle={`Explore the innovative services ${projectName} offers to enhance urban living. Our features are designed to provide value and convenience for residents and city planners.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <FaqSection
          projectName={'CityScope'}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Cityscope Services: Frequently Asked Questions `}
        />
      </main>
      <WebSiteFooter projectName={'CityScope'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
