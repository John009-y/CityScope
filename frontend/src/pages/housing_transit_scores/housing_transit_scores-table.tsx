import { mdiChartTimelineVariant } from '@mdi/js';
import Head from 'next/head';
import { uniqueId } from 'lodash';
import React, { ReactElement, useState } from 'react';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';
import TableHousing_transit_scores from '../../components/Housing_transit_scores/TableHousing_transit_scores';
import BaseButton from '../../components/BaseButton';
import axios from 'axios';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import CardBoxModal from '../../components/CardBoxModal';
import DragDropFilePicker from '../../components/DragDropFilePicker';
import {
  setRefetch,
  uploadCsv,
} from '../../stores/housing_transit_scores/housing_transit_scoresSlice';

import { hasPermission } from '../../helpers/userPermissions';

const Housing_transit_scoresTablesPage = () => {
  const [filterItems, setFilterItems] = useState([]);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isModalActive, setIsModalActive] = useState(false);
  const [showTableView, setShowTableView] = useState(false);

  const { currentUser } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const [filters] = useState([
    {
      label: 'AffordabilityScore',
      title: 'affordability_score',
      number: 'true',
    },
    {
      label: 'CommuteEfficiencyScore',
      title: 'commute_efficiency_score',
      number: 'true',
    },
    {
      label: 'TransitReliabilityScore',
      title: 'transit_reliability_score',
      number: 'true',
    },
    {
      label: 'AccessibilityScore',
      title: 'accessibility_score',
      number: 'true',
    },
    {
      label: 'Safety&InfrastructureScore',
      title: 'safety_infrastructure_score',
      number: 'true',
    },
    { label: 'OverallScore', title: 'overall_score', number: 'true' },

    { label: 'Property', title: 'property' },
  ]);

  const hasCreatePermission =
    currentUser && hasPermission(currentUser, 'CREATE_HOUSING_TRANSIT_SCORES');

  const addFilter = () => {
    const newItem = {
      id: uniqueId(),
      fields: {
        filterValue: '',
        filterValueFrom: '',
        filterValueTo: '',
        selectedField: '',
      },
    };
    newItem.fields.selectedField = filters[0].title;
    setFilterItems([...filterItems, newItem]);
  };

  const getHousing_transit_scoresCSV = async () => {
    const response = await axios({
      url: '/housing_transit_scores?filetype=csv',
      method: 'GET',
      responseType: 'blob',
    });
    const type = response.headers['content-type'];
    const blob = new Blob([response.data], { type: type });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'housing_transit_scoresCSV.csv';
    link.click();
  };

  const onModalConfirm = async () => {
    if (!csvFile) return;
    await dispatch(uploadCsv(csvFile));
    dispatch(setRefetch(true));
    setCsvFile(null);
    setIsModalActive(false);
  };

  const onModalCancel = () => {
    setCsvFile(null);
    setIsModalActive(false);
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Housing_transit_scores')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='Housing_transit_scores'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox className='mb-6' cardBoxClassName='flex flex-wrap'>
          {hasCreatePermission && (
            <BaseButton
              className={'mr-3'}
              href={'/housing_transit_scores/housing_transit_scores-new'}
              color='info'
              label='New Item'
            />
          )}

          <BaseButton
            className={'mr-3'}
            color='info'
            label='Filter'
            onClick={addFilter}
          />
          <BaseButton
            className={'mr-3'}
            color='info'
            label='Download CSV'
            onClick={getHousing_transit_scoresCSV}
          />

          {hasCreatePermission && (
            <BaseButton
              color='info'
              label='Upload CSV'
              onClick={() => setIsModalActive(true)}
            />
          )}

          <div className='md:inline-flex items-center ms-auto'>
            <div id='delete-rows-button'></div>

            <Link href={'/housing_transit_scores/housing_transit_scores-list'}>
              Back to <span className='capitalize'>table</span>
            </Link>
          </div>
        </CardBox>
        <CardBox className='mb-6' hasTable>
          <TableHousing_transit_scores
            filterItems={filterItems}
            setFilterItems={setFilterItems}
            filters={filters}
            showGrid={true}
          />
        </CardBox>
      </SectionMain>
      <CardBoxModal
        title='Upload CSV'
        buttonColor='info'
        buttonLabel={'Confirm'}
        // buttonLabel={false ? 'Deleting...' : 'Confirm'}
        isActive={isModalActive}
        onConfirm={onModalConfirm}
        onCancel={onModalCancel}
      >
        <DragDropFilePicker
          file={csvFile}
          setFile={setCsvFile}
          formats={'.csv'}
        />
      </CardBoxModal>
    </>
  );
};

Housing_transit_scoresTablesPage.getLayout = function getLayout(
  page: ReactElement,
) {
  return (
    <LayoutAuthenticated permission={'READ_HOUSING_TRANSIT_SCORES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Housing_transit_scoresTablesPage;
