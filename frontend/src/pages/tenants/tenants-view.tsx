import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/tenants/tenantsSlice';
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

const TenantsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { tenants } = useAppSelector((state) => state.tenants);

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
        <title>{getPageTitle('View tenants')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View tenants')}
          main
        >
          <BaseButton
            color='info'
            label='Edit'
            href={`/tenants/tenants-edit/?id=${id}`}
          />
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{tenants?.name}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Users Tenants</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>First Name</th>

                      <th>Last Name</th>

                      <th>Phone Number</th>

                      <th>E-Mail</th>

                      <th>Disabled</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenants.users_tenants &&
                      Array.isArray(tenants.users_tenants) &&
                      tenants.users_tenants.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/users/users-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='firstName'>{item.firstName}</td>

                          <td data-label='lastName'>{item.lastName}</td>

                          <td data-label='phoneNumber'>{item.phoneNumber}</td>

                          <td data-label='email'>{item.email}</td>

                          <td data-label='disabled'>
                            {dataFormatter.booleanFormatter(item.disabled)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!tenants?.users_tenants?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Discussions tenants</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Topic</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenants.discussions_tenants &&
                      Array.isArray(tenants.discussions_tenants) &&
                      tenants.discussions_tenants.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/discussions/discussions-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='topic'>{item.topic}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!tenants?.discussions_tenants?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              Housing_transit_scores tenants
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
                    {tenants.housing_transit_scores_tenants &&
                      Array.isArray(tenants.housing_transit_scores_tenants) &&
                      tenants.housing_transit_scores_tenants.map(
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
              {!tenants?.housing_transit_scores_tenants?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Properties Tenant</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Address</th>

                      <th>RentPrice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenants.properties_tenant &&
                      Array.isArray(tenants.properties_tenant) &&
                      tenants.properties_tenant.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/properties/properties-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='address'>{item.address}</td>

                          <td data-label='rent_price'>{item.rent_price}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!tenants?.properties_tenant?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Properties tenants</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Address</th>

                      <th>RentPrice</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenants.properties_tenants &&
                      Array.isArray(tenants.properties_tenants) &&
                      tenants.properties_tenants.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/properties/properties-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='address'>{item.address}</td>

                          <td data-label='rent_price'>{item.rent_price}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!tenants?.properties_tenants?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Reports tenants</p>
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
                    {tenants.reports_tenants &&
                      Array.isArray(tenants.reports_tenants) &&
                      tenants.reports_tenants.map((item: any) => (
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
              {!tenants?.reports_tenants?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/tenants/tenants-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

TenantsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_TENANTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default TenantsView;
