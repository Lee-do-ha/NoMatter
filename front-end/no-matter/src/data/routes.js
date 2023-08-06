//pages/hub
import HubPage from '../pages/hub/HubPage';
import RemotePage from '../pages/hub/RemotePage';
import HubMemberPage from '../pages/hub/HubMemberPage';
import AddHubPage from '../pages/hub/AddHubPage';
import AddRemote from '../pages/hub/AddRemote';

import RmtTvUi from '../rmtUi/RmtTvUi';
import RmtFanUi from '../rmtUi/RmtFanUi';
import RmtCustom from '../rmtUi/RmtCustom';
import RmtAc from '../rmtUi/RmtAc';

//pages/main
import MainPage from '../pages/main/MainPage';

//pages/routine
import RoutinePage from '../pages/routine/RoutinePage';
import AddRoutinePage from '../pages/routine/AddRoutinePage';
import SchedulePage from '../pages/routine/SchedulePage'
import WeatherPage from '../pages/routine/WeatherPage'
import VoicePage from '../pages/routine/VoicePage'

//pages/setting
import SettingPage from '../pages/setting/SettingPage';
import UserEditPage from '../pages/setting/UserEditPage';


const routes = [
  {
    path:'/hubs',
    element: <HubPage />
  },
  {
    path:'/hubs/:id',
    element: <RemotePage />
  },
  {
    path:'/hubs/:id/member',
    element: <HubMemberPage />
  },
  {
    path:'/hubs/addhub',
    element: <AddHubPage /> 
  },
  {
    path:'/hubs/addrmt',
    element: <AddRemote />
  },
  {
    path:'/hubs/rmttv/1',
    element: <RmtTvUi />
  },
  {
    path:'/hubs/rmttv/0',
    element: <RmtTvUi />
  },
  {
    path:'/hubs/rmtfan/1',
    element: <RmtFanUi />
  },
  {
    path:'/hubs/rmtfan/0',
    element: <RmtFanUi />
  },
  {
    path:'/hubs/rmtcustom/1',
    element: <RmtCustom />
  },
  {
    path:'/hubs/rmtcustom/0',
    element: <RmtCustom />
  },
  {
    path:'/hubs/rmtac/',
    element: <RmtAc />
  },
  {
    path:'/main',
    element: <MainPage />
  },
  {
    path:'/routine',
    element: <RoutinePage />
  },
  {
    path:'/routine/addroutine',
    element: <AddRoutinePage /> 
  },
  {
    path: '/routine/schedule',
    element: <SchedulePage />
  },
  {
    path: '/routine/weather',
    element: <WeatherPage />
  },
  {
    path: '/routine/voice',
    element: <VoicePage />
  },
  {
    path:'/setting',
    element: <SettingPage />
  },
  {
    path:'/setting/useredit',
    element: <UserEditPage />
  },
]

export default routes;