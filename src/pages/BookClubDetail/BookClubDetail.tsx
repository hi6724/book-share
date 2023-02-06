import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BiMap } from 'react-icons/bi';
import { BsCalendarDate } from 'react-icons/bs';
import { HiUsers } from 'react-icons/hi';
import sample1 from '@src/assets/images/sample1.png';
import sample2 from '@src/assets/images/sample2.png';
import sample3 from '@src/assets/images/sample3.png';
import crown from '@src/assets/crown.svg';

import { IClubDetail, IUserResponse } from '@src/types/types';
import './BookClubDetail.styles.scss';
import ClubRecommendCarousel from '@components/Carousel/ClubRecommendCarousel';
import FixedBottomButton from '@components/FixedBottomButton/FixedBottomButton';
import CarouselPlace from '@components/Carousel/CarouselPlace';

function fetchData(): Promise<IClubDetail> {
  return axios.get('/clubDetail.json').then(response => response.data);
}
function fetchUserData(): Promise<IUserResponse> {
  return axios.get('/userRecommend.json').then(response => response.data);
}

function BookClubDetail() {
  const { id } = useParams();
  const { data: detailData } = useQuery(`club-detail-${id}`, fetchData);
  const { data: usersData } = useQuery(`/userRecommend.json`, fetchUserData);

  const newData = [
    {
      title: detailData?.meta.meeting_count + '번',
      image_url: sample1,
      header: '오늘까지',
      description: '모였어요',
    },
    {
      title: detailData?.meta.posts + '개',
      image_url: sample2,
      header: '맴버들이',
      description: '의 글을 썼어요',
    },
    {
      title: detailData?.meta.recent_date + '일전',
      image_url: sample3,
      header: '가장 최근',
      description: '에 모였어요',
    },
  ];
  const newUserData = usersData?.data.map(user => ({
    image_url: user.image_url,
    title: user.nickname,
  }));

  return (
    <>
      <div className="book-club-detail-container">
        <div className="book-club-detail-header">
          <img src={detailData?.image_url} alt="" />
          <h1>{detailData?.title}</h1>
          <p>
            <span>
              <BiMap />
            </span>
            <span>{detailData?.location}</span>
          </p>
        </div>
        <div className="book-club-detail-users">
          <h2>모임 회원</h2>
          {newUserData && (
            <div style={{ position: 'relative' }}>
              <CarouselPlace
                items={newUserData}
                slidesToShow={6}
                infinite={false}
                className="club-members"
              />
              <img src={crown} alt="" />
            </div>
          )}
        </div>
        <div className="book-club-detail-meta">
          <h2>모임 정보</h2>
          <div>
            <div>
              <BsCalendarDate />
              <span>개설일</span>
            </div>
            <span>{detailData?.date}</span>
          </div>
          <div>
            <div>
              <HiUsers />
              <span>맴버 / 정원</span>
            </div>
            <span>
              {detailData?.club_members.length}명 / {detailData?.members_limit}
              명
            </span>
          </div>
        </div>
        <div className="book-club-detail-description">
          <h2>모임 소개</h2>
          <p>{detailData?.description}</p>
        </div>
        <div className="meta-data-container">
          <h2>우리는 이만큼 활동했어요</h2>
          <CarouselPlace
            items={newData}
            slidesToShow={3}
            infinite={false}
            className="meta-data"
          />
        </div>
        <div className="recommend-container">
          <h2>독서모임 추천</h2>
          <ClubRecommendCarousel />
        </div>
      </div>
      <FixedBottomButton
        text={'모임 가입하기'}
        onClick={() => console.log('hello')}
      />
    </>
  );
}

export default BookClubDetail;
