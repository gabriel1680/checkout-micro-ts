export class Cpf {
    constructor(readonly value: string) {
        if (!Cpf.validate(value)) throw new Error("Invalid CPF");
    }
    static validate(rawCpf: string): boolean {
        if (!rawCpf) return false;

        const onlyDigits = rawCpf.replace(/\D/g, "");
        if (Cpf.isInvalidLength(onlyDigits)) return false;

        if (Cpf.allDigitsAreTheSame(onlyDigits)) return false;

        const verificationDigits = Cpf.calculateVerificationDigits(onlyDigits);
        return Cpf.compareVerificationDigits(onlyDigits, verificationDigits);
    }
    private static compareVerificationDigits(
        cpf: string,
        digits: string
    ): boolean {
        const cpfDigits = cpf.substring(9, 11);
        return cpfDigits === digits;
    }
    private static calculateVerificationDigits(cpf: string) {
        const firstVerificationDigit = Cpf.calculateVerificationDigit(cpf, 10);
        const secondVerificationDigit = Cpf.calculateVerificationDigit(cpf, 11);
        return `${firstVerificationDigit}${secondVerificationDigit}`;
    }
    private static calculateVerificationDigit(
        cpf: string,
        factor: number
    ): string {
        let total = 0;
        for (const digit of cpf) {
            if (factor > 1) total += parseInt(digit) * factor--;
        }
        const rest = total % 11;
        return rest < 2 ? "0" : `${11 - rest}`;
    }
    private static isInvalidLength(cpf: string) {
        return cpf.length !== 11;
    }
    private static allDigitsAreTheSame(cpf: string): boolean {
        const firstDigit = cpf[0];
        return cpf.split("").every((d) => d === firstDigit);
    }
}
