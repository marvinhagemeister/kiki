import * as emitter from "../../emitter";
import { IFile } from "../../io/file";
import * as autoprefixer from "autoprefixer";
import * as path from "path";
import * as postcss from "postcss";

interface ICustomPostCssOptions {
  browsers: string[];
}

interface IPostCssOptions {
  map: boolean | {
    inline: boolean;
    prev: boolean | string;
  };
  to: string;
}

export function compile(options: ICustomPostCssOptions) {
  const prefixer = autoprefixer({
    browsers: options.browsers,
  });

  return (files: IFile[]) => {
    return Promise.all(
      files.map((file: IFile) => {
        let cssOptions: IPostCssOptions = {
          map: false,
          to: path.basename(file.location),
        };

        if (file.map !== null) {
          cssOptions.map = {
            inline: false,
            prev: file.map,
          };
        }

        return postcss([prefixer])
          .process(file.content, cssOptions)
          .then(res => {
            res.warnings().forEach(warn => emitter.warning(warn));
            file.content = res.css;

            if (res.map) {
              file.map = res.map.toString();
            }

            return file;
          }).catch((err: Error) => {
            emitter.error(err);
          });
      })
    );
  };
}
