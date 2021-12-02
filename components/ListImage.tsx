import { Box, Flex, Grid, Text } from '@chakra-ui/layout';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useWindowSize from '../hooks/useWindowSize';
import { TImageItem, TListImage } from '../types';
import ImageItem from './ImageItem';
import { Spinner } from '@chakra-ui/react';
import Image from 'next/image';
import fileDownload from 'js-file-download';
import axios from 'axios';
import Link from 'next/link';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
type TProps = {
  listImage?: TListImage;
  fetchMoreData?: () => void;
  isLoading?: boolean;
};

const ListImage = ({
  listImage = { col1: [], col2: [], col3: [] },
  fetchMoreData = () => null,
}: TProps) => {
  const { width } = useWindowSize();

  const [modalDetail, setModalDetail] = useState<any>({
    status: false,
    data: {},
  });
  const download = (url: string, filename: string) => {
    axios
      .get(url, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };
  const showModalDetail = (data: TImageItem) => {
    let listSrc = [];
    for (let prop in data.resImage) {
      listSrc.push({
        key: prop,
        value: data.resImage[prop],
      });
    }
    setModalDetail({
      status: true,
      data: { ...data, listSrc },
    });
  };

  return (
    <>
      <InfiniteScroll
        dataLength={
          listImage.col1.length + listImage.col2.length + listImage.col3.length
        }
        next={fetchMoreData}
        hasMore={true}
        loader={
          <Box
            w='full'
            display='flex'
            justifyContent='center'
            alignItems='center'
            mt={14}
            mb={10}
          >
            <Spinner mx='auto' size='xl' />
          </Box>
        }
        scrollThreshold={width < 600 ? 0.9 : 0.8}
        style={{ overflow: 'hidden' }}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {width < 768 ? (
          <Grid
            w='full'
            position='relative'
            templateColumns={{
              base: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            }}
            gap={{ base: '10px', md: '15px' }}
          >
            <Box>
              {[...listImage.col3.slice(0, 10), ...listImage.col1].map(
                (item: TImageItem, i) => (
                  <ImageItem
                    showModalDetail={showModalDetail}
                    item={item}
                    key={i}
                  />
                ),
              )}
            </Box>
            <Box>
              {[...listImage.col3.slice(10, 20), ...listImage.col2].map(
                (item: TImageItem, i) => (
                  <ImageItem
                    showModalDetail={showModalDetail}
                    item={item}
                    key={i}
                  />
                ),
              )}
            </Box>
          </Grid>
        ) : (
          <Grid
            w='full'
            position='relative'
            templateColumns={{
              base: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            }}
            gap={{ base: '10px', md: '15px' }}
          >
            <Box>
              {listImage.col1.map((item: TImageItem, i) => (
                <ImageItem
                  showModalDetail={showModalDetail}
                  item={item}
                  key={i}
                />
              ))}
            </Box>
            <Box>
              {listImage.col2.map((item: TImageItem, i) => (
                <ImageItem
                  showModalDetail={showModalDetail}
                  item={item}
                  key={i}
                />
              ))}
            </Box>
            <Box>
              {listImage.col3.map((item: TImageItem, i) => (
                <ImageItem
                  showModalDetail={showModalDetail}
                  item={item}
                  key={i}
                />
              ))}
            </Box>
          </Grid>
        )}
      </InfiniteScroll>
      {modalDetail.status && (
        <Modal
          isCentered
          isOpen={modalDetail.status}
          onClose={() => setModalDetail({ ...modalDetail, status: false })}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Download</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Link href={`${modalDetail.data.photographer_url}`}>
                <a target='_blank'>
                  <Flex alignItems='center' direction='row' mb={3}>
                    <Text mr={2}>Image By</Text>
                    <Box
                      height={'20px'}
                      width={'20px'}
                      rounded='full'
                      overflow='hidden'
                    >
                      <Image
                        src={`https://avatars.dicebear.com/api/jdenticon/${modalDetail.data.photographer}.svg`}
                        layout='responsive'
                        height={20}
                        width={20}
                        alt={modalDetail.data.photographer}
                      />
                    </Box>
                    <Text ml='8px'>{modalDetail.data.photographer}</Text>
                  </Flex>
                </a>
              </Link>
              {modalDetail.data.listSrc.map(
                (item: { value: string; key: string }, i: number) => (
                  <Button
                    shadow='md'
                    key={i}
                    leftIcon={<DownloadIcon />}
                    colorScheme='teal'
                    variant='solid'
                    m={1}
                    onClick={() => download(item.value, item.value + '.jpg')}
                  >
                    {item.key}
                  </Button>
                ),
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ListImage;
