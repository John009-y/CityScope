import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/housing_transit_scores/housing_transit_scoresSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

import { hasPermission } from '../../helpers/userPermissions';

const Housing_transit_scoresView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { housing_transit_scores } = useAppSelector(
    (state) => state.housing_transit_scores,
  );

  const { currentUser } = useAppSelector((state) => state.auth);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View housing_transit_scores')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View housing_transit_scores')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/housing_transit_scores/housing_transit_scores-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Property</p>

            <p>{housing_transit_scores?.property?.address ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>AffordabilityScore</p>
            <p>{housing_transit_scores?.affordability_score || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>CommuteEfficiencyScore</p>
            <p>
              {housing_transit_scores?.commute_efficiency_score || 'No data'}
            </p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>TransitReliabilityScore</p>
            <p>
              {housing_transit_scores?.transit_reliability_score || 'No data'}
            </p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>AccessibilityScore</p>
            <p>{housing_transit_scores?.accessibility_score || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Safety&InfrastructureScore</p>
            <p>
              {housing_transit_scores?.safety_infrastructure_score || 'No data'}
            </p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>OverallScore</p>
            <p>{housing_transit_scores?.overall_score || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>tenants</p>

            <p>{housing_transit_scores?.tenants?.name ?? 'No data'}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() =>
              router.push('/housing_transit_scores/housing_transit_scores-list')
            }
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Housing_transit_scoresView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_HOUSING_TRANSIT_SCORES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Housing_transit_scoresView;
