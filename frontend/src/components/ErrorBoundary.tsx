import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: any) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
          <div className="max-w-md w-full glass-panel p-8 rounded-xl border border-error/20">
            <h1 className="text-3xl font-manrope font-bold text-error mb-4">Something went wrong</h1>
            <p className="text-on-surface-variant mb-6 font-inter">
              The application encountered an unexpected error. This might be due to missing configuration or a temporary failure.
            </p>
            {this.state.error && (
              <pre className="bg-black/40 p-4 rounded text-left text-xs overflow-auto max-h-48 text-error/80 mb-6 font-mono">
                {this.state.error.message}
                {this.state.error.stack}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              className="btn-primary px-8 py-3"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
