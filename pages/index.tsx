import { Box, Container, Heading } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import Api from '../apis/Api';
import { Navbar } from '../components';
import ListImage from '../components/ListImage';
import { TListImage } from '../types';
import { useRouter } from 'next/router';
import cookie from 'cookie';
import Jscookie from 'js-cookie';

type Props = {
  next_page: string
  page: number
  photos: any[]
  prev_page: string
  total_results: number
}

const Home = ({ data  }: { data: Props }) => {
  const router = useRouter();
  const [listImage, setListImage] = useState<TListImage>({
    col1: [],
    col2: [],
    col3: [],
  });
  const getData = async (listData: any) => {
    const data = listData?.photos
      .filter((item: any) => item.src.original)
      .map((value: any) => {
        return {
          ...value,
          resImage: value.src,
          src: value.src.original,
        };
      });
    const images = {
      col1: data.slice(0, 20),
      col2: data.slice(20, 40),
      col3: data.slice(40, 60),
    };
    const prevCol1 = [...listImage.col1, ...images.col1];
    const prevCol2 = [...listImage.col2, ...images.col2];
    const prevCol3 = [...listImage.col3, ...images.col3];
    const imagesData = {
      col1: prevCol1,
      col2: prevCol2,
      col3: prevCol3,
    };
    setListImage(imagesData);
  };

  useEffect(() => {
    if (data && data.photos.length) {
      localStorage.removeItem('chakra-ui-color-mode');
      getData(data);
    }
  }, [data]);

  const fetchMoreData = () => {
    let prevPage;
    if (router.query.page) {
      prevPage = Number(router.query.page) + 1;
    } else {
      if (Jscookie.get('page')) {
        prevPage = Number(Jscookie.get('page')) + 1;
      } else {
        prevPage = 2;
      }
    }
    Jscookie.set('page', `${prevPage}`);
    router.push(
      {
        pathname: '/',
        query: { page: prevPage },
      },
      '/',
      { scroll: false },
    );
  };

  return (
    <>
      <Box bg={'#fafafa'}>
        <Navbar />
        <Container maxW={1000} mt={30} mx='auto'>
          {data.photos.length ? (
            <ListImage fetchMoreData={fetchMoreData} listImage={listImage} />
          ) : (
            <Box
              w='full'
              h='100vh'
              display='flex'
              justifyContent='center'
              alignItems='center'
              mt={-24}
            >
              <Heading>Data Not Found</Heading>
            </Box>
          )}
        </Container>
      </Box>
    </>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  let parsedCookies: any = {
    page: null,
  };
  if (context.req.headers.cookie) {
    parsedCookies = cookie.parse(context.req.headers.cookie);
  }
  let currentPage;
  const pageCookie = parsedCookies.page;
  if (pageCookie) {
    currentPage = pageCookie;
  }
  const url = 'curated?per_page=60';
  try {
    const products = await Api.get(`${url}&page=${currentPage || 1}`).then(
      (res) => res.data,
    );
    return {
      props: {
        data: products,
      },
    };
  } catch (err) {
    return {
      props: {
        data: {
          photos: []
        },
      },
    };

  }

}
