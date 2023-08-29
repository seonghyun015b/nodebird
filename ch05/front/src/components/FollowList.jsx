import React, { useMemo } from 'react';
import { Button, Card, List } from 'antd';
import { StopOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';
import { REMOVE_FOLLOWER_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const ListStyle = styled(List)`
  margin-bottom: 20px;
`;

const ListDiv = styled.div`
  text-align: center;
  margin: 10px 0;
`;

const ListItem = styled(List.Item)`
  margin-top: 20;
`;

const FollowList = ({ header, data }) => {
  const listGrid = useMemo(() => ({ gutter: 4, xs: 2, md: 3 }), []);

  const dispatch = useDispatch();

  const onCancel = (id) => () => {
    if (header === '팔로잉') {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: id,
      });
    }
    dispatch({
      type: REMOVE_FOLLOWER_REQUEST,
      data: id,
    });
  };

  return (
    <ListStyle
      grid={listGrid}
      size='small'
      header={<div>{header}</div>}
      loadMore={
        <ListDiv>
          <Button>더 보기</Button>
        </ListDiv>
      }
      bordered
      dataSource={data}
      renderItem={(item) => (
        <ListItem>
          <Card
            actions={[<StopOutlined key='stop' onClick={onCancel(item.id)} />]}
          >
            <Card.Meta description={item.nickname} />
          </Card>
        </ListItem>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
