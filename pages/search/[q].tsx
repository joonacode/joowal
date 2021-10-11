import { Box, Container } from '@chakra-ui/layout';
import { GetServerSideProps, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Api from '../../apis/Api';
import { Navbar } from '../../components';
import useSWR from 'swr';
import ListImage from '../../components/ListImage';
import { TListImage } from '../../types';
import { useRouter } from 'next/router';

const Search = ({ data, error }: { data: Object; error: boolean }) => {
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
    // setPage((prev) => prev + 1);
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

export default Search;

export async function getServerSideProps(context: any) {
  const { page, isSearch } = context.query;
  const { q } = context.params;
  const url = `search?query=${q}&per_page=40`;
  const products = await Api.get(`${url}&page=${page || 1}`).then(
    (res) => res.data,
  );
  return {
    props: {
      data: products,
      error: null,
    },
  };
}
