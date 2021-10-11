import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Box, Container, Flex } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Link from 'next/link';

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
  return (
    <Box
      backgroundColor='#fff'
      zIndex={5}
      position='sticky'
      top={0}
      shadow='sm'
      py={5}
    >
      <Container maxW={1280}>
        <Flex alignItems='center'>
          <Flex alignItems='center' marginRight={3}>
            <Link href='/'>
              <Image w={150} src={'/images/logo.svg'} alt='logo' />
            </Link>
          </Flex>
          <InputGroup size='md'>
            <form style={{ width: '100%' }} onSubmit={handleSearch}>
              <Input
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
                pr='4.5rem'
                type={'text'}
                placeholder='Cari...'
              />
              <InputRightElement width='4.5rem'>
                <Button type='button' h='1.75rem' size='sm'>
                  Cari
                </Button>
              </InputRightElement>
            </form>
          </InputGroup>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
