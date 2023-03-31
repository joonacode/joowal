import { Box, Flex, Text } from '@chakra-ui/layout';
import { Slide } from '@chakra-ui/react';
import React from 'react';
import Image from 'next/image';
import { TImageItem } from '../types';
import { useDisclosure } from '@chakra-ui/hooks';

type ImageItemProps = {
  item: any
  showModalDetail?: (item: TImageItem) => void
  isDetail?: boolean
}

function ImageItem({ item, showModalDetail, isDetail = false }: ImageItemProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  if (item.isLoading) {
    return (
      <Box
        data-aos-offset='1'
        data-aos-duration='300'
        data-aos='fade-up'
        mb={{ base: '10px', md: '15px' }}
        borderRadius={12}
        overflow='hidden'
        backgroundColor={item.avg_color}
        h={item.height}
      ></Box>
    );
  }

  if (isDetail) {
    return (
      <Box
        shadow='2xl'
        position='relative'
        mb={{ base: '10px', md: '15px' }}
        borderRadius={8}
        overflow='hidden'
        backgroundColor={item.avg_color}
        h='auto'
      >
        <Image
          height={item.height}
          width={item.width}
          src={item.src + '?auto=compress&cs=tinysrgb&dpr=1&w=500'}
          alt={item.photographer}
          quality={90}
        />
      </Box>
    );
  }
  return (
    <Box
      data-aos-offset='1'
      data-aos-duration='300'
      data-aos='fade-up'
      position='relative'
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      mb={{ base: '10px', md: '15px' }}
      borderRadius={12}
      overflow='hidden'
      cursor='pointer'
      backgroundColor={item.avg_color}
      h='auto'
      // onClick={() => download(src || '', src + '.jpg')}
      onClick={() => showModalDetail && showModalDetail(item)}
    >
      <Image
        height={item.height}
        width={item.width}
        src={item.src + '?auto=compress&cs=tinysrgb&dpr=1&w=500'}
        alt={item.photographer}
        quality={50}
      />
      <Box position='absolute' bottom={0} left={0} right={0} w='full'>
        <Slide style={{ position: 'absolute' }} direction='bottom' in={isOpen}>
          <Box
            height='40px'
            bg={item.avg_color}
            shadow='md'
            opacity={0.8}
          ></Box>
          <Box position='absolute' bottom='10px' left='15px' right='15px'>
            <Flex alignItems='center' direction='row'>
              <Box
                height={'20px'}
                width={'20px'}
                rounded='full'
                overflow='hidden'
              >
                <Image
                  src={`https://avatars.dicebear.com/api/jdenticon/${item.photographer}.svg`}
                  height={20}
                  width={20}
                  alt={item.photographer}
                />
              </Box>
              <Text ml='8px' color='white' fontSize='12px'>
                {item.photographer}
              </Text>
            </Flex>
          </Box>
        </Slide>
      </Box>
    </Box>
  )
}

export default ImageItem;
