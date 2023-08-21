import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { StopOutlined } from '@ant-design/icons';
import { Button, List, Card } from 'antd';
import { styled } from 'styled-components';

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
  const listGrid = useMemo(() => ({ gutter: 4, xs: 2, md: 3 }, []));

  return (
    <>
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
            <Card actions={[<StopOutlined key='stop' />]}>
              <Card.Meta description={item.nickname} />
            </Card>
          </ListItem>
        )}
      />
    </>
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
