import * as emitter from "../../emitter";
import { IFile } from "../../io/file";
import * as autoprefixer from "autoprefixer";
import * as path from "path";
import * as postcss from "postcss";
import * as cssnext from "postcss-cssnext";

export interface ICustomPostCssOptions {
  browsers: string[];
  addVendorPrefixes?: boolean;
  cssnext?: boolean;
  remove?: boolean;
}

interface IPostCssOptions {
  map:
    | boolean
    | {
        inline: boolean;
        prev: boolean | string;
      };
  to: string;
}

export function compile(options: ICustomPostCssOptions) {
  const plugins: any[] = [];

  if (
    (options.addVendorPrefixes === undefined || options.addVendorPrefixes) &&
    !options.cssnext
  ) {
    plugins.push(autoprefixer({ browsers: options.browsers }));
  } else if (options.cssnext !== undefined && options.cssnext) {
    plugins.push(cssnext({ browsers: options.browsers }));
  }

  return (file: IFile) => {
    const cssOptions: IPostCssOptions = {
      map: false,
      to: path.basename(file.location),
    };

    if (file.map !== null) {
      cssOptions.map = {
        inline: false,
        prev: file.map,
      };
    }

    return postcss(plugins)
      .process(file.content, cssOptions as any)
      .then((res: any) => {
        res.warnings().forEach((warn: any) => emitter.warning(warn));
        file.content = res.css;

        if (res.map) {
          file.map = JSON.parse(res.map.toString());
        }

        return file;
      })
      .catch((err: Error) => {
        throw err;
      });
  };
}
