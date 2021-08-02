import { ChangeDetection, ViewEncapsulation } from '@angular/cli/lib/config/workspace-schema';

export class ComponentOptions {
  name: string;
  path?: string;
  withHost?: boolean;
  withCustomHost?: boolean;
  /**
   * Specifies the change detection strategy.
   */
  changeDetection?: ChangeDetection;
  /**
   * Specifies if declaring module exports the component.
   */
  export?: boolean;
  /**
   * Flag to indicate if a directory is created.
   */
  flat?: boolean;
  /**
   * Specifies if the style will be in the ts file.
   */
  inlineStyle?: boolean;
  /**
   * Specifies if the template will be in the ts file.
   */
  inlineTemplate?: boolean;
  /**
   * Allows specification of the declaring module.
   */
  module?: string;
  /**
   * The prefix to apply to generated selectors.
   */
  prefix?: string;
  /**
   * The selector to use for the component.
   */
  selector?: string;
  /**
   * Flag to skip the module import.
   */
  skipImport?: boolean;
  /**
   * When true, does not create test files.
   */
  skipTests?: boolean;
  /**
   * The file extension or preprocessor to use for style files.
   */
  style?: any;
  /**
   * Specifies the view encapsulation strategy.
   */
  viewEncapsulation?: ViewEncapsulation;
  /**
   * Specifies if Jest is to be used for mocking
   */
  jest?: boolean;
}
export class ServiceOptions {
  name: string;
  path?: string;
  isDataService?: boolean;
  /**
   * Flag to indicate if a directory is created.
   */
  flat?: boolean;
  /**
   * When true, does not create test files.
   */
  skipTests?: boolean;
  /**
   * Specifies if a spec file is generated.
   */
  jest?: boolean;
}
export class DirectiveOptions {
  name: string;
  path?: string;
  /**
   * Specifies if declaring module exports the directive.
   */
  export?: boolean;
  /**
   * Flag to indicate if a directory is created.
   */
  flat?: boolean;
  /**
   * Allows specification of the declaring module.
   */
  module?: string;
  /**
   * The prefix to apply to generated selectors.
   */
  prefix?: string;
  /**
   * The selector to use for the directive.
   */
  selector?: string;
  /**
   * Flag to skip the module import.
   */
  skipImport?: boolean;
  /**
   * When true, does not create test files.
   */
  skipTests?: boolean;
  /**
   * Specifies if Jest is to be used for mocking
   */
  jest?: boolean;
}
export class PipeOptions {
  name: string;
  path?: string;
  /**
   * Specifies if declaring module exports the pipe.
   */
  export?: boolean;
  /**
   * Flag to indicate if a directory is created.
   */
  flat?: boolean;
  /**
   * Allows specification of the declaring module.
   */
  module?: string;
  /**
   * Flag to skip the module import.
   */
  skipImport?: boolean;
  /**
   * When true, does not create test files.
   */
  skipTests?: boolean;
  /**
   * Specifies if Jest is to be used for mocking
   */
  jest?: boolean;

  /**
   * Adds a developer-defined type to the filename, in the format "name.type.ts"
   */
  type?: string;
}
