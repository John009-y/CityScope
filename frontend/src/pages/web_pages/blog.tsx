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
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

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

  const faqs = [
    {
      question: 'What topics does the Cityscope blog cover?',
      answer:
        'The Cityscope blog covers a wide range of topics related to urban living, including housing trends, transit updates, community stories, and expert insights. Our goal is to keep you informed and engaged.',
    },
    {
      question: 'How often is the blog updated?',
      answer:
        'The blog is updated regularly with fresh content. We aim to provide new articles and insights at least once a week to keep our readers informed about the latest developments.',
    },
    {
      question: 'Can I contribute to the Cityscope blog?',
      answer:
        'Yes, we welcome guest contributions from experts and community members. If you have a story or insight to share, please contact us for submission guidelines.',
    },
    {
      question: 'How can I stay updated with new blog posts?',
      answer:
        'You can subscribe to our newsletter or follow us on social media to receive notifications about new blog posts and updates from Cityscope.',
    },
    {
      question: 'Are the blog articles free to access?',
      answer:
        'Yes, all blog articles on Cityscope are free to access. We believe in providing valuable information to our community without any cost.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Cityscope Blog: Insights and Updates`}</title>
        <meta
          name='description'
          content={`Stay informed with the latest insights, updates, and stories from Cityscope. Explore our blog for valuable information on urban living and more.`}
        />
      </Head>
      <WebSiteHeader projectName={'CityScope'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'CityScope'}
          image={['Cityscape with open book']}
          mainText={`Explore Cityscope's Urban Insights`}
          subTitle={`Dive into the latest stories, updates, and expert insights on urban living with ${projectName}. Stay informed and inspired with our curated blog content.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Read More`}
        />

        <FaqSection
          projectName={'CityScope'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Cityscope Blog: Frequently Asked Questions `}
        />
      </main>
      <WebSiteFooter projectName={'CityScope'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
