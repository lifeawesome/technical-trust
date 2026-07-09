export type ForwardRoutes = Record<string, string>;

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function parseForwardRoutes(raw: string | undefined): ForwardRoutes {
  if (!raw?.trim()) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
      throw new Error("RESEND_FORWARD_ROUTES must be a JSON object");
    }

    const routes: ForwardRoutes = {};
    for (const [address, destination] of Object.entries(parsed)) {
      if (typeof destination !== "string" || !destination.trim()) {
        continue;
      }
      routes[normalizeEmail(address)] = destination.trim();
    }
    return routes;
  } catch (error) {
    console.error("Invalid RESEND_FORWARD_ROUTES:", error);
    return {};
  }
}

export function resolveForwardDestination(
  routes: ForwardRoutes,
  defaultTo: string | undefined,
  addresses: { receivedFor: string[]; to: string[] },
): string | null {
  for (const address of addresses.receivedFor) {
    const destination = routes[normalizeEmail(address)];
    if (destination) {
      return destination;
    }
  }

  for (const address of addresses.to) {
    const destination = routes[normalizeEmail(address)];
    if (destination) {
      return destination;
    }
  }

  const fallback = defaultTo?.trim();
  return fallback || null;
}
