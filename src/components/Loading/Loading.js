import React from 'react';
import loader from './../../assets/img/loader.gif';
import loadingStyles from './loading.module.scss';

const Loading = () => {
  return (
    <div className={loadingStyles.loader}>
      <img src={loader} alt='loader' />
    </div>
  );
};

export default Loading;
