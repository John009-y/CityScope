import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/properties/propertiesSlice';
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

const PropertiesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { properties } = useAppSelector((state) => state.properties);

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
        <title>{getPageTitle('View properties')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View properties')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/properties/properties-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Address</p>
            <p>{properties?.address}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>RentPrice</p>
            <p>{properties?.rent_price || 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Tenant</p>

            <p>{properties?.tenant?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Reports</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>

                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.reports &&
                      Array.isArray(properties.reports) &&
                      properties.reports.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/reports/reports-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='title'>{item.title}</td>

                          <td data-label='description'>{item.description}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!properties?.reports?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>tenants</p>

            <p>{properties?.tenants?.name ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>
              Housing_transit_scores Property
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>AffordabilityScore</th>

                      <th>CommuteEfficiencyScore</th>

                      <th>TransitReliabilityScore</th>

                      <th>AccessibilityScore</th>

                      <th>Safety&InfrastructureScore</th>

                      <th>OverallScore</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.housing_transit_scores_property &&
                      Array.isArray(
                        properties.housing_transit_scores_property,
                      ) &&
                      properties.housing_transit_scores_property.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/housing_transit_scores/housing_transit_scores-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='affordability_score'>
                              {item.affordability_score}
                            </td>

                            <td data-label='commute_efficiency_score'>
                              {item.commute_efficiency_score}
                            </td>

                            <td data-label='transit_reliability_score'>
                              {item.transit_reliability_score}
                            </td>

                            <td data-label='accessibility_score'>
                              {item.accessibility_score}
                            </td>

                            <td data-label='safety_infrastructure_score'>
                              {item.safety_infrastructure_score}
                            </td>

                            <td data-label='overall_score'>
                              {item.overall_score}
                            </td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!properties?.housing_transit_scores_property?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Reports Property</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>

                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.reports_property &&
                      Array.isArray(properties.reports_property) &&
                      properties.reports_property.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/reports/reports-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='title'>{item.title}</td>

                          <td data-label='description'>{item.description}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!properties?.reports_property?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/properties/properties-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

PropertiesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_PROPERTIES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default PropertiesView;
