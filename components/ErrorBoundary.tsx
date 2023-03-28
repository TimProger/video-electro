import React, { Component, ErrorInfo, ReactNode } from "react";
import Head from "next/head";
import ErrorPage from "@/components/ErrorPage";
import Layout from "@/components/Layout";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: null | Error
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error: error
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return <Layout>
        <Head>
          <title>404 | Not Found</title>
        </Head>
        <ErrorPage code={404} text={'Страница не найдена'} />
      </Layout>
    }

    return this.props.children;
  }
}

export default ErrorBoundary;