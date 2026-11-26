import React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Error boundary that catches R3F canvas errors gracefully.
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  override componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log silently — don't surface to console in production
    if (import.meta.env.DEV) {
      console.warn("[ErrorBoundary]", error, info);
    }
  }

  override render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(160deg, #FBF3EA 0%, #F3D9D3 60%, #C98F88 100%)",
              borderRadius: "inherit",
            }}
          />
        )
      );
    }
    return this.props.children;
  }
}
