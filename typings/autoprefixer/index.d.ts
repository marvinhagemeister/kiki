// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/56295f5058cac7ae458540423c50ac2dcf9fc711/autoprefixer-core/autoprefixer-core.d.ts
declare module "autoprefixer" {
    interface Config {
        browsers?: string[];
        cascade?: boolean;
        remove?: boolean;
    }

    interface Options {
        from?: string;
        to?: string;
        safe?: boolean;
        map?: {
            inline?: boolean;
            prev?: string | Object;
        }
    }

    interface Result {
        css: string;
        map: string;
        opts: Options;
    }

    interface Processor {
        postcss: any;
        info(): string;
        process(css: string, opts?: Options): Result;
    }

    interface Exports {
        (config: Config): Processor;
        postcss: any;
        info(): string;
        process(css: string, opts?: Options): Result;
    }

    var exports: Exports;
    export = exports;
}
