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
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Cityscope: Get in Touch`}</title>
        <meta
          name='description'
          content={`Reach out to Cityscope for any inquiries, feedback, or support. Our team is here to assist you with your urban living needs.`}
        />
      </Head>
      <WebSiteHeader projectName={'CityScope'} pages={pages} />
      <main className={`flex-grow    bg-white  rounded-none  `}>
        <HeroSection
          projectName={'CityScope'}
          image={['Contact support team illustration']}
          mainText={`Connect with Cityscope Today`}
          subTitle={`Have questions or need assistance? The ${projectName} team is here to help. Reach out to us for support, feedback, or any inquiries you may have.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Contact Us`}
        />

        <ContactFormSection
          projectName={'CityScope'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Email communication illustration']}
          mainText={`Reach Out to Cityscope Support `}
          subTitle={`We're here to assist you with any questions or feedback. Contact ${projectName} anytime, and our team will respond promptly to your inquiries.`}
        />
      </main>
      <WebSiteFooter projectName={'CityScope'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
