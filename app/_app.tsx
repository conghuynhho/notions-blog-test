import App, {AppContext, AppProps} from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  return {
    pageProps: {
      // Call page-level getInitialProps
      ...(await App.getInitialProps(appContext)),
      // Some custom thing for all pages
      appProp: appContext.ctx.query,

    }
  }
}
