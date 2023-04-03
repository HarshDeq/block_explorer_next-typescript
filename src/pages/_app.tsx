import "@/styles/globals.css";
import { RootState, store, wrapper } from "@/redux/store";
import type { AppProps } from "next/app";
import { Provider, useSelector } from "react-redux";
import Header from "@/components/Header";
import Spinner from "@/components/Spinner";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header>
        <Component {...pageProps} />
      </Header>
    </Provider>
  );
}

export default wrapper.withRedux(App);
