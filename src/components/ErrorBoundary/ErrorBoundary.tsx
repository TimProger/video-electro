import React, { Component, ErrorInfo, ReactNode } from "react";
import Head from "next/head";
import ErrorPage from "@/pages/errorpage";
import Layout from "@/components/Layout/Layout";

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
    this.state.error = error
  }

  public render() {
    if (this.state.hasError) {
      return <Layout>
        <Head>
          <title>Error | Not Found</title>
        </Head>
        <ErrorPage code={this.state.error?.name || '404'} text={this.state.error?.message || 'Произошла ошибка'} />
      </Layout>
    }

    return this.props.children;
  }
}

export default ErrorBoundary;