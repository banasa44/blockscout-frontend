import React from 'react';

import type { TabItemRegular } from 'toolkit/components/AdaptiveTabs/types';

import PeersystPageWrapper from 'theme/components/PeersystPageWrapper';
import RoutedTabs from 'toolkit/components/RoutedTabs/RoutedTabs';
import PrivateAddressTags from 'ui/privateTags/PrivateAddressTags';
import PrivateTransactionTags from 'ui/privateTags/PrivateTransactionTags';
import PageTitle from 'ui/shared/Page/PageTitle';
import useRedirectForInvalidAuthToken from 'ui/snippets/auth/useRedirectForInvalidAuthToken';

const TABS: Array<TabItemRegular> = [
  { id: 'address', title: 'Address', component: <PrivateAddressTags/> },
  { id: 'tx', title: 'Transaction', component: <PrivateTransactionTags/> },
];

const PrivateTags = () => {
  useRedirectForInvalidAuthToken();

  return (
    <PeersystPageWrapper>
      <PageTitle title="Private tags"/>
      <RoutedTabs tabs={ TABS }/>
    </PeersystPageWrapper>
  );
};

export default PrivateTags;
