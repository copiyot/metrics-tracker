import {FC, memo} from 'react';
import GlobalStyle from "./styles/global";
import SideBar from './components/SideBar';
import { createClient, Provider } from 'urql';

const client = createClient({
  url: 'http://localhost:4000/graphql',
});

const App:FC = ()=> (
  <Provider value={client}>
    <>
    <GlobalStyle/>
    <SideBar/>
    </>
  </Provider>
)

export default memo(App);
