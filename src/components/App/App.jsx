import { Routes, Route, useSearchParams } from 'react-router-dom';
import { SharedLayout } from '../SharedLayout/SharedLayout';
import { lazy, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../redux/auth/authOperations';
import { useSelector } from 'react-redux';
import { isRefreshing } from '../../redux/auth/selectors';
import { RestrictedRouter } from '../RestrictedRouter';
import { PrivateRouter } from '../PrivateRouter';
import { setSettings } from '../../redux/userSettings/userSettingsSlice';

const Home = lazy(() => import('../../pages/Home/Home'));
const Learn = lazy(() => import('../../pages/Learn/Learn'));
const MyStatistic = lazy(() => import('../../pages/myStatistics/MyStatistic'));
const Login = lazy(() => import('../../pages/Login/Login'));
const Signup = lazy(() => import('../../pages/Signup/Signup'));
const NotFound = lazy(() => import('../../pages/NotFound/NotFound'));

const App = () => {
  const dispatch = useDispatch();
  const refreshing = useSelector(isRefreshing);
  const [searchParams] = useSearchParams();
  const [dispatchCompleted, setDispatchCompleted] = useState(false);

  const options = {
    myChoiceLearn: 0,
    select: 1,
    voice: true,
    melody: true,
  };

  if (!localStorage.getItem('learnOptions')) {
    localStorage.setItem('learnOptions', JSON.stringify(options));
  }

  const showSpinner = refreshing || !dispatchCompleted;

  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');

  useEffect(() => {
    dispatch(setSettings(JSON.parse(localStorage.getItem('learnOptions'))));

    if (accessToken && refreshToken) {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }

    if (
      localStorage.getItem('accessToken') === 'null' ||
      localStorage.getItem('refreshToken') === 'null'
    ) {
      setDispatchCompleted(true);
      return;
    }

    dispatch(getCurrentUser()).then(() => {
      setDispatchCompleted(true);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home showSpinner={showSpinner} />} />
        <Route path="learn" element={<Learn showSpinner={showSpinner} />} />
        <Route
          path="statistic"
          element={
            <PrivateRouter component={MyStatistic} redirectTo="/login" showSpinner={showSpinner} />
          }
        />
        <Route
          path="login"
          element={<RestrictedRouter component={Login} redirectTo="/" showSpinner={showSpinner} />}
        />
        <Route
          path="signup"
          element={<RestrictedRouter component={Signup} redirectTo="/" showSpinner={showSpinner} />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
