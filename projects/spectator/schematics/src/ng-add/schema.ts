export interface Schema {
  /**
   * When true, does not add dependencies to the "package.json" file.
   */
  skipPackageJson?: boolean;

  /**
   * Skip installing dependency packages.
   */
  skipInstall?: boolean;

  /**
   * Are you sure what you don't want to see about Akita?
   */
  skipGreeting?: boolean;
}
