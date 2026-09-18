const KIT_API_BASE = "https://api.kit.com/v4";

type KitErrorResponse = {
  errors?: string[];
};

function kitHeaders(apiKey: string) {
  return {
    "Content-Type": "application/json",
    "X-Kit-Api-Key": apiKey,
  };
}

async function parseKitError(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as KitErrorResponse;
    if (data.errors?.length) return data.errors.join(", ");
  } catch {
    // fall through
  }
  return `Kit API error (${response.status})`;
}

/** Upsert a subscriber by email (Kit V4). */
export async function upsertKitSubscriber(apiKey: string, emailAddress: string) {
  const response = await fetch(`${KIT_API_BASE}/subscribers`, {
    method: "POST",
    headers: kitHeaders(apiKey),
    body: JSON.stringify({
      email_address: emailAddress,
      state: "active",
    }),
  });

  if (response.status === 200 || response.status === 201 || response.status === 202) {
    return;
  }

  throw new Error(await parseKitError(response));
}

/** Add an existing subscriber to a Kit form by email. */
export async function addKitSubscriberToForm(
  apiKey: string,
  formId: string,
  emailAddress: string,
  referrer?: string,
) {
  const response = await fetch(`${KIT_API_BASE}/forms/${formId}/subscribers`, {
    method: "POST",
    headers: kitHeaders(apiKey),
    body: JSON.stringify({
      email_address: emailAddress,
      ...(referrer ? { referrer } : {}),
    }),
  });

  // 200 = already on form, 201 = newly added
  if (response.status === 200 || response.status === 201) {
    return;
  }

  throw new Error(await parseKitError(response));
}

/** Tag a subscriber by email (Kit V4). Subscriber must already exist. */
export async function tagKitSubscriber(apiKey: string, tagId: string, emailAddress: string) {
  const response = await fetch(`${KIT_API_BASE}/tags/${tagId}/subscribers`, {
    method: "POST",
    headers: kitHeaders(apiKey),
    body: JSON.stringify({ email_address: emailAddress }),
  });

  // 200 = already tagged, 201 = newly tagged
  if (response.status === 200 || response.status === 201) {
    return;
  }

  throw new Error(await parseKitError(response));
}

type KitTag = { id?: number; name?: string };
type KitTagsResponse = {
  tags?: KitTag[];
  pagination?: { has_next_page?: boolean; end_cursor?: string };
};

async function findKitTagId(apiKey: string, name: string): Promise<string | null> {
  let after: string | undefined;

  for (let page = 0; page < 10; page += 1) {
    const url = new URL(`${KIT_API_BASE}/tags`);
    url.searchParams.set("per_page", "50");
    if (after) url.searchParams.set("after", after);

    const response = await fetch(url, { headers: kitHeaders(apiKey) });
    if (!response.ok) {
      throw new Error(await parseKitError(response));
    }

    const data = (await response.json()) as KitTagsResponse;
    const match = data.tags?.find((tag) => tag.name === name && tag.id);
    if (match?.id) return String(match.id);

    if (!data.pagination?.has_next_page || !data.pagination.end_cursor) {
      break;
    }
    after = data.pagination.end_cursor;
  }

  return null;
}

/**
 * Create or fetch a Kit tag by name (idempotent).
 * Returns the numeric tag id as a string.
 */
export async function ensureKitTag(apiKey: string, name: string): Promise<string> {
  const response = await fetch(`${KIT_API_BASE}/tags`, {
    method: "POST",
    headers: kitHeaders(apiKey),
    body: JSON.stringify({ name }),
  });

  if (response.status === 200 || response.status === 201) {
    const data = (await response.json()) as { tag?: { id?: number } };
    if (data.tag?.id) return String(data.tag.id);
  }

  const existing = await findKitTagId(apiKey, name);
  if (existing) return existing;

  throw new Error(await parseKitError(response));
}

/** Ensure tag exists, then apply it to a subscriber (must already exist). */
export async function tagKitSubscriberByName(
  apiKey: string,
  tagName: string,
  emailAddress: string,
) {
  const tagId = await ensureKitTag(apiKey, tagName);
  await tagKitSubscriber(apiKey, tagId, emailAddress);
}

export async function subscribeEmailToKit(
  apiKey: string,
  formId: string,
  emailAddress: string,
  referrer?: string,
  tagId?: string,
) {
  await upsertKitSubscriber(apiKey, emailAddress);
  await addKitSubscriberToForm(apiKey, formId, emailAddress, referrer);
  if (tagId) {
    await tagKitSubscriber(apiKey, tagId, emailAddress);
  }
}
