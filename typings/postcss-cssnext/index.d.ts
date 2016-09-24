declare module "postcss-cssnext" {
    interface Config {
        browsers?: string[];
        features?: Object[];
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
