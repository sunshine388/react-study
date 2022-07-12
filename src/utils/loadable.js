import React, { useState, useEffect, Suspense, lazy, Component } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const LoadingComponent = () => {
  useState(NProgress.start());

  useEffect(() => {
    NProgress.done();
  });

  return <div />;
};

const loadable = (component, Loading = LoadingComponent) => {
  const Comp = lazy(component);
  return class Loadable extends Component {
    render() {
      return (
        <Suspense fallback={<Loading />}>
          <Comp />
        </Suspense>
      );
    }
  };
};

export default loadable;
