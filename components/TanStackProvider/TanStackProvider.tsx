"use client";

import React from "react";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Hydrate } from "@tanstack/react-query";

let client: QueryClient | null = null;

function getQueryClient() {
  if (!client) {
    client = new QueryClient();
  }
  return client;
}

export default function TanStackProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export function HydrateClient({
  state,
  children,
}: {
  state: unknown;
  children: React.ReactNode;
}) {
  return <Hydrate state={state}>{children}</Hydrate>;
}
