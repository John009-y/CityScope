import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

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
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import {
  update,
  fetch,
} from '../../stores/housing_transit_scores/housing_transit_scoresSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

import { hasPermission } from '../../helpers/userPermissions';

const EditHousing_transit_scores = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    property: null,

    affordability_score: '',

    commute_efficiency_score: '',

    transit_reliability_score: '',

    accessibility_score: '',

    safety_infrastructure_score: '',

    overall_score: '',

    tenants: null,
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { housing_transit_scores } = useAppSelector(
    (state) => state.housing_transit_scores,
  );

  const { currentUser } = useAppSelector((state) => state.auth);

  const { housing_transit_scoresId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: housing_transit_scoresId }));
  }, [housing_transit_scoresId]);

  useEffect(() => {
    if (typeof housing_transit_scores === 'object') {
      setInitialValues(housing_transit_scores);
    }
  }, [housing_transit_scores]);

  useEffect(() => {
    if (typeof housing_transit_scores === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = housing_transit_scores[el]),
      );

      setInitialValues(newInitialVal);
    }
  }, [housing_transit_scores]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: housing_transit_scoresId, data }));
    await router.push('/housing_transit_scores/housing_transit_scores-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit housing_transit_scores')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit housing_transit_scores'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Property' labelFor='property'>
                <Field
                  name='property'
                  id='property'
                  component={SelectField}
                  options={initialValues.property}
                  itemRef={'properties'}
                  showField={'address'}
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
                  options={initialValues.tenants}
                  itemRef={'tenants'}
                  showField={'name'}
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

EditHousing_transit_scores.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_HOUSING_TRANSIT_SCORES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditHousing_transit_scores;
