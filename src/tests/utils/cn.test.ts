import { cn } from "@/utils/cn";

describe("cn utility", () => {
    it("merges class names correctly", () => {
        expect(cn("w-full", "h-full")).toBe("w-full h-full");
    });

    it("handles conditional classes", () => {
        expect(cn("w-full", true && "h-full", false && "bg-red-500")).toBe(
            "w-full h-full"
        );
    });

    it("merges tailwind classes sensibly", () => {
        // tailwind-merge should resolve conflicts, e.g., p-4 vs p-2 -> last one wins
        expect(cn("p-4", "p-2")).toBe("p-2");
        expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    });

    it("handles undefined and null inputs", () => {
        expect(cn("w-full", undefined, null, "h-full")).toBe("w-full h-full");
    });
});
