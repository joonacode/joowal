import { Box, Flex, Text } from '@chakra-ui/layout';
import { Fade, ScaleFade, Slide, SlideFade } from '@chakra-ui/react';
import React, { useState } from 'react';
import Image from 'next/image';
import { TImageItem } from '../types';
import { useDisclosure } from '@chakra-ui/hooks';
import { useRouter } from 'next/router';
import fileDownload from 'js-file-download';
import axios from 'axios';

function ImageItem({
  avg_color,
  height,
  width,
  src,
  photographer,
  isLoading,
}: TImageItem) {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const download = (url: string, filename: string) => {
    axios
      .get(url, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };
  if (isLoading) {
    return (
      <Box
        data-aos-offset='1'
        data-aos-duration='600'
        data-aos='fade-up'
        mb={{ base: '10px', md: '15px' }}
        borderRadius={12}
        overflow='hidden'
        backgroundColor={avg_color}
        h={height}
      ></Box>
    );
  }
  return (
    <Box
      data-aos-offset='1'
      data-aos-duration='600'
      data-aos='fade-up'
      position='relative'
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      mb={{ base: '10px', md: '15px' }}
      borderRadius={12}
      overflow='hidden'
      cursor='pointer'
      backgroundColor={avg_color}
      h='auto'
      onClick={() => download(src || '', src + '.jpg')}
    >
      <Image
        layout='responsive'
        height={height}
        width={width}
        src={src + '?auto=compress&cs=tinysrgb&dpr=1&w=500'}
        alt={photographer}
      />
      <Box position='absolute' bottom={0} left={0} right={0} w='full'>
        <Slide style={{ position: 'absolute' }} direction='bottom' in={isOpen}>
          <Box height='40px' bg={avg_color} shadow='md' opacity={0.8}></Box>
          <Box position='absolute' bottom='10px' left='15px' right='15px'>
            <Flex alignItems='center' direction='row'>
              <Box
                height={'20px'}
                width={'20px'}
                rounded='full'
                overflow='hidden'
              >
                <Image
                  src={`https://avatars.dicebear.com/api/jdenticon/${photographer}.svg`}
                  layout='responsive'
                  height={20}
                  width={20}
                  alt={photographer}
                />
              </Box>
              <Text ml='8px' color='white' fontSize='12px'>
                {photographer}
              </Text>
            </Flex>
          </Box>
        </Slide>
      </Box>
    </Box>
  );
}

export default ImageItem;
