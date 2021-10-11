import { Box, Container } from '@chakra-ui/layout';
import { GetServerSideProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Api from '../apis/Api';
import { Navbar } from '../components';
import useSWR from 'swr';
import ListImage from '../components/ListImage';
import { TListImage } from '../types';
import { useRouter } from 'next/router';
import cookie from 'cookie';
import Jscookie from 'js-cookie';

const Home = ({ data, error }: { data: Object; error: boolean }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const initialValues = {
    col1: [],
    col2: [],
    col3: [],
  };
  const [listImage, setListImage] = useState<TListImage>(initialValues);
  const getData = async (listData: any) => {
    try {
      const data = listData?.photos
        .filter((item: any) => item.src.original)
        .map((value: any) => {
          return {
            ...value,
            src: value.src.original,
          };
        });
      const images = {
        col1: data.slice(0, 10),
        col2: data.slice(10, 20),
        col3: data.slice(20, 30),
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
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
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
    <div>
      <Navbar />
      <Container maxW={1280} mt={30}>
        {!data && !error && loading ? (
          <ListImage isLoading />
        ) : (
          <ListImage fetchMoreData={fetchMoreData} listImage={listImage} />
        )}
      </Container>
    </div>
  );
};

export default Home;

export async function getServerSideProps(context: any) {
  const { page } = context.query;
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
  const url = 'curated?per_page=30';
  const products = await Api.get(`${url}&page=${currentPage || 1}`).then(
    (res) => res.data,
  );
  return {
    props: {
      data: products,
      error: false,
    },
  };
}
