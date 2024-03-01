import { Component } from "react";

export class ErrorBoundary extends Component<{}, { hasError: boolean }> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): { hasError: boolean } {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <FallbackComponent />;
    }
    return this.props.children;
  }
}

interface FallbackComponentProps {
  error: Error;
}

const FallbackComponent: React.FC<FallbackComponentProps> = ({ error }) => {
  return (
    <div>
      <h1>에러 발생!</h1>
      <p>{error.message}</p>
    </div>
  );
};
