import { Box, Container, Flex, Heading } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import Api from '../../apis/Api';
import { Navbar } from '../../components';
import ListImage from '../../components/ListImage';
import { TListImage } from '../../types';
import { useRouter } from 'next/router';
import { Button } from '@chakra-ui/button';

const Search = ({ data, error }: { data: Object; error: boolean }) => {
  const router = useRouter();
  const [isNotFound, setIsNotFound] = useState(false);
  const initialValues = {
    col1: [],
    col2: [],
    col3: [],
  };
  const [listImage, setListImage] = useState<TListImage>(initialValues);

  const getData = async (listData: any) => {
    if (listData.photos.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
    const data = listData?.photos
      .filter((item: any) => item.src.original)
      .map((value: any) => {
        return {
          ...value,
          src: value.src.original,
        };
      });
    const images = {
      col1: data.slice(0, 20),
      col2: data.slice(20, 40),
      col3: data.slice(40, 60),
    };
    let prevCol1 = [];
    let prevCol2 = [];
    let prevCol3 = [];
    if (router.query.isSearch) {
      prevCol1 = [...images.col1];
      prevCol2 = [...images.col2];
      prevCol3 = [...images.col3];
    } else {
      prevCol1 = [...listImage.col1, ...images.col1];
      prevCol2 = [...listImage.col2, ...images.col2];
      prevCol3 = [...listImage.col3, ...images.col3];
    }

    const imagesData = {
      col1: prevCol1,
      col2: prevCol2,
      col3: prevCol3,
    };
    setListImage(imagesData);
  };

  useEffect(() => {
    if (data) {
      getData(data);
    }
  }, [data]);

  const fetchMoreData = () => {
    let prevPage;
    if (router.query.page) {
      prevPage = Number(router.query.page) + 1;
    } else {
      prevPage = 2;
    }
    router.push(
      {
        pathname: '/search/[q]',
        query: { page: prevPage, q: router.query.q },
      },
      '/search/' + router.query.q,
      { scroll: false },
    );
  };

  const redirectSearch = (inputSearch: string) => {
    router.push(
      {
        pathname: '/search/[q]',
        query: { page: 1, q: inputSearch, isSearch: true },
      },
      '/search/' + inputSearch,
      { scroll: true },
    );
  };

  const list = [
    'Wallpaper Desktop',
    'Nature',
    'Galaxy',
    'Wallpaper Hd',
    'Wallpaper Iphone',
    'Landscape',
  ];

  return (
    <div>
      <Navbar />
      <Container maxW={1000} mt={30}>
        {isNotFound ? (
          <Box
            minH={500}
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDir='column'
          >
            <Heading mb={7} size={'2xl'}>
              Not found
            </Heading>
            <Flex flexWrap='wrap' justifyContent='center' alignItems='center'>
              {list.map((v, i) => (
                <Button
                  key={i}
                  onClick={() => redirectSearch(v)}
                  colorScheme='blue'
                  m={1}
                  size='sm'
                >
                  {v}
                </Button>
              ))}

              <Button
                onClick={() => router.push('/')}
                colorScheme='blue'
                m={1}
                size='sm'
              >
                Back To Home
              </Button>
            </Flex>
          </Box>
        ) : (
          <ListImage fetchMoreData={fetchMoreData} listImage={listImage} />
        )}
      </Container>
    </div>
  );
};

export default Search;

export async function getServerSideProps(context: any) {
  const { page } = context.query;
  const { q } = context.params;
  const url = `search?query=${q}&per_page=60`;
  const products = await Api.get(`${url}&page=${page || 1}`).then(
    (res) => res.data,
  );
  return {
    props: {
      data: products,
    },
  };
}
