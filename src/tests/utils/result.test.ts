import { attempt, ok, err, unwrap, attemptSync } from "@/utils/result";

describe("Result utility", () => {
    describe("attempt (async)", () => {
        it("returns Ok when promise resolves", async () => {
            const result = await attempt(Promise.resolve("success"));
            expect(result.ok).toBe(true);
            if (result.ok) {
                expect(result.value).toBe("success");
            }
        });

        it("returns Err when promise rejects", async () => {
            const error = new Error("fail");
            const result = await attempt(Promise.reject(error));
            expect(result.ok).toBe(false);
            if (!result.ok) {
                expect(result.error).toBe(error);
            }
        });

        it("works with async functions", async () => {
            const asyncFn = async () => "success";
            const result = await attempt(asyncFn);
            expect(result.ok).toBe(true);
            expect(unwrap(result)).toBe("success");
        });
    });

    describe("attemptSync", () => {
        it("returns Ok for successful regular functions", () => {
            const result = attemptSync(() => "sync success");
            expect(result.ok).toBe(true);
            expect(unwrap(result)).toBe("sync success");
        });

        it("returns Err for throwing functions", () => {
            const result = attemptSync(() => {
                throw new Error("sync fail");
            });
            expect(result.ok).toBe(false);
            expect(result.error).toBeInstanceOf(Error);
        });
    });

    describe("unwrap", () => {
        it("returns value if Ok", () => {
            expect(unwrap(ok(123))).toBe(123);
        });

        it("throws error if Err", () => {
            const error = new Error("oops");
            expect(() => unwrap(err(error))).toThrow(error);
        });
    });
});
