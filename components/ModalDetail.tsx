import React, { useState } from 'react'
import { Box, Flex, Text } from '@chakra-ui/layout';
import ImageItem from './ImageItem';
import Image from 'next/image';
import Link from 'next/link';
import { Progress } from '@chakra-ui/progress';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import { TImageItem } from '../types';
import fileDownload from 'js-file-download';
import axios from 'axios';

type ModalDetailProps = {
  data?: TImageItem
  status: boolean
  onClose: () => void
}

const ModalDetail: React.FC<ModalDetailProps> = ({ data, onClose, status }) => {
  const [downloadProgress, setDownloadProgress] = useState(0);
  const download = (url: string, filename: string) => {
    axios
      .get(url, {
        responseType: 'blob',
        onDownloadProgress: (evt) => {
          setDownloadProgress((evt.loaded / evt.total) * 100);
        },
      })
      .then((res) => {
        fileDownload(res.data, filename);
        setDownloadProgress(0);
      });
  };
  if (data) {
    return (
      <Modal
        isCentered
        isOpen={status}
        onClose={onClose}
      >
        <ModalOverlay
          bg='blackAlpha.500'
          backdropFilter='blur(5px)'
        />
        <ModalContent>
          <ModalBody p={6}>
            <ImageItem item={data} isDetail />
            <Flex alignItems='center' position='relative' justifyContent='space-between' direction='row' mt={4}>
              <Flex alignItems='center' direction='row'>
                <Text mr={2}>Image By</Text>
                <Box
                  height={'20px'}
                  width={'20px'}
                  rounded='full'
                  overflow='hidden'
                >
                  <Image
                    src={`https://avatars.dicebear.com/api/jdenticon/${data.photographer}.svg`}
                    height={20}
                    width={20}
                    alt={data.photographer || 'joowal'}
                  />
                </Box>
                <Link target="_blank" href={`${data.photographer_url}`}>
                  <Text ml='8px'>{data.photographer}</Text>
                </Link>
              </Flex>
              <ModalCloseButton top={-1} />
            </Flex>
            <Flex gap={2} wrap='wrap' mt='4'>
              {data.listSrc && data.listSrc.map(
                (item: { value: string; key: string }, i: number) => (
                  <Button
                    size='sm'
                    shadow='md'
                    title={`download ${item.key}`}
                    key={i}
                    leftIcon={<DownloadIcon />}
                    colorScheme='teal'
                    variant='solid'
                    isDisabled={downloadProgress > 0}
                    onClick={() => download(item.value, item.value + '.jpg')}
                  >
                    {item.key}
                  </Button>
                ),
              )}
            </Flex>
            {downloadProgress > 0 && (
              <>
                <Text mt={3}>
                  Downloading {Math.floor(downloadProgress)}%
                </Text>
                <Progress
                  mt={2}
                  height={'4px'}
                  isAnimated
                  hasStripe
                  value={downloadProgress}
                />
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    )
  }
  return null
}

export default ModalDetail
