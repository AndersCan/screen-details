/**
 * `unsupported` is returned if permission query fails.
 */
export async function getPermissionState(): Promise<
  PermissionState | "unsupported"
> {
  try {
    //@ts-expect-error
    return await navigator.permissions.query({ name: "window-management" });
  } catch (err) {
    return "unsupported";
  }
}
