import { Token } from "src/entities/Token";

export const tokenTotal = (tokens: Token[]) => {
    let totalTokens: number = 0;

    tokens?.forEach(token => totalTokens += token.value);

    return totalTokens;
}