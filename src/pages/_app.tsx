import "@/styles/globals.css";
import { RootState, store, wrapper } from "@/redux/store";
import type { AppProps } from "next/app";
import { Provider, useSelector } from "react-redux";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header>
        <Component {...pageProps} />
      </Header>
      <ToastContainer autoClose={2000}/>
    </Provider>
  );
}

export default wrapper.withRedux(App);
