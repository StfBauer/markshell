export var _theme: any;
/**
 * Returns the default theme
 */
declare function _getTheme(): {
    headline: import("chalk").Chalk;
    bold: import("chalk").Chalk;
    italic: import("chalk").Chalk;
    strikethrough: import("chalk").Chalk;
    code: import("chalk").Chalk;
    inlineCode: import("chalk").Chalk;
    blockQuote: import("chalk").Chalk;
    sourceCodeTheme: string;
    availableSourceThemes: {
        COY: string;
        DARK: string;
        FUNKY: string;
        OKADIDO: string;
        PRISM: string;
        SOLARIZE: string;
        TOMORROW: string;
        TWILIGHT: string;
    };
    indents: {
        blockquote: number;
        definitionList: number;
    };
    admonitions: {
        enabled: boolean;
        useSafeColors: boolean;
        beforeIndent: number;
        afterIndent: number;
        getStyles: () => {
            indent: {
                beforeIndent: number;
                afterIndent: number;
            };
            abstract: {
                title: string;
                style: import("chalk").Chalk;
                safeStyle: import("chalk").Chalk;
            };
            note: {
                title: string;
                style: import("chalk").Chalk;
                safeStyle: import("chalk").Chalk;
            };
            info: {
                title: string;
                style: import("chalk").Chalk;
                safeStyle: import("chalk").Chalk;
            };
            tip: {
                title: string;
                style: import("chalk").Chalk;
                safeStyle: import("chalk").Chalk;
            };
            success: {
                title: string;
                style: import("chalk").Chalk;
                safeStyle: import("chalk").Chalk;
            };
            question: {
                title: string;
                style: import("chalk").Chalk;
                safeStyle: import("chalk").Chalk;
            };
            warning: {
                title: string;
                style: import("chalk").Chalk;
                safeStyle: import("chalk").Chalk;
            };
            failure: {
                title: string;
                style: import("chalk").Chalk;
                safeStyle: import("chalk").Chalk;
            };
            danger: {
                title: string;
                style: import("chalk").Chalk;
                safeStyle: import("chalk").Chalk;
            };
            important: {
                title: string;
                style: import("chalk").Chalk;
                safeStyle: import("chalk").Chalk;
            };
            bug: {
                title: string;
                style: import("chalk").Chalk;
                safeStyle: import("chalk").Chalk;
            };
            example: {
                title: string;
                style: import("chalk").Chalk;
                safeStyle: import("chalk").Chalk;
            };
            quote: {
                title: string;
                style: import("chalk").Chalk;
                safeStyle: import("chalk").Chalk;
            };
        };
        setStyles: (styleBlock: any) => void;
    };
};
/**
 * Define a custom theme for the output
 * @param {*} customTheme
 */
declare function _setTheme(customTheme: any): void;
/**
 * Outputs formated string
 * @param {string} filepath to markdown file
 */
declare function _toConsole(filepath: string): void;
/**
 * Returns the raw formatted string
 * @param {string} filepath to markdown file
 */
declare function _toRawContent(filepath: string): any;
export declare const sourceTheme: {
    COY: string;
    DARK: string;
    FUNKY: string;
    OKADIDO: string;
    PRISM: string;
    SOLARIZE: string;
    TOMORROW: string;
    TWILIGHT: string;
};
export { _getTheme as getTheme, _setTheme as setTheme, _toConsole as toConsole, _toRawContent as toRawContent };
