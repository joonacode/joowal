import { Box, Grid } from '@chakra-ui/layout';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useWindowSize from '../hooks/useWindowSize';
import { TImageItem, TListImage } from '../types';
import ImageItem from './ImageItem';
import { Spinner } from '@chakra-ui/react';
import ModalDetail from './ModalDetail';
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

  const [modalDetail, setModalDetail] = useState<{ status: boolean, data?: TImageItem }>({
    status: false,
    data: undefined,
  });
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
            h='100vh'
            display='flex'
            justifyContent='center'
            alignItems='center'
            mt={-24}
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
      <ModalDetail
        status={modalDetail.status}
        data={modalDetail.data}
        onClose={() => setModalDetail({ ...modalDetail, status: false })}
      />
    </>
  );
};

export default ListImage;
