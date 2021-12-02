import { IconButton } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Input, InputGroup } from '@chakra-ui/input';
import { Box, Container, Flex } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Link from 'next/link';
import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import { SlideFade } from '@chakra-ui/transition';

const Navbar = () => {
  const [inputSearch, setInputSearch] = useState('');
  const router = useRouter();
  const handleSearch = (e: any) => {
    e.preventDefault();
    if (inputSearch !== '') {
      router.push(
        {
          pathname: '/search/[q]',
          query: { page: 1, q: inputSearch, isSearch: true },
        },
        '/search/' + inputSearch,
        { scroll: true },
      );
    }
  };
  const [showSearch, setShowSearch] = useState(false);
  const toggleSearch = () => setShowSearch(!showSearch);
  return (
    <Box
      backgroundColor='#fff'
      zIndex={5}
      position='sticky'
      top={0}
      shadow='sm'
      py={3}
    >
      <Container maxW={1280}>
        <Flex alignItems='center' justifyContent='space-between'>
          <Flex alignItems='center' marginRight={3}>
            <Link href='/'>
              <a>
                <Image w={120} src={'/images/logo.svg'} alt='logo' />
              </a>
            </Link>
          </Flex>
          <Flex alignItems='center'>
            <SlideFade offsetY='20px' in={showSearch}>
              <InputGroup>
                <form style={{ width: '100%' }} onSubmit={handleSearch}>
                  <Input
                    value={inputSearch}
                    onChange={(e) => setInputSearch(e.target.value)}
                    pr='4.5rem'
                    type={'text'}
                    placeholder='Cari...'
                  />
                </form>
              </InputGroup>
            </SlideFade>
            <IconButton
              _focus={{ boxShadow: 'none' }}
              ml={3}
              onClick={toggleSearch}
              aria-label='Search database'
              icon={showSearch ? <CloseIcon /> : <SearchIcon />}
            />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
