import { Flex, chakra } from '@chakra-ui/react';
import React from 'react';

import config from 'configs/app';
import { useColorModeValue } from 'toolkit/chakra/color-mode';

interface Props {
  className?: string;
  children: React.ReactNode;
}

const MainColumn = ({ children, className }: Props) => {
  const bg = useColorModeValue('gray.100', 'black');
  return (
    <Flex
      className={ className }
      flexDir="column"
      flexGrow={ 1 }
      w={{ base: '100%', lg: config.UI.navigation.layout === 'horizontal' ? '100%' : 'auto' }}
      paddingX={{ base: 3, lg: config.UI.navigation.layout === 'horizontal' ? 6 : 12 }}
      paddingRight={{ '2xl': 6 }}
      paddingTop={{ base: `${ 12 + 52 }px`, lg: 6 }} // 12px is top padding of content area, 52px is search bar height
      paddingBottom={ 8 }
      bg={ bg }
      zIndex={ 0 }
    >
      { children }
    </Flex>
  );
};

export default React.memo(chakra(MainColumn));
