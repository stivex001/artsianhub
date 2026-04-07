"use client";

import { Component, ReactNode } from "react";
import { RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches unexpected render-time errors in client subtrees.
 * TanStack Query's isError handles fetch errors inline; this catches
 * anything that slips through (e.g. a component crash on bad data shape).
 */
export class QueryErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-4">
              <RefreshCw className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Something went wrong
            </h3>
            <p className="text-gray-500 text-sm max-w-xs mb-6">
              We couldn&apos;t load this section. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 bg-[#02198B] text-white rounded-full text-sm font-medium hover:bg-blue-800 transition-colors"
            >
              Refresh page
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
