import { describe, it, expect } from "vitest";

import { Cpf } from "../../src/domain/entities/cpf";

describe("Cpf unit tests (Domain)", () => {
    it.each(["1".repeat(10), "1".repeat(15)])(
        "should be able to return false for Invalid CPF with length error: %s",
        (cpf: string) => {
            expect(Cpf.validate(cpf)).toBeFalsy();
        }
    );
    it.each([
        "111.111.111-11",
        "222.222.222-22",
        "333.333.333-33",
        "444.444.444-44",
    ])("should be able to return false for Invalid CPF: %s", (cpf: string) => {
        expect(Cpf.validate(cpf)).toBeFalsy();
    });

    it.each(["582.407.930-71", "611.020.870-27", "502.502.810-95"])(
        "should be able to return false for Invalid CPF: %s",
        (cpf: string) => {
            expect(Cpf.validate(cpf)).toBeFalsy();
        }
    );

    it.each(["582.407.930-70", "611.020.870-17", "502.502.880-95"])(
        "should be able to return true for valid cpf: %s",
        (cpf: string) => {
            expect(Cpf.validate(cpf)).toBeTruthy();
        }
    );

    it("should not be able to create Cpf instance", () => {
        expect(() => {
            new Cpf("111.111.111-11");
        }).toThrowError("Invalid CPF");
    });

    it("should be able to create Cpf instance", () => {
        const validCpf = "582.407.930-70";
        const cpf = new Cpf(validCpf);
        expect(cpf).toBeInstanceOf(Cpf);
        expect(cpf.value).toBe(validCpf);
    });
});
