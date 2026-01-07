/**
 * straightforward Result type for handling operations that can fail.
 * Inspired by Rust's Result type but adapted for TypeScript's discriminated unions.
 */
export type Result<T, E = Error> =
    | { ok: true; value: T; error?: never }
    | { ok: false; error: E; value?: never };

/**
 * Creates a success Result
 */
export const ok = <T>(value: T): Result<T, never> => ({ ok: true, value });

/**
 * Creates a failure Result
 */
export const err = <E>(error: E): Result<never, E> => ({ ok: false, error });

/**
 * Wraps a promise or async function and returns a Result.
 * Catches any errors thrown and returns them as an Err.
 *
 * Usage:
 * const res = await attempt(someAsyncFunction());
 * if (res.ok) {
 *   console.log(res.value);
 * } else {
 *   console.error(res.error);
 * }
 */
export async function attempt<T, E = Error>(
    promiseOrFn: Promise<T> | (() => Promise<T>)
): Promise<Result<T, E>> {
    try {
        const data =
            typeof promiseOrFn === "function" ? await promiseOrFn() : await promiseOrFn;
        return ok(data);
    } catch (e: any) {
        // Attempt to keep the error type if possible, or cast
        return err(e as E);
    }
}

/**
 * Synchronous version of attempt.
 */
export function attemptSync<T, E = Error>(fn: () => T): Result<T, E> {
    try {
        const data = fn();
        return ok(data);
    } catch (e: any) {
        return err(e as E);
    }
}

/**
 * Unwraps the result, throwing the error if it failed.
 */
export function unwrap<T>(result: Result<T, any>): T {
    if (result.ok) {
        return result.value;
    }
    throw result.error;
}
