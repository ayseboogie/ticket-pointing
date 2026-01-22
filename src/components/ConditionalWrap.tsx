import React from "react";

type ConditionalWrapProps = {
  children: React.ReactNode;
  condition: boolean;
  wrap: React.ComponentType<any>;
};

/**
 * Adds a wrapper around children if a condition is true.
 */

export function ConditionalWrap({
  condition,
  wrap: Wrap,
  children,
}: ConditionalWrapProps) {
  return condition ? <Wrap>{children}</Wrap> : children;
}
