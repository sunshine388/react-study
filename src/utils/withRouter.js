import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
const withRouter = (Com) => {
  function WithFun(props) {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    return (
      <Com {...props} params={params} location={location} navigate={navigate} />
    );
  }
  return WithFun;
};
export default withRouter;
