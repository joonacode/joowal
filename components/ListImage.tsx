import { Box, Grid } from '@chakra-ui/layout';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useWindowSize from '../hooks/useWindowSize';
import { TImageItem, TListImage } from '../types';
import ImageItem from './ImageItem';

type TProps = {
  listImage?: TListImage;
  fetchMoreData?: () => void;
  isLoading?: boolean;
};

const ListImage = ({
  listImage = { col1: [], col2: [], col3: [] },
  fetchMoreData = () => null,
  isLoading,
}: TProps) => {
  const { width } = useWindowSize();

  if (isLoading) {
    return (
      <>
        {width < 768 ? (
          <Grid
            templateColumns={{
              base: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            }}
            gap={{ base: '10px', md: '15px' }}
          >
            <Box>
              {Array(20)
                .fill('')
                .map((item: any, i) => (
                  <ImageItem
                    height={320}
                    isLoading
                    avg_color='#dedede'
                    key={i}
                  />
                ))}
            </Box>
            <Box>
              {Array(19)
                .fill('')
                .map((item: any, i) => (
                  <ImageItem
                    height={350}
                    isLoading
                    avg_color='#dedede'
                    key={i}
                  />
                ))}
            </Box>
          </Grid>
        ) : (
          <Grid
            templateColumns={{
              base: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            }}
            gap={{ base: '10px', md: '15px' }}
          >
            <Box>
              {Array(12)
                .fill('')
                .map((item: any, i) => (
                  <ImageItem
                    height={320}
                    isLoading
                    avg_color='#dedede'
                    key={i}
                  />
                ))}
            </Box>
            <Box>
              {Array(11)
                .fill('')
                .map((item: any, i) => (
                  <ImageItem
                    height={350}
                    isLoading
                    avg_color='#dedede'
                    key={i}
                  />
                ))}
            </Box>
            <Box>
              {Array(12)
                .fill('')
                .map((item: any, i) => (
                  <ImageItem
                    height={320}
                    isLoading
                    avg_color='#dedede'
                    key={i}
                  />
                ))}
            </Box>
          </Grid>
        )}
      </>
    );
  }
  return (
    <InfiniteScroll
      dataLength={
        listImage.col1.length + listImage.col2.length + listImage.col3.length
      }
      next={fetchMoreData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
      scrollThreshold={width < 600 ? 0.9 : 0.8}
      style={{ overflow: 'hidden' }}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {width < 768 ? (
        <Grid display='flex' w='full' position='relative'>
          <Box
            display='block'
            mr={{ base: '10px', md: '15px' }}
            flexBasis={0}
            flexGrow={1}
            flexShrink={1}
          >
            {[...listImage.col1, ...listImage.col3.splice(0, 5)].map(
              (item: TImageItem, i) => (
                <ImageItem
                  avg_color={item.avg_color}
                  src={item.src}
                  width={item.width}
                  height={item.height}
                  photographer={item.photographer}
                  key={i}
                />
              ),
            )}
          </Box>
          <Box display='block' flexBasis={0} flexGrow={1} flexShrink={1}>
            {[...listImage.col2, ...listImage.col3.splice(5, 10)].map(
              (item: TImageItem, i) => (
                <ImageItem
                  avg_color={item.avg_color}
                  src={item.src}
                  width={item.width}
                  height={item.height}
                  photographer={item.photographer}
                  key={i}
                />
              ),
            )}
          </Box>
        </Grid>
      ) : (
        <Grid
          display='flex'
          w='full'
          position='relative'
          // templateColumns={{
          //   base: 'repeat(2, 1fr)',
          //   md: 'repeat(4, 1fr)',
          // }}
          // gap={{ base: '10px', md: '15px' }}
        >
          <Box
            display='block'
            mr={{ base: '10px', md: '15px' }}
            flexBasis={0}
            flexGrow={1}
            flexShrink={1}
          >
            {listImage.col1.map((item: TImageItem, i) => (
              <ImageItem
                avg_color={item.avg_color}
                src={item.src}
                width={item.width}
                height={item.height}
                photographer={item.photographer}
                key={i}
              />
            ))}
          </Box>
          <Box
            display='block'
            mr={{ base: '10px', md: '15px' }}
            flexBasis={0}
            flexGrow={1}
            flexShrink={1}
          >
            {listImage.col2.map((item: TImageItem, i) => (
              <ImageItem
                avg_color={item.avg_color}
                src={item.src}
                width={item.width}
                height={item.height}
                photographer={item.photographer}
                key={i}
              />
            ))}
          </Box>
          <Box
            display='block'
            mr={{ base: '10px', md: '15px' }}
            flexBasis={0}
            flexGrow={1}
            flexShrink={1}
          >
            {listImage.col3.map((item: TImageItem, i) => (
              <ImageItem
                avg_color={item.avg_color}
                src={item.src}
                width={item.width}
                height={item.height}
                photographer={item.photographer}
                key={i}
              />
            ))}
          </Box>
        </Grid>
      )}
    </InfiniteScroll>
  );
};

export default ListImage;
