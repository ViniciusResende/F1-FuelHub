/**
 * Check if object has value
 * @param param - Object to be checked
 * @returns Boolean indicating if object has value
 */
export default function doesObjectHaveValue(param: unknown): boolean {
  return !!(
    param &&
    typeof param === 'object' &&
    Object.values(param as Record<string, unknown>).some(
      (value) => value !== undefined && value !== null
    )
  );
}
