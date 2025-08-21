export interface PkgVersionInfo {
  label: string;
  nameOrHref: string;
  render?: (record: PkgVersionInfo) => React.ReactNode;
}

export interface CardInfo {
  content: PkgVersionInfo[];
  title: string;
}

export interface PkgJson {
  dependencies: PkgVersionInfo[];
  devDependencies: PkgVersionInfo[];
  name: string;
  version: string;
}

export interface PackageInfo {
  isLink: boolean;
  label: string;
  titleOrHref: string;
}

export function transformVersionData(tuple: [string, string]): PkgVersionInfo {
  const [$name, $version] = tuple;
  return {
    label: $name,
    nameOrHref: $version
  };
}
