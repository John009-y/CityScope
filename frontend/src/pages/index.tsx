import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../stores/hooks';
import LayoutGuest from '../layouts/Guest';
import WebSiteHeader from '../components/WebPageComponents/Header';
import WebSiteFooter from '../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  ContactFormDesigns,
  FeaturesDesigns,
  AboutUsDesigns,
  FaqDesigns,
} from '../components/WebPageComponents/designs';

import HeroSection from '../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../components/WebPageComponents/ContactFormComponent';

import FeaturesSection from '../components/WebPageComponents/FeaturesComponent';

import AboutUsSection from '../components/WebPageComponents/AboutUsComponent';

import FaqSection from '../components/WebPageComponents/FaqComponent';

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
      name: 'Instant HTS Scores',
      description:
        'Quickly view the Housing \u0026 Transit Score for any neighborhood or property, helping you make informed decisions at a glance.',
      icon: 'mdiSpeedometer',
    },
    {
      name: 'Customizable Search Filters',
      description:
        'Tailor your housing search with filters for affordability, accessibility, and transit connectivity to find the perfect match.',
      icon: 'mdiFilterVariant',
    },
    {
      name: 'Community Feedback Integration',
      description:
        'Benefit from real-time insights and updates from fellow residents, enhancing the accuracy and relevance of the HTS.',
      icon: 'mdiAccountGroup',
    },
  ];

  const faqs = [
    {
      question: 'What is the Housing \u0026 Transit Score (HTS)?',
      answer:
        'The HTS is a comprehensive score that evaluates neighborhoods based on affordability, commute efficiency, transit reliability, accessibility, and safety. It helps users make informed housing decisions.',
    },
    {
      question: 'How does Cityscope gather its data?',
      answer:
        'Cityscope integrates data from various sources, including Google Maps, GTFS Transit Data, and user reports, to provide accurate and up-to-date information on housing and transit conditions.',
    },
    {
      question: 'Can I customize my housing search?',
      answer:
        'Yes, Cityscope allows you to filter housing options based on affordability, accessibility, and transit connectivity, ensuring you find the best match for your needs.',
    },
    {
      question: 'How can I contribute feedback to Cityscope?',
      answer:
        'Residents can report housing and transit conditions through the platform, helping improve the accuracy of the HTS and providing valuable insights for other users.',
    },
    {
      question: 'Is Cityscope available in multiple cities?',
      answer:
        'Cityscope is designed to scale and expand to additional cities. We are continuously working to integrate more urban areas into our platform.',
    },
    {
      question: 'How often is the data updated?',
      answer:
        'Cityscope regularly integrates new data sources and updates existing information to ensure the HTS remains relevant and accurate for users.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Cityscope: Your Guide to Affordable and Accessible Urban Living`}</title>
        <meta
          name='description'
          content={`Discover Cityscope's Housing & Transit Score (HTS) to make informed decisions about urban living. Explore features, learn about our mission, and get answers to common questions.`}
        />
      </Head>
      <WebSiteHeader projectName={'CityScope'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'CityScope'}
          image={['City skyline with transit lines']}
          mainText={`Empower Your Urban Living with Cityscope`}
          subTitle={`Discover how ${projectName}'s Housing & Transit Score (HTS) simplifies your search for affordable, accessible, and well-connected housing. Make informed decisions with ease.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore Now`}
        />

        <FeaturesSection
          projectName={'CityScope'}
          image={['Interactive map with scores']}
          withBg={0}
          features={features_points}
          mainText={`Discover Cityscope's Key Features`}
          subTitle={`Explore how ${projectName} transforms urban living with innovative features designed for your convenience and accessibility.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <AboutUsSection
          projectName={'CityScope'}
          image={['Cityscape with diverse residents']}
          mainText={`Transforming Urban Living with Cityscope`}
          subTitle={`At ${projectName}, we are committed to making urban living more accessible and informed. Our Housing & Transit Score (HTS) empowers residents to make better housing decisions, while aiding city planners in identifying infrastructure needs.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More`}
        />

        <FaqSection
          projectName={'CityScope'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions about Cityscope `}
        />

        <ContactFormSection
          projectName={'CityScope'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Contact form with city background']}
          mainText={`Get in Touch with Cityscope `}
          subTitle={`Reach out to us anytime with your questions or feedback. Our team at ${projectName} is here to assist you and will respond promptly.`}
        />
      </main>
      <WebSiteFooter projectName={'CityScope'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
