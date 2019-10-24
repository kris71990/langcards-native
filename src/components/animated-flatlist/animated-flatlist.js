import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

const FadeInFlatList = (props) => {
  const [fadeIn] = useState(new Animated.Value(0.2));
  const { 
    data, keyExtractor, renderItem, style, 
  } = props;

  useEffect(() => {
    Animated.timing(
      fadeIn,
      {
        toValue: 1,
        duration: 3000,
      },
    ).start();
  }, []);

  return (
    <Animated.FlatList
      style={{ ...style, opacity: fadeIn }}
      data={ data }
      keyExtractor={ keyExtractor }
      renderItem={ renderItem }
    >
      { props.children }
    </Animated.FlatList>
  );
};

FadeInFlatList.propTypes = {
  data: PropTypes.array, 
  keyExtractor: PropTypes.func,
  renderItem: PropTypes.func,
  style: PropTypes.object,
  children: PropTypes.object,
};

export default FadeInFlatList;
