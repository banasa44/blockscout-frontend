import { useRouter } from 'next/router';
import React from 'react';

import type { TabItemRegular } from 'toolkit/components/AdaptiveTabs/types';

import useApiQuery from 'lib/api/useApiQuery';
import { useAppContext } from 'lib/contexts/app';
import throwOnAbsentParamError from 'lib/errors/throwOnAbsentParamError';
import throwOnResourceLoadError from 'lib/errors/throwOnResourceLoadError';
import getQueryParamString from 'lib/router/getQueryParamString';
import { TX_ZKEVM_L2 } from 'stubs/tx';
import { generateListStub } from 'stubs/utils';
import { ZKEVM_L2_TXN_BATCH } from 'stubs/zkEvmL2';
import PeersystPageWrapper from 'theme/components/PeersystPageWrapper';
import RoutedTabs from 'toolkit/components/RoutedTabs/RoutedTabs';
import TextAd from 'ui/shared/ad/TextAd';
import PageTitle from 'ui/shared/Page/PageTitle';
import useQueryWithPages from 'ui/shared/pagination/useQueryWithPages';
import ZkEvmL2TxnBatchDetails from 'ui/txnBatches/zkEvmL2/ZkEvmL2TxnBatchDetails';
import TxsWithFrontendSorting from 'ui/txs/TxsWithFrontendSorting';

const ZkEvmL2TxnBatch = () => {
  const router = useRouter();
  const appProps = useAppContext();
  const number = getQueryParamString(router.query.number);
  const tab = getQueryParamString(router.query.tab);

  const batchQuery = useApiQuery('zkevm_l2_txn_batch', {
    pathParams: { number },
    queryOptions: {
      enabled: Boolean(number),
      placeholderData: ZKEVM_L2_TXN_BATCH,
    },
  });

  const batchTxsQuery = useQueryWithPages({
    resourceName: 'zkevm_l2_txn_batch_txs',
    pathParams: { number },
    options: {
      enabled: Boolean(!batchQuery.isPlaceholderData && batchQuery.data?.number && tab === 'txs'),
      // there is no pagination in zkevm_l2_txn_batch_txs
      placeholderData: generateListStub<'zkevm_l2_txn_batch_txs'>(TX_ZKEVM_L2, 50, { next_page_params: null }),
    },
  });

  throwOnAbsentParamError(number);
  throwOnResourceLoadError(batchQuery);

  const tabs: Array<TabItemRegular> = React.useMemo(() => ([
    { id: 'index', title: 'Details', component: <ZkEvmL2TxnBatchDetails query={ batchQuery }/> },
    { id: 'txs', title: 'Transactions', component: <TxsWithFrontendSorting query={ batchTxsQuery }/> },
  ].filter(Boolean)), [ batchQuery, batchTxsQuery ]);

  const backLink = React.useMemo(() => {
    const hasGoBackLink = appProps.referrer && appProps.referrer.includes('/zkevm_l2_txn_batches');

    if (!hasGoBackLink) {
      return;
    }

    return {
      label: 'Back to txn batches list',
      url: appProps.referrer,
    };
  }, [ appProps.referrer ]);

  return (
    <PeersystPageWrapper>
      <TextAd mb={ 6 }/>
      <PageTitle
        title={ `Txn batch #${ number }` }
        backLink={ backLink }
      />
      <RoutedTabs
        tabs={ tabs }
        isLoading={ batchQuery.isPlaceholderData }
      />
    </PeersystPageWrapper>
  );
};

export default ZkEvmL2TxnBatch;
