import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/housing_transit_scores/housing_transit_scoresSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  property: '',

  affordability_score: '',

  commute_efficiency_score: '',

  transit_reliability_score: '',

  accessibility_score: '',

  safety_infrastructure_score: '',

  overall_score: '',

  tenants: '',
};

const Housing_transit_scoresNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/housing_transit_scores/housing_transit_scores-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Property' labelFor='property'>
                <Field
                  name='property'
                  id='property'
                  component={SelectField}
                  options={[]}
                  itemRef={'properties'}
                ></Field>
              </FormField>

              <FormField label='AffordabilityScore'>
                <Field
                  type='number'
                  name='affordability_score'
                  placeholder='AffordabilityScore'
                />
              </FormField>

              <FormField label='CommuteEfficiencyScore'>
                <Field
                  type='number'
                  name='commute_efficiency_score'
                  placeholder='CommuteEfficiencyScore'
                />
              </FormField>

              <FormField label='TransitReliabilityScore'>
                <Field
                  type='number'
                  name='transit_reliability_score'
                  placeholder='TransitReliabilityScore'
                />
              </FormField>

              <FormField label='AccessibilityScore'>
                <Field
                  type='number'
                  name='accessibility_score'
                  placeholder='AccessibilityScore'
                />
              </FormField>

              <FormField label='Safety&InfrastructureScore'>
                <Field
                  type='number'
                  name='safety_infrastructure_score'
                  placeholder='Safety&InfrastructureScore'
                />
              </FormField>

              <FormField label='OverallScore'>
                <Field
                  type='number'
                  name='overall_score'
                  placeholder='OverallScore'
                />
              </FormField>

              <FormField label='tenants' labelFor='tenants'>
                <Field
                  name='tenants'
                  id='tenants'
                  component={SelectField}
                  options={[]}
                  itemRef={'tenants'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() =>
                    router.push(
                      '/housing_transit_scores/housing_transit_scores-list',
                    )
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

Housing_transit_scoresNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_HOUSING_TRANSIT_SCORES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Housing_transit_scoresNew;
